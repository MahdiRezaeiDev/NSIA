<?php

namespace Tests\Feature;

use App\Center;
use App\CurrentReport;
use App\FamilyReport;
use App\User;
use App\Http\Controllers\AppointmentsController;
use App\Http\Controllers\MainController;
use App\Http\Controllers\MobileAppController;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class CentersWorkflowTest extends TestCase
{
    use DatabaseTransactions;

    private $date = '1440-02-01';

    public function createApplication()
    {
        $app = require __DIR__.'/../../bootstrap/app.php';
        $app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();
        $database = getenv('NSIA_TEST_DATABASE') ?: 'nsia_test_backend';
        if (!preg_match('/^nsia_test_[a-zA-Z0-9_]+$/', $database)) {
            throw new \RuntimeException('Workflow tests require an isolated nsia_test_* database.');
        }
        config(['database.connections.mysql.database' => $database, 'cache.default' => 'array',
            'session.driver' => 'array', 'mail.driver' => 'array', 'broadcasting.default' => 'null']);
        DB::purge('mysql');
        \Schema::clearResolvedInstance('db.schema');
        $app->forgetInstance('db.schema');
        return $app;
    }

    private function user($role = 'admin', $center = 18)
    {
        $user = new User;
        $user->id = 22;
        $user->role = $role;
        $user->center_id = $center;
        \Auth::setUser($user);
        return $user;
    }

    private function family($reference, $center = 18, $members = 1, $status = '0')
    {
        if (!Center::find($center)) {
            $copy = Center::findOrFail(18)->replicate();
            $copy->id = $center;
            $copy->name = 'Workflow center '.$center;
            $copy->save();
        }
        DB::table('appointments')->insert(['center_id' => $center, 'appointment_date' => $this->date,
            'start_time' => '0800', 'end_time' => '0900', 'family_form_reference_no' => $reference]);
        for ($i = 1; $i <= $members; $i++) {
            DB::table('individualforms')->insert(['reference_no' => $reference.'-'.$i,
                'family_form_reference_no' => $reference, 'center_id' => $center,
                'name' => 'Workflow member '.$i, 'grand_father_name' => 'Synthetic', 'status' => $status,
                'relationship_with_head_of_family' => $i === 1 ? 1 : 2,
                'apply_for_new_id' => 'بلی', 'opened' => 1, 'opened_by' => 'Workflow user', 'opened_by_user_id' => 22]);
        }
    }

    private function listing(array $params = [])
    {
        $request = Request::create('/api/getIndividualApplications', 'GET', array_merge([
            'appointment_start_date' => $this->date, 'appointment_end_date' => $this->date,
        ], $params));
        $request->setUserResolver(function () { return \Auth::user(); });
        return app(MainController::class)->getIndividualApplications($request)['applications'];
    }

    private function calendar(array $params = [])
    {
        $request = Request::create('/api/appointmentDates', 'GET', $params);
        $request->setUserResolver(function () { return \Auth::user(); });
        $result = app(AppointmentsController::class)->getDates($request);
        foreach ($result['list'] as $year) {
            foreach ($year['months'] as $month) {
                foreach ($month['days'] as $day) {
                    if ($day['value'] === $this->date) {
                        return [(int) $day['total_family'], (int) $day['total_individual']];
                    }
                }
            }
        }
        return [0, 0];
    }

    public function testIndividualReportReturnsEveryEligibleMemberWithoutChangingFamilyLists()
    {
        $this->user();
        $this->family('WORKFLOW-A', 18, 4);
        $this->family('WORKFLOW-B', 19, 2);
        $this->family('WORKFLOW-NONNEW');
        DB::table('individualforms')->where('family_form_reference_no', 'WORKFLOW-NONNEW')->update(['apply_for_new_id' => 'نخیر']);
        $families = $this->listing();
        $this->assertEquals(2, $families->total());
        $this->assertEquals(4, $families->items()[0]->total_applicants);
        $this->assertEquals(22, $families->items()[0]->opened_by_user_id);
        $this->assertNotEmpty($families->items()[0]->center_name);
        $individuals = $this->listing(['view' => 'individual']);
        $this->assertEquals(6, $individuals->total());
        $this->assertEquals(['WORKFLOW-A-1', 'WORKFLOW-A-2', 'WORKFLOW-A-3', 'WORKFLOW-A-4', 'WORKFLOW-B-1', 'WORKFLOW-B-2'],
            array_column($individuals->items(), 'reference_no'));
        foreach ($individuals->items() as $row) {
            $this->assertNotEmpty($row->center_name);
            $this->assertEquals(22, $row->opened_by_user_id);
        }
    }

    public function testPaginationReachesRecordsBeyondTwoHundredAndRetainsFilters()
    {
        $this->user();
        for ($i = 1; $i <= 205; $i++) {
            $this->family(sprintf('WORKFLOW-P%03d', $i));
        }
        $this->family('WORKFLOW-OTHER', 19, 4);
        $this->family('WORKFLOW-STATUS', 18, 3, '1');
        foreach ([null, 'individual'] as $view) {
            $params = ['view' => $view, 'center_id' => 18, 'status' => 0];
            $first = $this->listing($params);
            $second = $this->listing($params + ['page' => 2]);
            $this->assertEquals(205, $first->total());
            $this->assertCount(200, $first->items());
            $this->assertCount(5, $second->items());
            $this->assertSame([], array_values(array_intersect(array_column($first->items(), 'reference_no'), array_column($second->items(), 'reference_no'))));
            $this->assertEquals('WORKFLOW-P201-1', $second->items()[0]->reference_no);
        }
        $members = $this->listing(['view' => 'individual', 'q' => 'WORKFLOW-OTHER', 'limit' => 2, 'page' => 2]);
        $this->assertEquals(4, $members->total());
        $this->assertEquals(['WORKFLOW-OTHER-3', 'WORKFLOW-OTHER-4'], array_column($members->items(), 'reference_no'));
    }

    public function testCalendarUsesSelectedCenterAndKeepsEachScopeSeparate()
    {
        $this->user();
        $this->family('WORKFLOW-C18', 18, 4);
        $this->family('WORKFLOW-C19', 19, 2);
        $this->family('WORKFLOW-C20', 20, 1, '1');
        $this->assertSame([1, 4], $this->calendar(['center_id' => 18]));
        $this->assertSame([1, 2], $this->calendar(['center_id' => 19]));
        $this->assertSame([3, 7], $this->calendar());
        $this->assertSame([2, 6], $this->calendar(['status' => 0]));
        $this->assertSame([0, 0], $this->calendar(['center_id' => 19, 'status' => 1]));
        $this->assertSame([1, 4], $this->calendar(['center_id' => 18]));
        $this->assertSame([3, 7], $this->calendar(['center_id' => 'false']));
    }

    public function testCalendarAndIndividualReportKeepStaffAndManagerAccessScopes()
    {
        foreach ([13, 14, 18, 19, 88, 89] as $center) {
            $this->family('WORKFLOW-S'.$center, $center, 2);
        }
        $this->family('WORKFLOW-HIDDEN-STATUS', 18, 1, '15');
        $this->user('center_manager');
        $this->assertSame([4, 8], $this->calendar());
        $this->assertEquals(8, $this->listing(['view' => 'individual'])->total());
        foreach ([13, 89] as $outside) {
            $this->assertSame([0, 0], $this->calendar(['center_id' => $outside]));
            $this->assertEquals(0, $this->listing(['view' => 'individual', 'center_id' => $outside])->total());
        }
        $this->user('document_checker');
        $this->assertSame([1, 2], $this->calendar(['center_id' => 19]));
        $this->assertEquals(2, $this->listing(['view' => 'individual'])->total());
        $this->assertEquals(0, $this->listing(['view' => 'individual', 'center_id' => 19])->total());
        $this->user('audit');
        $this->assertSame([0, 0], $this->calendar());
        $this->assertEquals(0, $this->listing(['view' => 'individual'])->total());
    }

    public function testIndividualExportMatchesAllReportRowsAndKeepsLegacyGrouping()
    {
        $this->family('WORKFLOW-E18', 18, 4);
        $this->family('WORKFLOW-E19', 19, 2);
        $this->family('WORKFLOW-E13', 13, 1);
        $this->family('WORKFLOW-E1', 18, 1, '1');
        $date = \Hijri::fromFormat('Y-m-d', $this->date);
        foreach (['admin', 'center_manager', 'team_leader'] as $role) {
            $this->user($role);
            foreach ([false, 18, 19] as $center) {
                foreach ([false, 0, 1] as $status) {
                    $report = new CurrentReport($date, $date, $center, $status, true);
                    $params = ['view' => 'individual'];
                    if ($center !== false) { $params['center_id'] = $center; }
                    if ($status !== false) { $params['status'] = $status; }
                    $this->assertEquals(array_column($this->listing($params)->items(), 'reference_no'),
                        $report->getQuery()->pluck('reference_no')->all(), $role.' export must match screen filters');
                }
            }
        }
        $this->user();
        $legacy = (new CurrentReport($date, $date, 18, 0))->getQuery()->get();
        $this->assertCount(1, $legacy);
        $this->assertEquals(4, $legacy[0]->total_applicants);
    }

    public function testBothFamilyExportsEnforceTheSameCenterAndStatusPermissionsAsTheList()
    {
        foreach ([13, 14, 18, 19, 88, 89] as $center) {
            $this->family('WORKFLOW-EXPORT-'.$center, $center, 4);
        }
        $this->family('WORKFLOW-EXPORT-HIDDEN', 18, 2, '15');
        $date = \Hijri::fromFormat('Y-m-d', $this->date);
        foreach (['admin', 'center_manager', 'team_leader', 'document_checker', 'audit', 'unknown'] as $role) {
            $this->user($role);
            foreach ([false, 13, 14, 18, 19, 88, 89] as $center) {
                $params = ['status' => 0];
                if ($center !== false) { $params['center_id'] = $center; }
                $expected = array_column($this->listing($params)->items(), 'family_form_reference_no');
                foreach ([new FamilyReport($date, $date, $center, 0), new CurrentReport($date, $date, $center, 0)] as $report) {
                    $actual = $report->getQuery()->get()->pluck('family_form_reference_no')->all();
                    $this->assertEquals($expected, $actual, $role.' / '.$center.' / '.get_class($report));
                }
            }
        }
        $this->user('center_manager');
        $this->assertCount(0, (new FamilyReport($date, $date, 18, 15))->getQuery()->get());
        \Auth::logout();
        $this->assertCount(0, (new FamilyReport($date, $date, false, false))->getQuery()->get());
        $this->assertCount(0, (new CurrentReport($date, $date, false, 0))->getQuery()->get());
    }

    public function testFamilyWorkbookContainsOneRowWithCorrectCountAndHeadOfFamily()
    {
        $this->user();
        $this->family('WORKFLOW-XLSX', 18, 5);
        DB::table('individualforms')->where('reference_no', 'WORKFLOW-XLSX-5')->update(['apply_for_new_id' => 'نخیر']);
        DB::table('individualforms')->where('reference_no', 'WORKFLOW-XLSX-1')
            ->update(['reference_no' => 'WORKFLOW-XLSX-Z', 'name' => 'Head of family']);
        $date = \Hijri::fromFormat('Y-m-d', $this->date);
        $report = new FamilyReport($date, $date, 18, 0);
        $rows = $report->getQuery()->get();
        $this->assertCount(1, $rows);
        $this->assertEquals(4, $rows[0]->total_applicants);
        $this->assertEquals('Head of family', $rows[0]->name);
        $file = tempnam(sys_get_temp_dir(), 'nsia-report-');
        try {
            file_put_contents($file, \Maatwebsite\Excel\Facades\Excel::raw($report, \Maatwebsite\Excel\Excel::XLSX));
            $book = \PhpOffice\PhpSpreadsheet\IOFactory::load($file);
            $sheet = $book->getActiveSheet();
            $this->assertTrue($sheet->getRightToLeft());
            $this->assertEquals(3, $sheet->getHighestDataRow());
            $this->assertEquals('WORKFLOW-XLSX', $sheet->getCell('A3')->getValue());
            $this->assertEquals(4, $sheet->getCell('B3')->getValue());
            $this->assertEquals('Head of family', trim($sheet->getCell('G3')->getValue()));
            $this->assertEquals('تاریخ مراجعه', $sheet->getCell('H2')->getValue());
            $book->disconnectWorksheets();
        } finally { unlink($file); }
        DB::table('individualforms')->where('reference_no', 'WORKFLOW-XLSX-Z')->update(['apply_for_new_id' => 'نخیر']);
        $rows = $report->getQuery()->get();
        $this->assertCount(1, $rows);
        $this->assertEquals(3, $rows[0]->total_applicants);
        $this->assertEquals('WORKFLOW-XLSX-2', $rows[0]->reference_no);
    }

    public function testFamilyExportMatchesSelectedStatusAndHandlesEmptyResults()
    {
        $this->user();
        $this->family('WORKFLOW-STATUS4', 18, 2, '4');
        $this->family('WORKFLOW-STATUS5', 18, 3, '5');
        $date = \Hijri::fromFormat('Y-m-d', $this->date);
        foreach ([false, 0, 4, 5] as $status) {
            $report = new FamilyReport($date, $date, 18, $status);
            $rows = $report->getQuery()->get();
            $params = ['center_id' => 18];
            if ($status !== false) { $params['status'] = $status; }
            $this->assertEquals(array_column($this->listing($params)->items(), 'family_form_reference_no'), $rows->pluck('family_form_reference_no')->all());
            if ($status === 0) {
                $this->assertCount(0, $rows);
                $this->assertCount(2, $report->generateReport());
                $this->assertNotEmpty(\Maatwebsite\Excel\Facades\Excel::raw($report, \Maatwebsite\Excel\Excel::XLSX));
            }
        }
    }

    public function testCalendarImmediatelyReflectsStatusChangesNewRegistrationsAndTransfers()
    {
        $this->user();
        $this->family('WORKFLOW-FRESH', 18, 4);
        $filter = ['center_id' => 18, 'status' => 0];
        $this->assertSame([1, 4], $this->calendar($filter));
        DB::table('individualforms')->where('family_form_reference_no', 'WORKFLOW-FRESH')->update(['status' => '1']);
        $this->assertSame([0, 0], $this->calendar($filter));
        $this->family('WORKFLOW-NEW', 18, 2);
        $this->assertSame([1, 2], $this->calendar($filter));
        DB::table('individualforms')->where('family_form_reference_no', 'WORKFLOW-NEW')->update(['center_id' => 19]);
        $this->assertSame([0, 0], $this->calendar($filter));
        $this->assertSame([1, 2], $this->calendar(['center_id' => 19, 'status' => 0]));
        DB::table('appointments')->where('family_form_reference_no', 'WORKFLOW-NEW')->update(['appointment_date' => '1440-02-02']);
        $this->assertSame([0, 0], $this->calendar(['center_id' => 19, 'status' => 0]));
        DB::flushQueryLog();
        DB::enableQueryLog();
        $this->calendar($filter);
        $queries = DB::getQueryLog();
        DB::disableQueryLog();
        $this->assertCount(1, $queries, 'Fresh calendar should still need just one aggregate query.');
    }

    public function testVipTransferRejectsMissingRecordsBeforeChangingTheFamily()
    {
        $this->family('WORKFLOW-VIP-TARGET', 19);
        $this->user('team_leader', 19);
        $request = Request::create('/api/moveToVipCenter', 'GET', ['family_form_reference_no' => 'WORKFLOW-VIP-ABSENT']);
        $request->setUserResolver(function () { return \Auth::user(); });
        $response = app(MobileAppController::class)->moveToVipCenter($request);
        $this->assertSame(404, $response->getStatusCode());

        $this->family('VIP-NO-APPT', 18, 4);
        DB::table('appointments')->where('family_form_reference_no', 'VIP-NO-APPT')->delete();
        $request = Request::create('/api/moveToVipCenter', 'GET', ['family_form_reference_no' => 'VIP-NO-APPT']);
        $request->setUserResolver(function () { return \Auth::user(); });
        $response = app(MobileAppController::class)->moveToVipCenter($request);
        $this->assertSame(422, $response->getStatusCode());
        $this->assertSame(4, DB::table('individualforms')->where('family_form_reference_no', 'VIP-NO-APPT')
            ->where('center_id', 18)->count());
    }

    public function testVipTransferUpdatesAnExistingAppointment()
    {
        $this->family('VIP-SAME', 18, 2);
        $this->user('team_leader', 18);
        $request = Request::create('/api/moveToVipCenter', 'GET', ['family_form_reference_no' => 'VIP-SAME']);
        $request->setUserResolver(function () { return \Auth::user(); });
        $result = app(MobileAppController::class)->moveToVipCenter($request);
        $this->assertSame('ok', $result['status']);
        $this->assertSame(2, DB::table('individualforms')->where('family_form_reference_no', 'VIP-SAME')
            ->where('center_id', 18)->count());
        $this->assertSame(\Hijri::now()->format('Y-m-d'), DB::table('appointments')
            ->where('family_form_reference_no', 'VIP-SAME')->value('appointment_date'));
    }
}
