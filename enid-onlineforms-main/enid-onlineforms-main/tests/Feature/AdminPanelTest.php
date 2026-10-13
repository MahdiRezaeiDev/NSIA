<?php

namespace Tests\Feature;

use App\Center;
use App\Template;
use App\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class AdminPanelTest extends TestCase
{
    use DatabaseTransactions;

    public function createApplication()
    {
        $app = require __DIR__.'/../../bootstrap/app.php';
        $app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();
        $database = getenv('NSIA_TEST_DATABASE') ?: 'nsia_test_backend';
        if (!preg_match('/^nsia_test_[a-zA-Z0-9_]+$/', $database)) {
            throw new \RuntimeException('Panel tests require an isolated nsia_test_* database.');
        }
        config(['database.connections.mysql.database' => $database, 'cache.default' => 'array',
            'session.driver' => 'array', 'mail.driver' => 'array', 'broadcasting.default' => 'null']);
        DB::purge('mysql');
        \Schema::clearResolvedInstance('db.schema');
        $app->forgetInstance('db.schema');
        return $app;
    }

    private function actor($role = 'admin')
    {
        $user = new User;
        $user->name = 'Synthetic panel actor';
        $user->email = $role.'-panel@example.invalid';
        $user->password = bcrypt('TEST-ONLY-123');
        $user->active = 1;
        $user->center_id = 18;
        $user->role = $role;
        $user->save();
        return $user;
    }

    public function testFamilyPaginationSearchAndFiltersKeepRoleScopes()
    {
        $today = \Hijri::now()->format('Y-m-d');
        $tomorrow = \Hijri::now()->addDays(1)->format('Y-m-d');
        foreach ([[18,0], [18,1], [18,4], [19,0], [89,0], [14,0]] as $index => $spec) {
            list($centerId, $status) = $spec;
            if (!Center::find($centerId)) {
                $center = Center::findOrFail(18)->replicate();
                $center->id = $centerId;
                $center->save();
            }
            $family = 'UIPANEL'.($index + 1);
            DB::table('appointments')->insert(['center_id' => $centerId,
                'family_form_reference_no' => $family, 'appointment_date' => $index === 2 ? $tomorrow : $today,
                'start_time' => '0800', 'end_time' => '0900']);
            foreach ([1,2,3] as $relation) {
                DB::table('individualforms')->insert(['reference_no' => $family.$relation,
                    'family_form_reference_no' => $family, 'name' => 'Synthetic panel pagination',
                    'grand_father_name' => 'Synthetic', 'center_id' => $centerId, 'status' => $status,
                    'relationship_with_head_of_family' => $relation, 'apply_for_new_id' => $relation === 3 ? 'نخیر' : 'بلی']);
            }
        }
        $this->actingAs($this->actor(), 'web');
        $query = '/getIndividualApplications?q=Synthetic%20panel%20pagination';
        $seen = [];
        foreach ([1,2,3] as $page) {
            $body = $this->getJson($query.'&limit=2&page='.$page)->assertStatus(200)->json('applications');
            $this->assertSame(6, $body['total']);
            $this->assertSame(3, $body['last_page']);
            $this->assertSame($page, $body['current_page']);
            $this->assertCount(2, $body['data']);
            foreach ($body['data'] as $row) {
                $this->assertSame(2, (int) $row['total_applicants']);
                $seen[] = $row['family_form_reference_no'];
            }
        }
        $this->assertCount(6, array_unique($seen));
        $this->getJson($query.'&status=0')->assertJson(['applications' => ['total' => 4]]);
        $this->getJson($query.'&center_id=18')->assertJson(['applications' => ['total' => 3]]);
        $this->getJson($query.'&center_id=18&status=0')->assertJson(['applications' => ['total' => 1]]);
        $this->getJson('/getIndividualApplications?q=UIPANEL1')->assertJson(['applications' => ['total' => 1]]);
        list($year,$month,$day) = explode('-', $today);
        $this->getJson($query.'&appointment_year='.$year.'&appointment_month='.$month.'&appointment_day='.$day)
            ->assertJson(['applications' => ['total' => 5]]);
        $this->getJson($query.'&page=20&limit=2')->assertJsonCount(0, 'applications.data');
        $this->actingAs($this->actor('document_checker'), 'web');
        $this->getJson($query)->assertJson(['applications' => ['total' => 3]]);
        $this->getJson($query.'&center_id=19')->assertJson(['applications' => ['total' => 0]]);
        $this->actingAs($this->actor('center_manager'), 'web');
        $this->getJson($query)->assertJson(['applications' => ['total' => 5]]);
        $this->getJson($query.'&center_id=89')->assertJson(['applications' => ['total' => 0]]);
    }

    public function testPanelEditorsPersistExistingContractsWithoutLosingSchedulesOrPasswords()
    {
        $admin = $this->actor();
        $this->actingAs($admin, 'web')->withSession(['_token' => 'PANEL-CSRF']);
        $headers = ['X-CSRF-TOKEN' => 'PANEL-CSRF'];
        $schedule = ['days' => [['label' => 'شنبه', 'value' => 6, 'active' => true,
            'slots' => [['start' => '0800', 'end' => '0900', 'number_of_appointments' => 17]], 'times' => []]],
            'public_holidays' => [['year' => '1405', 'month' => '8', 'day' => '1']]];
        $this->postJson('/admin/saveTemplate', ['name' => 'Synthetic panel template', 'data' => $schedule], $headers)->assertStatus(200);
        $template = Template::where('name', 'Synthetic panel template')->firstOrFail();
        $this->assertSame($schedule, $template->data);
        $templates = $this->getJson('/admin/getTemplates')->assertStatus(200)->json();
        $listed = collect($templates)->firstWhere('id', $template->id);
        $this->assertSame($schedule, $listed['data']);
        $centerPayload = ['name' => 'Synthetic panel center', 'province' => 'کابل', 'country' => '1',
            'village' => 'آزمایشی', 'town' => 'مرکز', 'fee' => '500', 'currency' => 'افغانی',
            'ip' => '127.0.0.1', 'status' => 1, 'enable_appointments' => 1,
            'number_of_days_before_appointment' => 2, 'appointments' => ['data' => $schedule]];
        $this->postJson('/admin/saveCenter', $centerPayload, $headers)->assertStatus(200);
        $center = Center::where('name', $centerPayload['name'])->firstOrFail();
        $this->assertSame($schedule, $center->appointments['data']);
        $centerPayload['id'] = $center->id;
        $centerPayload['fee'] = '600';
        $this->postJson('/admin/saveCenter', $centerPayload, $headers)->assertStatus(200);
        $this->assertSame($schedule, $center->fresh()->appointments['data']);
        $userPayload = ['name' => 'Synthetic panel employee', 'email' => 'panel-employee@example.invalid',
            'role' => 'document_checker', 'center_id' => $center->id, 'active' => 1,
            'password' => 'SYNTHETIC-123', 'password_confirmation' => 'SYNTHETIC-123'];
        $this->postJson('/admin/saveUser', $userPayload, $headers)->assertStatus(200);
        $employee = User::where('email', $userPayload['email'])->firstOrFail();
        $hash = $employee->password;
        $userPayload['id'] = $employee->id;
        $userPayload['name'] = 'Synthetic renamed employee';
        $userPayload['password'] = $userPayload['password_confirmation'] = '';
        $this->postJson('/admin/saveUser', $userPayload, $headers)->assertStatus(200);
        $this->assertSame($hash, $employee->fresh()->password);
        $this->assertSame('Synthetic renamed employee', $employee->fresh()->name);
        $this->get('/admin/newUser?id='.$employee->id)->assertStatus(200)->assertSee('ویرایش معلومات کارمند');
        $this->get('/admin/newCenter?id='.$center->id)->assertStatus(200)->assertSee('ویرایش مرکز');
        $this->get('/admin/template/'.$template->id)->assertStatus(200)->assertSee('ویرایش قالب ملاقات');
        $this->actingAs($employee->fresh(), 'web');
        $this->get('/userDashboard')->assertStatus(200)->assertDontSee('href="/admin/users"', false);
        $this->postJson('/admin/saveCenter', $centerPayload, $headers)->assertStatus(302);
        $this->assertSame($schedule, $center->fresh()->appointments['data']);
    }
}
