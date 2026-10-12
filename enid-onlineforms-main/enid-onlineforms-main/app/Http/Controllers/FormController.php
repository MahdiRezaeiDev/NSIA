<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\IndividualFormRequest;
use App\Http\Requests\SaveFormRequest;
use App\Http\Requests\UploadFileRequest;
use App\Familyform;
use \PDF;
use App\Village;
use iio\libmergepdf\Merger;
use App\Individualform;
use App\Appointment;
use Mpdf\Output\Destination;
use App\Services\ApplicationAccess;
use App\Services\AttachmentStorage;


class FormController extends Controller
{
    /*
    * Validatation for form submission
    */
    public function validateSteps( IndividualFormRequest $r ){
        return ['status'=>'ok'];
    }

    /*
    * Saving forms 
    */
    public function saveForm(SaveFormRequest $r){
      //  \App\Log::write($r);
        if($r->input('application_id')){
            $form = \App\Savedform::where('application_id',$r->input('application_id'))->first();
            
            if(!$form){
               
                return response([
                    'errors'=>[
                        'درخواستی پیدا نشد!!'
                    ]
                ],404);
            }
        }else{
            $form = new \App\Savedform;
            $form->setApplicationId();
        }

        $form->dob_day      = $r->input('dob_day','');
        $form->dob_month    = $r->input('dob_month','');
        $form->dob_year     = $r->input('dob_year','');
        $form->data         = $r->input('data','');
        $form->save();

        return ['application_id'=>$form->application_id];
    }
    
    public function submitIndividualForm(IndividualFormRequest $r){ 
        
       try{
            if(Familyform::hasAtLeastOneApplication($r) == false){
                return response([
                    'status'=>'error',
                    'errors'=>[
                        
                            'at_least_one_application'=> ['حد اقل باید یک عضو فامیل برای تذکره جدید درخواست نماید.']
                        ]
                ],403);
            }
        
            if (\App\Captcha::isRobot($r->input('token'), 'new_id')) {
                return response(['status' => 'error', 'errors' => ['invalid_captcha' => ['کاپچهٔ امنیتی معتبر نیست.']]], 403);
            }
        
     
            $forms = Individualform::saveForm($r);

            if( isset($forms['status']) && $forms['status'] =='error'){
                return response($forms,403);
            }
            $forms['status']='ok';
           
            return $forms;
        }
       catch(\Illuminate\Http\Exceptions\HttpResponseException $e){
            throw $e;
       }
       catch(\Exception $e){
            \App\Log::record('SubmissionFailed', ['error_code' => $e->getCode()]);
            return response(['status'=>'error','errors'=>[
                'یک مشکل رخ داد لطفا دوباره کوشش نمایید'
            ]],403);
       }
    }

    public function printIndividualForm(Request $r){
       // \App\Log::write($r);
        
        $application= Individualform::where('family_form_reference_no',$r->input('reference_no'))->first();
        $individualForm = Individualform::where('reference_no',$r->input('reference_no'))->first();
        if($individualForm){
            $application = $individualForm;
        }
        if( !$application){
            abort(404);
        }
        if ($r->user()) {
            ApplicationAccess::read($r->user(), $application);
        }
        if(\Auth::user() && \Auth::user()->isAdmin() && $r->input('individual_reference_no',false)){
            $application = $application->applied()->where('individualforms.reference_no',$r->input('individual_reference_no'))->first();
            if (!$application) {
                abort(404);
            }
            return $application->generatePdf();
        }else{
            if(!\Auth::user()){
              
                if(!\App\Captcha::verifyCode($r->input('token'),'printing:'.$application->family_form_reference_no)){
                   
                   try{
                       abort(404,'FORM NOT FOUND');
                   }catch(\Exception $e){
                       return view('request_expired');
                       
                   }
                   
                }
            }
         
            $application = \App\IndividualForm::applied()->where('family_form_reference_no',$r->input('reference_no'))->first();
            if (!$application) {
                abort(404);
            }
            return $application->generateAllPdfs(true);
            
        }

      
    }

    public function track(Request $r){
      
       // \App\Log::write($r);
        if( \App\Captcha::isRobot($r->input('token'),'tracking') ){
            return response([
                'status'=>'error',
                'ip'=>\App\Log::ip($r),
                'errors'=>[
                    [ 'invalid_captcha'=> ['لطفا کاپچه امنیتی را درست انتخاب نمایید.'] ]
                ]
            ],403);
        }
        $application = Individualform::where('reference_no',$r->input('tracking_no'))->first();
        $familyForm  = Individualform::where('family_form_reference_no',$r->input('tracking_no'))->first();
        if($familyForm){
            $application = $familyForm;
        }
        if(!$application){
            return response([
                'message'=>'درخواستی پیدا نشد!'
            ],404);
        }
       $code      = \App\Captcha::generateCode('printing:'.$application->family_form_reference_no,$r->ip());
       $printLink = config('app.url')."/print-individual-form?reference_no=".$application->family_form_reference_no."&token=".$code;
       $events=$application->events()->get()->map(function($a){
        if( strpos($a->description,'تثبیت')!==false ){
             $shodLocation = strpos($a->description,'شد');
             $spaceLocationAfterShod = strpos($a->description,' ',$shodLocation);
             $a->description = substr($a->description,0,$spaceLocationAfterShod);
            
             return $a;
        }
        return $a;
        });
       // $sendToIvp = \App\IvpQueue::where('family_form_reference_no',$application->family_form_reference_no)->where('is_sent',true)->first();
       $sendToIvp=false; 
       if($sendToIvp){
            $events = $events->push(collect(
                ['reference_no'=>$application->reference_no,'description'=>'ارسال به مرکز ملی تثبیت هویت','date'=>\Hijri::fromCarbon($application->updated_at)->format('d/m/Y')]
            ));
        }
       return ['events'=>$events,'printLink'=>$printLink];
    }

    public function searchVillages(Request $r){
        $query = $r->input('query', '');
        // Some supplied datasets contain only province/district reference rows.
        if (!\Schema::hasColumn('villages', 'village')) {
            return [];
        }
        $data=\DB::table('villages')->where('village','like','%'.$query."%")->take(10)->get();
        return $data;
    }

    public function searchDistricts(Request $r){
        $cacheName = 'searchDistricts'.$r->input('province');
        $districts = \Cache::remember($cacheName,57200,function() use ($r){
         $data=\DB::table('villages')->where('province',$r->input('province'))->distinct()->get(['district'])->pluck(['district']);
         $districts = $data->toArray();
         array_unshift($districts,"");
         return $districts;
        });
       

         return $districts;
         
     }
     public function searchProvinces(Request $r){
         $cacheName = 'searchProvinces'.$r->input('province');
         $data = \Cache::remember($cacheName,57200,function() use ($r){
              $data=\DB::table('villages')->distinct()->get(['province'])->pluck(['province'])->toArray();
               array_unshift($data,"");
               return $data;
         });
     
         return $data;

     }

     public function getDistricts(){
         return \App\Village::get();
     }

     public function searchCenters(Request $r){
        $fieldName = strtolower($r->input('field'));
        $allowedFields=['province','town','village','name','country','id'];
        if( in_array($fieldName,$allowedFields) == false){
            return ['Not allowed!'];
        }
        $data=\DB::table('centers')->distinct();
        if($r->input('field') == 'id'){
            $center = \App\Center::select('id','name','village','town','province','country')->where('centers.status',1)->where('id',$r->input('id'))->first();
            $countries = \App\Village::getCountries();
            if($center){
                $center = $center->toArray();
                foreach($countries as $c):
                    if($center['country'] == $c->id){
                        $center['country'] = $c->id;
                        $center['country_name'] = $c->text;
                    }
            
                endforeach;
            }
            return $center;
        }
        if($r->input('field') == 'province'){
       
            $result=\App\Center::selectRaw("province")->where('centers.status',1)->where('country',$r->input('country'));
            if($r->input('province') && $r->input('province') !='unknown'){
              $result=$result->where('province',$r->input('province'));
            }
            $provinces=$result->orderBy('province')->distinct('province')->get()->map(function($p){
                return ['text'=>$p->province,'id'=>$p->province];
            });
            $provinces = $provinces->toArray();
            array_unshift($provinces,['text'=>'','id'=>'']);
            return $provinces;
        }
        if($r->input('field') == 'name'){
       
            $result=\App\Center::selectRaw("name as text,id,province,enable_appointments")->where('centers.status',1)->where('province',$r->input('province'));
    
            return $result->orderBy('name')->get();
        }
     
        if($r->input('field') == 'country'){
            $result=\App\Center::selectRaw("country");
            
            return $result->distinct('country')->where('centers.status',1)->get()->map(function($c){
                $countries = \App\Village::getCountries();
              
                foreach($countries as $country):
                   
                    if($c->country == $country->id){
                        return ['text'=>$country->text,'id'=>$c->country];
                    }
                endforeach;
             
            });
        }
        $data=$data->get([$fieldName])->pluck(['province']);
        return $data;

    }

public function findApplication(Request $r){
    if (!$r->user() && \App\Captcha::isRobot($r->input('token'), 'find_application')) {
        return response(['status' => 'error', 'errors' => ['invalid_captcha' => ['کاپچهٔ امنیتی معتبر نیست.']]], 403);
    }
    $submittedForm = \App\Individualform::where('family_form_reference_no',$r->input('reference_no'))->first();
    if($submittedForm){
        if ($r->user()) {
            ApplicationAccess::read($r->user(), $submittedForm);
        }
        return $submittedForm->toSavedForm();
    }

    $form = \App\Savedform::where('application_id',$r->input('reference_no'))->first();
    if($form){
        $form = $form->toArray();
        $form['is_new'] = true;
        return $form;
    }

    return response(['result' => 'not found'], 404);
}

     public function getApplication(Request $r){
         $application_type  = $r->input('type');
         $application_id    = $r->input('reference_no');
         
     }

     public function searchApplication(Request $r){
        if( \App\Log::ip($r) !='180.94.83.50' ){            
            return [
                'errors'=>[
                    'این آی پی در لست مراکز موجود نیست'
                ]
            ];
        }
       
        if($r->input('type') == 'individual'){
            $application=\App\Individualform::where('reference_no',$r->input('reference_no') )->first();
            if(!$application){
                abort(404);
            }
            if( $application->isAppointmentInTheFuture() ){
                abort(404);
            }
            if(!in_array($application->status,[1,2]) ){
                abort(404);
            }
            $application->moveToNextStep(2);
            return $application;
        }else{
            $application=\App\Individualform::where('family_form_reference_no',$r->input('reference_no') )->first();
            if(!$application){
                abort(404);
            }
            if( $application->isAppointmentInTheFuture() ){
                abort(404);
            }
        }
        $members = $application->familyMembers()->orderBy('relationship_with_head_of_family')->get();
        $headOfFamily=null;
        foreach($members as $k=>$member):
                if( $member->isHeadOfFamily() ){
                    $headOfFamily = $member;
                }
        endforeach;
        $headOfFamily = Individualform::nullToString($headOfFamily);
        $members = $members->map(function($m){
            return Individualform::nullToString($m);
        });
        
        return [
            'members'=>$members,
            'head_of_family'=>$headOfFamily
        ];
        
     }


     public function previewIndividualForm(Request $r){
       // \App\Log::write($r);
        abort(404);
        $savedForm= \App\Savedform::where('application_id',$r->input('reference_no'))->first();
        if( !isset($savedForm->data['members'])){
            abort(404);
        }else{
            $center_id = isset($savedForm->data['center_id']) ? $savedForm->data['center_id'] : '';
            $members= $savedForm->data['members'];
        
        }
       
        $application = new \App\Individualform;
        $forms = $application->formatData($members ,$center_id);
        $applications = collect();
        foreach($forms as $f):
            $application = new \App\Individualform;
            $application->fill($f);
            $applications->push($application);
        endforeach;
        $mpdf = new \App\Pdf;
    
        $familyFormHtml = view('public_views.print_family_form',[
            'form'=>$application,
            'members'=>$applications,
            'loadCss'=>true
            ])->render();
        $mpdf->WriteHTML($familyFormHtml);
        
    
        foreach($applications as $i):
            if($i->apply_for_new_id == 'بلی'){
            $mpdf->addPage('P');
        
            $individualHTML = view('public_views.print_individual_form',[
                'review'=>$i,
                'loadCss'=>true
                ])->render();
         
            $mpdf->WriteHTML($individualHTML);

            $sampleHTML = view('public_views.id_sample',[
                'review'=>$i,
                'loadCss'=>true
                ])->render();
            $mpdf->addPage('P');
            $mpdf->WriteHTML($sampleHTML);
            
            }

        endforeach;


        return $mpdf->output();
    }

    public function uploadFile(UploadFileRequest $r){
        $applicationId=$r->input('application_id');
        $file = $r->file('file');
        if (!$file || !$file->isValid()) {
            ApplicationAccess::fail('فایل معتبر را انتخاب نمایید.', 422);
        }
        $fileExtension = \File::extension($file->getClientOriginalName());
        if($fileExtension ==""){
          
            $fileExtension = $this->getFileExtensionFromMimeType($file);
        }
        if(is_null($file)){
            $data = [
                'all'=>$r->all(),
                'allFiles'=>$r->allFiles()
            ];
            \App\RequestLogger::email('FILE WITH NULL',$data);
            abort(404);
        }
        $fileName=uniqid().".".$fileExtension;
        try{
            abort(404);
            $fileContents = \App\Attachment::resize($file);
        }catch(\Exception $e){
            $fileContents = $file->get();
        }
        $path   ='uploads/'.$fileName;
        if(config('attachments.disk') === 'local'){
            AttachmentStorage::disk()->put($path,$fileContents);
            return 
            [
                'filePath'=>$path
            ];
        }
        if( AttachmentStorage::disk()->put($path,$fileContents) ){
            return 
                [
                    'filePath'=>$path
                ];
        }else{
            $fileContents = $file->get();
            \App\Log::record('SavingWithoutResize',['path'=>$path]);
            if( AttachmentStorage::disk()->put($path,$fileContents) ){
                return 
                [
                    'filePath'=>$path
                ];
            }else{
                \App\Log::record('UploadFailedSecondTry',['path'=>$path]);
                abort(422);
            }
        }
        \App\Log::record('UploadFailed',['path'=>$path]);
        abort(422);
    }


    public function getEvents(Request $r)
    {
        if (!in_array($r->user()->role, ['team_leader', 'admin', 'center_manager', 'audit'], true)) {
            ApplicationAccess::fail('شما صلاحیت دریافت این راپور را ندارید.');
        }
        list($start, $end) = \App\Services\ApplicationReports::dates($r, 'start', 'end');
        $r->validate(['status' => 'required|integer|in:0,1,2,3,4,5,6,13,14,15', 'user_id' => 'nullable|integer']);
        $description = Individualform::getStatusDescription($r->input('status'));
        $query = \DB::query()->fromSub(\App\Services\ApplicationReports::events(), 'centeractivities')
            ->where('created_at', '>=', $start->startOfDay())->where('created_at', '<=', $end->endOfDay())
            ->where(function ($query) use ($description) {
                $query->where('description', 'like', '%'.$description.'%');
                if ($description === 'هویت تثبیت شد') {
                    $query->orWhere('description', 'like', '%تثبیت هویت شد%');
                }
                if ($description === 'بعد از تحقیقات بیشتر هویت تثبیت نشد') {
                    $query->orWhere('description', 'like', '%تثبیت هویت نشد%');
                }
            });
        if ($r->input('user_id')) {
            $query->where('user_id', $r->input('user_id'));
        }
        return $query->get()->map(function ($e) {
            return ['date' => \Hijri::fromCarbon(\Carbon\Carbon::parse($e->created_at))->format('d/m/Y'),
                'description' => $e->description, 'reference_no' => $e->reference_no, 'username' => $e->username];
        });
    }

    private function getFileExtensionFromMimeType($file){
        $mimeType   =   $file->getMimeType();
        if($mimeType == 'image/jpeg'){
            return 'jpg';
        }
        if($mimeType == 'image/jpg'){
            return 'jpg';
        }
        if($mimeType == 'image/png'){
            return 'png';
        }
        if($mimeType == 'application/pdf'){
            return 'pdf';
        }
    }

    public function testCancel(Request $r){
        $app = \App\Individualform::where('status',13)->where('family_form_reference_no',$r->input('family_form_reference_no'))->first();
        if(!$app){
            return 'NOT FOUND';
        }

        return $app->toSavedForm();
    }
} 
