<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use \Hijri;
use App\ApplicationFormInterface;
use App\ActionButton;
use App\Village;
use App\HijriMonth;
use Imagick;
use App\Pdf;
use Mpdf\Output\Destination;
use iio\libmergepdf\Merger;
use App\ApplicationForm;
use Guzzle\Http\Exception\RequestException;
class Individualform extends Model implements ApplicationFormInterface
{
  
    protected $appends=[
        'applied_on',
        'statusDescription',
        'relationship',
        'born_overseas',
        'education_level_code',
        'is_educated_rm',
        'gender_name',
        'place_of_birth',
        'religion_code',
        'blood_group_code',
        'religion_sector_code',
        'has_id',
        'photo',
        'mother_tongue_name',
        'first_gurantor_dob',
        'first_gurantor_id_issue_date',
        'second_gurantor_dob',
        'second_gurantor_id_issue_date',
        'ethnicity_name',
        'first_gurantor_id_issue_place',
        'second_gurantor_id_issue_place',
        'original_residence','current_residence','kochi_spring_residence','kochi_winter_residence','gender_english'
    ];
    protected $fillable=[
            'name',
            'surname',
            'reference_no',
            'queue_no',
            'family_form_reference_no',
            'english_surname',
            'english_name',
            'father_name',
            'dob',
            'voting_place',
            'center_id',
            'attachments',
            'living_status',
            'local_languages_knowledge',
            'foreign_languages_knowledge',
            'occupation',
            'father_surname',
            'grand_father_name',
            'grand_father_surname',
            'mother_name',
            'mother_husband_name',
            'partner_name',
            'birth_country',
            'birth_province',
            'birth_district',
            'birthday_day',
            'birthday_month',
            'birthday_year',
            'military_service',
            'is_educated',
            'education_level',
            'original_residence_village',
            'original_residence_district',
            'original_residence_district_code',
            'original_residence_province',
            'current_residence_village',
            'current_residence_district',
            'current_residence_district_code',
            'current_residence_province',
            'current_residence_country',
            'military_entry_date_day',
            'military_entry_date_month',
            'military_entry_date_year',
            'military_exit_date_day',
            'military_exit_date_month',
            'military_exit_date_year',
            'military_certificate_no',
            'military_unit',
            'foreign_language_knowledge',
            'local_language_knowledge',
            'primary_contact_no',
            'secondary_contact_no',
            'email_address',
            'mother_tongue',
            'marital_status',
            'blood_group',
            'disability_type',
            'is_kochi',
            'ethnicity',
            'religion',
            'religion_sector',
            'gender',
            'has_second_citizenship',
            'kochi_spring_residence_village',
            'kochi_spring_residence_district',
            'kochi_spring_residence_district_code',
            'kochi_spring_residence_province',
            'kochi_winter_residence_village',
            'kochi_winter_residence_district',
            'kochi_winter_residence_district_code',
            'kochi_winter_residence_province',
            'identification_type',
            'paper_id_year',
            'paper_id_volume',
            'paper_id_page',
            'paper_id_registration',
            'paper_id_sokok',
            'digital_id_number',
            'paper_id_copy',
            'id_issue_province',
            'id_issue_district',
            'id_issue_district_code',
            'id_issue_date_day',
            'id_issue_date_month',
            'id_issue_date_year',
            'apply_new_id',
            'first_gurantor_name',
            'first_gurantor_surname',
            'first_gurantor_father_name',
            'first_gurantor_father_surname',
            'first_gurantor_identity_type',
            'first_gurantor_paper_id_year',
            'first_gurantor_paper_id_volume',
            'first_gurantor_paper_id_page',
            'first_gurantor_paper_id_registration',
            'first_gurantor_paper_id_sokok',
            'first_gurantor_digital_id',
            'first_gurantor_id_issue_province',
            'first_gurantor_id_issue_district',
            'first_gurantor_id_issue_district_code',
            'first_gurantor_id_issue_date_day',
            'first_gurantor_id_issue_date_month',
            'first_gurantor_id_issue_date_year',
            'first_gurantor_dob_day',
            'first_gurantor_dob_month',
            'first_gurantor_dob_year',
            'first_gurantor_contact_no',
            'first_gurantor_gender',
            'second_gurantor_name',
            'second_gurantor_surname',
            'second_gurantor_father_name',
            'second_gurantor_father_surname',
            'second_gurantor_identity_type',
            'second_gurantor_paper_id_year',
            'second_gurantor_paper_id_volume',
            'second_gurantor_paper_id_page',
            'second_gurantor_paper_id_registration',
            'second_gurantor_paper_id_sokok',
            'second_gurantor_digital_id',
            'second_gurantor_id_issue_province',
            'second_gurantor_id_issue_district',
            'second_gurantor_id_issue_district_code',
            'second_gurantor_id_issue_date_day',
            'second_gurantor_id_issue_date_month',
            'second_gurantor_id_issue_date_year',
            'second_gurantor_dob_day',
            'second_gurantor_dob_month',
            'second_gurantor_dob_year',
            'second_gurantor_gender',
            'second_gurantor_contact_no',
            'relationship_with_head_of_family',
            'apply_for_new_id'
            

    ];

    protected $casts=[
        'attachments'=>'array'
    ];
    

    public static function generateReferenceNo($number,$count){
        return $number.$count;
    }
    public static function random($limit=7){
        $code = '';
        for($i = 0; $i < $limit; $i++) { 
            $code .= mt_rand(0, 9); 
        }
            $code   = str_split($code,4);
            $code   = implode("",$code);
            if(Individualform::where('reference_no',$code)->exists()){
                return Individualform::generateReferenceNo();
            }
          
            return $code;
    }
    public function events(){
        return $this->hasMany(\App\Event::class,'reference_no','reference_no')->orderBy('created_at','desc');
    }

    public function getAppliedOnAttribute(){
        if(!is_null($this->created_at)){
            return \Hijri::fromCarbon($this->created_at)->format('d/m/Y');
        }

        return '';
       
    }


    public static function saveForm($request)
    {
        return \DB::transaction(function () use ($request) {
            $reference = $request->input('application_id');
            $draft = \App\Savedform::where('application_id', $reference)->lockForUpdate()->first();
            $existing = static::where('family_form_reference_no', $reference)->lockForUpdate()->get();
            if (!$draft && $existing->isEmpty()) {
                \App\Services\ApplicationAccess::fail('ابتدا پیش‌نویس فورم را ذخیره نمایید.', 422);
            }
            if ($existing->contains(function ($form) { return (int) $form->status !== 13; })) {
                return ['status' => 'error', 'errors' => ['appointment' => ['این فورم قبلاً ارسال گردیده است.']]];
            }
            // Serialize appointments at a center, including queue allocation and capacity checks.
            $center = \App\Center::where('id', $request->input('center_id'))->lockForUpdate()->first();
            if (!$center) {
                \App\Services\ApplicationAccess::fail('مرکز انتخاب‌شده پیدا نشد.', 422);
            }
            $appointment = Appointment::where('family_form_reference_no', $reference)->lockForUpdate()->first();
            $originalSlot = $appointment ? [$appointment->center_id, $appointment->appointment_date, $appointment->start_time, $appointment->end_time] : null;
            if (!$appointment) {
                $appointment = new Appointment;
                $appointment->family_form_reference_no = $reference;
            }
            $appointment->center_id = $center->id;
            if ($request->input('selectedAppointmentTime.appointment_date')) {
                $appointment->appointment_date = $request->input('selectedAppointmentTime.appointment_date');
                $appointment->start_time = $request->input('selectedAppointmentTime.start', '0000');
                $appointment->end_time = $request->input('selectedAppointmentTime.end', '0000');
            } elseif (!$center->enable_appointments) {
                $appointment->appointment_date = \Hijri::now()->format('Y-m-d');
                $appointment->start_time = '0000';
                $appointment->end_time = '0000';
            } elseif (!$appointment->exists || (int) $originalSlot[0] !== (int) $center->id) {
                \App\Services\ApplicationAccess::fail('تاریخ و وقت ملاقات را انتخاب نمایید.', 422);
            }
            $newSlot = [$appointment->center_id, $appointment->appointment_date, $appointment->start_time, $appointment->end_time];
            if ($originalSlot != $newSlot) {
                if ($center->enable_appointments && !$appointment->isAvailable()) {
                    return ['status' => 'error', 'errors' => ['appointment' => ['وقت انتخاب‌شده پر شده است؛ وقت دیگری انتخاب نمایید.']]];
                }
                $appointment->queue_no = $appointment->getCurrentQueueNo();
            }
            $appointment->save();
            $oldReferences = $existing->pluck('reference_no')->all();
            foreach ($existing as $old) {
                \DB::table('cancelledforms')->insert($old->getAttributes());
            }
            if ($existing->isNotEmpty()) {
                static::where('family_form_reference_no', $reference)->delete();
            }
            $forms = static::formatData($request->input('members'), $center->id);
            $references = [];
            $count = 1;
            foreach ($forms as $form) {
                if (!isset($form['reference_no']) || !in_array($form['reference_no'], $oldReferences, true)) {
                    do {
                        $form['reference_no'] = static::generateReferenceNo($reference, $count++);
                    } while (static::where('reference_no', $form['reference_no'])->exists());
                }
                $form['family_form_reference_no'] = $reference;
                $saved = static::create($form);
                $saved->markAsReceived();
                if ($form['apply_for_new_id'] === 'بلی') {
                    $references[] = ['name' => $form['name'], 'reference_no' => $form['reference_no']];
                }
            }
            $code = \App\Captcha::generateCode('printing:'.$reference);
            \App\Log::recordSubmission($reference, \App\Log::ip($request));
            return ['reference_no' => $reference, 'applications' => $references,
                'appointment_date_time' => $appointment->getDateTime(),
                'appointment_address' => $appointment->address(),
                'path' => config('app.url').'/print-individual-form?reference_no='.$reference.'&token='.$code];
        });
    }
    public function markAsReceived(){
        $this->updateTracking( 'فارم رسید' );
    }
    public function getStatusDescriptionAttribute(){
        return Individualform::getStatusDescription($this->status);
    }

    public static function getStatusDescription($code){
       
        switch($code){
            case 0:
                $description= 'درخواستی های جدید';
                break;
            case 1:
                $description= 'چک شد';
                break;
            case 2:
                $description= 'فورم ثبت شد';
                break;
            case 3:
                $description= 'هویت تثبیت نشد';
                break;
            case 4:
                $description= 'هویت تثبیت شد';
                break;

            case 5:
                    $description= 'بعد از تحقیقات بیشتر هویت تثبیت نشد';
                    break;
            case 6:
                    $description= 'توزیع شد';
                    break;
            case 13:
                $description= 'لغوه شده';
                break;
            case 14:
                    $description= 'ضرورت به تضمین کننده';
                    break;
            case 15:
                $description= 'تکراری';
                break;
            default:
                $description="نامعلوم";
        }
        
        return $description;
    }

    public static function formatMemberData($data,$center_id){
        $data['birth_country']  = isset($data['birth_place']['country']) ? $data['birth_place']['country'] : '';
        $data['birth_province']     = isset($data['birth_place']['province']) ? $data['birth_place']['province'] : '';
        $data['birth_district']     = isset($data['birth_place']['district']) ? $data['birth_place']['district'] : '';
        $data['birth_village']  = isset($data['birth_place']['village']) ? $data['birth_place']['village'] : '';
       // dd($data);
        $data['current_residence_village'] =  $data['current_residence']['village'];
        $data['current_residence_district'] = $data['current_residence']['district'];
        $data['current_residence_district_code']     = Village::getDistrictCode($data['current_residence']['province'],$data['current_residence']['district']);
        $data['current_residence_province'] = $data['current_residence']['province'];
        $data['current_residence_country'] = $data['current_residence']['country'];

        $data['original_residence_village'] =  $data['original_residence']['village'];
        $data['original_residence_district'] = $data['original_residence']['district'];
        $data['original_residence_province'] = $data['original_residence']['province'];
        $data['original_residence_district_code'] = Village::getDistrictCode($data['original_residence_province'],$data['original_residence']['district']);
        $data['kochi_spring_residence_village'] =  $data['kochi_spring_residence']['village'];
        $data['kochi_spring_residence_district'] = $data['kochi_spring_residence']['district'];
        $data['kochi_spring_residence_province'] = $data['kochi_spring_residence']['province'];
        $data['kochi_spring_residence_district_code'] = Village::getDistrictCode($data['kochi_spring_residence_province'],$data['kochi_spring_residence']['district']);
        

        $data['kochi_winter_residence_village']     =  $data['kochi_winter_residence']['village'];
        $data['local_language_knowledge']           =  is_array($data['local_language_knowledge']) ? json_encode($data['local_language_knowledge']) : $data['local_language_knowledge'];
        $data['foreign_language_knowledge']         =  is_array($data['foreign_language_knowledge']) ? json_encode($data['foreign_language_knowledge']) :$data['foreign_language_knowledge'];
        $data['kochi_winter_residence_district'] = $data['kochi_winter_residence']['district'];
        $data['kochi_winter_residence_province'] = $data['kochi_winter_residence']['province'];
        $data['kochi_winter_residence_district_code'] = Village::getDistrictCode($data['kochi_winter_residence_province'],$data['kochi_winter_residence']['district']);
        
        if(isset($data['first_gurantor_id_issue_place'])){
            $data['first_gurantor_id_issue_province'] = $data['first_gurantor_id_issue_place']['province'];
            $data['first_gurantor_id_issue_district'] = $data['first_gurantor_id_issue_place']['district'];
            $data['first_gurantor_id_issue_district_code'] = Village::getDistrictCode($data['first_gurantor_id_issue_province'],$data['first_gurantor_id_issue_place']['district']);

            $data['second_gurantor_id_issue_province'] = $data['second_gurantor_id_issue_place']['province'];
            $data['second_gurantor_id_issue_district'] = $data['second_gurantor_id_issue_place']['district'];
            $data['second_gurantor_id_issue_district_code'] = Village::getDistrictCode($data['second_gurantor_id_issue_province'],$data['second_gurantor_id_issue_place']['district']);
        }
        
        
   
        if(isset($data['ethnicity']) && is_array($data['ethnicity'])){
            $data['ethnicity']="";
        }
       
        if(isset($data['id_issue_place'])){
            $data['id_issue_province'] = $data['id_issue_place']['province'];
            $data['id_issue_district'] = $data['id_issue_place']['district'];
            $data['id_issue_district_code'] = Village::getDistrictCode($data['id_issue_province'],$data['id_issue_place']['district']);
            
        }
        $data['center_id']= $center_id;
        $data['attachments']=Individualform::formatAttachments($data);
        unset($data['first_gurantor_id_issue']);
        unset($data['second_gurantor_id_issue']);
        unset($data['kochi_winter_residence']);
        unset($data['kochi_spring_residence']);
        unset($data['original_residence']);
        unset($data['current_residence']);
        unset($data['dob']);
        unset($data['contact_numbers']);
        unset($data['gurantor1']);
        unset($data['gurantor2']);
        unset($data['first_gurantor_id_dob']);
        unset($data['first_gurantor_id_issue_date']);
        unset($data['first_gurantor_id_issue_place']);
        unset($data['first_gurantor_paper_id']);
        unset($data['paper_id']);
        unset($data['place_of_birth']);
        unset($data['primary']);
        unset($data['secondary']);
        unset($data['second_citizenship']);
        unset($data['second_gurantor_dob']);
        unset($data['second_gurantor_id_issue_date']);
        unset($data['second_gurantor_id_issue_place']);
        unset($data['second_gurantor_paper_id']);
        unset($data['id_issue_date']);
        unset($data['id_issue_place']);
        return $data;
    }
    public function getActions($code=null){
      
        if(is_null($code)){
            $code = $this->status;
        }
        $actions = collect();
        
        if(\Auth::user() && \Auth::user()->canAccessApplication($code) == false){
            return $actions;
        }

        switch($code){
            case 0:
                if(\Auth::user()->role == 'id_verifier'){
                    $actions = collect();
                    $actionButton =  new ActionButton();
                    $actionButton->setLabel('هویت تثبت شد');
                    $actionButton->setWebClass('btn btn-success');
                    $actionButton->setMobileClass('secondary');
                    $actionButton->setWebOnClick('/moveApplicationToNextStep?status=4&type=individual&reference_no='.$this->reference_no);
                    $actionButton->setMobileOnClick('secondary');
                    $actions->push($actionButton);
                    $actionButton =  new ActionButton();
                    $actionButton->setLabel('ارسال به مرکز تثبیت هویت مرکزی');
                    $actionButton->setWebClass('btn btn-warning');
                    $actionButton->setMobileClass('secondary');
                    $actionButton->setWebOnClick('/moveApplicationToNextStep?status=3&type=individual&reference_no='.$this->reference_no);
                    $actionButton->setMobileOnClick('secondary');
                    $actions->push($actionButton);
                }
                
              
            break;
            case 2:
                /*
                if(\Auth::user()->role == 'id_verifier'){
                    $actions = collect();
                    $actionButton =  new ActionButton();
                    $actionButton->setLabel('هویت تثبت شد');
                    $actionButton->setWebClass('btn btn-success');
                    $actionButton->setMobileClass('secondary');
                    $actionButton->setWebOnClick('/moveApplicationToNextStep?status=4&type=individual&reference_no='.$this->reference_no);
                    $actionButton->setMobileOnClick('secondary');
                    $actions->push($actionButton);
                    $actionButton =  new ActionButton();
                    $actionButton->setLabel('هویت تثبت نشد');
                    $actionButton->setWebClass('btn btn-warning');
                    $actionButton->setMobileClass('secondary');
                    $actionButton->setWebOnClick('/moveApplicationToNextStep?status=3&type=individual&reference_no='.$this->reference_no);
                    $actionButton->setMobileOnClick('secondary');
                    $actions->push($actionButton);
                }
                */
             
            break;
            case 4:
                $rolesAllowed=['document_checker','team_leader'];
                if(\Auth::user() && in_array(\Auth::user()->role,$rolesAllowed) ){
                    $actions=collect();
                    $actionButton =  new ActionButton();
                    $actionButton->setLabel('درخواست چک شد');
                    $actionButton->setWebClass('btn btn-secondary');
                    $actionButton->setMobileClass('secondary');
                    $actionButton->setWebOnClick('/moveApplicationToNextStep?status=1&type=individual&reference_no='.$this->reference_no);
                    $actionButton->setMobileOnClick('secondary');
                    $actions->push($actionButton);
        
                }
            break;
            case 5:
                $rolesAllowed=['team_leader'];
                if(\Auth::user() && in_array(\Auth::user()->role,$rolesAllowed) && \Auth::user()->canVerify()){
                    $actions=collect();
                    $actionButton =  new ActionButton();
                    $actionButton->setLabel('تثبیت هویت شد');
                    $actionButton->setWebClass('btn btn-secondary');
                    $actionButton->setMobileClass('secondary');
                    $actionButton->setWebOnClick('/moveApplicationToNextStep?status=4&type=individual&reference_no='.$this->reference_no);
                    $actionButton->setMobileOnClick('secondary');
                    $actions->push($actionButton);
        
                }
            break;
            default:
            
        }
        $allowedToCancel = ['id_verifier','document_checker','team_leader'];
        if($this->status !=13  && \Auth::user() && in_array(\Auth::user()->role,$allowedToCancel) ){
            if($this->canCancel()){
                $actionButton =  new ActionButton();
                $actionButton->setLabel('لغوه انفرادی');
                $actionButton->setWebClass('btn btn-danger');
                $actionButton->setMobileClass('danger');
                $actionButton->setWebOnClick('/moveApplicationToNextStep?status=13&type=individual&reference_no='.$this->reference_no);
                $actionButton->setMobileOnClick('secondary');
                $actions->push($actionButton);
          
            }
            if($this->canReset()){
                $actionButton =  new ActionButton();
                $actionButton->setLabel('ارسال دوباره درخواستی فامیلی به تثبیت هویت');
                $actionButton->setWebClass('btn btn-success');
                $actionButton->setMobileClass('danger');
                $actionButton->setWebOnClick('/resetApplication?family_form_reference_no='.$this->family_form_reference_no);
                $actionButton->setMobileOnClick('primary');
                $actions->push($actionButton);
            }
           
               
            

        }
        
        return $actions;
    }

    public function moveToNextStep($status=false){
            if($this->status == 6){
                return false;
            }
            if($this->status === 0){
                //k$this->center_id = \Auth::user()->center_id;    
                $this->status = $this->status + 1;
            }
           
            if($status === false){
                $this->status       = $this->status + 1;
            }else{
                $this->status = $status;
            }

            if($this->status == 3){
                $this->tried_ivp=0;
            }
            
           
            $this->save();
            return $this->updateTracking( $this->statusDescription );
        
        return false;
    }

    public function updateTracking($description){
        $lastEvent = $this->events()->first();
        if($lastEvent){
            $lastEvent->finished = \Carbon\Carbon::now();
            $lastEvent->minutes  = \Carbon\Carbon::now()->diffInMinutes($lastEvent->created_at);
            $lastEvent->save();
        }

        $user_id = \Auth::user() ? \Auth::user()->id : 0;

        return $this->events()->create([
            'user_id'=>     $user_id,
            'reference_no'=> $this->reference_no,
            'description'=> $description
        ]);

    }

    public static function applied(){
        return Individualform::where('apply_for_new_id','بلی');
    }
    public function hasApplied(){
        return $this->apply_for_new_id == 'بلی';
    }
    public static function getApplications()
{
    $status = \Auth::user()->getApplicationAccessStatus();

    // Ensure $status is always an array
    if (empty($status)) {
        // If no statuses, return empty query (no results)
        return Individualform::whereRaw('0 = 1');
    }

    $applications = Individualform::whereIn('status', (array) $status)
                                  ->where('apply_for_new_id', 'بلی');

    if (\Auth::user()->role != 'admin') {
        $applications = $applications->where('individualforms.center_id', \Auth::user()->center_id);
    }

    return $applications;
}


    public function getSmallBarcodeBase64(){

        $pdf = \SnappyImage::loadView('public_views.small_barcode',[
            'application'=>$this,
            ]);
      
        return base64_encode($pdf->output());
    }

    public static function formatData($forms,$center_id){
        $result=collect();
        foreach($forms as $data):
            $data   =   Individualform::formatMemberData($data,$center_id);
            if(isset($data['reference_no']) && strlen($data['reference_no']) > 3){
                $application = Individualform::where('reference_no',$data['reference_no'])->first();
                if($application && $application->status==13){
                    $result =   $result->push($data);
                }
            }else{
                $result =   $result->push($data);
            }
            
        endforeach;
  
       return $result->toArray();
    }
    
    public function familyForm(){
        return $this->belongsTo(\App\Familyform::class,'family_form_reference_no','reference_no');
    }
    public function getOriginalResidenceAttribute(){
        return [
            'village'=>$this->original_residence_village,
            'district'=>$this->original_residence_district,
            'district_code'=>$this->original_residence_district_code,
            'province'=>$this->original_residence_province
         
        ];
    }

    public function getCurrentResidenceAttribute(){
        return [
            'village'=>$this->current_residence_village,
            'district'=>$this->current_residence_district,
            'district_code'=>$this->current_residence_district_code,
            'province'=>$this->current_residence_province,
            'country_code'=>$this->current_residence_country
         
        ];
    }

    public function getFirstGurantorIdIssuePlaceAttribute(){
        return [
            'province'=>$this->first_gurantor_id_issue_province,
            'district'=>$this->first_gurantor_id_issue_district,
            'district_code'=>$this->first_gurantor_id_issue_district_code
        ];
    }

    public function getSecondGurantorIdIssuePlaceAttribute(){
        return [
            'province'=>$this->second_gurantor_id_issue_province,
            'district'=>$this->second_gurantor_id_issue_district,
            'district_code'=>$this->second_gurantor_id_issue_district_code
        ];
    }

    public function getKochiSpringResidenceAttribute(){
        return [
            'village'=>$this->kochi_spring_residence_village,
            'district'=>$this->kochi_spring_residence_district,
            'district_code'=>$this->kochi_spring_residence_district_code,
            'province'=>$this->kochi_spring_residence_province
         
        ];
    }
    public function getKochiWinterResidenceAttribute(){
        return [
            'village'=>$this->kochi_winter_residence_village,
            'district'=>$this->kochi_winter_residence_district,
            'district_code'=>$this->kochi_winter_residence_district_code,
            'province'=>$this->kochi_winter_residence_province
         
        ];
    }

    public function getMilitaryServiceAttribute($val){
        if($val){
            return "1";
        }
        return "0";
    }
    public function getIsEducatedAttribute($val){
        if($val){
            return "1";
        }
        return "0";
    }

    public static function getStatusLabels(){
        $processCount = 5;
        $start        = 0;
        $result       =collect();
        $user = \Auth::user();
        while($start <= $processCount){
            $process=[
                'step'=>$start+1,
                'status'=>$start,
                'description'=> Individualform::getStatusDescription($start),
                'color'=>Individualform::getColor($start)
            ];
            
            $process = (Object)$process;
            if($user->canAccessApplication($process->status)){
            $result->push($process);
            }

            $start ++ ;
        }
        $process=[
            'step'=>13,
            'status'=>13,
            'description'=> Individualform::getStatusDescription(13),
            'color'=>Individualform::getColor(13)
        ];

        $process = (Object)$process;
       
        if($user->canAccessApplication($process->status)){

            $result->push($process);
        }
    
        return $result;
        
    }


    public static function getColor($code){
        $code   = $code == 0 ? 1 : $code;
        $red    = $code * 5;
        $blue   = $code * 20;
        $green  = 255 - ($code * 10);
        if($code == 4 || $code == 5){
            return 'red';
        }
        return "rgb(".$red.",".$green.",".$blue.")";
    }

    public function villageToEnglish($fieldName,$fieldValue){
       
        $village = Village::where($fieldName,$fieldValue)->first();
        if(!$village){
            return $fieldValue;
        }

        return $village->{$fieldName."_english"};
    }

    public function getGenderEnglishAttribute(){
        if( $this->gender == '1' ){
            return 'MALE';
        }

        return 'FEMALE';
    }

    public function getGenderNameAttribute(){
        if( $this->gender == "1" ){
            return 'مذکر';
        }

        return 'مونث';
    }
    public function getGenderText(){
        if( $this->gender == "1" ){
            return 'نارینه / مرد';
        }

        return 'ښځینه / زن';
    }

    public function center(){
        return $this->belongsTo(\App\Center::class,'center_id');
    }
    /*
    public function getActionDescription( $status ){
        switch($status){
 
            case 0:
                $actions = [
                    [
                    'name'=>'درخواستی جمع آوری شد',
                    'action'=>'/moveApplicationToNextStep?type=individual&reference_no='.$this->reference_no
                    ]
                ];
                break;
            case 1:
                $actions = 
                [
                    [
                    'name'=>' اسناد چک شد. ارسال برای تایید هویت',
                    'action'=>'/moveApplicationToNextStep?type=individual&reference_no='.$this->reference_no
                    ]
                ];
             
                break;
            case 2:
                $actions = [
                    [
                    'name'=>'هویت تثبیت گردید',
                    'action'=>'/moveApplicationToNextStep?type=individual&reference_no='.$this->reference_no."&status=4"
                    ],
                    [
                        'name'=>'هویت تثبیت نشد',
                        'action'=>'/moveApplicationToNextStep?type=individual&reference_no='.$this->reference_no."&status=3"
                    ]
                ];
                break;
            case 3:
                $actions = [
                    [
                    'name'=>'هویت تثبیت گردید',
                    'action'=>'/moveApplicationToNextStep?type=individual&reference_no='.$this->reference_no."&status=4"
                    ],
                    [
                        'name'=>'هویت تثبیت نشد',
                        'action'=>'/moveApplicationToNextStep?type=individual&reference_no='.$this->reference_no."&status=5"
                    ]
                ];
                break;

            case 4:
                $actions = [
                    [
                    'name'=>'فورم فامیلی ثبت شد',
                    'action'=>'/moveApplicationToNextStep?type=individual&reference_no='.$this->reference_no."&status=6"
                    ]
                ];
             
                break;
            case 6:
                $actions = [
                    [
                    'name'=>'معلومات فارم صحیح است و کنترول شد',
                    'action'=>'/moveApplicationToNextStep?type=individual&reference_no='.$this->reference_no
                    ]
                ];
            
                break;
            case 7:
                $actions = [
                    [
                    'name'=>'فارم انفرادی ثبت و بایو مترکس اخذ شد',
                    'action'=>'/moveApplicationToNextStep?type=individual&reference_no='.$this->reference_no
                    ]
                ];
            break;

            case 8:
                $actions = [
                    [
                    'name'=>'کارت آماده است',
                    'action'=>'/moveApplicationToNextStep?type=individual&reference_no='.$this->reference_no
                    ]
                ];
                break;
            case 9:
                $actions = [
                    [
                    'name'=>'کارت فعال شد',
                    'action'=>'/moveApplicationToNextStep?type=individual&reference_no='.$this->reference_no
                    ]
                ];
                break;

            case 10:
            $actions = [
                [
                'name'=>'کارت توزیع گردید',
                'action'=>'/moveApplicationToNextStep?type=individual&reference_no='.$this->reference_no
                ]
            ];
            break;
        }
    
    }
    */
    public function centerName(){

            $center = $this->center()->first();
            if($center){
                return $center->name;
                //." ".$center->village." ".$center->town." ".$center->province;
            }
           
        
        return '';
    }

    public function familyMembers(){
        return $this->hasMany(\App\Individualform::class,'family_form_reference_no','family_form_reference_no');
    }

    public function getRelationshipDescription(){
        $relationships=[
            ["value"=>1,"label"=>"رئیس فامیل"],
            ["value"=>2,"label"=>"شوهر"],
            ["value"=>3,"label"=>"خانم"],
            ["value"=>4,"label"=>"پسر"],
            ["value"=>5,"label"=>"دختر"],
            ["value"=>6,"label"=>"پدر"],
            ["value"=>7,"label"=>"مادر"],
            ["value"=>8,"label"=>"برادر"],
            ["value"=>9,"label"=>"خواهر"],
            ["value"=>10,"label"=>'پدر کلان'],
            ["value"=>11,"label"=>'مادر کلان'],
            ["value"=>12,"label"=>'کاکا'],
            ["value"=>13,"label"=>'ماما'],
            ["value"=>14,"label"=>'عمه'],
            ["value"=>15,"label"=>'خاله'],
            ["value"=>16,"label"=>"نواسه-پسر"],
            ["value"=>17,"label"=>"نواسه-دختر"],
            ["value"=>16,"label"=>"نواسه پسر"],
            ["value"=>19,"label"=>"مادر ناسکه"],
            ["value"=>20,"label"=>"پسر ناسکه"],
            ["value"=>21,"label"=>"دختر ناسکه"],
            ["value"=>22,"label"=>"برادر ناسکه"],
            ["value"=>23,"label"=>"خواهر ناسکه"],
            ["value"=>24,"label"=>"برادر زاده-پسر"],
            ["value"=>25,"label"=>"برادر زاده-دختر"],
            ["value"=>26,"label"=>"عروس"],
            ["value"=>27,"label"=>"زن برادر"],
            ["value"=>25,"label"=>"برادر زاده-دختر"],
            ["value"=>28,"label"=>"خواهر زاده-پسر"],
            ["value"=>29,"label"=>"خواهر زاده-دختر"],
            ["value"=>30,"label"=>"داماد"],
            ["value"=>31,"label"=>"زن کاکا"],
            ["value"=>32,"label"=>"پسر کاکا"],
            ["value"=>33,"label"=>"دختر کاکا"],
            ["value"=>34,"label"=>"شوهر عمه"],
            ["value"=>35,"label"=>"پسر عمه"],
            ["value"=>36,"label"=>"دختر عمه"],
            ["value"=>37,"label"=>"شوهر خاله"],
            ["value"=>38,"label"=>"پسر خاله"],
            ["value"=>39,"label"=>"دختر خاله"],
            ["value"=>40,"label"=>"زن ماما"],
            ["value"=>41,"label"=>"پسر ماما"],
            ["value"=>42,"label"=>"دختر ماما"],
            ["value"=>43,"label"=>"شوهر خواهر"],
            ["value"=>44,"label"=>"جد"],
            ["value"=>45,"label"=>"جده"],
            ["value"=>46,"label"=>"کواسه-پسر"],
            ["value"=>47,"label"=>"کواسه-دختر"],
            ["value"=>48,"label"=>"امباق"],
            ["value"=>49,"label"=>"پدر شوهر"],
            ["value"=>50,"label"=>"پدر خانم"],
            ["value"=>51,"label"=>"مادر شوهر"],
            ["value"=>52,"label"=>"مادر خانم"],
            ["value"=>53,"label"=>"برادر شوهر"],
            ["value"=>54,"label"=>"خواهر شوهر"],
            ["value"=>55,"label"=>"برادر خانم"],
            ["value"=>56,"label"=>"خانم برادر شوهر"],
            ["value"=>57,"label"=>"خواهر خانم"],
           
        ];
        foreach($relationships as $r):
            if( $r['value'] == $this->relationship_with_head_of_family ){
                return $r['label'];
            }
        endforeach;

        return 'دیگر';
    }
   
    public static function getRelationshipLabel($relationship){
        $relationships=[
            ["value"=>1,"label"=>"رئیس فامیل"],
            ["value"=>2,"label"=>"شوهر"],
            ["value"=>3,"label"=>"خانم"],
            ["value"=>4,"label"=>"پسر"],
            ["value"=>5,"label"=>"دختر"],
            ["value"=>6,"label"=>"پدر"],
            ["value"=>7,"label"=>"مادر"],
            ["value"=>8,"label"=>"برادر"],
            ["value"=>9,"label"=>"خواهر"],
            ["value"=>10,"label"=>'پدر کلان'],
            ["value"=>11,"label"=>'مادر کلان'],
            ["value"=>12,"label"=>'کاکا'],
            ["value"=>13,"label"=>'ماما'],
            ["value"=>14,"label"=>'عمه'],
            ["value"=>15,"label"=>'خاله'],
            ["value"=>16,"label"=>"نواسه-پسر"],
            ["value"=>17,"label"=>"نواسه-دختر"],
            ["value"=>16,"label"=>"نواسه پسر"],
            ["value"=>19,"label"=>"مادر ناسکه"],
            ["value"=>20,"label"=>"پسر ناسکه"],
            ["value"=>21,"label"=>"دختر ناسکه"],
            ["value"=>22,"label"=>"برادر ناسکه"],
            ["value"=>23,"label"=>"خواهر ناسکه"],
            ["value"=>24,"label"=>"برادر زاده-پسر"],
            ["value"=>25,"label"=>"برادر زاده-دختر"],
            ["value"=>26,"label"=>"عروس"],
            ["value"=>27,"label"=>"زن برادر"],
            ["value"=>25,"label"=>"برادر زاده-دختر"],
            ["value"=>28,"label"=>"خواهر زاده-پسر"],
            ["value"=>29,"label"=>"خواهر زاده-دختر"],
            ["value"=>30,"label"=>"داماد"],
            ["value"=>31,"label"=>"زن کاکا"],
            ["value"=>32,"label"=>"پسر کاکا"],
            ["value"=>33,"label"=>"دختر کاکا"],
            ["value"=>34,"label"=>"شوهر عمه"],
            ["value"=>35,"label"=>"پسر عمه"],
            ["value"=>36,"label"=>"دختر عمه"],
            ["value"=>37,"label"=>"شوهر خاله"],
            ["value"=>38,"label"=>"پسر خاله"],
            ["value"=>39,"label"=>"دختر خاله"],
            ["value"=>40,"label"=>"زن ماما"],
            ["value"=>41,"label"=>"پسر ماما"],
            ["value"=>42,"label"=>"دختر ماما"],
            ["value"=>43,"label"=>"شوهر خواهر"],
            ["value"=>44,"label"=>"جد"],
            ["value"=>45,"label"=>"جده"],
            ["value"=>46,"label"=>"کواسه-پسر"],
            ["value"=>47,"label"=>"کواسه-دختر"],
            ["value"=>48,"label"=>"امباق"],
            ["value"=>49,"label"=>"پدر شوهر"],
            ["value"=>50,"label"=>"پدر خانم"],
            ["value"=>51,"label"=>"مادر شوهر"],
            ["value"=>52,"label"=>"مادر خانم"],
            ["value"=>53,"label"=>"برادر شوهر"],
            ["value"=>54,"label"=>"خواهر شوهر"],
            ["value"=>55,"label"=>"برادر خانم"],
            ["value"=>56,"label"=>"خانم برادر شوهر"],
            ["value"=>57,"label"=>"خواهر خانم"],
           
        ];
        foreach($relationships as $r):
            if( $r['value'] == $relationship ){
                return $r['label'];
            }
        endforeach;

        return 'دیگر';
    }

    public function getCountryName($id){
        $names = '[
            {"value":"1","label":"افغانستان"},
            {"value":"2","label":"البانیا"},
            {"value":"3","label":"الجزایر"},
            {"value":"4","label":"ساموآ "},
            {"value":"5","label":"اندورا"},
            {"value":"6","label":"انگولا"},
            {"value":"7","label":"انگویلا"},
            {"value":"8","label":"انترکتیکا"},
            {"value":"9","label":"ا. باربودا"},
            {"value":"10","label":"ارجنتاین"},
            {"value":"11","label":"ارمینیا"},
            {"value":"12","label":"اروبا"},
            {"value":"13","label":"استرلیا"},
            {"value":"14","label":"اتریش"},
            {"value":"15","label":"اذربایجان"},
            {"value":"16","label":"بهاماس"},
            {"value":"17","label":"بحرین"},
            {"value":"18","label":"بنگله دېش"},
            {"value":"19","label":"باربادوس"},
            {"value":"20","label":"بیلا روس"},
            {"value":"21","label":"بلجیم"},
            {"value":"22","label":"بیلیزی"},
            {"value":"23","label":"بنین"},
            {"value":"24","label":"برمودا"},
            {"value":"25","label":"بوتان"},
            {"value":"26","label":"بولیویا"},
            {"value":"27","label":"بونائیر"},
            {"value":"28","label":"بوسنیا"},
            {"value":"29","label":"بوتسوانا"},
            {"value":"30","label":"جزیره بوویت"},
            {"value":"31","label":"برازیل"},
            {"value":"32","label":"برونایی دی"},
            {"value":"33","label":"بلغاریا"},
            {"value":"34","label":"بورکینا فاسو"},
            {"value":"35","label":"بروندی"},
            {"value":"36","label":"کمبودیا"},
            {"value":"37","label":"کامرون"},
            {"value":"38","label":"کانادا"},
            {"value":"39","label":"کیپ وردي"},
            {"value":"40","label":"جزایر کیمن"},
            {"value":"41","label":"افریقا مرکزی"},
            {"value":"42","label":"چاد"},
            {"value":"43","label":"چیلی"},
            {"value":"44","label":"چین"},
            {"value":"45","label":"جزیره کریسمس"},
            {"value":"46","label":"جزایر کوکوس"},
            {"value":"47","label":"کولمبیا"},
            {"value":"48","label":"کوموروس"},
            {"value":"49","label":"کانگو"},
            {"value":"50","label":"ج کانگو"},
            {"value":"51","label":"جزیره کوکوس"},
            {"value":"52","label":"کاستا ریکا"},
            {"value":"53","label":"ساحل عاج"},
            {"value":"54","label":"کروشیا"},
            {"value":"55","label":"کیوبا"},
            {"value":"56","label":"کوراکاو"},
            {"value":"57","label":"قبرس"},
            {"value":"58","label":"جمهوریت چک"},
            {"value":"59","label":"دنمارک"},
            {"value":"60","label":"جیبوتي"},
            {"value":"61","label":"دومینیکا"},
            {"value":"62","label":"ج دومینکا"},
            {"value":"63","label":"ایکوادور"},
            {"value":"64","label":"مصر"},
            {"value":"65","label":"السلوادور"},
            {"value":"66","label":"گیننه استوایی"},
            {"value":"67","label":"ایریتریا"},
            {"value":"68","label":"استونیا"},
            {"value":"69","label":"ایتوپیا"},
            {"value":"70","label":"قالکلند آ."},
            {"value":"71","label":"جزایر فارو"},
            {"value":"72","label":"فیجي"},
            {"value":"73","label":"فنلند"},
            {"value":"74","label":"فرانسه"},
            {"value":"75","label":"گابون"},
            {"value":"76","label":"گامبیا"},
            {"value":"77","label":"گرجستان"},
            {"value":"78","label":"جرمني"},
            {"value":"79","label":"گانا"},
            {"value":"80","label":"جیبرالتور"},
            {"value":"81","label":"یونان"},
            {"value":"82","label":"گرینلند"},
            {"value":"83","label":"گرنادا"},
            {"value":"84","label":"گوادیلوپ"},
            {"value":"85","label":"گوام"},
            {"value":"86","label":"گواتیمالا"},
            {"value":"87","label":"گیورنسی"},
            {"value":"88","label":"گینه"},
            {"value":"89","label":"گینه-بیساو"},
            {"value":"90","label":"گیانا"},
            {"value":"91","label":"هایتی"},
            {"value":"92","label":"هادوراس"},
            {"value":"93","label":"هانکا نگ"},
            {"value":"94","label":"هنگري"},
            {"value":"95","label":"ایسلند"},
            {"value":"96","label":"هندوستان"},
            {"value":"97","label":"اندونیزیا"},
            {"value":"98","label":"ایران"},
            {"value":"99","label":"عراق"},
            {"value":"100","label":"ایرلند"},
            {"value":"101","label":"ایل اف من"},
            {"value":"102","label":"اسراییل"},
            {"value":"103","label":"ایتالیا"},
            {"value":"104","label":"جمایکا"},
            {"value":"105","label":"جاپان"},
            {"value":"106","label":"جرسي"},
            {"value":"107","label":"اردن"},
            {"value":"108","label":"قراقستان"},
            {"value":"109","label":"کینیا"},
            {"value":"110","label":"کیربوتی"},
            {"value":"111","label":"کوریا شمالی"},
            {"value":"112","label":"کوریا جنوبی"},
            {"value":"113","label":"کویت"},
            {"value":"114","label":"قرغزستان"},
            {"value":"115","label":"لاووس"},
            {"value":"116","label":"لاتویا"},
            {"value":"117","label":"لبنان"},
            {"value":"118","label":"لیسوتو"},
            {"value":"119","label":"لایبیریا"},
            {"value":"120","label":"لیبیا"},
            {"value":"121","label":"لیختینستاین"},
            {"value":"122","label":"لتوانیا"},
            {"value":"123","label":"لوگزابورک"},
            {"value":"124","label":"مکاو"},
            {"value":"125","label":"مقدونیه"},
            {"value":"126","label":"مدغاسکر"},
            {"value":"127","label":"مالاوی"},
            {"value":"128","label":"مالیزیا"},
            {"value":"129","label":"مالدیف"},
            {"value":"130","label":"مالی"},
            {"value":"131","label":"مالتا"},
            {"value":"132","label":"جزایر مارشال"},
            {"value":"133","label":"مارتینیک"},
            {"value":"134","label":"موریتانیا"},
            {"value":"135","label":"ماریشس"},
            {"value":"136","label":"مایوتی"},
            {"value":"137","label":"مکسیکو"},
            {"value":"138","label":"مایکرونیسیا"},
            {"value":"139","label":"ملداوی"},
            {"value":"140","label":"موناکو"},
            {"value":"141","label":"منگولیا"},
            {"value":"142","label":"مونتي نگرو"},
            {"value":"143","label":"مونت سرات"},
            {"value":"144","label":"مراکش"},
            {"value":"145","label":"موزمبیک"},
            {"value":"146","label":"میانمار"},
            {"value":"147","label":"نمیبیا"},
            {"value":"148","label":"ناورو"},
            {"value":"149","label":"نیپال"},
            {"value":"150","label":"هالند"},
            {"value":"151","label":"نیو کلیدونیا"},
            {"value":"152","label":"نیو زیلاند"},
            {"value":"153","label":"نیکاراگوا"},
            {"value":"154","label":"نیجر"},
            {"value":"155","label":"نایجیریا"},
            {"value":"156","label":"نییو"},
            {"value":"157","label":"جزیره نورفلک"},
            {"value":"158","label":"ناروی"},
            {"value":"159","label":"عمان"},
            {"value":"160","label":"پاکستان"},
            {"value":"161","label":"پالاو"},
            {"value":"162","label":"فلسطین"},
            {"value":"163","label":"پاناما"},
            {"value":"164","label":"پاپوانیوگینه"},
            {"value":"165","label":"پارگوای"},
            {"value":"166","label":"پیرو"},
            {"value":"167","label":"فلیپین"},
            {"value":"168","label":"پیکرآین"},
            {"value":"169","label":"پولند"},
            {"value":"170","label":"پرتگال"},
            {"value":"171","label":"پرتو ریکا"},
            {"value":"172","label":"قطر"},
            {"value":"173","label":"رییونین"},
            {"value":"174","label":"رومانیا"},
            {"value":"175","label":"روسیه"},
            {"value":"176","label":"رواندا"},
            {"value":"177","label":"ساموا"},
            {"value":"178","label":"سان مارینو"},
            {"value":"179","label":"ساو توما"},
            {"value":"180","label":"سعودی عربستان"},
            {"value":"181","label":"سنیگال"},
            {"value":"182","label":"سربیا"},
            {"value":"183","label":"سیشل"},
            {"value":"184","label":"سیرالیون"},
            {"value":"185","label":"سینگاپور"},
            {"value":"186","label":"سنت مارتین"},
            {"value":"187","label":"سلواکیا"},
            {"value":"188","label":"سلووینیا"},
            {"value":"189","label":"جزایر سلومن"},
            {"value":"190","label":"سومالیا"},
            {"value":"191","label":"افریقا جنوبی"},
            {"value":"192","label":"سودان جنوبی"},
            {"value":"193","label":"هسپانیه"},
            {"value":"194","label":"سریلانکا"},
            {"value":"195","label":"سودان"},
            {"value":"196","label":"سورینام"},
            {"value":"197","label":"سوازیلند"},
            {"value":"198","label":"سویدن"},
            {"value":"199","label":"سویس"},
            {"value":"200","label":"سوریه"},
            {"value":"201","label":"تایوان"},
            {"value":"202","label":"تاجکستان"},
            {"value":"203","label":"تانزانیا"},
            {"value":"204","label":"تایلند"},
            {"value":"205","label":"تیمور شرقی"},
            {"value":"206","label":"تاگو"},
            {"value":"207","label":"توکیلاو"},
            {"value":"208","label":"ټانگو"},
            {"value":"209","label":"تونس"},
            {"value":"210","label":"ترکیه"},
            {"value":"211","label":"ترکمنستان"},
            {"value":"212","label":"تووالو"},
            {"value":"213","label":"یوگندا"},
            {"value":"214","label":"اوکراین"},
            {"value":"215","label":"امارات متحده عربی"},
            {"value":"216","label":"بریتانیا"},
            {"value":"217","label":"امریکا"},
            {"value":"218","label":"یوروگوای"},
            {"value":"219","label":"ازبکستان"},
            {"value":"220","label":"وانیوتو"},
            {"value":"221","label":"ونزویلا"},
            {"value":"222","label":"ویتنام"},
            {"value":"223","label":"صحارأی غربی"},
            {"value":"224","label":"یمن"},
            {"value":"225","label":"زامبیا"},
            {"value":"226","label":"زیمبابوی"}
        ]';
        $names = json_decode($names);

        foreach($names as $n):
            if( $n->value == $id){
                return $n->label;
            }
        endforeach;

        return "";

    }


    public static function getLocalLanguageText($id){
        $langs='[ {
            "value": "1",
            "label": "پښتو"
        },
        {
            "value": "2",
            "label": "دری"
        },
        {
            "value": "3",
            "label": "اوزبیکی"
        },
        {
            "value": "4",
            "label": "ترکمنی"
        },
        {
            "value": "5",
            "label": "بلوچی"
        },
        {
            "value": "6",
            "label": "پشه‌ای"
        },
        {
            "value": "7",
            "label": "نورستانی"
        },
        {
            "value": "8",
            "label": "پامیری"
        },
        {
            "value": "9",
            "label": "اورمړي"
        },
        {
            "value": "10",
            "label": "پراچی"
        },
        {
            "value": "11",
            "label": "منجی"
        },
        {
            "value": "12",
            "label": "سنگلیچی-اشکاشمی"
        },
        {
            "value": "13",
            "label": "شغنی- روشانی"
        },
        {
            "value": "14",
            "label": "واخی"
        },
        {
            "value": "15",
            "label": "کاتی-باشگلی"
        },
        {
            "value": "16",
            "label": "وایگلی-تریگامی"
        },
        {
            "value": "17",
            "label": "اشکون-وامایی"
        },
        {
            "value": "18",
            "label": "پرسونی-واسی"
        },
        {
            "value": "19",
            "label": "گوریاتی"
        },
        {
            "value": "20",
            "label": "ننگلامی"
        },
        {
            "value": "21",
            "label": "وټه پوري-کتارکلایي"
        },
        {
            "value": "22",
            "label": "ساوی"
        },
        {
            "value": "23",
            "label": "تیراهی"
        },
        {
            "value": "24",
            "label": "هندکو"
        },
        {
            "value": "25",
            "label": "گوجری"
        },
        {
            "value": "26",
            "label": "پنجابی-اردو"
        },
        {
            "value": "27",
            "label": "سندهی"
        },
        {
            "value": "28",
            "label": "ملتانی"
        },
        {
            "value": "29",
            "label": "مغولی"
        },
        {
            "value": "30",
            "label": "قرغزی"
        },
        {
            "value": "31",
            "label": "قزاقی"
        },
        {
            "value": "32",
            "label": "افشاری"
        },
        {
            "value": "33",
            "label": "براهویی"
        },
        {
            "value": "34",
            "label": "عربی"
        }
        ]';
        $langs = json_decode($langs);
        foreach($langs as $l):
            if($l->value == $id){
                return $l->label;
            }
        endforeach;

        return '';

    }

    public static function getForeignLanguageText($id){
        $langs='[
            {"value":"1","label":"ابخازی"}, 
            {"value":"2","label":"افان (ارومو)"},
            {"value":"3","label":"افاري"}, 
            {"value":"4","label":"افریکنس"},
            {"value":"5","label":"البانیایي"},
            {"value":"6","label":"امهاري"}, 
            {"value":"7","label":"عربي"}, 
            {"value":"8","label":"ارمني"}, 
            {"value":"9","label":"اسامي"}, 
            {"value":"10","label":"اماراي"},
            {"value":"11","label":"آذرباجاني"},
            {"value":"12","label":"بشکري"}, 
            {"value":"13","label":"بسکوي"}, 
            {"value":"14","label":"بنګال، بنګلا"},
            {"value":"15","label":"بوتاني"},
            {"value":"16","label":"بهاري"}, 
            {"value":"17","label":"بسلامي"},
            {"value":"18","label":"برتوني"},
            {"value":"19","label":"بلغاریایي"},
            {"value":"20","label":"برماي"}, 
            {"value":"21","label":"بلاروسي"},
            {"value":"22","label":"کمبوداي"},
            {"value":"23","label":"کتالاني"},
            {"value":"24","label":"چنایي"}, 
            {"value":"25","label":"کورسي"}, 
            {"value":"26","label":"کروشاي"},
            {"value":"27","label":"چاکي"}, 
            {"value":"28","label":"دنمارکي"},
            {"value":"29","label":"هالندي"},
            {"value":"30","label":"انگلیسی"},
            {"value":"31","label":"اسپرانتویي"},
            {"value":"32","label":"استونیایي"},
            {"value":"33","label":"فاروسي"},
            {"value":"34","label":"فجي"}, 
            {"value":"35","label":"فنلندی"},
            {"value":"36","label":"فرانسوي"},
            {"value":"37","label":"فرسني"}, 
            {"value":"38","label":"ګالسني"},
            {"value":"39","label":"ګرجي"}, 
            {"value":"40","label":"جرمني"}, 
            {"value":"41","label":"یوناني"},
            {"value":"42","label":"ګرنلنډي"},
            {"value":"43","label":"ګواراني"},
            {"value":"44","label":"ګجراتي"},
            {"value":"45","label":"هاوساي"},
            {"value":"46","label":"عبراني"},
            {"value":"47","label":"هندي"}, 
            {"value":"48","label":"مجارستاني"},
            {"value":"49","label":"اسلندي"},
            {"value":"50","label":"اندونزاي"},
            {"value":"51","label":"انترلنګواي"},
            {"value":"52","label":"انترلنګوي"},
            {"value":"53","label":"انوکتتوتي"},
            {"value":"54","label":"انوپاکي"},
            {"value":"55","label":"ارلنډي"},
            {"value":"56","label":"ایټالوي"},
            {"value":"57","label":"جاپاني"},
            {"value":"58","label":"جاواي"}, 
            {"value":"59","label":"کاناډایي"},
            {"value":"60","label":"کشمري"}, 
            {"value":"61","label":"قزاقي"}, 
            {"value":"62","label":"کنارواندي"},
            {"value":"63","label":"قرغزي"}, 
            {"value":"64","label":"کوراي"}, 
            {"value":"65","label":"کردي"}, 
            {"value":"66","label":"کروندي"},
            {"value":"67","label":"لاوتني"},
            {"value":"68","label":"لاتني"}, 
            {"value":"69","label":"لاتون/ لتش"},
            {"value":"70","label":"لنګالاي"},
            {"value":"71","label":"لتواني"},
            {"value":"72","label":"مقدوناي"},
            {"value":"73","label":"مالاګاسي"},
            {"value":"74","label":"مالي"}, 
            {"value":"75","label":"مالزاي"},
            {"value":"76","label":"مالتي"}, 
            {"value":"77","label":"ماوري"}, 
            {"value":"78","label":"مراهتي"},
            {"value":"79","label":"ملدواني"},
            {"value":"80","label":"منګولاي"},
            {"value":"81","label":"ناوروي"},
            {"value":"82","label":"نپالي"}, 
            {"value":"83","label":"ناروجي"},
            {"value":"84","label":"اوککاتني"},
            {"value":"85","label":"اوراي"}, 
            {"value":"86","label":"پښتوي"}, 
            {"value":"87","label":"فارسي"}, 
            {"value":"88","label":"پولندي"},
            {"value":"89","label":"پرتګالي"},
            {"value":"90","label":"پنجابي"},
            {"value":"91","label":"کوچواي"},
            {"value":"92","label":"رهاتو-رومانسي"},
            {"value":"93","label":"روماناي"},
            {"value":"94","label":"روسي"}, 
            {"value":"95","label":"ساموني"},
            {"value":"96","label":"سانگوي"},
            {"value":"97","label":"سانسکریتي"},
            {"value":"98","label":"سکوتس گالي"},
            {"value":"99","label":"سرباي"}, 
            {"value":"100","label":"سربو-کرشاي"},
            {"value":"101","label":"سسوتوي"},
            {"value":"102","label":"ستسواناي"},
            {"value":"103","label":"شوناي"},
            {"value":"104","label":"سندي"}, 
            {"value":"105","label":"سنگالی"},
            {"value":"106","label":"سسواتي"},
            {"value":"107","label":"سلواکي"},
            {"value":"108","label":"سلوناي"},
            {"value":"109","label":"سومالي"},
            {"value":"110","label":"اسپاناي"},
            {"value":"111","label":"سوډاني"},
            {"value":"112","label":"سواحلي"},
            {"value":"113","label":"سودني"},
            {"value":"114","label":"تگلوگی"},
            {"value":"115","label":"تاجکي"},
            {"value":"116","label":"تاملي"},
            {"value":"117","label":"تاتاري"},
            {"value":"118","label":"تلوگوی"},
            {"value":"119","label":"تاي"}, 
            {"value":"120","label":"تبتي"}, 
            {"value":"121","label":"تگرنای"},
            {"value":"122","label":"تونگای"},
            {"value":"123","label":"تسونگای"},
            {"value":"124","label":"ترکي"}, 
            {"value":"125","label":"ترکمني"},
            {"value":"126","label":"توي"}, 
            {"value":"127","label":"تگوری"},
            {"value":"128","label":"اوکراني"},
            {"value":"129","label":"اردوي"},
            {"value":"130","label":"ازبکي"},
            {"value":"131","label":"وتنامي"},
            {"value":"132","label":"ولاپکي"},
            {"value":"133","label":"ولشي"}, 
            {"value":"134","label":"ولوفي"},
            {"value":"135","label":"اکسهوساي"},
            {"value":"136","label":"ادشي"}, 
            {"value":"137","label":"وروباي"},
            {"value":"138","label":"ژوانگي"},
            {"value":"139","label":"زولوي"}
            ]';
        $langs = json_decode($langs);
        foreach($langs as $l):
            if($l->value === $id){
                return $l->label;
            }
        endforeach;

        return '';

    }

    public static function formatLocalLanguages($langs){
        $result="";
   
        $langs = json_decode($langs);
        if($langs == null){
            return '';
        }
        if($langs=='"null"'){
            return '';
        }
        foreach($langs as $key=>$l):
            $result=  $result.Individualform::getLocalLanguageText($l);
            if(count($langs)-1 != $key){
                $result.=',';
            }
        endforeach;

        return $result;
    }
    public static function formatForeignLanguages($langs){
        $result="";
        $langs = json_decode($langs);
        if($langs == null){
            return '';
        }
        if($langs=='"null"'){
            return '';
        }
        foreach($langs as $key=>$l):
    
            $result=  $result.Individualform::getForeignLanguageText($l);
            if(count($langs)-1 != $key){
                $result.=',';
            }
        endforeach;
 
        return $result;
    }

    public static function getEthnicityText($id){
        $es='[   
            {
                "value": "1",
                "label": "پښتون"
            },
            {
                "value": "2",
                "label": "تاجک "
            },
            {
                "value": "3",
                "label": "هزاره"
            },
            {
                "value": "4",
                "label": "اوزبیک"
            },
            {
                "value": "5",
                "label": "ترکمن"
            },
            {
                "value": "6",
                "label": "بلوچ"
            },
            {
                "value": "7",
                "label": "پشه یی"
            },
            {
                "value": "8",
                "label": "ایماق"
            },
            {
                "value": "9",
                "label": "نورستاني"
            },
            {
                "value": "10",
                "label": "عرب"
            },
            {
                "value": "11",
                "label": "قرغیز"
            },
            {
                "value": "12",
                "label": "قزلباش"
            },
            {
                "value": "13",
                "label": "گوجر"
            },
            {
                "value": "14",
                "label": "براهوی"
            },
            {
                "value": "19",
                "label": "اهل هنود"
            },
            {
                "value": "23",
                "label": "سیکان"
            },
            {
                "value": "43",
                "label": "سادات"
            },
            {
                "value":"46",
                "label":"اورمړ"
            },
            {
                "value":"47",
                "label":"پراچی"
            },
            {
                "value":"48",
                "label":"کرد"
            },
            {
                "value":"49",
                "label":"جوگی"
            },
            {
                "value":"50",
                "label":"شاخیلان"
            },
            {
                "value":"51",
                "label":"شیخ محمدیان"
            },
            {
                "value":"52",
                "label":"گوار"
            },
            {
                "value":"53",
                "label":"خلیلی"
            },
            {
                "value":"54",
                "label":"پامیری"
            },
            {
                "value":"55",
                "label":"منجانی"
            },
            {
                "value":"56",
                "label":"سنگلیچی"
            },
            {
                "value":"57",
                "label":"اشکاشمی"
            },
            {
                "value":"58",
                "label":"روشنایی"
            },
            {
                "value":"59",
                "label":"واخانی"
            },
            {
                "value":"60",
                "label":"شغنانی"
            },
            {
                "value":"61",
                "label":"ترک"
            },
            {
                "value":"62",
                "label":"قرلق"
            },
            {
                "value":"63",
                "label":"تاتار"
            },
            {
                "value":"64",
                "label":"مغول"
            },
            {
                "value":"65",
                "label":"ساکایی"
            },
            {
                "value":"66",
                "label":"دولت خانی"
            },
            {
                "value":"67",
                "label":"تایمنی"
            },
            {
                "value":"68",
                "label":"ال بیگ"
            },
            {
                "value":"69",
                "label":"قزاق"
            },
            {
                "value":"70",
                "label":"سجانی"
            },
            {
                "value":"71",
                "label":"غزنویان"
            },
            {
                "value":"72",
                "label":"قوشخانیان"
            },
            {
                "value":"73",
                "label":"بیات"
            },
            {
                "value":"74",
                "label":"نیماق"
            },
            {
                "value":"75",
                "label":"قبچاق"
            },
            {
                "value":"76",
                "label":"نیکپی"
            },
            {
                "value":"77",
                "label":"کهگداری"
            },
            {
                "value":"78",
                "label":"دایمیرک"
            },
            {
                "value":"79",
                "label":"میرسیده"
            },
            {
                "value":"80",
                "label":"جمشیدیان"
            },
            {
                "value":"81",
                "label":"افشاریان"
            },
            {
                "value":"82",
                "label":"طاهریان"
            },
            {
                "value":"83",
                "label":"سلجوقی"
            },
            {
                "value":"84",
                "label":"تیموریان"
            },
            {
                "value":"85",
                "label":"برلاس-ارلات"
            },
            {
                "value":"86",
                "label":"ایلخانی"
            },
            {
                "value":"87",
                "label":"یفتلی"
            },
            {
                "value":"88",
                "label":"لقیان"
            },
            {
                "value":"89",
                "label":"کاوی"
            },
            {
                "value":"90",
                "label":"قوزی"
            },
            {
                "value":"91",
                "label":"ابکه"
            },
            {
                "value":"92",
                "label":"جغتایی"
            },
            {
                "value":"93",
                "label":"گره‌یی"
            },
            {
                "value":"94",
                "label":"کرم علی"
            },
            {
                "value":"95",
                "label":"شیخ علی"
            },
            {
                "value":"96",
                "label":"اورته بلاقی"
            },
            {
                "value":"97",
                "label":"اویغور"
            },
            {
                "value":"98",
                "label":"بابریان"
            },
            {
                "value":"99",
                "label":"فرملی"
            }
        ]';
        $es = json_decode($es);
        if($es == null){
            return '';
        }
        foreach($es as $key=>$l):
    
            if($l->value == $id){
                return $l->label;
            }
            
        endforeach;
 
        return '';
    }

    public static function saveBase64ToFile($data){
       if(!is_null($data) && $data!=""){
           $p1              = strpos($data,'base64,');
           $dataFormat      = substr($data,0,$p1);
           $base64Position = substr($data,$p1+7,strlen($data) );
           $fileName = (String)strtotime('now');
           $fileName = $fileName.rand(1,1000).Individualform::getFileFormat($dataFormat);
           \Storage::disk('local')->put( $fileName, base64_decode($base64Position) );
           
           return $fileName;
       }
       return '';
    }

    public static function getFileFormat($data){
        if(!is_array($data)){
            if( strpos($data,"jpeg") || strpos($data,"jpg") ){
                return '.jpg';
            }
            if( strpos($data,"png") ){
                return '.png';
            }
            if( strpos($data,"pdf") ){
                return '.pdf';
            }
        }
      
        return '';
    }

    public static function getFileEncoding($data){
        if( strpos($data,"jpeg") || strpos($data,"jpg") ){
            return 'data:image/jpeg;base64,';
        }
        if( strpos($data,"png") ){
            return 'data:image/png;base64,';
        }
       
        return 'data:image/jpeg;base64,';
    }

    public function paperIdToBase64(){
        if($this->isPaperIdAttached()){
            $file =  \Storage::disk('local')->read($this->paper_id_copy);
            $base64 = base64_encode($file);
            return Individualform::getFileEncoding($this->paper_id_copy).$base64;

        }
    }

    public function isPaperIdAttached(){
        return $this->paper_id_copy && strlen($this->paper_id_copy) > 5;
    }
    
    public function isHeadOfFamily(){
        return $this->relationship_with_head_of_family == "1";
    }

    public function getRelationshipAttribute(){
        return $this->getRelationshipDescription();
    }

    public static function nullToString($model){
        if($model!=null){
            $model = $model->toArray();
            foreach($model as $fieldName=>$value):
                if(is_array($value)){
                    foreach($value as $k=>$v){
                        if(is_null($v)){
                            $model[$fieldName][$k]="";
                        }
                    }
                }else if(is_null($value)){
                    $model[$fieldName]="";
                }
                else{

                }
            endforeach;
            return $model;
        }
        

        return null;

    }
    public function appointment(){
        return $this->hasOne(\App\Appointment::class,'family_form_reference_no','family_form_reference_no');
    }
    public function getAppointmentDate(){
        $appointment = \App\Appointment::where('family_form_reference_no',$this->family_form_reference_no)->first();
        if($appointment){
            $date = \Hijri::fromFormat('Y-m-d',$appointment->appointment_date);
            $text = $date->format('d')." ".HijriMonth::getMonthName($date->format('m'))." ".$date->format('Y');
            return $text." ".$appointment->getStartTime(). " -- ". $appointment->getEndTime();
        }

        return 'ندارد';
    }


    public static function formatAttachments($data){

        $attachments = [];
        $photo = isset($data['photo']) ? $data['photo']:false;
        $paper_id_files = isset($data['paper_id_files'])  ? $data['paper_id_files']:false;
        $education_documents = isset($data['education_documents'])? $data['education_documents']:false;
        $relative_id_document = isset($data['relative_id_document'])? $data['relative_id_document']:false;
        

        if($photo){
           $attachments[] = ['photo'=>$photo ];
        }
       
        if($paper_id_files){
            $attachments[] = ['paper_id_files'=>$paper_id_files];
        }
        if($education_documents){
            $attachments[] = ['education_documents'=>$education_documents];
        }
        if($relative_id_document){
            $attachments[] = ['relative_id_document'=>$relative_id_document];
        }
        return $attachments;
    }


    public function hasPrintableAttachments()
    {
        foreach ($this->attachments as $types) {
            if (!is_array($types)) {
                continue;
            }
            foreach ($types as $type => $files) {
                if ($type !== 'photo' && is_array($files) && count($files) > 0) {
                    return true;
                }
            }
        }
        return false;
    }

    public function attachmentsToBase64(){
        $images=[];
        //return [];
        $attachments = $this->attachments;
        foreach($attachments as $attachmentTypes):
            
            foreach($attachmentTypes as $key=>$files):
                if($key!="photo"){
                    foreach($files as $a):
                    try{
                        if(\File::extension($a['path']) !='pdf'){
                            $img = \App\Services\AttachmentStorage::disk()->get($a['path']);
                            $images[]= $this->imgToBase64($img);
                        }
                        if( \File::extension($a['path']) =='pdf' ){
                            $images= array_merge($images,$this->pdfFileToBase64($a['path']));
                        }
                    }
                    catch(\Exception $e){
                        \App\Log::record('AttachmentNotFound', ['reference_no' => $this->reference_no]);
                        \App\Services\ApplicationAccess::fail('سند ضمیمه در دسترس نیست؛ دوباره کوشش نمایید.', 503);
                    }
                   
                
                endforeach;
            }
             
            endforeach;
        endforeach;

        return $images;
       
    }

    public static function pdfFileToBase64($path){
        $images=[];
        try{
            $fileContents   = \App\Services\AttachmentStorage::disk()->get($path);
            $im             = new Imagick();
            $im->readImageBlob($fileContents);
            $im->adaptiveResizeImage(400,560);
            $noOfPagesInPDF = $im->getNumberImages(); 
            if($noOfPagesInPDF){
            $count = 0;
            while($noOfPagesInPDF  != $count){
                    $im->setIteratorIndex($count); 
                    $im->setImageFormat("jpg");
                   
                    $height =   $im->getImageHeight();
                    $width  =   $im->getImageWidth();
                    if($width > $height){
                        $im->rotateImage(null,90);
                    }
                    $img=$im->getImageBlob();
                    $images[] = base64_encode($img); 
                    $count++;
                }
                return $images;
            }
        }catch(\Exception $e){
            \App\Log::record('FILENOTFOUND',$e->getMessage());
        }   
        return [];
    }

    public function getPhoto($base64=false){
        if($this->isPdfPhoto()){
            $this->photoToImage();
        }
        foreach($this->attachments as $key=>$attachmentTypes):
            
            if($key == "photo"){
                foreach($attachmentTypes as $files):
                    foreach($files as $a):
                    try{
                        if(!$base64){
                            return $a['path'];
                        }
                        $ext = \File::extension($a['path']);
                      
                            $file = \App\Services\AttachmentStorage::disk()->get($a['path']);
                        
                      
                        if(strtolower($ext) == 'png'){
                            return 'data:image/png;base64,'.base64_encode($file);
                        }else{
                            return 'data:image/jpeg;base64,'.base64_encode($file);
                        }
                    }catch(\Exception $e){
                        \App\Log::record('FILENOTFOUND',$e->getMessage());
                    }
                        return ;
                    endforeach;
                endforeach;
            }
        endforeach;

        return false;
    }

    public function headOfFamily(){
        $members = Individualform::where('family_form_reference_no',$this->family_form_reference_no)->get()->filter(function($m){
            return $m->isHeadOfFamily();
        });
        return $members->first();
    }

    public function birthdayToGeorgian(){
        if($this->birthday_day && $this->birthday_month && $this->birthday_year){
            try{
                try{
                    $b=new \Hijri($this->birthday_year,$this->birthday_month,$this->birthday_day);
                }catch(\Exception $e){
                    $b=new \Hijri($this->birthday_year,$this->birthday_month,$this->birthday_day-1);
                }
            }catch(\Exception $e){
                return '';
            }
           
            
            return $b->toCarbon()->format('d/m/Y');
        }

        return '';
    }

    public function getBirthDayText(){
        return "(".$this->birthdayToGeorgian().")".$this->birthday_year."/".$this->birthday_month."/".$this->birthday_day;
    }

    public function getMaritalStatusText(){
        $text = "";
        switch ($this->marital_status) {
            case '1':
                $text="متاهل";
                break;
            case '2':
                $text="مجرد";
                break;
            case '3':
                $text="کونډ(ه) بیوه";
                break;
            case '4':
                $text="طلاق";
                break;
            
            default:
                # code...
                break;
        }

        return $text;
    }
    public function getAttachmentsHtml(){
        $attachmentsHTML = view('public_views.print_attachments',[
            'review'=>$this,
            'loadCss'=>true
            ])->render();
        return $attachmentsHTML;
    }

    public function getSampleHtml(){
        $sampleHTML = view('public_views.id_sample',[
            'review'=>$this,
            'loadCss'=>true
            ])->render();
      
        return $sampleHTML;
    }
    public function toHtml(){
    
        $applicationHTML=view('public_views.print_individual_form',[
            'review'=>$this,
            'loadCss'=>true
            ])->render();
      

   
        return $applicationHTML;

    }

    public function getReceiptsHtml($includeFamilyForm=true){
        $familyReceipt="";
        if($includeFamilyForm){
        $familyReceipt= view('public_views.familyform_receipt',[
            'form'=>$this,
            'headOfFamily'=>$this->headOfFamily(),
            'members'=>$this->familyMembers()->get(),
            'loadCss'=>true
            ])->render();
             $familyReceipt=$familyReceipt."<pagebreak/>".$familyReceipt."<pagebreak/>";
       
        }
       
        $individualReceiptHtml=view('public_views.individual_receipt',[
            'review'=>$this,
            'loadCss'=>true
            ])->render();
        
        return $familyReceipt.$individualReceiptHtml;
    }

    public function getFamilyFormHtml(){
        $familyFormHtml = view('public_views.print_family_form',[
            'form'=>$this,
            'members'=>$this->familyMembers()->get(),
            'loadCss'=>true
            ])->render();

        return $familyFormHtml;
    }

    public function toPdf($includeFamilyForm=true){
        $mpdf = new Pdf;
        $mpdf->setFooter(' صفحه {PAGENO} از  {nbpg}  ');
       
        if($includeFamilyForm){ 
            $mpdf->WriteHTML( $this->getFamilyFormHtml() ); 
            $mpdf->addPage('L'); 
            $mpdf->WriteHTML( $this->getPaymentReceiptHtml() ); 
        }
       
        $mpdf->addPage('P');
        $mpdf->WriteHTML( $this->toHtml() );
        if ($this->hasPrintableAttachments()) {
            $mpdf->addPage('P');
            $mpdf->WriteHTML( $this->getAttachmentsHtml() );
        }
        $mpdf->addPage('P');
        $mpdf->WriteHTML( $this->getSampleHtml() );
        $mpdf->WriteHTML('<pagebreak orientation="L" resetpagenum="1"/>');
        $mpdf->SetDirectionality('ltr');
        $mpdf->WriteHTML( $this->getReceiptsHtml($includeFamilyForm) );
        return $mpdf->Output('application.pdf',Destination::STRING_RETURN);
    }

    public function downloadAllApplications(){
        try{
            $file= \App\Services\AttachmentStorage::disk()->get("applications/".$application->family_form_reference_no.".pdf");
         
           // return response($file)->header('Content-Type','application/pdf');
        }catch(\Exception $e){
            
        }
        return response($file)->header('Content-Type','application/pdf');
    
    }

    public function generatePdf($force=false){
        if ($this->isCancelled()) {
            abort(404);
        }
        $disk = \Storage::disk(config('pdf.disk'));
        try{
            if($force){
                abort(404);
            }
            $file= $disk->get("applications/".$this->reference_no.".pdf");
        }catch(\Exception $e){
          
            $file = $this->toPdf();
            $disk->put("applications/".$this->reference_no.".pdf",$file);
           
        }
  
        return response($file)->header('Content-Type','application/pdf');
    }

    public function generateAllPdfs($force=false){
        $disk = \Storage::disk(config('pdf.disk'));
        try{
            if($force){
                abort(404);
            }
            $file= $disk->get("applications/".$this->family_form_reference_no.".pdf");
          
        }catch(\Exception $e){
          
            $merger = new Merger;
            $applications=$this->familyMembers()->where('apply_for_new_id','بلی')->where('status', '<>', 13)->get();
            if ($applications->isEmpty()) {
                abort(404);
            }
            foreach( $applications as $i=>$application):
                if($i == 0){
                    $file = $application->toPdf();
                }else{
                    $file = $application->toPdf(false);
                }
                $merger->addRaw($file);
             
            endforeach;
            
            
            $file = $merger->merge();
            $disk->put("applications/".$this->family_form_reference_no.".pdf", $file);
        }
        
        return response($file)->header('Content-Type','application/pdf');
    }

    public function getAttachmentsAttribute($val){
       
        if(is_null($val)){
            return [];
        }

        return json_decode($val,true);
    }

    public function getPlaceOfBirthAttribute($val){

        return $this->birth_province." ".$this->birth_district;
    }

    public function getBornOverseasAttribute($val){
        return $this->birth_country == '1' ? 'N' :'Y';
    }

    public function getEducationLevelCodeAttribute(){
        $code = 0;
        switch ($this->education_level) {
            case 'لومړنی زده کړرې / تعلیمات ابتدایی':
                $code=1;
                break;
            case '۱۲ پاس':
                $code=2;;
                break;
            case '۱۴ پاس':
                $code=3;
                break;
            case 'لیسانس':
                $code=4;
                break;
            case 'ماستر':
                $code=5;
                break;
            case 'دکترا':
                $code=6;
                break;
                
            default:
                # code...
                break;
        }

        return $code;
    }


    public function getIsEducatedRmAttribute(){
        return $this->is_educated ? 'Y':'N';
    }

    public function getBloodGroupCodeAttribute(){
        $code = "";
        switch ($this->blood_group) {
            case 'A+':
                $code = 1;
                break;
            case 'A-':
                 $code = 2;
                 break;
            case 'B+':
                $code = 3;
                break;
            case 'B-':
                $code = 4;
                break;
            case 'AB+':
                $code = 5;
                break;
            case 'AB-':
                $code = 6;
                break;
            case 'O+':
                $code = 7;
                break;
            case 'O-':
                $code = 8;
                break;
            
            default:
                # code...
                break;
        }

        return $code;
    }

    public function getReligionCodeAttribute(){
        $code ="7";
        switch ($this->religion) {
            case 'اسلام':
                $code=1;
                # code...
                break;
            case 'هندو':
                $code=2;
                    # code...
                break;
            case 'سیک':
                $code=3;
                    # code...
                break;
            
            default:
                # code...
                break;
        }
        return $code;
    }

    
    public function getReligionSectorCodeAttribute(){
        if($this->religion== 'اسلام' && gettype($this->religion_sector) == 'string' && strlen($this->religion_sector) > 2){
            $firstLetter = mb_substr($this->religion_sector,0,1,"utf-8");
         
            if($firstLetter == 'س'){
                return 1;
            }
            if($firstLetter == 'ش'){
                return 2;
            }  
        }

        return '';
    }
    public static function imgToBase64($img,$height=790,$width=1100){
       $imagick = new Imagick();
       $imagick->readImageBlob($img);
       $imagick->adaptiveResizeImage($height,$width);
       $imagick->setImageFormat('jpg');
       return base64_encode($imagick->getImageBlob());
    }

    public function getPartnerNameAttribute($val){
        if($this->gender == 2 && $this->marital_status == 1){
            $headOfFamily = $this->headOfFamily();
            if($headOfFamily){
                return $headOfFamily->name." ".$headOfFamily->surname;
            }
        }
        return '';
    }

    public function getHasIdAttribute(){
        return $this->identification_type == "تذکره  دارد";
    }
    
    public function getFirstGurantorDobAttribute(){
        if( is_numeric($this->first_gurantor_dob_day) && is_numeric($this->first_gurantor_dob_month) && is_numeric($this->first_gurantor_dob_year) )
        {
            return $this->first_gurantor_dob_year."-".str_pad($this->first_gurantor_dob_month,2,"0",STR_PAD_LEFT)."-".str_pad($this->first_gurantor_dob_day,2,"0",STR_PAD_LEFT);
        }
        return '';
    }

    public function getFirstGurantorIdIssueDateAttribute(){
        if( is_numeric($this->first_gurantor_id_issue_date_day) && is_numeric($this->first_gurantor_id_issue_date_month) && is_numeric($this->first_gurantor_id_issue_date_year) )
        {
            return $this->first_gurantor_id_issue_date_year."-".str_pad($this->first_gurantor_id_issue_date_month,2,"0",STR_PAD_LEFT)."-".str_pad($this->first_gurantor_id_issue_date_day,2,"0",STR_PAD_LEFT);
        }
        return '';
    }

    public function getSecondGurantorDobAttribute(){
        if( is_numeric($this->second_gurantor_dob_day) && is_numeric($this->second_gurantor_dob_month) && is_numeric($this->second_gurantor_dob_year) )
        {
            return $this->second_gurantor_dob_year."-".str_pad($this->second_gurantor_dob_month,2,"0",STR_PAD_LEFT)."-".str_pad($this->second_gurantor_dob_day,2,"0",STR_PAD_LEFT);
        }
        return '';
    }

    public function getSecondGurantorIdIssueDateAttribute(){
        if( is_numeric($this->second_id_issue_date_day) && is_numeric($this->second_id_issue_date_month) && is_numeric($this->second_id_issue_date_year) )
        {
            return $this->second_id_issue_date_year."-".str_pad($this->second_id_issue_date_month,2,"0",STR_PAD_LEFT)."-".str_pad($this->second_id_issue_date_day,2,"0",STR_PAD_LEFT);
        }
        return '';
    }

    public function getPhotoAttribute($val){
    
       return config('app.url')."/api/viewImage?path=".$this->getPhoto();
    }


   
    public function getPaperIdVolumeAttribute($val){
       // return $val;
        $year = Individualform::toDariNumbers($this->attributes['paper_id_year']);
        $val  = Individualform::toDariNumbers($val);
        $short_words = [
            'جلد'=>'ج',
            'قلم'=>'ق',
            'انداز'=>'',
            'متفرقه'=>'م',
            'اول'=>'۱',
            'دوم'=>'۲',
            'سوم'=>'۳',
            'چهارم'=>'۴',
            'چهار'=>'۴',
            'پنجم'=>'۵',
            'پنج'=>'۵',
            'ششم'=>'۶',
            'شش'=>'۶',
            'هفتم'=>'۷',
            'هفت'=>'۷',
            'هشتم'=>'۸',
            'هشت'=>'۸',
            'نهم'=>'۹',
            'نه'=>'۹',           
        ];
        $volume = str_replace($year,"",$val);
        foreach($short_words as $k=>$short){
            $volume = str_replace($k,$short,$volume);
        }
        $volume = str_replace("  "," ",$volume);
 
        return trim($volume)." ".$year;

    }


    public static function toDariNumbers($num){
        $numbers=[
            '1'=>'۱',
            '2'=>'۲',
            '3'=>'۳',
            '4'=>'۴',
            '5'=>'۵',
            '6'=>'۶',
            '7'=>'۷',
            '8'=>'۸',
            '9'=>'۹',
            '0'=>'۰',
        ];
        foreach($numbers as $eng=>$dari){
            $num = str_replace($eng,$dari,$num);
        }

        return $num;
    }

    public function getPaperIdYearAttribute($val){
        return '';
    }

    public function getMotherTongueNameAttribute(){
        $code= isset($this->attributes['mother_tongue']) ? $this->attributes['mother_tongue'] :'';
        return $this->getLocalLanguageText($code);
    }
    public function getEthnicityNameAttribute(){
        $code= isset($this->attributes['ethnicity']) ? $this->attributes['ethnicity'] :'';
        return $this->getEthnicityText($code);
    }

    public function totalApplicants(){
        return $this->applied()->where('family_form_reference_no',$this->family_form_reference_no)->count();
    }
    public function getQueueNo(){
        $appointment = $this->appointment()->first();
        if(!$appointment){
            return '';
        }
        return $appointment->queue_no;
    }
    public function moveFamilyFormToNextStep($status=false){
        $members = $this->familyMembers()->get();
        foreach($members as $m):
            if($m->status == 6){
                return false;
            }
            if($m->status === 0){
                $m->status = $m->status + 1;
            }
        
            if($status === false){
                $m->status       = $m->status + 1;
            }else{
                $m->status = $status;
            }
            
            $m->save();
            $m->updateTracking( $m->statusDescription );
        endforeach;
        if($status==13){
            $token = Individualform::getIvpToken();
            \App\IvpQueue::where('family_form_reference_no',$this->family_form_reference_no)->update(['cancelled'=>true]);
            $this->markAllMembersAsCompleteIvp($token,'INC');
            
        }
    
    return false;
}

    public static function getIvpToken(){
        $client = new \GuzzleHttp\Client();
        $response=$client->request('post',env('ivp_url').'/user/authenticate',[
            'headers'=>[
                'Content-Type'=>'application/json'
            ],
            'json'=>[
                'UserName'=>env('ivp_username'),
                'Password'=>env('ivp_password'),
            ]
        ]);
        $response = json_decode((String) $response->getBody());
        if( isset($response->token) ){
            return $response->token;
        }

        return false;
    
    }
    public function getIvpFiles(){
        $result=collect();
        $types = ['paper_id_files'];
        $attachments = collect($this->attachments);
        $attachments = $attachments->filter(function($a) use ($types){
            return in_array(key($a),$types);
        });
        $attachments=$attachments->first();

        foreach($attachments as $as):
            foreach($as as $a):
                if( $this->getFileFormat($a['name'] ) !='.pdf' ){
                    try{
                        $fileContents   = \App\Services\AttachmentStorage::disk()->get($a['path']);
                    }catch(\Exception $e){
                        \App\Log::record('FILENOTFOUND',$e->getMessage());
                    }
                   
                    //$result->push($this->imgToBase64($fileContents,800,1200));
                    $result->push($this->imgToBase64($fileContents,400,560));
                }else{
                    $result->merge($this->pdfFileToBase64($a['path']));
                }
            endforeach;
        endforeach;
    
        $html = "<html><body>";
    
        foreach($result as $r):
            $html=$html."<img src='data:image/jpg;base64,$r' width='100%'>";
        endforeach;
  
        $html= $html."</body></html>";
        
        return base64_encode(\App\Pdf::pdfToBase64($html));

    }
    public function sendInfoToIVP($token,$center_name=false,$flag=0){
        
        $client = new \GuzzleHttp\Client(['http_errors' => false, 'connect_timeout' => 3, 'timeout' => 12]);
        $request=$this->formatToIvp($center_name,$flag);
            Individualform::where('family_form_reference_no',$this->family_form_reference_no)->update(['tried_ivp'=>true]);
            $clientResponse = $client->request("POST",env('ivp_url')."/verification/request",[
                'json'=>$request,
                'delay'=>200,
                'headers'=>[
                    'Authorization'=>'Bearer '.$token,
                    'Content-Type'=>'application/json'
                 ]
            ]);
            $response = json_decode( (String) $clientResponse->getBody() );
           if($clientResponse->getStatusCode() == 200){
                Individualform::where('family_form_reference_no',$this->family_form_reference_no)->update(['isSendToIVP'=>true]);
                \App\Log::record('SendingFormSuccess',['family_reference_no'=>$this->family_form_reference_no]);

            }else if( $clientResponse->getStatusCode() == 400 ){
                \App\Log::record('SendingFormFailed',['family_reference_no'=>$this->family_form_reference_no,'response'=>json_encode($response)]);
                if($response->status == -4){
                    Individualform::where('family_form_reference_no',$this->family_form_reference_no)->update(['isSendToIVP'=>true]);
                }
                if($response->status == -5){
                    \App\IvpQueue::addToQueue($this->family_form_reference_no);
                }
                return false;
           }
          
           return $response;
    }

    public function updateDistrictCodes(){
        $this->current_residence_district_code = Village::getDistrictCode($this->current_residence_province,$this->current_residence_district);
        $this->original_residence_district_code = Village::getDistrictCode($this->original_residence_province,$this->original_residence_district);
        $this->kochi_spring_residence_district_code = Village::getDistrictCode($this->kochi_spring_residence_province,$this->kochi_spring_residence_district);
        $this->kochi_winter_residence_district_code = Village::getDistrictCode($this->kochi_winter_residence_province,$this->kochi_winter_residence_district);
        $this->first_gurantor_id_issue_district_code = Village::getDistrictCode($this->first_gurantor_id_issue_province,$this->first_gurantor_id_issue_district);
        $this->second_gurantor_id_issue_district_code = Village::getDistrictCode($this->second_gurantor_id_issue_province,$this->second_gurantor_id_issue_district);
        $this->id_issue_district_code = Village::getDistrictCode($this->id_issue_province,$this->id_issue_district);
        $this->save();
    }

    public static function exportRecords($limit=1000){
        $forms = Individualform::groupBy('family_form_reference_no')->orderBy('id','desc')->take($limit)->get();
        $result=collect();
        foreach($forms as $application):
            $members = $application->familyMembers()->where('apply_for_new_id','بلی')->get();
            $headOfFamily=null;
            foreach($members as $k=>$member):
                    if( $member->isHeadOfFamily() ){
                        $headOfFamily = $member;
                    }
            endforeach;
            $headOfFamily = Individualform::nullToString($headOfFamily);
            $members = $members->map(function($m){
                $m=Individualform::nullToString($m);
                $m['center']= \App\Center::where('id',$m['center_id'])->first()->name;

                return $m;
            });
            $result->push([
                'application_id'=>$application->family_form_reference_no,
                'data'=>[
                    'members'=>$members
                ]
            ]);
        endforeach;
        \Storage::disk('local')->put('data.json',$result->toJson());

        return $result;
       
        
    }


    public function formatToIvp($center_name=false,$flag=0){
            $request=['family_head'=>null];
            $application = $this;
            if($flag == 0){
                $members = $application->familyMembers()->where('apply_for_new_id','بلی')->get();
            }else if ($flag == 1){
                $members = $application->familyMembers()->where('apply_for_new_id','بلی')->where('status',0)->get();
            }
            $isHeadOfFamilyIncluded = $members->where('relationship_with_head_of_family',1)->count();
            if( $isHeadOfFamilyIncluded < 1 ){
                $headOfFamily = $this->familyMembers()->where('relationship_with_head_of_family',1)->first();
                if($headOfFamily){
                    $request['family_head']=[
                        'name'=>Individualform::removeNull($headOfFamily->name),
                        'relationship_with_head_of_family'=>'1',
                        'center_id'=>$headOfFamily->center_id,
                        'reference_no'=>$headOfFamily->reference_no,
                        'surname'=>Individualform::removeNull($headOfFamily->surname),
                        'father_name'=>$headOfFamily->father_name,
                        'father_surname'=>Individualform::removeNull($headOfFamily->father_surname),
                        'grand_father_name'=>$headOfFamily->grand_father_name,
                        'grand_father_surname'=>Individualform::removeNull($headOfFamily->grand_father_surname),
                        'gender'=>$headOfFamily->gender,
                        'marital_status'=>$headOfFamily->marital_status,
                        'birthday_day'=>$headOfFamily->birthday_day,
                        'birthday_month'=>$headOfFamily->birthday_month,
                        'birthday_year'=>$headOfFamily->birthday_year,
                        'digital_id_number'=>$headOfFamily->digital_id_number
                    ];
                }else{
                    \App\Log::record('NO_HEAD_OF_FAMILY',['family_form_reference_no'=>$this->family_form_reference_no]);
                }
            }
           
            $headOfFamily=null;
            foreach($members as $k=>$member):
                if($member->isUnderSevenYearsOld() && $member->identification_type=='تذکره ندارد'){
                    if(!$member->has_id){
                        $member->addParentsAsGurantors();
                    }
                 
                    $members[$k]=$member;
                }
                $members[$k]->is_educated =  $members[$k]->is_educated == 1 ? true:false;
                $members[$k]->identification_type =  $members[$k]->identification_type == 'تذکره  دارد' ? true:false;
               
                    if( $member->isHeadOfFamily() ){
                        $headOfFamily = $member;
                    }

                 
            endforeach;
        
            if($headOfFamily){
                $headOfFamily = Individualform::nullToString($headOfFamily);
            }
            
          
            $members = $members->map(function($m)use ($center_name,$isHeadOfFamilyIncluded){
                    $photo =  $m->getAttachmentByName('photo');
                    $paper_id_files =  $m->getAttachmentByName('paper_id_files');
                    $relative_id_document=  $m->getAttachmentByName('relative_id_document');
                    $education_documents=  $m->getAttachmentByName('education_documents');
                    $is_educated=  $m->is_educated == 1 ? true:false;
                    
                    if($m->first_gurantor_identity_type == 'تذکره کاغذی'){
                        $firstGurantorIdentityType='P';
                    }else if($m->first_gurantor_identity_type == 'تذکره الکترونیکی'){
                        $firstGurantorIdentityType='E';
                    }else{
                        $firstGurantorIdentityType='';
                    }

                    if($m->second_gurantor_identity_type == 'تذکره کاغذی'){
                        $secondGurantorIdentityType='P';
                    }else if($m->second_gurantor_identity_type == 'تذکره الکترونیکی'){
                        $secondGurantorIdentityType='E';
                    }else{
                        $secondGurantorIdentityType='';
                    }
                    
                    if($center_name){
                        $center=$center_name;
                    }else{
                        $center = \App\Center::where('id',$m['center_id'])->first()->name;
                    }
                    $m=Individualform::nullToString($m);
                    $m['center']= $center;
                    $m['photo'] =$photo;
                    $m['is_educated'] =$is_educated;
                    $m['paper_id_files']= $paper_id_files;
                    $m['relative_id_document']= $relative_id_document;
                    $m['education_documents']= $education_documents;
                    $m['first_gurantor_identity_type']= $firstGurantorIdentityType;
                    $m['second_gurantor_identity_type']= $secondGurantorIdentityType;
                    if($m['identification_type'] == false && $m['apply_for_new_id'] == 'بلی' && count($relative_id_document) == 0 && count($paper_id_files) == 0){
                        $headOfFamily = $this->headOfFamily();
                        if($headOfFamily){
                            $m['relative_id_document']= $headOfFamily->getAttachmentByName('paper_id_files');
                            if( count($m['relative_id_document']) == 0 ){
                                $m['relative_id_document']= $headOfFamily->getAttachmentByName('relative_id_document');
                            }
                        }
                        
                    }
                    if($m['identification_type'] == false && count($paper_id_files) > 0 && count($relative_id_document)==0 ){
                        $m['relative_id_document'] = $paper_id_files;
                    }
                
                return $m;
            });
            if($members->count() == 0){
                return false;
            }
            $appointment=$application->appointment()->first();
            $appointment_date=$appointment->appointment_date;
            if($appointment_date){
                $appointment_date = \Hijri::fromFormat('Y-m-d',$appointment_date)->toCarbon()->format('Y-m-d');
            }
           $center=$application->center()->first(['id','name','village','town','province','country','status']);
           $request['application_id']=$application->family_form_reference_no;
           $request['appointment_date']=$appointment_date;
           $request['center']=$center->toArray();
           $request['queue_no']=$appointment->queue_no;
           $request['process']=$flag;
           $request['members']=$members;
            
           return $request;
        
    }

    public function getAttachmentByName($name){
        $attachments = collect($this->attachments);
        $attachment = [];
        foreach($attachments as $key=>$a):
            if( key($a) == $name ){
                $attachment= $a[key($a)];
            }
        endforeach;
        return $attachment;
    }
    
    public static function sendData(){
      
        $individualforms = Individualform::where('apply_for_new_id','بلی')->where('relation')->where('status',0)->orderBy('id','desc')->where('isSendToIVP',false)->groupBy('family_form_reference_no')->get()->chunk(100);
        foreach($individualforms as $forms):
            \App\Jobs\SendApplicationDetailsToIVP::dispatch($forms);
        endforeach;
    }

    public function changeCenterInIvp(){
        $token = Individualform::getIvpToken();
        $client = new \GuzzleHttp\Client(['http_errors' => false, 'connect_timeout' => 3, 'timeout' => 12]);
        $request=[
            'FamilyCode'=>$this->family_form_reference_no,
            'BranchID'=>$this->center_id
        ];
            $clientResponse = $client->request("POST",config('app.ivp_url')."/verification/update/branch",[
                'json'=>$request,
                'headers'=>[
                    'Authorization'=>'Bearer '.$token,
                    'Content-Type'=>'application/json'
                 ]
            ]);
            $response = json_decode( (String) $clientResponse->getBody() );
            if( $clientResponse->getStatusCode() == 200 ){
                \App\Log::record('CenterChanged',['family_form_reference_no'=>$this->family_form_reference_no]);
            }else{
                \App\Log::record('CenterChangedFailed',['family_form_reference_no'=>$this->family_form_reference_no,'response'=>json_encode($response)]);
              //  abort(403);
            }
       
     
           return $response;
    }

    public function changeCenterInIvpWithToken($token){
        $client = new \GuzzleHttp\Client(['http_errors' => false, 'connect_timeout' => 3, 'timeout' => 12]);
        $request=[
            'FamilyCode'=>$this->family_form_reference_no,
            'BranchID'=>$this->center_id
        ];
            $clientResponse = $client->request("POST",config('app.ivp_url')."/verification/update/branch",[
                'json'=>$request,
                'headers'=>[
                    'Authorization'=>'Bearer '.$token,
                    'Content-Type'=>'application/json'
                 ]
            ]);
            $response = json_decode( (String) $clientResponse->getBody() );
            if( $clientResponse->getStatusCode() == 200 ){
                \App\Log::record('CenterChanged',['family_form_reference_no'=>$this->family_form_reference_no]);
            }else{
                \App\Log::record('CenterChangedFailed',['family_form_reference_no'=>$this->family_form_reference_no,'response'=>json_encode($response)]);
                abort(403);
            }
       
     
           return $response;
    }

    public function getPaymentReceiptHtml(){ 
        $html = view('public_views.payment_receipt',[ 'review'=>$this, 'headOfFamily'=>$this->headOfFamily(), 'loadCss'=>false ])->render(); $space="<div style='border-top:1px dashed black;margin-top:2%;margin-bottom:2%'></div>"; return $html.$space.$html.$space.$html; 
    }
    public function fee(){
         $membersCount = $this->familyMembers()->where('apply_for_new_id','بلی')->count(); 
         $center = $this->center()->first();
         $fee    = $center->fee;
         if(!$fee){
             $fee = 100;
         }
        
         $totalFee = $membersCount * $fee;
        
         return number_format($totalFee,2)." ".$center->currency;
    }

    public function isGov(){
        if($this->center_id > 13 && $this->center_id < 89){
            return true;
        }
        return false;
    }

    public function isVerified(){
        $verficationEvents=$this->events()->get()->filter(function($e){
            return strpos($e->description,'تثبیت هویت شد')!==false;
        });

        return $verficationEvents->count() > 0;
    }
    public function isChecked(){
        $checkedEvents=$this->events()->get()->filter(function($e){
            return strpos($e->description,'چک شد')!==false;
        });

        return $checkedEvents->count() > 0;
    }
    public function isCancelled(){
        return (int) $this->status === 13;
    }
    public function isDistributed(){
        $checkedEvents=$this->events()->get()->filter(function($e){
            return strpos($e->description,'توزیع شد')!==false;
        });

        return $checkedEvents->count() > 0;
    }
    //  Reason  
    //  DUP for Duplicate Records
    // ARD for Already Registered
    // INC for Cancel For Incorrect Information
    public function markAllMembersAsCompleteIvp($token,$reason){
        $client = new \GuzzleHttp\Client(['http_errors' => false, 'connect_timeout' => 3, 'timeout' => 12]);
        $request=[
            'FamilyCode'=>$this->family_form_reference_no,
            'Reason'=>$reason
        ];
      
        $clientResponse = $client->request("POST",env('ivp_url')."/verification/cancel",[
                'json'=>$request,
                'delay'=>200,
                'headers'=>[
                    'Authorization'=>'Bearer '.$token,
                    'Content-Type'=>'application/json'
                 ]
            ]);
            $response = json_decode( (String) $clientResponse->getBody() );
           if($clientResponse->getStatusCode() == 200){
                $members = Individualform::where('family_form_reference_no',$this->family_form_reference_no)->where('status','<>',6)->get();
                \App\Log::record('CancelSuccess',['family_reference_no'=>$this->family_form_reference_no,'response'=>json_encode($response)]);
            }else{
                \App\Log::record('CancelFailed',['family_reference_no'=>$this->family_form_reference_no,'response'=>json_encode($response)]);
                return false;
           }
          
           return $response;
        
    }
    private function makeCancelRequest($request,$token){
        $client = new \GuzzleHttp\Client(['http_errors' => false, 'connect_timeout' => 3, 'timeout' => 12]);
        $clientResponse = $client->request("POST",env('ivp_url')."/verification/cancel/individual",[
            'json'=>$request,
            'delay'=>200,
            'headers'=>[
                'Authorization'=>'Bearer '.$token,
                'Content-Type'=>'application/json'
            ]
        ]);
        return $clientResponse;
    }
    public function markAsCompleteIvp($token,$reason,$rmMatch){
        if(in_array($this->status,[6,15]) == false){
           
            $request=[
                'FamilyCode'=>$this->family_form_reference_no,
                'PersonCode'=>$this->reference_no,
                'Reason'=>$reason
            ];
            try{
                $clientResponse = $this->makeCancelRequest($request,$token);
            }catch(\Exception $e){

                \App\Log::record('CancelFailed',['reference_no'=>$this->reference_no,'response'=>json_encode($e)]);
            }
            finally{
                $clientResponse = $this->makeCancelRequest($request,$token);
            }
            
            $response = json_decode( (String) $clientResponse->getBody() );
            if($clientResponse->getStatusCode() == 200){
                if( in_array($this->status,[6,15]) == false){
                        $this->status = 6;
                        $this->nid_no = $rmMatch->nid_no;
                        $this->save();
                        $this->updateTracking($this->statusDescription);
                        $rmMatch->updated_at=\Carbon\Carbon::now();
                        $rmMatch->save();
                }
                    

                }else{
                    \App\Log::record('CancelFailed',['reference_no'=>$this->reference_no,'response'=>json_encode($response)]);
                    if($response->message =='Record Not Found!'){
                        if(in_array($this->status,[6,15]) == false){
                            $this->status = 6;
                            $this->nid_no = $rmMatch->nid_no;
                            $this->save();
                            $this->updateTracking($this->statusDescription);
                            $rmMatch->updated_at=\Carbon\Carbon::now();
                            $rmMatch->save();
                        }
                    }
                    return false;
            }
          
           return $response;
        }else{
            $rmMatch->updated_at=\Carbon\Carbon::now();
            $rmMatch->save();
        }
        
    }

    public function verifyVerificationCode($code){
        $token = \App\Individualform::getIvpToken();
        $client = new \GuzzleHttp\Client(['http_errors' => false, 'connect_timeout' => 3, 'timeout' => 12]);
        $request=[
            'IndividualCode'=>$this->reference_no,
            'VerificationCode'=>$code
        ];
            $clientResponse = $client->request("POST",config('app.ivp_url')."/verification/validate",[
                'json'=>$request,
                'headers'=>[
                    'Authorization'=>'Bearer '.$token,
                    'Content-Type'=>'application/json'
                 ]
            ]);
            $response = json_decode( (String) $clientResponse->getBody() );
            if( $clientResponse->getStatusCode() == 200 ){
                \App\Log::record('CodeVerified',['reference_no'=>$this->reference_no,'code'=>$code]);
                return true;
            }else{
                \App\Log::record('CodeNotVerified',['reference_no'=>$this->reference_no,'code'=>$code]);
                return false;
            }
       
     
        return  false;
        
    }

    public function markAsComplete($rmMatch){
        if(in_array($this->status,[6,15]) == false){
           $this->status = 6;
           $this->nid_no = $rmMatch->nid_no;
           $this->save();
           $this->updateTracking($this->statusDescription);
           $rmMatch->updated_at=\Carbon\Carbon::now();
           $rmMatch->save();
        }else{
            $rmMatch->updated_at=\Carbon\Carbon::now();
            $rmMatch->save();
        }
        
    }
    public function isAppointmentEnabled(){
        $center = $this->center()->first();
        if(!$center){
            return false;
        }
        return $center->enable_appointments;
    }

    public function isAllMembersProcessed(){
        $members = $this->familyMembers()->where('apply_for_new_id','بلی')->get();
        $processed = $members->filter(function($p){
            return $p->status > 0;
        });
        if($members->count() == $processed->count() ){
            return true;
        }
       
        return false;
    }
    public function isAllMembersNew(){
        $members = $this->familyMembers()->where('apply_for_new_id','بلی')->get();
        $processed = $members->filter(function($p){
            return $p->status == 0;
        });
        if($members->count() == $processed->count() ){
            return true;
        }
        return false;
    }

    public static function removeDistributedFromIvp(){
        $forms = \App\Individualform::where('apply_for_new_id','بلی')->where('isSendToIvp',true)->where('status',6)->where('updated_at','>','2021-02-01 00:00:00')->get();
        foreach($forms as $f):
         //   $f->markAsCompleteIvp
        endforeach;
        return $forms;
    }

    public function cancelFamilyApplicationInIvp($token,$reason){
        $client = new \GuzzleHttp\Client(['http_errors' => false, 'connect_timeout' => 3, 'timeout' => 12]);
        $request=[
            'FamilyCode'=>$this->family_form_reference_no,
            'Reason'=>$reason
        ];
      
        $clientResponse = $client->request("POST",env('ivp_url')."/verification/cancel",[
                'json'=>$request,
                'delay'=>200,
                'headers'=>[
                    'Authorization'=>'Bearer '.$token,
                    'Content-Type'=>'application/json'
                 ]
            ]);
            $response = json_decode( (String) $clientResponse->getBody() );
           if($clientResponse->getStatusCode() == 200){
                \App\Log::record('CancelSuccess',['family_reference_no'=>$this->family_form_reference_no,'response'=>json_encode($response)]);
                \App\IvpQueue::where('family_form_reference_no',$this->family_form_reference_no)->update(['cancelled'=>true]);
                \App\Individualform::where('family_form_reference_no',$this->family_form_reference_no)->update(['isSendToIvp'=>false,'tried_ivp'=>true]);
            }else{
                \App\Log::record('CancelFailed',['family_reference_no'=>$this->family_form_reference_no,'response'=>json_encode($response)]);
                return false;
           }
          
           return $response;
        
    }

    public function isAppointmentInTheFuture(){
        $appointment = $this->appointment()->first();
        $center      = $this->center()->first();
        if($center->enable_appointments == false){
            return false;
        }
        if(!$appointment){
            return true;
        }
        $appointmentDate = \Hijri::fromFormat('Y-m-d',$appointment->appointment_date)->toCarbon();
        $appointmentDate->setTime(0,0,0);

        return $appointmentDate->isFuture();
    }

    public static function cancelFamilyApplicationInIvpById($token,$reason,$family_form_reference_no){
        $client = new \GuzzleHttp\Client(['http_errors' => false, 'connect_timeout' => 3, 'timeout' => 12]);
        $request=[
            'FamilyCode'=>$family_form_reference_no,
            'Reason'=>$reason
        ];
      
        $clientResponse = $client->request("POST",env('ivp_url')."/verification/cancel",[
                'json'=>$request,
                'delay'=>200,
                'headers'=>[
                    'Authorization'=>'Bearer '.$token,
                    'Content-Type'=>'application/json'
                 ]
            ]);
            $response = json_decode( (String) $clientResponse->getBody() );
           if($clientResponse->getStatusCode() == 200){
                \App\Log::record('CancelSuccess',['family_reference_no'=>$family_form_reference_no,'response'=>json_encode($response)]);
                \App\IvpQueue::where('family_form_reference_no',$family_form_reference_no)->update(['cancelled'=>true]);
                \App\Individualform::where('family_form_reference_no',$family_form_reference_no)->update(['isSendToIvp'=>false,'tried_ivp'=>true]);
            }else{
                \App\Log::record('CancelFailed',['family_reference_no'=>$family_form_reference_no,'response'=>json_encode($response)]);
                return false;
           }
          
           return $response;
        
    }

    public function addParentsAsGurantors(){
        if( in_array($this->relationship_with_head_of_family,[4,5]) == false ){
            return false;
        }
        $father_details         = $this->getFatherDetails();
        $mother_details         = $this->getMotherDetails();
        if($father_details && !$this->first_gurantor_paper_id_page){
            $this->first_gurantor_name          = $father_details->name;
            $this->first_gurantor_surname       = $father_details->surname;
            $this->first_gurantor_father_name   = $father_details->father_name;
            $this->first_gurantor_father_surname = $father_details->father_surname;
            if ( $father_details->paper_id_page ){
                $this->first_gurantor_paper_id_year = $father_details->paper_id_year;
                $this->first_gurantor_paper_id_volume = $father_details->paper_id_volume;
                $this->first_gurantor_paper_id_page = $father_details->paper_id_page;
                $this->first_gurantor_paper_id_registration = $father_details->paper_id_registration;
                $this->first_gurantor_paper_id_sokok = $father_details->paper_id_sokok;
                $this->first_gurantor_id_issue_province = $father_details->original_residence_province;
                $this->first_gurantor_id_issue_district = $father_details->original_residence_district;
                $this->first_gurantor_id_issue_district_code = $father_details->original_residence_district_code;
                $this->first_gurantor_id_issue_date_day = $father_details->id_issue_date_day;
                $this->first_gurantor_id_issue_date_month = $father_details->id_issue_date_month;
                $this->first_gurantor_id_issue_date_year = $father_details->id_issue_date_year;
                $this->first_gurantor_dob_day = $father_details->birthday_day;
                $this->first_gurantor_dob_month = $father_details->birthday_month;
                $this->first_gurantor_dob_year = $father_details->birthday_year;
                $this->first_gurantor_contact_no = $father_details->primary_contact_no;
                $this->first_gurantor_identity_type = 'تذکره کاغذی';
            }else{
                $this->first_gurantor_digital_id = $father_details->digital_id_number;
                $this->first_gurantor_identity_type = 'تذکره الکترونیکی';
            }

        } 

        if($father_details && !$this->second_gurantor_paper_id_page){
            if(!$mother_details || !$mother_details->paper_id_page ){
                $mother_details = $father_details;
            }
            $this->second_gurantor_name          = $mother_details->name;
            $this->second_gurantor_surname       = $mother_details->surname;
            $this->second_gurantor_father_name   = $mother_details->father_name;
            $this->second_gurantor_father_surname = $mother_details->father_surname;
            
            if ( $mother_details->paper_id_page ){
                $this->second_gurantor_paper_id_year = $mother_details->paper_id_year;
                $this->second_gurantor_paper_id_volume = $mother_details->paper_id_volume;
                $this->second_gurantor_paper_id_page = $mother_details->paper_id_page;
                $this->second_gurantor_paper_id_registration = $mother_details->paper_id_registration;
                $this->second_gurantor_paper_id_sokok = $mother_details->paper_id_sokok;
                $this->second_gurantor_id_issue_province = $mother_details->original_residence_province;
                $this->second_gurantor_id_issue_district = $mother_details->original_residence_district;
                $this->second_gurantor_id_issue_district_code = $mother_details->original_residence_district_code;
                $this->second_gurantor_id_issue_date_day = $mother_details->id_issue_date_day;
                $this->second_gurantor_id_issue_date_month = $mother_details->id_issue_date_month;
                $this->second_gurantor_id_issue_date_year = $mother_details->id_issue_date_year;
                $this->second_gurantor_dob_day = $mother_details->birthday_day;
                $this->second_gurantor_dob_month = $mother_details->birthday_month;
                $this->second_gurantor_dob_year = $mother_details->birthday_year;
                $this->second_gurantor_contact_no = $mother_details->primary_contact_no;
                $this->second_gurantor_identity_type = 'تذکره کاغذی';
            }else{
                $this->second_gurantor_digital_id = $mother_details->digital_id_number;
                $this->second_gurantor_identity_type = 'تذکره الکترونیکی';
            }
        } 
    }
    public function isUnderSevenYearsOld(){
        if($this->apply_for_new_id=='بلی'){
            $dob = $this->getDob();
            if($dob){
                return $dob->toCarbon()->diffInYears() < 7;
            }
        }

        return false;
    }

    public function getDob(){
        if($this->birthday_year){
                $birthYear      = $this->birthday_year;
                $birthMonth     = sprintf('%02d',$this->birthday_month);
                $birthDay       = sprintf('%02d',$this->birthday_day);
                $dob            = \Hijri::fromFormat('Y-m-d',$birthYear."-".$birthMonth."-".$birthDay);
                return $dob;
        }

        return false;
    }

    public function getFatherDetails(){
        $member=$this->familyMembers()->where('relationship_with_head_of_family',1)->first();
        if($member && $member->gender == 1){
            return $member;
        }

        return false;
    }

    public function getMotherDetails(){
        $member=$this->familyMembers()->where('relationship_with_head_of_family',3)->first();
        if($member && $member->gender == 2){
            return $member;
        }
        return false;
    }

    public function photoToImage(){
        if( $this->isPdfPhoto() ){
            $photo = $this->getAttachmentByName('photo');
            $path = $photo[0]['path'];
            try{
            $pdfPages       = $this->pdfFileToBase64($path);
            if($pdfPages && count($pdfPages) > 0){
                $pathInfo       = pathinfo($path);
                $newFileName    = "uploads/".$pathInfo['filename'].".jpg";
                $fileName       = \App\Services\AttachmentStorage::disk()->put($newFileName,base64_decode($pdfPages[0]));
                $photo[0]['path'] =$newFileName;
            }
            $attachments = $this->attachments;
            $photoIndex = $this->getPhotoIndex();
            if( $photoIndex !==false && isset($this->attachments[$photoIndex]) ){
                $attachments[$photoIndex]['photo']=$photo;
                $this->attachments=$attachments;
                $form=\App\Individualform::where('reference_no',$this->reference_no)->first();
                $form->attachments =$attachments;
                $form->save();
            }
        }catch(\Exception $e){
            \App\Log::record('PHOTOTOIMAGE FAILED',['exception'=>$e->getMessage(),'reference_no'=>$this->reference_no]);
        }
        }

        return $photo;

    }

    public function isPdfPhoto(){
        $photo = $this->getAttachmentByName('photo');
        if( $photo && isset($photo[0]['path'])){
            $pathInfo   = pathinfo($photo[0]['path']);
            $ext        = strtolower($pathInfo['extension']);
            if($ext =='pdf'){
                return true;
            }
        }
        return false;
    }

    public function getPhotoIndex(){
        foreach($this->attachments as $index=>$files):
            if( in_array('photo',array_keys($files)) ){
                return $index;
            }
        endforeach;
        return false;
    }

    public static function formatDate(String $date){
        $dateParts = explode('-',$date);
        if(count($dateParts) == 3){
            return sprintf('%04d', $dateParts[0])."-".sprintf('%02d', $dateParts[1])."-".sprintf('%02d', $dateParts[2]);
        }

        return false;
    }

    public static function removeNull($val){
        return is_null($val) ? '': $val;
    }

    public function shouldReverseDistribution(){
        return $this->events()->where('description','<>','لغوه شده')->where(function($query){$query->orWhere('description','=','فارم رسید')->orWhere('description','توزیع شد');})->count() < 3;
    }

    public function canCancel(){
        if(!$this->isSendToIvp){
            return true;
        }
        return  !in_array($this->status,[1,13,2]);
    }
    public function canReset(){
        $lastReset = \App\IvpQueue::where('family_form_reference_no',$this->family_form_reference_no)->orderBy('created_at','desc')->first();
        if($lastReset){
            if($lastReset->created_at->diffInMinutes() < 30){
                return false;
            }
        }
        if($this->familyMembers()->where('apply_for_new_id','بلی')->where('status',6)->count() > 0){
            return true;
        }
        return  $this->familyMembers()->where('apply_for_new_id','بلی')->whereIn('status',[4,5,14])->count() != $this->familyMembers()->where('apply_for_new_id','بلی')->count();
    }

    public function toSavedForm(){
        $members = $this->formatSavedFormMembers();
        return [
            'application_id'=>$this->family_form_reference_no,
            'appointment'=>$this->appointment()->first(),
            'confirmation'=>false,
            'is_new'=>false,
            'data'=>[
                    'application_id'=>$this->family_form_reference_no,
                    'members'=> $members
                ]
            ];
        
    }

    public function formatSavedFormMembers(){
        $members = $this->familyMembers()->orderBy('relationship_with_head_of_family')->get();
        $result  = [];
        foreach($members as $m):
            $result[]=[
                'apply_for_new_id'=>$m->apply_for_new_id,
                'birth_place'=>[
                    'village'=>'',
                    'district'=>$m->birth_district,
                    'province'=>$m->birth_province,
                    'country'=>$m->birth_country,
                ],
                'birthday_day'=>$m->birthday_day,
                'birthday_month'=>$m->birthday_month,
                'birthday_year'=>$m->birthday_year,
                'blood_group'=>$m->blood_group,
                'contact_numbers'=>[
                    'primary_contact_no'=>$m->primary_contact_no,
                    'secondary_contact_no'=>$m->secondary_contact_no
                ],
                'current_residence'=>[
                    'village'=>$m->current_residence_village,
                    'district'=>$m->current_residence_district,
                    'province'=>$m->current_residence_province,
                    'country'=>$m->current_residence_country,

                ],
                'original_residence'=>[
                    'village'=>$m->original_residence_village,
                    'district'=>$m->original_residence_district,
                    'province'=>$m->original_residence_province,
                    'country'=>"1",
                ],
                'dob'=>[
                    'birthday_day'=>$m->birthday_day,
                    'birthday_month'=>$m->birthday_month,
                    'birthday_year'=>$m->birthday_year,
                ],
                'digital_id_number'=>$m->digital_id_number,
                'disability_type'=>$m->disability_type,
                'status'=>$m->apply_for_new_id=='بلی' ? $m->status:13,
                'reference_no'=>$m->reference_no,
                'education_level'=>$m->education_level,
                'email_address'=>$m->email_address,
                'english_name'=>$m->english_name,
                'english_surname'=>$m->english_surname,
                'ethnicity'=>$m->ethnicity,
                'father_name'=>$m->father_name,
                'father_surname'=>$m->father_surname,
                'first_gurantor_contact_no'=>$m->first_gurantor_contact_no,
                'first_gurantor_digital_id'=>$m->first_gurantor_digital_id,
                'first_gurantor_dob'=>[
                    'first_gurantor_dob_day'=>$m->first_gurantor_dob_day,
                    'first_gurantor_dob_month'=>$m->first_gurantor_dob_month,
                    'first_gurantor_dob_year'=>$m->first_gurantor_dob_year,
                ],
                'first_gurantor_dob_day'=>$m->first_gurantor_dob_day,
                'first_gurantor_dob_month'=>$m->first_gurantor_dob_month,
                'first_gurantor_dob_year'=>$m->first_gurantor_dob_year,
                'first_gurantor_father_name'=>$m->first_gurantor_father_name,
                'first_gurantor_father_surname'=>$m->first_gurantor_father_surname,
                'first_gurantor_id_issue_date_day'=>$m->first_gurantor_id_issue_date_day,
                'first_gurantor_id_issue_date_month'=>$m->first_gurantor_id_issue_date_month,
                'first_gurantor_id_issue_date_year'=>$m->first_gurantor_id_issue_date_year,
                'first_gurantor_id_issue_date'=>[
                    'first_gurantor_id_issue_date_day'=>$m->first_gurantor_id_issue_date_day,
                    'first_gurantor_id_issue_date_month'=>$m->first_gurantor_id_issue_date_month,
                    'first_gurantor_id_issue_date_year'=>$m->first_gurantor_id_issue_date_year,
                ],
                'first_gurantor_id_issue_place'=>[
                    'village'=>'',
                    'district'=>$m->first_gurantor_id_issue_district,
                    'province'=>$m->first_gurantor_id_issue_province,
                    'country'=>"1",
                ],
                'first_gurantor_identity_type'=>$m->first_gurantor_identity_type,
                'first_gurantor_name'=>$m->first_gurantor_name,
                'first_gurantor_surname'=>$m->first_gurantor_surname,
                'first_gurantor_paper_id_page'=>$m->first_gurantor_paper_id_page,
                'first_gurantor_paper_id_registration'=>$m->first_gurantor_paper_id_registration,
                'first_gurantor_paper_id_sokok'=>$m->first_gurantor_paper_id_sokok,
                'first_gurantor_paper_id_volume'=>$m->first_gurantor_paper_id_volume,
                'first_gurantor_paper_id_year'=>$m->first_gurantor_paper_id_year,
                'first_gurantor_paper_id'=>[
                    'first_gurantor_paper_id_page'=>$m->first_gurantor_paper_id_page,
                    'first_gurantor_paper_id_registration'=>$m->first_gurantor_paper_id_registration,
                    'first_gurantor_paper_id_sokok'=>$m->first_gurantor_paper_id_sokok,
                    'first_gurantor_paper_id_volume'=>$m->first_gurantor_paper_id_volume,
                    'first_gurantor_paper_id_year'=>$m->first_gurantor_paper_id_year,
                ],
                'foreign_language_knowledge'=>json_decode($m->foreign_language_knowledge),
                'gender'=>$m->gender,
                'grand_father_name'=>$m->grand_father_name,
                'grand_father_surname'=>$m->grand_father_surname,
                'has_digital_id'=>$m->digital_id_number ? 1:0  ,
                'id_issue_date'=>[
                    'id_issue_date_day'=>$m->id_issue_date_day,
                    'id_issue_date_month'=>$m->id_issue_date_month,
                    'id_issue_date_year'=>$m->id_issue_date_year,
                ],
                'id_issue_date_day'=>$m->id_issue_date_day,
                'id_issue_date_month'=>$m->id_issue_date_month,
                'id_issue_date_year'=>$m->id_issue_date_year,
                'identification_type'=>$m->identification_type,
                'isSecondGurantorVisible'=>true,
                'is_educated'=>$m->is_educated,
                'is_kochi'=>$m->is_kochi,
                'kochi_spring_residence'=>[
                    'village'=>$m->kochi_spring_residence_village,
                    'district'=>$m->kochi_spring_residence_district,
                    'province'=>$m->kochi_spring_residence_province,
                    'country'=>$m->kochi_spring_residence_country,
                ],
                'kochi_winter_residence'=>[
                    'village'=>$m->kochi_winter_residence_village,
                    'district'=>$m->kochi_winter_residence_district,
                    'province'=>$m->kochi_winter_residence_province,
                    'country'=>$m->kochi_winter_residence_country,
                ],
                'living_status'=>$m->living_status,
                'local_language_knowledge'=>json_decode($m->local_language_knowledge),
                'marital_status'=>$m->marital_status,
                'military_service'=>$m->military_service,
                'mother_name'=>$m->mother_name,
                'mother_tongue'=>$m->mother_tongue,
                'name'=>$m->name,
                'surname'=>$m->surname,
                'occupation'=>$m->occupation,
                'paper_id_copy_base64'=>null,
                'paper_id_files'=>$m->getAttachmentByName('paper_id_files'),
                'paper_id_no'=>[
                    'paper_id_year'=>$m->getOriginal('paper_id_year'),
                    'paper_id_page'=>$m->paper_id_page,
                    'paper_id_volume'=>$m->getOriginal('paper_id_volume'),
                    'paper_id_sokok'=>$m->paper_id_sokok,
                    'paper_id_registration'=>$m->paper_id_registration,
                ],
                'paper_id_year'=>$m->paper_id_year,
                'paper_id_registration'=>$m->paper_id_registration,
                'paper_id_sokok'=>$m->paper_id_sokok,
                'paper_id_volume'=>$m->getOriginal('paper_id_volume'),
                'paper_id_page'=>$m->paper_id_page,
                'photo'=>$m->getAttachmentByName('photo'),
                'relationship_with_head_of_family'=>$m->relationship_with_head_of_family,
                'relative_id_document'=>$m->getAttachmentByName('relative_id_document'),
                'religion'=>$m->religion,
                'religion_sector'=>$m->religion_sector,
                'second_citizenship'=>$m->getHasCitizenshipValue(),
                'second_citizenship_country'=>$m->second_citizenship_country,
                'gurantor1'=>null,
                'gurantor2'=>null,
                'second_gurantor_contact_no'=>$m->second_gurantor_contact_no,
                'second_gurantor_digital_id'=>$m->second_gurantor_digital_id,
                'second_gurantor_dob'=>[
                    'second_gurantor_dob_day'=>$m->second_gurantor_dob_day,
                    'second_gurantor_dob_month'=>$m->second_gurantor_dob_month,
                    'second_gurantor_dob_year'=>$m->second_gurantor_dob_year,
                ],
                'second_gurantor_dob_day'=>$m->second_gurantor_dob_day,
                'second_gurantor_dob_month'=>$m->second_gurantor_dob_month,
                'second_gurantor_dob_year'=>$m->second_gurantor_dob_year,
                'second_gurantor_father_name'=>$m->second_gurantor_father_name,
                'second_gurantor_father_surname'=>$m->second_gurantor_father_surname,
                'second_gurantor_id_issue_date_day'=>$m->second_gurantor_id_issue_date_day,
                'second_gurantor_id_issue_date_month'=>$m->second_gurantor_id_issue_date_month,
                'second_gurantor_id_issue_date_year'=>$m->second_gurantor_id_issue_date_year,
                'second_gurantor_id_issue_date'=>[
                    'second_gurantor_id_issue_date_day'=>$m->second_gurantor_id_issue_date_day,
                    'second_gurantor_id_issue_date_month'=>$m->second_gurantor_id_issue_date_month,
                    'second_gurantor_id_issue_date_year'=>$m->second_gurantor_id_issue_date_year,
                ],
                'second_gurantor_id_issue_place'=>[
                    'village'=>'',
                    'district'=>$m->second_gurantor_id_issue_district,
                    'province'=>$m->second_gurantor_id_issue_province,
                    'country'=>"1",
                ],
                'second_gurantor_identity_type'=>$m->second_gurantor_identity_type,
                'second_gurantor_name'=>$m->second_gurantor_name,
                'second_gurantor_surname'=>$m->second_gurantor_surname,
                'second_gurantor_paper_id_page'=>$m->second_gurantor_paper_id_page,
                'second_gurantor_paper_id_registration'=>$m->second_gurantor_paper_id_registration,
                'second_gurantor_paper_id_sokok'=>$m->second_gurantor_paper_id_sokok,
                'second_gurantor_paper_id_volume'=>$m->second_gurantor_paper_id_volume,
                'second_gurantor_paper_id_year'=>$m->second_gurantor_paper_id_year,
                'second_gurantor_paper_id'=>[
                    'second_gurantor_paper_id_page'=>$m->second_gurantor_paper_id_page,
                    'second_gurantor_paper_id_registration'=>$m->second_gurantor_paper_id_registration,
                    'second_gurantor_paper_id_sokok'=>$m->second_gurantor_paper_id_sokok,
                    'second_gurantor_paper_id_volume'=>$m->second_gurantor_paper_id_volume,
                    'second_gurantor_paper_id_year'=>$m->second_gurantor_paper_id_year,
                ],
                'step'=>1,
                'voting_place'=>$m->voting_place
            ];
        endforeach;

        return $result;
        
    }

    public function getHasCitizenshipValue(){
        if($this->has_second_citizenship ){
            return 'هو /بلی';
        }else{
            return 'نه / نخیر';
        }
     
    }

    public function hasCancelledMembers(){
        return $this->familyMembers()->where('apply_for_new_id','بلی')->where('status',13)->count() > 0;
    }


    public function receivedConfirmation(){
        return $this->familyMembers()->where('apply_for_new_id','بلی')->whereIn('status',[5,4,14])->count() == $this->familyMembers()->where('apply_for_new_id','بلی')->count();
    }
    
    public function shouldExtend(){
    
        if( \App\IvpQueue::where('family_form_reference_no',$this->family_form_reference_no)->where('is_sent',true)->where('tried',true)->exists()){
            $references=$this->familyMembers()->where('apply_for_new_id','بلی')->get(['reference_no'])->map(function($m){
                return $m->reference_no;
            })->toArray();
            
            $responsesReceived=\App\Ivpresponse::whereIn('reference_no',$references)->count();

            if( $responsesReceived >= count($references) ){
                return true;
            }
        }
        return false;
    }

    public function paperIdFilesToPdf(){
        $paper_id_files =  $this->getAttachmentByName('paper_id_files');
        $relative_id_files =  $this->getAttachmentByName('relative_id_document');
        $files = array_merge($paper_id_files,$relative_id_files);
        return Individualform::mergeFilesToPdf($files);
    }

    public static function mergeFilesToPdf($files=[]){
        $images = Individualform::filesToImages($files);
        $html = view('public_views.files_to_pdf',[
            'files'=>$images,
            'loadCss'=>true
            ])->render();
        $pdf = new Pdf('P');
        $pdf->writeHTML($html);
        return response($pdf->Output())->header('Content-Type','application/pdf');
    }

    public static function filesToImages($files){
        $images=[];
        foreach($files as $a):
            try{
                if(\File::extension($a['path']) !='pdf'){
                    $img = \App\Services\AttachmentStorage::disk()->get($a['path']);
                    $images[]= Individualform::imgToBase64($img);
                }
                if( \File::extension($a['path']) =='pdf' ){
                    $images= array_merge($images,Individualform::pdfFileToBase64($a['path']));
                }
            }
            catch(\Exception $e){
                \App\Log::record('AttachmentNotFound', ['reference_no' => $this->reference_no]);
                        \App\Services\ApplicationAccess::fail('سند ضمیمه در دسترس نیست؛ دوباره کوشش نمایید.', 503);
            }
        endforeach;

        return $images;
    }

    public function downloadPhoto(){
        $photoFiles = $this->getAttachmentByName('photo');
        $photo      = isset($photoFiles[0]) ? $photoFiles[0]['path'] : '';

        return \App\Services\AttachmentStorage::disk()->download($photo);
    }
}

