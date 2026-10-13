<?php

namespace Tests\Feature;

use App\Center;
use App\User;
use App\Http\Controllers\MobileAppController;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class BackendPerformanceTest extends TestCase
{
    use DatabaseTransactions;

    public function createApplication()
    {
        $app = require __DIR__.'/../../bootstrap/app.php';
        $app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();
        $database = getenv('NSIA_TEST_DATABASE') ?: 'nsia_test_backend';
        if (!preg_match('/^nsia_test_[a-zA-Z0-9_]+$/', $database)) {
            throw new \RuntimeException('Performance tests require an isolated nsia_test_* database.');
        }
        config(['database.connections.mysql.database' => $database, 'cache.default' => 'array',
            'session.driver' => 'array', 'mail.driver' => 'array', 'broadcasting.default' => 'null']);
        DB::purge('mysql');
        \Schema::clearResolvedInstance('db.schema');
        $app->forgetInstance('db.schema');
        return $app;
    }

    private function dashboard($role, $centerId = 18)
    {
        $user = new User;
        $user->role = $role;
        $user->center_id = $centerId;
        $request = Request::create('/api/getDashboard');
        $request->setUserResolver(function () use ($user) {return $user;});
        return app(MobileAppController::class)->getDashboard($request);
    }

    private function normalized($value)
    {
        return json_decode(json_encode($value), true);
    }

    private function appointment($center, $date, $start, $end, $reference)
    {
        DB::table('appointments')->insert(['center_id' => $center, 'appointment_date' => $date,
            'start_time' => $start, 'end_time' => $end, 'family_form_reference_no' => $reference]);
    }

    public function testDashboardMatchesExistingCountsAndRoleScopesWithTwoQueries()
    {
        foreach ([13, 14, 88, 89] as $id) {
            if (!Center::find($id)) {
                $center = Center::findOrFail(18)->replicate();
                $center->id = $id;
                $center->name = 'Synthetic center '.$id;
                $center->save();
            }
        }
        $today = \Hijri::now()->format('Y-m-d');
        $past = \Hijri::fromCarbon(Carbon::now()->subDays(2))->format('Y-m-d');
        $future = \Hijri::fromCarbon(Carbon::now()->addDays(2))->format('Y-m-d');
        foreach ([13, 14, 18, 88, 89] as $centerId) {
            foreach ([$today, $past, $future, null] as $dateIndex => $date) {
                $family = 'PERF'.$centerId.'D'.$dateIndex;
                if ($date !== null) {
                    $this->appointment($centerId, $date, '0800', '0900', $family);
                }
                foreach (['0', '1', '13'] as $status) {
                    foreach ([1, 2, 3] as $relation) {
                        DB::table('individualforms')->insert(['reference_no' => $family.$status.$relation,
                            'family_form_reference_no' => $family, 'center_id' => $centerId,
                            'grand_father_name' => 'Synthetic', 'status' => $status,
                            'relationship_with_head_of_family' => $relation,
                            'apply_for_new_id' => $relation === 3 ? 'نخیر' : 'بلی']);
                    }
                }
            }
        }
        foreach (['admin', 'center_manager', 'team_leader'] as $role) {
            $centers = Center::all()->filter(function ($center) use ($role) {
                return $role === 'admin' || ($role === 'center_manager' && $center->id > 13 && $center->id < 89)
                    || ($role === 'team_leader' && $center->id == 18);
            })->values();
            // Retained legacy calculations are an independent before/after oracle.
            $expected = $centers->map(function ($center) {
                return ['name' => $center->name, 'id' => $center->id,
                    'todayApplications' => $center->getCountReport(true)->sortBy('status')->values(),
                    'oldApplications' => $center->getCountReport(false)->sortBy('status')->values()];
            });
            DB::flushQueryLog();
            DB::enableQueryLog();
            $actual = $this->dashboard($role);
            $queries = DB::getQueryLog();
            DB::disableQueryLog();
            $this->assertSame($this->normalized($expected), $this->normalized($actual), $role);
            $this->assertCount(2, $queries, $role.' dashboard query count must not grow with centers.');
        }
        $this->assertNull($this->dashboard('document_checker'));
        $this->assertSame([], $this->normalized($this->dashboard('team_leader', 99999)));
    }

    public function testDailySlotsMatchIndividualQueriesAndReadNewBookingsImmediately()
    {
        $center = Center::findOrFail(18);
        $date = Carbon::now()->addDays(3);
        $hijri = \Hijri::fromCarbon($date)->format('Y-m-d');
        $slots = [];
        for ($i = 0; $i < 12; $i++) {
            $slots[] = ['start' => sprintf('%02d00', $i + 7), 'end' => sprintf('%02d30', $i + 7),
                'number_of_appointments' => $i === 0 ? 1 : 3];
        }
        $center->appointments = ['data' => ['days' => [['active' => true, 'value' => $date->format('N'), 'slots' => $slots]],
            'public_holidays' => []]];
        $this->appointment(18, $hijri, '0700', '0730', 'PERF-FULL');
        $this->appointment(18, $hijri, '0800', '0830', 'PERF-TAKEN');
        $this->appointment(19, $hijri, '0800', '0830', 'PERF-OTHER-CENTER');
        $this->appointment(18, $hijri, '0800', '0900', 'PERF-OTHER-END');
        $expected = array_values(array_filter(array_map(function ($slot) use ($date) {
            return Center::getAvailableTimes($date, $slot, 18);
        }, $slots)));
        DB::flushQueryLog();
        DB::enableQueryLog();
        $actual = $center->getAppointmentsByDay($date);
        $queries = DB::getQueryLog();
        DB::disableQueryLog();
        $this->assertSame($expected, $actual);
        $this->assertCount(1, $queries);
        $this->assertCount(11, $actual);
        $this->assertSame(2, $actual[0]['number_of_appointments']);
        $this->appointment(18, $hijri, '0800', '0830', 'PERF-NEW-BOOKING');
        $this->assertSame(1, $center->getAvailableSlots($date, '0800', '0830'));
        $this->appointment(18, $hijri, '0800', '0830', 'PERF-LAST-BOOKING');
        $this->assertSame(0, $center->getAvailableSlots($date, '0800', '0830'));
        $this->assertFalse($center->getAppointmentsByDay($date->copy()->addDay()));
        $parts = explode('-', $hijri);
        $schedule = $center->appointments;
        $schedule['data']['public_holidays'][] = ['year' => $parts[0], 'month' => $parts[1], 'day' => $parts[2]];
        $center->appointments = $schedule;
        $this->assertFalse($center->getAppointmentsByDay($date));
    }
}
