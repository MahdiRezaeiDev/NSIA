<?php

namespace Tests\Feature;

use App\Captcha;
use App\Individualform;
use App\Log;
use App\Services\ApplicationAccess;
use App\User;
use GuzzleHttp\Client;
use GuzzleHttp\Handler\MockHandler;
use GuzzleHttp\HandlerStack;
use GuzzleHttp\Psr7\Response;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class BackendHardeningTest extends TestCase
{
    use DatabaseTransactions;

    public function createApplication()
    {
        $app = require __DIR__.'/../../bootstrap/app.php';
        $app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();
        $database = getenv('NSIA_TEST_DATABASE') ?: 'nsia_test_backend';
        if (!preg_match('/^nsia_(fix|test)_[a-zA-Z0-9_]+$/', $database)) {
            throw new \RuntimeException('Regression tests require an isolated nsia_fix_* or nsia_test_* database.');
        }
        config(['database.connections.mysql.database' => $database, 'cache.default' => 'array',
            'mail.driver' => 'array', 'broadcasting.default' => 'null', 'queue.default' => 'sync',
            'attachments.disk' => 'local', 'pdf.disk' => 'local', 'security.captcha_driver' => 'disabled',
            'filesystems.disks.local.root' => storage_path('framework/testing')]);
        \DB::purge('mysql');
        \Schema::clearResolvedInstance('db.schema');
        $app->forgetInstance('db.schema');
        return $app;
    }

    private function actor($role, $center = 18)
    {
        $user = new User;
        $user->role = $role;
        $user->center_id = $center;
        $user->active = 1;
        return $user;
    }

    private function form($status = 0, $center = 18)
    {
        $form = new Individualform;
        $form->status = $status;
        $form->center_id = $center;
        $form->isSendToIvp = false;
        return $form;
    }

    public function testCenterScopeAndOversightReadPermissions()
    {
        $form = $this->form();
        $this->assertTrue(ApplicationAccess::canRead($this->actor('document_checker'), $form));
        $this->assertFalse(ApplicationAccess::canRead($this->actor('document_checker', 19), $form));
        $this->assertTrue(ApplicationAccess::canRead($this->actor('admin', 19), $form));
        $this->assertTrue(ApplicationAccess::canRead($this->actor('audit', 19), $form));
        $this->assertTrue(ApplicationAccess::canRead($this->actor('center_manager', 19), $form));
        $this->assertFalse(ApplicationAccess::canRead($this->actor('center_manager'), $this->form(0, 90)));
        $this->assertFalse(ApplicationAccess::canRead($this->actor('unknown-role'), $form));
    }

    public function testTransitionsRejectShortcutsAndPreserveValidStaffActions()
    {
        $this->assertFalse(ApplicationAccess::canTransition($this->actor('document_checker'), $this->form(), 6));
        $this->assertFalse(ApplicationAccess::canTransition($this->actor('admin'), $this->form(), 4));
        $this->assertFalse(ApplicationAccess::canTransition($this->actor('audit'), $this->form(4), 1));
        $this->assertFalse(ApplicationAccess::canTransition($this->actor('document_checker', 19), $this->form(4), 1));
        $this->assertFalse(ApplicationAccess::canTransition($this->actor('admin'), $this->form(), 999));
        $this->assertTrue(ApplicationAccess::canTransition($this->actor('id_verifier'), $this->form(), 3));
        $this->assertTrue(ApplicationAccess::canTransition($this->actor('document_checker'), $this->form(4), 1));
        $this->assertTrue(ApplicationAccess::canTransition($this->actor('team_leader'), $this->form(1), 2));
        $this->assertTrue(ApplicationAccess::canTransition($this->actor('card_activator_distributor'), $this->form(4), 6));
        $this->assertTrue(ApplicationAccess::canTransition($this->actor('document_checker'), $this->form(), 13));
    }

    public function testMissingStatusCannotGrantVerificationPermission()
    {
        $user = $this->actor('document_checker');
        $this->assertFalse($user->canAccessApplication(null));
        $this->assertFalse(ApplicationAccess::canVerify($user, $this->form()));
        $this->assertTrue(ApplicationAccess::canVerify($this->actor('id_verifier'), $this->form()));
        $this->assertFalse(ApplicationAccess::canVerify($this->actor('id_verifier', 19), $this->form()));
    }

    public function testRequestAuditOmitsCredentialsAndPersonalPayloads()
    {
        $safe = Log::safeData(['password' => 'SENSITIVE-PASSWORD', 'token' => 'SENSITIVE-TOKEN',
            'name' => 'PERSONAL-NAME', 'members' => [['birthday_year' => 1367]],
            'reference_no' => '123', 'center_id' => 18, 'status' => 1]);
        $this->assertSame(['reference_no' => '123', 'center_id' => 18, 'status' => 1], $safe);
        $this->assertSame(['details_omitted' => true], Log::safeData('Unstructured secret payload'));
    }

    private function captchaResponse($overrides = [])
    {
        config(['security.captcha_driver' => 'google', 'app.captchaKey' => 'UNIT-SECRET',
            'security.captcha_hostnames' => ['forms.example.test']]);
        $data = array_merge(['success' => true, 'action' => 'new_id', 'score' => 0.8,
            'hostname' => 'forms.example.test'], $overrides);
        $this->app->instance('captcha.client', new Client(['handler' => HandlerStack::create(
            new MockHandler([new Response(200, [], json_encode($data))]))]));
    }

    public function testCaptchaChecksActionHostnameScoreAndSuccess()
    {
        $this->captchaResponse();
        $this->assertFalse(Captcha::isRobot('UNIT-TOKEN', 'new_id'));
        foreach ([['action' => 'tracking'], ['hostname' => 'evil.example.test'], ['score' => 0.1], ['success' => false]] as $bad) {
            $this->captchaResponse($bad);
            $this->assertTrue(Captcha::isRobot('UNIT-TOKEN', 'new_id'));
        }
    }

    public function testCaptchaCannotBeDisabledInProduction()
    {
        $this->app->instance('env', 'production');
        config(['security.captcha_driver' => 'disabled', 'app.captchaKey' => null]);
        $this->assertTrue(Captcha::isRobot('UNIT-TOKEN', 'new_id'));
    }

    public function testPrintTokensAreBoundToFamilyAndExpire()
    {
        $code = Captcha::generateCode('printing:123');
        $this->assertSame(64, strlen($code));
        $this->assertTrue(Captcha::verifyCode($code, 'printing:123'));
        $this->assertFalse(Captcha::verifyCode($code, 'printing:456'));
        Captcha::where('code', $code)->update(['created_at' => now()->subMinutes(121)]);
        $this->assertFalse(Captcha::verifyCode($code, 'printing:123'));
    }

    public function testLoginThrottleDoesNotConsumeReferenceLookupQuota()
    {
        for ($i = 0; $i < 10; $i++) {
            $this->postJson('/api/login', ['email' => 'NO-SUCH-USER@example.invalid', 'password' => 'UNIT'])->assertStatus(403);
        }
        $this->postJson('/api/login', ['email' => 'NO-SUCH-USER@example.invalid', 'password' => 'UNIT'])->assertStatus(429);
        $this->getJson('/api/getAppointments?center_id=18')->assertStatus(200);
    }

    public function testWebCsrfBlocksMissingTokenAndAllowsValidForm()
    {
        // Laravel normally skips CSRF in tests; enable its real path explicitly.
        $this->app->instance('env', 'local');
        $this->post('/login', ['email' => 'NO-SUCH-USER@example.invalid', 'password' => 'UNIT'])->assertStatus(419);
        $this->withSession(['_token' => 'UNIT-CSRF'])->post('/login', [
            '_token' => 'UNIT-CSRF', 'email' => 'NO-SUCH-USER@example.invalid', 'password' => 'UNIT',
        ])->assertStatus(302);
        $this->get('/moveApplicationToNextStep?type=individual&status=1&reference_no=123')->assertStatus(419);
    }

    public function testFamilyRegistrationCenterReviewAndPrintingLifecycle()
    {
        $payload = json_decode(file_get_contents(__DIR__.'/../Fixtures/family-four-members.json'), true);
        $slots = $this->getJson('/api/getAppointments?center_id=18')->assertStatus(200)->json();
        $payload['selectedAppointmentTime'] = $slots[0]['times'][0];
        $draft = $this->postJson('/api/saveForm', ['application_id' => '', 'data' => ['members' => []]])->assertStatus(200)->json();
        $payload['application_id'] = $draft['application_id'];
        $payload['token'] = 'LOCAL-TEST';
        foreach ($payload['members'] as $i => &$member) {
            $uploaded = $this->post('/api/uploadFile', ['file' => \Illuminate\Http\UploadedFile::fake()->image('synthetic.png', 40, 50)],
                ['Accept' => 'application/json'])->assertStatus(200)->json();
            $member['photo'] = [['name' => 'Synthetic test image', 'path' => $uploaded['filePath']]];
            if ($i < 2) {
                $member['paper_id_files'] = $member['photo'];
            }
        }
        unset($member);
        $submitted = $this->postJson('/api/submit-individual-form', $payload)->assertStatus(200)->json();
        $family = $submitted['reference_no'];
        $this->assertCount(4, $submitted['applications']);
        $this->postJson('/api/submit-individual-form', $payload)->assertStatus(403);
        $this->assertSame(4, Individualform::where('family_form_reference_no', $family)->count());
        $this->assertSame(1, \App\Appointment::where('family_form_reference_no', $family)->count());
        $this->getJson('/api/getFamilyApplication?reference_no='.$family)->assertStatus(401);

        $foreign = $this->actor('document_checker', 19);
        $foreign->name = 'Synthetic foreign checker';
        $foreign->email = 'test-foreign@example.invalid';
        $foreign->password = bcrypt('TEST-ONLY');
        $foreign->save();
        \Laravel\Passport\Passport::actingAs($foreign);
        $first = $submitted['applications'][0]['reference_no'];
        $this->getJson('/api/individualapplication-details?reference_no='.$first)->assertStatus(403);

        $verifier = $this->actor('id_verifier');
        $verifier->name = 'Synthetic verifier';
        $verifier->email = 'test-verifier@example.invalid';
        $verifier->password = bcrypt('TEST-ONLY');
        $verifier->save();
        $this->app->bind(\App\Services\IdentityVerification::class, function () {
            return new class extends \App\Services\IdentityVerification {
                public function validate(Individualform $form, $code) { return $code === 'VALID-'.$form->reference_no; }
            };
        });
        \Laravel\Passport\Passport::actingAs($verifier);
        $this->getJson('/api/updateVerificationReference?reference_no='.$first.'&verification_type=system&verification_reference_no=INVALID')->assertStatus(422);
        foreach ($submitted['applications'] as $item) {
            $reference = $item['reference_no'];
            $this->getJson('/api/updateVerificationReference?reference_no='.$reference.'&verification_type=system&verification_reference_no=VALID-'.$reference)->assertStatus(200);
        }
        $checker = $this->actor('document_checker');
        $checker->name = 'Synthetic checker';
        $checker->email = 'test-checker@example.invalid';
        $checker->password = bcrypt('TEST-ONLY');
        $checker->save();
        \Laravel\Passport\Passport::actingAs($checker);
        foreach ($submitted['applications'] as $item) {
            $this->getJson('/api/moveApplicationToNextStep?type=individual&status=1&reference_no='.$item['reference_no'])->assertStatus(200);
        }
        $this->assertSame(4, Individualform::where('family_form_reference_no', $family)->where('status', 1)->count());
        $this->getJson('/api/getAttachments?reference_no='.$first)->assertStatus(200)->assertJsonCount(1);
        $pdf = $this->get(str_replace(config('app.url'), '', $submitted['path']))->assertStatus(200)->getContent();
        $this->assertSame('%PDF-', substr($pdf, 0, 5));
        $parser = new \setasign\Fpdi\Fpdi;
        $this->assertSame(22, $parser->setSourceFile(\setasign\Fpdi\PdfParser\StreamReader::createByString($pdf)));
        $newDraft = $this->postJson('/api/saveForm', ['application_id' => '', 'data' => ['members' => []]])->assertStatus(200)->json();
        $payload['application_id'] = $newDraft['application_id'];
        $this->postJson('/api/submit-individual-form', $payload)->assertStatus(422);
        $this->assertSame(0, Individualform::where('family_form_reference_no', $newDraft['application_id'])->count());
    }
}
