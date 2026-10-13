<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Individualform;
use App\ApplicationForm;
use App\CardReadyMessage;
use \App\Events\ApplicationOpenedEvent;
use \App\Events\CloseApplicationEvent;
use App\Services\ApplicationAccess;
use App\Services\AttachmentStorage;
use App\Services\IdentityVerification;

class MobileAppController extends Controller
{
    public function login(Request $r){
        $user=\App\User::where('email',$r->input('email'))->first();
        if($user){
            if($user->active == 0){
                abort(403);
            }
        }
        if(\Auth::attempt(['email'=>$r->input('email'),'password'=>$r->input('password')])){

            /*
                    \DB::table('individualforms')->where('opened_by_user_id',\Auth::user()->id)->where('opened',true)->update([
                        'opened'=>false,
                        'opened_by'=>'',
                        'opened_by_user_id'=>0
                    ]);
                
            */

            
        
            if(\Auth::user() && \Auth::user()->role !='admin' && \Auth::user()->isIpAllowed(\App\Log::ip($r) )== false){
                return response([
                    'errors'=>['شما نمیتوانید از این آیپی داخل سیستم شوید!']
                ],403);
            }    
            return [
                'status'=>'ok',
                'user_details'=>[
                    'id'=>\Auth::user()->id,
                    'name'=>\Auth::user()->name,
                    'role'=>\Auth::user()->role,
                    'center_id'=>\Auth::user()->center_id,
                    'role_dari'=>\Auth::user()->roleInDari
                ],
                'token'=>\Auth::user()->createToken('mobile')->accessToken
            ];
        }
        return response(['status'=>'error','errors'=>['یک مشکل رخ داد. لطفاً دوباره کوشش نماید']],403);
    }

    public function isLoggedIn(Request $r){
        if( $r->user() ){
            return ['status'=>'ok'];
        }
      
    }

    public function getFamilyApplication(Request $r){
        $app = ApplicationAccess::find($r->input('reference_no'), true);
        ApplicationAccess::read($r->user(), $app);
        return $app->familyMembers()->get();
    }

    public function changePassword(Request $r){
        try{
            $validatedData = $r->validate([
                'password' => 'required|min:7',
            ]);
        }catch(\Exception $e){
         
                return response(['status'=>'error','errors'=>[
                    'پاسورد شما باید حد اقل ۷ حرف باشد'
                ]],422);
            
        }
       

      
        $newPassword =bcrypt( $r->input('password') );
        $u = $r->user();
        $u->password = $newPassword;
        $u->save();
        return ['status'=>'ok'];
    }

    public function getCenters(Request $r){
        if($r->user() && $r->user()->role == 'center_manager'){
            $centers = \App\Center::where('id','>',13)->where('id','<',89);
        }else{
            $centers = new \App\Center;
        }
        if($r->input('type') == 'name'){
            $centers=$centers->select('id','name');
        }

        
        
        return ['centers'=>$centers->get(),'statusList'=>\App\Individualform::getStatusLabels()];
    }

    public function getIndividualApplicationDetails(Request $r){
        $application = ApplicationAccess::find($r->input('reference_no'));
        ApplicationAccess::read($r->user(), $application);
       
        if(false ){
            return response([
                'errors'=>['تاریخ ملاقات در آینده است']
            ]);
        }
        
        if(!$application){
            return response([
                'errors'=>['درخواستی پیدا نشد!']
            ]);
        }
      
       

        return [
            'attachments'=>[],
            'actions'=>$application->getActions(),
            'application'=>$application,
            'queue_no'=>$application->getQueueNo(),
            'total_applicants'=>$application->totalApplicants(),
            'members'=>$application->familyMembers()->get(),
            'processes'=>$application->events()->get()
        ];

    }

    public function moveApplicationToNextStep(Request $r){
        $r->validate(['type' => 'required|in:individual', 'reference_no' => 'required|string', 'status' => 'required|integer']);
        return \DB::transaction(function () use ($r) {
            $application = Individualform::where('reference_no', $r->input('reference_no'))->lockForUpdate()->first();
            if (!$application) {
                ApplicationAccess::fail('فورم پیدا نشد.', 404);
            }
            ApplicationAccess::read($r->user(), $application);
            if (!ApplicationAccess::canTransition($r->user(), $application, $r->input('status'))) {
                ApplicationAccess::fail('شما صلاحیت انتقال این فورم به مرحلهٔ انتخاب‌شده را ندارید.');
            }
            $application->moveToNextStep((int) $r->input('status'));
            return ['status' => 'ok'];
        });
    }

    public function applicationOpened(Request $r){
        $application = ApplicationAccess::find($r->input('reference_no'));
        ApplicationAccess::read($r->user(), $application);
        event( new ApplicationOpenedEvent($r->user(),$application));
        return ['status' => 'ok'];
    }

    public function applicationClosed(Request $r){
        $application = ApplicationAccess::find($r->input('reference_no'));
        ApplicationAccess::read($r->user(), $application);
        event( new \App\Events\CloseApplicationEvent($r->user(),$application));
        return ['status' => 'ok'];
    }

    public function getDashboard(Request $r){
        
        if( $r->user() && ($r->user()->role == 'admin' || $r->user()->role == 'center_manager') ){
            $centers = \App\Center::query();
            if($r->user()->role =='center_manager'){
                $centers->where('id', '>', 13)->where('id', '<', 89);
            }
            return \App\Center::reportsFor($centers->get(['id', 'name']))->all();
        }else if($r->user() && $r->user()->role == 'team_leader') {
            return \App\Center::reportsFor(\App\Center::where('id', $r->user()->center_id)->get(['id', 'name']));
        }
    }

    public function getAttachments(Request $r){
        $application = ApplicationAccess::find($r->input('reference_no'));
        ApplicationAccess::read($r->user(), $application);
    
        if(!$application){
            return response([
                'errors'=>['درخواستی پیدا نشد!']
            ]);
        }

      
        return $application->attachmentsToBase64();
    }

    public function updateVerificationReference(Request $r){
        $r->validate(['reference_no' => 'required|string',
            'verification_type' => 'required|in:system,system2,phone,archive',
            'verification_reference_no' => 'required|max:128']);
        if (!is_scalar($r->input('verification_reference_no')) || is_bool($r->input('verification_reference_no'))) {
            ApplicationAccess::fail('شمارهٔ تثبیت هویت درست نیست.', 422);
        }
        return \DB::transaction(function () use ($r) {
            $i = Individualform::where('reference_no', $r->input('reference_no'))->lockForUpdate()->first();
            if (!$i) {
                ApplicationAccess::fail('فورم پیدا نشد.', 404);
            }
            ApplicationAccess::read($r->user(), $i);
            if (!ApplicationAccess::canVerify($r->user(), $i)) {
                ApplicationAccess::fail('شما صلاحیت تثبیت هویت این فورم را ندارید.');
            }
            $verificationReferenceNo = (string) $r->input('verification_reference_no');
            if ($r->input('verification_type') === 'system' && !app(IdentityVerification::class)->validate($i, $verificationReferenceNo)) {
                ApplicationAccess::fail('شمارهٔ تثبیت هویت معتبر نیست.', 422);
            }
            if ($r->input('verification_type') === 'system2') {
                $record = \App\Verification::where('record_id', $verificationReferenceNo)->where('reference_no', $i->reference_no)->exists();
                if (!$record) {
                    ApplicationAccess::fail('ریکارد تثبیت به این درخواست‌کننده مربوط نیست.', 422);
                }
                $verificationReferenceNo = 'S'.$verificationReferenceNo;
            }
            $i->verification_reference_no = $verificationReferenceNo;
            $i->moveToNextStep(4);
            $i->updateTracking('شماره ثبت: '.$verificationReferenceNo);
            return ['status' => 'ok'];
        });
    }

    public function moveFamilyForm(Request $r){
        $status = $r->input('status') ;
        abort(404);
       if($status== 4){
    
       }
        $application = Individualform::where('reference_no',$r->input('reference_no'))->first();
        if($status == 13){
            if($application->canCancel() == false){
                return ['status'=>'error','message'=>'Can not cancel!'];
            }
        }
        if(!$application){
           return response(['errors'=>['این فارم پیدا نشد!']],404);
        }
        if(\Auth::user()->role !='admin' && \Auth::user()->canAccessApplication($application->status) == false){
            return response([
                'errors'=>[
                    'شما حالت این درخواستی را نمیتوانید تغیر دهید!'
                ]
            ]);
        }
        $application->moveFamilyFormToNextStep($status);
        $application = Individualform::where('reference_no',$r->input('reference_no'))->first();
      
        return [
            'status'=>'ok'
        ];
    }

    public function moveToVipCenter(Request $r){
        $applicationExists=  \App\Individualform::where('family_form_reference_no',$r->input('family_form_reference_no'))->first();        
        if($r->user()->role !='team_leader'){
            return response(['status'=>'error','message'=>'You do not have access!'],403);
        }
        $newCenter=\App\Center::where('id',$r->user()->center_id)->first();
        $newCenterName = $newCenter->name;
        $oldCenter = $applicationExists->center()->first();
        $oldCenterName = $applicationExists->centerName();
        $today = \Hijri::now()->format('Y-m-d');
        if($applicationExists){
            if( \App\Individualform::where('family_form_reference_no',$r->input('family_form_reference_no'))->update(['center_id'=>$r->user()->center_id]) ){
                $applications = \App\Individualform::where('family_form_reference_no',$r->input('family_form_reference_no'))->get();
                $application = \App\Individualform::where('family_form_reference_no',$r->input('family_form_reference_no'))->first();
                $appointment = $application->appointment()->first();
                $isCenterChanged=false;
                foreach($applications as $application):
                    if($oldCenter->id !=$newCenter->id){
                        $isCenterChanged=true;
                        $application->events()->create([
                            'user_id'=>$r->user()->id,
                            'reference_no'=> $application->reference_no,
                            'description'=> "انتقال از مرکز $oldCenterName به مرکز $newCenterName"
                        ]);
                      
                    }
                    if($appointment->appointment_date != $today){
                            $application->events()->create([
                            'user_id'=>$r->user()->id,
                            'reference_no'=> $application->reference_no,
                            'description'=>' تغیر تاریخ ملاقات از '. $appointment->appointment_date." به ".\Hijri::now()->format('Y-m-d')
                        ]);
                    }
                endforeach;
                $appointment->center_id=$r->user()->center_id;
                if($appointment->appointment_date !=$today){
                   $appointment->setNewDate($today);
                }
                $appointment->save();
                if($isCenterChanged){
                    \App\Individualform::where('family_form_reference_no',$application->family_form_reference_no)->update(['center_id'=>$r->user()->center_id]);
                    $application->changeCenterInIvp();
                }
                return ['status'=>'ok'];
            }

        }

        return response(['status'=>'error'],404);
    }

    public function handleVerificationHook(\App\Http\Requests\VerificationRequest $r){
        
        $form = \App\Individualform::where('reference_no',$r->input('reference_no'))->first();
        $status=$r->input('status');
        
        if(!$form){
            return response([
                'message'=>'application not found!'
            ],404);
        }
        if(!$form->isSendToIvp){
            \App\Log::record('Ivp_cancel_response',$r->all());
            return response([
                'message'=>'This application is cancelled and the system is trying to send the updated version!'
            ],403);
        }
        if(in_array($form->status,[1,2])){
            return response([
                'message'=>'This application is already processed!'
            ],403);
        }
        if($form->status==13){
            \App\Log::record('already_cancelled',['family_form_reference_no'=>$form->family_form_reference_no]);
            return response([
                'message'=>'This application is cancelled and the system is trying to send the updated version!'
            ],403);
        }
        $ivpResponse                =   new \App\Ivpresponse;
        $ivpResponse->reference_no  =   $r->input('reference_no');
        $ivpResponse->user_id       =   $r->user()->id;
        $ivpResponse->old_status    =   $form->status;
        $ivpResponse->response      =   json_encode($r->all());
     
       if($status == 'verified'){
           $form->status = 4;
           $ivpResponse->new_status    = 4;
           $form->verification_reference_no = $r->input('ivp_reference_no');
           $form->updateTracking(" تثبیت هویت شد ".$r->input('username',''));

       }else if($status == 'not_verified'){
           $form->status = 5;
           $ivpResponse->new_status    = 5;
           $form->updateTracking('تثبیت هویت نشد! '.$r->input('username',''));
       }
       else if($status == 'guarantor-needed'){
            $form->status = 14;
            $ivpResponse->new_status    = 14;
            $form->updateTracking('ضرورت به تضمین کننده'.$r->input('username',''));
       }
       $ivpResponse->save();
       if($form->save()){
            if($r->input('note')){
                $note            = new \App\Note;
                $note->type      = 'individualform';
                $note->note      = $r->input('note');
                $note->user_id   = $r->user()->id;
                $note->username   = $r->input('username');
                $note->reference_no = $form->reference_no;
                $note->save();
         }
          \App\Log::record('updateStatus',$r->all());
           return ['message'=>'Updated'];
       }

    }

    public function downloadFile(Request $r){
        $path = $r->input('path');
        AttachmentStorage::authorizePath($r->user(), $path);
        $time = \Carbon\Carbon::now()->format('H');
          if($time  > 7  && $time < 18){
                 // abort(404);
          }
        $disk = strpos($path, 'applications/') === 0 ? \Storage::disk(config('pdf.disk')) : AttachmentStorage::disk();
        if (!$disk->exists($path)) {
            ApplicationAccess::fail('فایل پیدا نشد.', 404);
        }
        return $disk->download($path);
    }

    public function getApplications(Request $r){
        $individualforms = \DB::table('familyapplications')->where('apply_for_new_id','بلی')
            ->where('relationship_with_head_of_family',1)
            ->select('name','surname','father_name','father_surname','grand_father_name','center_id','family_form_reference_no','status','reference_no','opened','opened_by','queue_no','appointment_date');
        $allowedStatus  = $r->user()->getApplicationAccessStatus();
        if($r->user()->role !='admin'){
            $individualforms    =   $individualforms->where('center_id',$r->user()->center_id);
            $individualforms    =   $individualforms->whereIn('status',$allowedStatus);
        }else{
            $individualforms = $individualforms->where('center_id',$r->input('center_id'));
        }
        $searchQuery=$r->input('q');
        if($searchQuery){
            $individualforms=$individualforms->where(function($query) use ($searchQuery){ 
                $query->orWhere('family_form_reference_no',$searchQuery); 
                $query->orWhere('reference_no',$searchQuery); 
                $query->orWhere('name','like','%'.$searchQuery."%");
                $query->orWhere('surname','like','%'.$searchQuery."%");
                $query->orWhere('grand_father_name','like','%'.$searchQuery."%");
                $query->orWhere('father_name','like','%'.$searchQuery."%");
            });
        }
        if($r->input('status',false)!==false){
            $individualforms=$individualforms->where('status',$r->input('status'));
        }
     
        return [
            'applications'=>$individualforms->take(50)->orderBy('created_at')->get()->map(function($i){
                $i=(Array) $i;
                $i['statusDescription']=\App\Individualform::getStatusDescription($i['status']);
                return $i;
            }),
            'total_applications'=>$individualforms->count(),
            
        ];
    }

    public function getStatusList(){
       return \App\Individualform::getStatusLabels();
    }

    public function isValidApplication(Request $r){
        $app = \App\Individualform::where('reference_no',$r->input('reference_no'))
        ->where('apply_for_new_id','بلی')->first();
       
        if(!$app){
            return response()->json([
                'message'=>'Application not found',
                'code'=>404
            ],404);
        }
        ApplicationAccess::read($r->user(), $app);
        if($app->status  == 4){
            return response()->json([
                'message'=>'This application is already verified!',
                'code'=>400
            ],400);
        }

        return response()->json(
            ['code'=>200,'message'=>'Application found']
        ,200);
    }

    public function uploadNidImages(\App\Http\Requests\UploadNidCardsRequest $r){
        $disk = null;
        $paths = [];
        try {
            $disk = \Storage::disk('s3');
            $write = function ($directory, $encoded) use ($disk, &$paths) {
                $path = $directory.'/'.bin2hex(random_bytes(16)).'.jpg';
                $paths[] = $path;
                if (!$disk->put($path, base64_decode($encoded))) {
                    throw new \RuntimeException('NID image storage failed.');
                }
                // put() returns success/failure; metadata needs the object path.
                return $path;
            };
            \DB::transaction(function () use ($r, $write) {
                $signature = new \App\Nidsignature;
                $signature->signature_path = $write('nidsignatures', $r->input('signature.sign'));
                $signature->photo_path = $write('nidsignatures', $r->input('signature.photo'));
                $signature->user_id = $r->user()->id;
                $signature->save();

                foreach ($r->input('images') as $image) {
                    $record = new \App\Nidpicture;
                    $record->record_id = $image['record_id'];
                    $record->file_path = $write('nidpics', $image['file']);
                    $record->nid_number = '';
                    $record->user_id = $r->user()->id;
                    $record->signature_id = $signature->id;
                    $record->status = 0;
                    $record->save();
                }
            });
        } catch (\Throwable $error) {
            if ($disk && $paths) {
                try {
                    $disk->delete($paths);
                } catch (\Throwable $cleanupError) {
                    \App\Log::record('NidImageCleanupFailed', ['error_code'=>'storage_cleanup']);
                }
            }
            \App\Log::record('NidImageUploadFailed', ['error_code'=>'upload_failed']);
            ApplicationAccess::fail('ذخیرهٔ تصاویر تذکره موفق نشد؛ دوباره کوشش نمایید.', 503);
        }
        return ['message'=>'ok'];
    }

    public function getNidNumber(Request $r){
        //Status 0 NOT Processed but RECORD FOUND
        //Status 1 Processed but RECORD FOUND
        //Status 2 Processed
        $records = \App\Nidpicture::where('record_id', $r->input('record_id'));
        // OCR records belong to their uploader, not to an application/center.
        // Keep the existing administrator/auditor oversight permission.
        if (!$r->user()->isAdmin() && $r->user()->role !== 'audit') {
            $records->where('user_id', $r->user()->id);
        }
        $record = $records->first();
        
        if(!$record){
            return response(['status'=>'RECORD NUMBER NOT FOUND'],404);
        }
        if($record->status==0){
            return response(['status'=>0]);
         }
        if($record->status==1){
           return response(['status'=>1]);
        }

        return ['nid_number'=>$record->nid_number];
    }

    public function resetApplication(Request $r){
        $user = $r->user();
        if(!$user){
            abort(403);
        }
        if( !in_array($user->role, ['team_leader','document_checker']) ){
            abort(404);
        }
        $application = \App\Individualform::where('center_id',$user->center_id)->where('family_form_reference_no',$r->input('family_form_reference_no'))->first();
        if(!$application){
            abort(404);
        }
        if($application->canReset() == false){
            abort(404);
        }
        
            \App\Individualform::where('family_form_reference_no',$application->family_form_reference_no)->update(['status'=>0]);
            if($application->shouldExtend()==false){
                $token =\App\Individualform::getIvpToken();
                \App\Individualform::cancelFamilyApplicationInIvpById($token,'INC',$application->family_form_reference_no);
                sleep(8);
                \App\IvpQueue::addToQueue($application->family_form_reference_no);
            }else{
                \App\IvpQueue::addToQueue($application->family_form_reference_no,1);
            }
      
            
            $members = \App\Individualform::where('family_form_reference_no',$application->family_form_reference_no)->get();
            foreach($members as $m){
                \App\Event::createEvent($m->reference_no,'ارسال دوباره به تثبیت هویت',$user->id);
            }
           
        
        return ['status'=>'ok'];
        
    }

    public function downloadTazkiraFiles(Request $r){
        $r->validate(['reference_no' => 'required|string|max:512']);
        $reference_no = str_replace(" ","+",$r->input('reference_no'));
        $reference_no = openssl_decrypt($reference_no,"AES-256-CBC",hex2bin("F14C5084838D392658AF41DC51640469CF11A78B9D6D30B15C781175712C3FD8"),0,hex2bin("16E7D298531DFDFD6C3DAD932DDC59F2"));
        
        $individualform = \App\Individualform::where('reference_no',$reference_no)->first();
        if(!$individualform){
            return response(['message'=>'Application not found!'],404);
        }
        ApplicationAccess::read($r->user(), $individualform);

        return $individualform->paperIdFilesToPdf();
    }

    public function downloadPhoto(Request $r){
        $r->validate(['reference_no' => 'required|string|max:512']);
        $reference_no = str_replace(" ","+",$r->input('reference_no'));
        $reference_no = openssl_decrypt($reference_no,"AES-256-CBC",hex2bin("F14C5084838D392658AF41DC51640469CF11A78B9D6D30B15C781175712C3FD8"),0,hex2bin("16E7D298531DFDFD6C3DAD932DDC59F2"));
        
        $individualform = \App\Individualform::where('reference_no',$reference_no)->first();
        if(!$individualform){
            return response(['message'=>'Application not found!'],404);
        }
        ApplicationAccess::read($r->user(), $individualform);

        return $individualform->downloadPhoto();
    }

}
