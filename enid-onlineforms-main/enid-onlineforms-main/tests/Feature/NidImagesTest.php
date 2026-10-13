<?php

namespace Tests\Feature;

use App\Nidpicture;
use App\Nidsignature;
use App\User;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Filesystem\FilesystemAdapter;
use Laravel\Passport\Passport;
use Tests\TestCase;

class NidImagesTest extends TestCase
{
    use DatabaseTransactions;

    public function createApplication()
    {
        $app = require __DIR__.'/../../bootstrap/app.php';
        $app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();
        $database = getenv('NSIA_TEST_DATABASE') ?: 'nsia_test_backend';
        if (!preg_match('/^nsia_(fix|test)_[a-zA-Z0-9_]+$/', $database)) {
            throw new \RuntimeException('NID tests require an isolated test database.');
        }
        config(['database.connections.mysql.database'=>$database, 'cache.default'=>'array',
            'mail.driver'=>'array', 'broadcasting.default'=>'null', 'queue.default'=>'sync']);
        \DB::purge('mysql');
        \Schema::clearResolvedInstance('db.schema');
        $app->forgetInstance('db.schema');
        return $app;
    }

    private function actor($role = 'document_checker', $center = 18)
    {
        $user = new User;
        $user->name = 'Synthetic NID test account';
        $user->email = 'nid-'.bin2hex(random_bytes(8)).'@example.invalid';
        $user->password = bcrypt('TEST-ONLY');
        $user->role = $role;
        $user->center_id = $center;
        $user->active = 1;
        $user->save();
        return $user;
    }

    private function picture(User $owner, $status = 2, $recordId = 1001, $number = 'SYNTHETIC-NID')
    {
        $picture = new Nidpicture;
        $picture->record_id = $recordId;
        $picture->file_path = 'nidpics/test-only.jpg';
        $picture->nid_number = $number;
        $picture->user_id = $owner->id;
        $picture->signature_id = 0;
        $picture->status = $status;
        $picture->save();
        return $picture;
    }

    private function image($color)
    {
        $image = imagecreatetruecolor(4, 6);
        imagefill($image, 0, 0, $color);
        ob_start();
        imagejpeg($image);
        $bytes = ob_get_clean();
        imagedestroy($image);
        return base64_encode($bytes);
    }

    private function payload()
    {
        return ['signature'=>['sign'=>$this->image(0x123456), 'photo'=>$this->image(0xabcdef)],
            'images'=>[['record_id'=>1001, 'file'=>$this->image(0x445566)],
                ['record_id'=>1002, 'file'=>$this->image(0x778899)]]];
    }

    public function testUploadStoresReadableFilePathsAndExactImageBytes()
    {
        $disk = \Storage::fake('s3');
        $owner = $this->actor();
        Passport::actingAs($owner);
        $payload = $this->payload();
        $this->postJson('/api/uploadNidImages', $payload)->assertStatus(200)->assertExactJson(['message'=>'ok']);
        $signature = Nidsignature::where('user_id', $owner->id)->firstOrFail();
        $this->assertTrue($disk->exists($signature->signature_path));
        $this->assertSame(base64_decode($payload['signature']['sign']), $disk->get($signature->signature_path));
        $this->assertTrue($disk->exists($signature->photo_path));
        $this->assertSame(base64_decode($payload['signature']['photo']), $disk->get($signature->photo_path));
        foreach ($payload['images'] as $item) {
            $picture = Nidpicture::where('user_id', $owner->id)->where('record_id', $item['record_id'])->firstOrFail();
            $this->assertTrue($disk->exists($picture->file_path));
            $this->assertSame(base64_decode($item['file']), $disk->get($picture->file_path));
            $this->assertSame($signature->id, (int) $picture->signature_id);
            $this->assertSame(0, (int) $picture->status);
        }
        $this->assertCount(4, $disk->allFiles());
    }

    public function testOwnerAndOversightKeepExistingStatusAndNumberResponses()
    {
        $owner = $this->actor('verificationApi', null);
        $admin = $this->actor('admin', 19);
        $auditor = $this->actor('audit', 19);
        foreach ([0, 1, 2] as $status) {
            $record = $this->picture($owner, $status, 1100+$status);
            foreach ([$owner, $admin, $auditor] as $user) {
                Passport::actingAs($user);
                $expected = $status < 2 ? ['status'=>$status] : ['nid_number'=>$record->nid_number];
                $this->getJson('/api/getNidNumber?record_id='.$record->record_id)->assertStatus(200)->assertExactJson($expected);
            }
        }
    }

    public function testOtherAccountsCannotReadAnyProcessingState()
    {
        $owner = $this->actor();
        $sameCenter = $this->actor();
        $foreignCenter = $this->actor('document_checker', 19);
        $otherService = $this->actor('verificationApi', null);
        foreach ([0, 1, 2] as $status) {
            $record = $this->picture($owner, $status, 1200+$status);
            foreach ([$sameCenter, $foreignCenter, $otherService] as $other) {
                Passport::actingAs($other);
                $this->getJson('/api/getNidNumber?record_id='.$record->record_id)->assertStatus(404)
                    ->assertExactJson(['status'=>'RECORD NUMBER NOT FOUND']);
            }
        }
    }

    public function testDuplicateRecordIdsReturnOnlyTheCurrentOwnersResult()
    {
        $first = $this->actor();
        $second = $this->actor();
        $this->picture($first, 2, 1301, 'SYNTHETIC-FIRST');
        $this->picture($second, 2, 1301, 'SYNTHETIC-SECOND');
        Passport::actingAs($second);
        $this->getJson('/api/getNidNumber?record_id=1301')->assertStatus(200)
            ->assertExactJson(['nid_number'=>'SYNTHETIC-SECOND']);
    }

    public function testGuestInactiveAndUnknownRecordResponses()
    {
        $owner = $this->actor();
        $record = $this->picture($owner);
        $this->getJson('/api/getNidNumber?record_id='.$record->record_id)->assertStatus(401);
        Passport::actingAs($owner);
        $this->getJson('/api/getNidNumber?record_id=1999')->assertStatus(404)
            ->assertExactJson(['status'=>'RECORD NUMBER NOT FOUND']);
        $owner->active = 0;
        $owner->save();
        Passport::actingAs($owner);
        $this->getJson('/api/getNidNumber?record_id='.$record->record_id)->assertStatus(403);
    }

    public function failedWritePositions()
    {
        return ['first document'=>[3], 'second document after a saved record'=>[4]];
    }

    /** @dataProvider failedWritePositions */
    public function testFailedImageWriteRollsBackMetadataAndCleansEarlierFiles($failAt)
    {
        $disk = \Storage::fake('s3');
        $adapter = \Mockery::mock(FilesystemAdapter::class);
        $writes = 0;
        $adapter->shouldReceive('put')->times($failAt)->andReturnUsing(function ($path, $data) use ($disk, &$writes, $failAt) {
            return ++$writes === $failAt ? false : $disk->put($path, $data);
        });
        $adapter->shouldReceive('delete')->once()->andReturnUsing(function ($paths) use ($disk, $failAt) {
            $this->assertCount($failAt, $paths);
            return $disk->delete($paths);
        });
        \Storage::shouldReceive('disk')->with('s3')->andReturn($adapter);
        $owner = $this->actor();
        Passport::actingAs($owner);
        $this->postJson('/api/uploadNidImages', $this->payload())->assertStatus(503);
        $this->assertSame(0, Nidsignature::where('user_id', $owner->id)->count());
        $this->assertSame(0, Nidpicture::where('user_id', $owner->id)->count());
        $this->assertSame([], $disk->allFiles());
    }
}
