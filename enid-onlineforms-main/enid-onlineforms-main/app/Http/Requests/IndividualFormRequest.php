<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Http\Requests\CustomRequest;
use  \Morilog\Jalali\Jalalian;
use Assert\InvalidArgumentException;
use App\Rules\Districtexists;
use App\Rules\MaxLength;
use App\Rules\NumericIf;
class IndividualFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        
        return true;

    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        
        if( $this->segment(2) == 'submit-individual-form' ){
      
            return $this->allRules();
        }
        //Used for step by step validation
        return $this->getStepRules($this->input('step'));
        
    }

 

    private function getStepRules($step){
    
        $rules=[];
        
        if ($this->input('member') !=null){
            $memberKey  =$this->input('member');
            $rules      = $this->getRules($memberKey );
        }else{
            foreach($this->input('members') as $memberKey=>$member):
                $rule      = $this->getRules($memberKey );
                $rules = array_merge($rules,$rule);
            endforeach;
        }

         return $rules;
    }

    public function allRules(){
        $finalRules=[
            'center_id'=>'required|exists:centers,id',
            'family_members'=>Rule::requiredIf(function(){
                $minimumMembers = count($this->input('members')) < 2;
                return $minimumMembers;
            }),
            'confirmation'=>'required|accepted'
        ];
        $reference_no = $this->input('members.0.reference_no');
  
       // dd($allRules);
        $center = \App\Center::where('id',$this->input('center_id'))->first();
        if($center && $center->enable_appointments && \App\Individualform::where('reference_no',$reference_no)->exists()== false){
            $finalRules['selectedAppointmentTime.appointment_date']='required';
        }
        $allRules = array_merge( $finalRules,$this->getStepRules(0) );
        return $allRules;
    }

    public function shouldHeadOfFamilyApplyForNewId(){
        if($this->input('head_of_family_has_id') == 'نخیر' && $this->isHeadOfFamilyNameIncluded() == false){
            return true;
        }

        if($this->input('head_of_family_has_id') == 'بلی' && $this->input('head_of_family_id_type') == 'کاغذی' && $this->isHeadOfFamilyNameIncluded() == false){
            return true;
        }


        return false;
    }

    public function isHeadOfFamilyNameIncluded(){
        $members = $this->input('members');
        foreach($members as $m):
            if( isset($m['name']) && isset($m['relationship_with_head_of_family']) ){
                if( $m['name'] == $this->input('head_of_family_name') &&  $m['relationship_with_head_of_family'] == 1  ){
                    return true;
                }
            }
           
        endforeach;

        return false;
    }

    public function isMemberIdIssueInfoRequired($key){
        
        if($key == '*'){
            return false;
            $applyId = $this->input('members.'.$key.".apply_for_new_id");
            $result = false;
           
       
            foreach($applyId as $k=>$answer):
                
                if( $this->input('members.'.$k.".apply_for_new_id") == "بلی" && $this->input('members.'.$k.".identification_type") == 'تذکره  دارد' ){
                    return true;
                }else{
                    return false;
                }
            endforeach;
            
        
            return $result;
        }
   
        return $this->input('members.'.$key.".apply_for_new_id") == "بلی" && $this->input('members.'.$key.".identification_type") == 'تذکره  دارد' ;
    }


    public function isEducationDocumentsRequired($key){
        if($key == '*'){
            return false;
            $applyId = $this->input('members.'.$key.".apply_for_new_id");
            $result = true;
            foreach($applyId as $k=>$answer):
                $isEducationDocumentsUploaded = is_array($this->input('members.'.$k.".education_documents") ) && count($this->input('members.'.$k.".education_documents")) > 0;

                if( $this->input('members.'.$k.".apply_for_new_id") == "بلی" && $this->input('members.'.$k.".is_educated") == '1' && $isEducationDocumentsUploaded == false &&  $this->input('members.'.$k.".education_level")!="لومړنی زده کړرې / تعلیمات ابتدایی" ){
                    return true;
                }else{
                    return false;
                }
            endforeach;
        
            return $result;
        }
   
        return $this->input('members.'.$key.".apply_for_new_id") == "بلی" && $this->input('members.'.$key.".is_educated") == '1' && $this->input('members.'.$key.".education_level")!="لومړنی زده کړرې / تعلیمات ابتدایی" ;
    }

    

    public function dobIsSmallerThanIssueDate($dob,$issue){
        try{
            $dob = \Carbon\Carbon::createFromFormat('Y-m-d',$dob);
            $issue=\Carbon\Carbon::createFromFormat('Y-m-d',$issue);
            
            return $issue->gt($dob);
        }catch(\Exception $e){
            return true;
        }

        return false;
    }

    public function isGurantorPaperIdDetailsRequired($gurantor_no,$memberKey){
        //dd($this->input('members.'.$memberKey.'.'.$gurantor_no.'_gurantor_identity_type'));
        if($memberKey == 1){
           // dd($this->input('members.'.$memberKey.'.'.$gurantor_no.'_gurantor_identity_type')); 
        }
        return $this->input('members.'.$memberKey.'.'.$gurantor_no.'_gurantor_identity_type') == 'تذکره کاغذی'; 
    }
    
    public function isGurantorRequired($memberKey){
        return $this->input('members.'.$memberKey.'.identification_type') == 'تذکره ندارد' && $this->input('members.'.$memberKey.'.apply_for_new_id') == "بلی";
    }


    public function messages(){
        $errorsMessages=[];
        foreach($this->input('members',[]) as $key=>$member):
            $memberMessage = ' شخص '.($key+1).":";

            $message=[
            'members.'.$key.'.name.required'=>$memberMessage.'نام ضروری است :input',
            'members.'.$key.'.name.alpha_spaces'=>$memberMessage.'نام نمیتواند حروف غیر از الفبا را داشته باشد',
            'members.'.$key.'.surname.required'=>$memberMessage.'تخلص ضروری است :input',
            'members.'.$key.'.surname.alpha_spaces'=>$memberMessage.'تخلص نمیتواند حروف غیر از الفبا را داشته باشد',
            'members.'.$key.'.english_name.required_if'=>$memberMessage.'نام انگلیسی ضروری است',
            'members.'.$key.'.english_name.alpha_spaces'=>$memberMessage.'نام انگلیسی نمیتواند حروف غیر از الفبا را داشته باشد',
            'members.'.$key.'.english_surname.required_if'=>$memberMessage.'تخلص انگلیسی ضروری است',
            'members.'.$key.'.english_surname.alpha_spaces'=>$memberMessage.'تخلص انگلیسی نمیتواند حروف غیر از الفبا را داشته باشد',
            'members.'.$key.'.father_name.required'=>$memberMessage.'نام پدر ضرروی است',
            'members.'.$key.'.father_name.alpha_spaces'=>$memberMessage.'نام پدر نمیتواند حروف غیر از الفبا را داشته باشد',
            'members.'.$key.'.father_surname.required'=>$memberMessage.'تخلص پدر ضرروی است',
            'members.'.$key.'.father_surname.alpha_spaces'=>$memberMessage.'تخلص پدر نمیتواند حروف غیر از الفبا را داشته باشد',
            'members.'.$key.'.grand_father_name.required'=>$memberMessage.'نام پدر کلان ضروری است',
            'members.'.$key.'.grand_father_name.alpha_spaces'=>$memberMessage.'نام پدر کلان نمیتواند حروف غیر از الفبا را داشاشته باشد',
            'members.'.$key.'.grand_father_surname.required'=>$memberMessage.'تخلص پدر کلان ضروری است',
            'members.'.$key.'.grand_father_surname.alpha_spaces'=>$memberMessage.'تخلص پدر کلان ضروری است',
            'members.'.$key.'.mother_name.required_if'=>$memberMessage.'نام مادر ضروری است',
            'members.'.$key.'.mother_name.alpha_spaces'=>$memberMessage.'نام مادر نمیتواند حروف غیر از الفبا را داشته باشد ',
            'members.'.$key.'.mother_name.max'=>$memberMessage.'نام مادر نمیتواند بیشتر از 30 حرف باشد ',
            'members.'.$key.'.mother_husband_name.alpha_spaces'=>$memberMessage.'نام شوهر مادر نمیتواند حروف غیر از البفا را داشته باشد',
            'members.'.$key.'.partner_name.max'=>$memberMessage.'نام همسر بیشتر از 30 حرف شده نمیتواند',
            'members.'.$key.'.occupation.max'=>$memberMessage.'شغل یا وظیفه بشتر از 60 حرف شده نیمتواند',
            'members.'.$key.'.birth_place.country.required_if'=>$memberMessage.'کشور محل تولد ضروری میباشد',
            'members.'.$key.'.birth_place.country.alpha_spaces'=>$memberMessage.'کشور محل تولد نمیتواند حروف غیر از البفا را داشته باشد',
            'members.'.$key.'.birth_place.province.required_if'=>$memberMessage.'ولایت محل تولد ضروری میباشد',
            'members.'.$key.'.birth_place.province.alpha_spaces'=>$memberMessage.'ولایت محل تولد نمیتواند حروف غیر از البفا را داشته باشد',
            'members.'.$key.'.birth_place.district.required_if'=>$memberMessage.'ولسوالی محل تولد ضروری میباشد',
            'members.'.$key.'.birth_place.district.alpha_spaces'=>$memberMessage.'ولسوالی محل تولد نمیتواند حروف غیر از البفا را داشته باشد',
            'members.'.$key.'.birthday_day.required_if'=>$memberMessage.'روز تاریخ تولد ضروری میباشد',
            'members.'.$key.'.birthday_day.alpha_num'=>$memberMessage.' روز تاریخ تولد نمیتواند حروف البفا را داشته باشد',
            'members.'.$key.'.birthday_month.required_if'=>$memberMessage.'ماه تاریخ تولد ضروری میباشد',
            'members.'.$key.'.birthday_month.alpha_num'=>$memberMessage.'ماه تاریخ تولد نمیتواند حروف البفا را داشته باشد',
            'members.'.$key.'.birthday_year.required_if'=>$memberMessage.'سال تاریخ تولد ضروری میباشد',
            'members.'.$key.'.birthday_year.alpha_num'=>$memberMessage.' سال تاریخ تولد نمیتواند حروف البفا را داشته باشد',
            'members.'.$key.'.military_service.boolean'=>$memberMessage.'خدمات نظامی تنها میتواند بلی و یا نخیر باشد',
            'members.'.$key.'.military_entry_date_day.required_if'=>$memberMessage.'روز تاریخ شمولیت عسکری ضروری میباشد.',
            'members.'.$key.'.military_entry_date_month.required_if'=>$memberMessage.'ماه تاریخ شمولیت عسکری ضروری میباشد.',
            'members.'.$key.'.military_entry_date_year.required_if'=>$memberMessage.'سال تاریخ شمولیت عسکری ضروری میباشد.',
            'members.'.$key.'.military_exit_date_day.required_if'=>$memberMessage.'روز تاریخ ترخیص عسکری ضروری میباشد.',
            'members.'.$key.'.military_exit_date_month.required_if'=>$memberMessage.'ماه تاریخ ترخیص عسکری ضروری میباشد.',
            'members.'.$key.'.military_exit_date_year.required_if'=>$memberMessage.'سال تاریخ ترخیص عسکری ضروری میباشد.',
            'members.'.$key.'.military_certificate_no.required_if'=>$memberMessage.'شماره ترخیص ضروری میباشد',
            'members.'.$key.'.military_unit.required_if'=>$memberMessage.'قطعه عسکری ضروری میباشد',
            'members.'.$key.'.is_educated.boolean'=>$memberMessage.'سواد تنها میتواند بلی و یا نخیر باشد',
            'members.'.$key.'.living_status.required'=>$memberMessage.'انتخاب حالت فعلی ضروری میباشد',
            'members.'.$key.'.apply_for_new_id.required'=>$memberMessage.'جواب این سوال ضروری میباشد',
            'members.'.$key.'.education_level.required_if'=>$memberMessage.'در صورت که شما سواد داشته باشید لطفاٌ درجه تحصیلی تان را انتخاب نماید',
            'members.'.$key.'.original_residence.village.required_if'=>$memberMessage.'قریه سکونت اصلی ضروری میباشد',
            'members.'.$key.'.original_residence.district.required_if'=>$memberMessage.'ولسوالی سکونت اصلی ضروری میباشد',
            'members.'.$key.'.original_residence.province.required_if'=>$memberMessage.'ولایت سکونت اصلی ضروری میباشد',
            'members.'.$key.'.current_residence.village.required_if'=>$memberMessage.'قریه سکونت فعلی ضروری میباشد',
            'members.'.$key.'.current_residence.district.required_if'=>$memberMessage.'ولسوالی سکونت فعلی ضروری میباشد',
            'members.'.$key.'.current_residence.province.required_if'=>$memberMessage.'ولایت سکونت فعلی ضروری میباشد',
            'members.'.$key.'.primary_contact_no.numeric'=>$memberMessage.'در شماره تماس باید تنها اعداد استفاده شود',
            'members.'.$key.'.primary_contact_no.required_if'=>$memberMessage.'شماره تماس ضروری میباشد',
            'members.'.$key.'.primary_contact_no.max'=>$memberMessage.'شماره تماس بیشتر از 16 عدد شده نمیتواند',
            'members.'.$key.'.secondary_contact_no.numeric'=>$memberMessage.'در شماره تماس باید تنها اعداد استفاده شود',
            'members.'.$key.'.secondary_contact_no.max'=>$memberMessage.' شماره تماس بیشتر از 16 عدد شده نمیتواند',
            'members.'.$key.'.email_address.email'=>$memberMessage.'لطفاً آدرس ایمیل درست خود را تایپ کنید',
            'members.'.$key.'.email_address.max'=>$memberMessage.'آدرس ایمیل بیشتر از 60 حرف شده نمیتواند',
            'members.'.$key.'.mother_tongue.required_if'=>$memberMessage.'زبان مادری ضروری میباشد',
            'members.'.$key.'.mother_tongue.alpha_spaces'=>$memberMessage.'زبان مادری نمیتواند حروف غیر از الفبا را داشته باشد',
            'members.'.$key.'.marital_status.required_if'=>$memberMessage.'انتخاب حالت مدنی ضروری میباشد',
            'members.'.$key.'.marital_status.in'=>$memberMessage.'حالت مدنی را از لست انتخاب کنید',
            'members.'.$key.'.is_kochi.boolean'=>$memberMessage.'لطفا سوال آیا کوچی هستید را جواب دهید',
            'members.'.$key.'.is_kochi.required_if'=>$memberMessage.'لطفا سوال آیا کوچی هستید را جواب دهید',
            'members.'.$key.'.ethnicity.required_if'=>$memberMessage.'انتخاب قومیت ضرروی میباشد ',
            'members.'.$key.'.religion.required_if'=>$memberMessage.'انتخاب دین ضروری میباشد ',
            'members.'.$key.'.gender.required'=>$memberMessage.' انتخاب جنسیت ضروری میباشد',
            'members.'.$key.'.religion_sector.required_if'=>$memberMessage.'مذهب ضروری میباشد',
            'members.'.$key.'.kochi_spring_residence_district.required_if'=>$memberMessage.'انتخاب ولسوالی محل رهایش تابستانی ضروری میباشد',
            'members.'.$key.'.kochi_spring_residence_province.required_if'=>$memberMessage.'انتخاب ولایت محل رهایش تابستانی ضروری میباشد',
            'members.'.$key.'.kochi_winter_residence_district.required_if'=>$memberMessage.'انتخاب ولسوالی محل رهایش زمستانی ضروری میباشد',
            'members.'.$key.'.kochi_winter_residence_province.required_if'=>$memberMessage.'انتخاب ولایت محل رهایش زمستانی ضروری میباشد',
            'members.'.$key.'.relationship_with_head_of_family.required'=> 'انتخاب قرابت با رییس فامیل ضروری است',
            'members.'.$key.'.relationship_with_head_of_family.alpha_spaces'=>$memberMessage.'این گزینه نمیتواند غیر از حروف الفبا در خود داشته باشد',
            'members.'.$key.'.identification_type.required_if'=>$memberMessage.'انتخاب نوعیت تذکره ضروری میباشد',
            'members.'.$key.'.paper_id_year.required'=>$memberMessage.'سال کتاب ضروری میباشد',
            'members.'.$key.'.paper_id_year.numeric'=>$memberMessage.'سال کتاب باید عدد باشد',
            'members.'.$key.'.paper_id_year.max'=>$memberMessage.'سال کتاب باید بیشتر از 4 عدد نباشد',
            'members.'.$key.'.paper_id_volume.required'=>$memberMessage.'شماره جلد تذکره الکترونیکی ضروری میباشد',
            'members.'.$key.'.paper_id_volume.max'=>$memberMessage.'جلد کتاب باید بیشتر از 11 حرف نباشد.',
            'members.'.$key.'.paper_id_page.required'=>$memberMessage.'شماره صفحه تذکره کاغذی ضروری میباشد!',
            'members.'.$key.'.paper_id_page.max'=>$memberMessage.'شماره صفحه تذکره باید بیش از 3 عدد نباشد',
            'members.'.$key.'.paper_id_page.numeric'=>$memberMessage.'شماره صفحه تذکره باید عدد باشد',
            'members.'.$key.'.paper_id_registration.required'=>$memberMessage.'شماره ثبت تذکره کاغذی ضروری میباشد',
            'members.'.$key.'.paper_id_registration.numeric'=>$memberMessage.'شماره ثبت تذکره کاغذی باید عدد باشد',
            'members.'.$key.'.paper_id_registration.max'=>$memberMessage.'شماره ثبت تذکره کاغذی باید بیشتر از 5 عدد نباشد',
            'members.'.$key.'.paper_id_sokok.required'=>$memberMessage.'شماره صکوک تذکره کاغذی ضروری میباشد',
            'members.'.$key.'.paper_id_sokok.numeric'=>$memberMessage.'شماره صکوک تذکره کاغذی باید عدد باشد',
            'members.'.$key.'.paper_id_sokok.max'=>$memberMessage.'شماره صکوک تذکره کاغذی بیشتر از 10  عدد نباشد',
            'members.'.$key.'.id_issue_place.province.required'=>$memberMessage.'ولایت صدور تذکره کاغذی ضروری میباشد',
            'members.'.$key.'.id_issue_place.district.required'=>$memberMessage.'ولسوالی صدور تذکره کاغذی ضروری میباشد',
            'members.'.$key.'.id_issue_place.village.required'=>$memberMessage.'قریه صدور تذکره کاغذی ضروری میباشد',
            'members.'.$key.'.id_issue_date_day.required'=>$memberMessage.'روز صدور تذکره کاغذی ضروری میباشد',
            'members.'.$key.'.id_issue_date_month.required'=>$memberMessage.'ماه صدور تذکره کاغذی ضروری میباشد',
            'members.'.$key.'.id_issue_date_year.required'=>$memberMessage.'سال صدور تذکره کاغذی ضروری میباشد',
            'members.'.$key.'.paper_id_files.required'=>$memberMessage.'آپلود تذکره کاغذی ضروری میباشد',
            'members.'.$key.'.digital_id_number.required'=>$memberMessage.'لطفا شماره درست تذکره الکترونیکی رئیس فامیل را تایپ کنید',
            'members.'.$key.'.photo.required_if'=>$memberMessage.'آپلود عکس ضروری میباشد',
            'members.'.$key.'.education_documents.required'=>$memberMessage.'آپلود اسناد تحصیلی ضروری میباشد',
            //'members.'.$key.'.digital_id_number.required'=>$memberMessage.'شماره تذکره الکترونیکی ضروری میباشد',
            'members.'.$key.'.military_service.required_if'=>$memberMessage.'انتخاب خدمت عسکری ضروری میباشد',
            'members.'.$key.'.relative_id_document.required'=>$memberMessage.'آپلود تذکره یکی از اقارب اصولی ضروری میباشد',
            'members.'.$key.'.first_gurantor_name.required'=>$memberMessage.'نام تضمین کننده اول ضروری میباشد',
            'members.'.$key.'.first_gurantor_surname.required'=>$memberMessage.'تخصل تضمین کننده اول ضروری میباشد',
            'members.'.$key.'.first_gurantor_father_name.required'=>$memberMessage.'نام پدر تضمین کننده اول ضروری میباشد',
            'members.'.$key.'.first_gurantor_father_surname.required'=>$memberMessage.'تخلص پدر تضمین کننده اول ضروری میباشد',
            'members.'.$key.'.first_gurantor_identity_type.required'=>$memberMessage.'انتخاب نوعیت تذکره تضمین کننده اول ضروری میباشد',
            'members.'.$key.'.first_gurantor_paper_id_year.numeric'=>$memberMessage.'سال کتاب باید عدد باشد',
            'members.'.$key.'.first_gurantor_paper_id_year.required'=>$memberMessage.'سال کتاب ضروری میباشد',
            'members.'.$key.'.first_gurantor_paper_id_volume.required'=>$memberMessage.'شماره جلد تذکره تضمین کننده اول ضروری میباشد',
            'members.'.$key.'.first_gurantor_paper_id_page.required'=>$memberMessage.'شماره صفحه تذکره تضمین کننده اول ضروری میباشد',
            'members.'.$key.'.first_gurantor_paper_id_page.max'=>$memberMessage.'شماره صفحه تذکره کاغذی بیشتر از  :max عدد شده نمیتواند.',
            'members.'.$key.'.first_gurantor_paper_id_registration.max'=>$memberMessage.'شماره ثبت تذکره کاغذی بیشتر از  :max عدد شده نمیتواند.',
            'members.'.$key.'.first_gurantor_paper_id_registration.required'=>$memberMessage.'شماره ثبت تذکره تضمین کننده اول ضروری میباشد',
            'members.'.$key.'.first_gurantor_paper_id_sokok.required'=>$memberMessage.'شماره صکوک تذکره تضمین کننده اول ضروری میباشد',
            'members.'.$key.'.first_gurantor_digital_id.required'=>$memberMessage.'شماره تذکره الکترونیکی تضمین کننده اول ضروری میباشد',
            'members.'.$key.'.first_gurantor_id_issue_place.province.required'=>$memberMessage.'ولایت صدور  تذکره تضمین کننده اول ضروری میباشد',
            'members.'.$key.'.first_gurantor_id_issue_place.district.required'=>$memberMessage.'ولسوالی صدور  تذکره تضمین کننده اول ضروری میباشد',
            'members.'.$key.'.first_gurantor_id_issue_date_day.required'=>$memberMessage.'روز صدور تذکره تضمین کننده اول ضروری میباشد',
            'members.'.$key.'.first_gurantor_id_issue_date_month.required'=>$memberMessage.'ماه صدور تذکره تضمین کننده اول ضروری میباشد',
            'members.'.$key.'.first_gurantor_id_issue_date_year.required'=>$memberMessage.'سال صدور تذکره تضمین کننده اول ضروری میباشد',
            'members.'.$key.'.first_gurantor_dob_day.required'=>$memberMessage.'روز تاریخ تولد تضمین کننده اول ضروری میباشد',
            'members.'.$key.'.first_gurantor_dob_month.required'=>$memberMessage.'ماه تاریخ تولد تضمین کننده اول ضروری میباشد',
            'members.'.$key.'.first_gurantor_dob_year.required'=>$memberMessage.'سال تاریخ تولد تضمین کننده اول ضروری میباشد',
            'members.'.$key.'.first_gurantor_gender.required'=>$memberMessage.'جنسیت تضمین کننده اول ضروری میباشد',
            'members.'.$key.'.first_gurantor_contact_no.required'=>$memberMessage.'شماره تماس تضمین کننده اول ضروری میباشد',
            'members.'.$key.'.second_gurantor_name.required'=>$memberMessage.'نام تضمین کننده دوم ضروری میباشد',
            'members.'.$key.'.second_gurantor_surname.required'=>$memberMessage.'تخصل تضمین کننده دوم ضروری میباشد',
            'members.'.$key.'.second_gurantor_father_name.required'=>$memberMessage.'نام پدر تضمین کننده دوم ضروری میباشد',
            'members.'.$key.'.second_gurantor_father_surname.required'=>$memberMessage.'تخلص پدر تضمین کننده دوم ضروری میباشد',
            'members.'.$key.'.second_gurantor_identity_type.required'=>$memberMessage.'انتخاب نوعیت تذکره تضمین کننده دوم ضروری میباشد',
            'members.'.$key.'.second_gurantor_paper_id_year.numeric'=>$memberMessage.'سال کتاب باید عدد باشد',
            'members.'.$key.'.second_gurantor_paper_id_year.required'=>$memberMessage.'سال کتاب ضروری میباشد',
            'members.'.$key.'.second_gurantor_paper_id_volume.required'=>$memberMessage.'شماره جلد تذکره تضمین کننده دوم ضروری میباشد',
            'members.'.$key.'.second_gurantor_paper_id_page.required'=>$memberMessage.'شماره صفحه تذکره تضمین کننده دوم ضروری میباشد',
            'members.'.$key.'.second_gurantor_paper_id_page.max'=>$memberMessage.'شماره صفحه تذکره کاغذی بیشتر از  :max عدد شده نمیتواند.',
            'members.'.$key.'.second_gurantor_paper_id_registration.max'=>$memberMessage.'شماره ثبت تذکره کاغذی بیشتر از  :max عدد شده نمیتواند.',
            'members.'.$key.'.second_gurantor_paper_id_registration.required'=>$memberMessage.'شماره ثبت تذکره تضمین کننده دوم ضروری میباشد',
            'members.'.$key.'.second_gurantor_paper_id_sokok.required'=>$memberMessage.'شماره صکوک تذکره تضمین کننده دوم ضروری میباشد',
            'members.'.$key.'.second_gurantor_digital_id.required'=>$memberMessage.'شماره تذکره الکترونیکی تضمین کننده دوم ضروری میباشد',
            'members.'.$key.'.second_gurantor_id_issue_place.province.required'=>$memberMessage.'ولایت صدور  تذکره تضمین کننده دوم ضروری میباشد',
            'members.'.$key.'.second_gurantor_id_issue_place.district.required'=>$memberMessage.'ولسوالی صدور  تذکره تضمین کننده دوم ضروری میباشد',
            'members.'.$key.'.second_gurantor_id_issue_date_day.required'=>$memberMessage.'روز صدور تذکره تضمین کننده دوم ضروری میباشد',
            'members.'.$key.'.second_gurantor_id_issue_date_month.required'=>$memberMessage.'ماه صدور تذکره تضمین کننده دوم ضروری میباشد',
            'members.'.$key.'.second_gurantor_id_issue_date_year.required'=>$memberMessage.'سال صدور تذکره تضمین کننده دوم ضروری میباشد',
            'members.'.$key.'.second_gurantor_dob_day.required'=>$memberMessage.'روز تاریخ تولد تضمین کننده دوم ضروری میباشد',
            'members.'.$key.'.second_gurantor_dob_month.required'=>$memberMessage.'ماه تاریخ تولد تضمین کننده دوم ضروری میباشد',
            'members.'.$key.'.second_gurantor_dob_year.required'=>$memberMessage.'سال تاریخ تولد تضمین کننده دوم ضروری میباشد',
            'members.'.$key.'.second_gurantor_gender.required'=>$memberMessage.'جنسیت تضمین کننده دوم ضروری میباشد',
            'members.'.$key.'.second_gurantor_contact_no.required'=>$memberMessage.'شماره تماس تضمین کننده دوم ضروری میباشد',
            'members.'.$key.'.reference_no.required'=>$memberMessage.'Please clear the cache of your browser using Ctrl+Shift+R on Chrome',
        ];
        $errorsMessages=array_merge($errorsMessages,$message);
    endforeach;
        $otherMessages=[
            'center_id.required'=>'لطفاً یکی از مراکز را انتخاب کنید.',
            'center_id.exists'=>'این مرکز موجود نمیباشد. لطفا یک مرکز دیگر را انتخاب نمایید.',
            'confirmation.accepted'=>'لطفاً  تصدیق می نمایم که معلومات ارایه شده صحت و مثق بوده.',
            'selectedAppointmentTime.appointment_date.required'=>'لطفاً وقت بازدید از مرکز انتخاب شده را انتخاب کنید',
           'family_members.required'=>' شما تنها معلومات یک فرد را درج نموده اید. درج معلومات تمام اعضای فامیل به شمول اعضای حاضر، متاهل، فوت شده و تبعه خارجی حتمی میباشد.'
        ];

        $errorsMessages=array_merge($errorsMessages,$otherMessages);

        return $errorsMessages;
    }

    public function isGurantorEIdDetailsRequired($gurantor_no,$memberKey){
         return $this->input('members.'.$memberKey.'.'.$gurantor_no.'_gurantor_identity_type') == 'تذکره الکترونیکی'; 
    }

    public function isValidFileFormat($memberKey){
       // dd($this->isMemberIdIssueInfoRequired($memberKey));
        if($this->isMemberIdIssueInfoRequired($memberKey) == false ){
            return false;
        }

        $allowedFormats = ['.jpg','.png'];

        $fileFormat = \App\Individualform::getFileFormat( $this->input('members.'.$memberKey.".paper_id_copy") );
        if(in_array($fileFormat,$allowedFormats)){
            return false;
        }

        return true;
    }
    public function getHeadOfFamily(){
        $members = $this->input('members');
        foreach($members as $m):
            if( isset($m['relationship_with_head_of_family']) && $m['relationship_with_head_of_family'] == 1 ){
                return $m;
            }
        endforeach;

        return false;
    }

    public function isDobValid($memberKey,$fail){
       
        $memberRelationship     = $this->input('members.'.$memberKey.".relationship_with_head_of_family");
        $headOfFamily           = $this->getHeadOfFamily();
     
        $head_dob_day           = isset($headOfFamily['birthday_day']) ? $headOfFamily['birthday_day'] :false;
        $head_dob_month         = isset($headOfFamily['birthday_month']) ? $headOfFamily['birthday_month'] :false;
        $head_dob_year          = isset($headOfFamily['birthday_year']) ? $headOfFamily['birthday_year'] :false;
        
            $member_dob_day     = $this->input('members.'.$memberKey.".birthday_day",false);
            $member_dob_month   = $this->input('members.'.$memberKey.".birthday_month",false);
            $member_dob_year    = $this->input('members.'.$memberKey.".birthday_year",false);
            if( $member_dob_day && $member_dob_month && $member_dob_year){
                try{
                    $head_of_family_dob     = new Jalalian($head_dob_year,$head_dob_month,$head_dob_day);
                    $head_of_family_dob     = $head_of_family_dob->toCarbon();   
                }catch(\Exception $e){
                    $this->dieMessage('members.'.$memberKey.'.birthday_day','تاریخ تولد غلط است. لطفا یک روز دیگر را انتخاب نمایید');
                }
          
            }else{
                return $fail('تاریخ تولد درست نیست');
            }
            if( \Carbon\Carbon::now()->subYears(18)->lt($head_of_family_dob) ){
                return $fail('عمر رییس فامیل باید بیشتر از ۱۸ سال باشد!');
            }
           
       
            if($member_dob_day !==false || $member_dob_month !== false || $member_dob_year!==false){
                try{
                    $member_dob             =  new Jalalian($member_dob_year,$member_dob_month,$member_dob_day);
                }catch(\Exception $e){
                    $this->dieMessage('members.'.$memberKey.'.birthday_day','تاریخ تولد غلط است. لطفا یک روز دیگر را انتخاب نمایید');
                    die();
                }
        
                $member_dob             = $member_dob->toCarbon();
               
                if($memberRelationship == 4 || $memberRelationship == 5){
            
                    if( $head_of_family_dob->lt($member_dob) == false ){
                        return $fail('تاریخ تولد پسر یا دختر نمیتواند قبل از تاریخ رییس فامیل باشد!');
                    }
                    if( $head_of_family_dob->lt($member_dob) == false ){
                        return $fail('تاریخ تولد پسر یا دختر نمیتواند قبل از تاریخ رییس فامیل باشد!');
                    }
                }
                if($memberRelationship == 6 || $memberRelationship == 7){
                    if( $head_of_family_dob->gt($member_dob) == false ){
                        return $fail('تاریخ تولد مادر یا پدر باید از تاریخ تولد رییس فامیل بزرگتر باشد!');
                    }
                }
            }
        
       
        
        return ;

    }


    public function isMoreThan18($memberKey){
        if($this->input('members.'.$memberKey.".birthday_year") == null || $this->input('members.'.$memberKey.".birthday_month") ==null || $this->input('members.'.$memberKey.".birthday_day") == null){
            return false;
        }
        try{
            $dobDate= new \Hijri($this->input('members.'.$memberKey.".birthday_year"),$this->input('members.'.$memberKey.".birthday_month"),
            $this->input('members.'.$memberKey.".birthday_day"));
            $dobDate = $dobDate->toCarbon();
            if( \Carbon\Carbon::now()->diffInYears($dobDate) >= 18  ){
                return true;
            }
        }
        catch(\Exception $e){
                return false;
        }
        return false;
    }

   
    public function isValidDigitalIdNumber($memberKey,$fail){
    
        $memberRelationship     = $this->input('members.'.$memberKey.".relationship_with_head_of_family");
        $value                  = $this->input('members.'.$memberKey.".digital_id_number");
        $has_digital_id         = $this->input('members.'.$memberKey.".has_digital_id");
      
        if($memberRelationship == "1"){  
            if( $has_digital_id == "1" && mb_strlen($value)!=13){
                
                $fail('لطفا شماره تذکره الکترونیکی رئیس را درست تایپ کنید.');
            }
        }

    }


    public function dieMessage($fieldName,$message){
        abort( response()->json(
            [
                'errors'=>[
                        $fieldName=>[$message]
                ]
            ], 401) 
        ); 
        die();
    }

    public function toEnglishNumber($num){
        $searchstrings = array(
            '۱',
            '۲',
            '۳',
            '۴',
            '۵',
            '۶',
            '۷',
            '۸',
            '۹',
            '۰',
        ); 
        // replace strings 
        $replacestrings= array("1", "2", "3", "4", "5", "6", "7", "8", "9", "0"); 

        // replace function 
        $result= str_replace($searchstrings , $replacestrings, $num); 
        return $result;
    }

    private function getRules($memberKey){
        $rules=[
            'members.'.$memberKey.'.name'=>['required','alpha_spaces',function($attribute,$value,$fail) use($memberKey){
                    $name       = $this->input('members.'.$memberKey.".name",'');
                    $surname    = $this->input('members.'.$memberKey.".surname",'');
                    $fullName   = $name." ".$surname;
                    if(mb_strlen($fullName) > 30){
                        return $fail('نام و تخلص باید بیشتر از 30 حرف نباشد!');
                    }

                    return false;
            }],
            'members.'.$memberKey.'.surname'=>['alpha_spaces'],
            'members.'.$memberKey.'.relationship_with_head_of_family'=>'required|digits_between:1,57',
            'members.'.$memberKey.'.father_name'=>['required','alpha_spaces',function($attribute,$value,$fail) use($memberKey){
                $name       = $this->input('members.'.$memberKey.".father_name",'');
                $surname    = $this->input('members.'.$memberKey.".father_surname",'');
                $fullName   = $name." ".$surname;
                if(mb_strlen($fullName) > 30){
                    return $fail('نام و تخلص پدر باید بیشتر از 30 حرف نباشد!');
                }

                return false;
             }],
            'members.'.$memberKey.'.grand_father_name'=>'required|alpha_spaces',
            'members.'.$memberKey.'.grand_father_surname'=>['alpha_spaces',function($attribute,$value,$fail) use($memberKey){
                $name       = $this->input('members.'.$memberKey.".grand_father_name",'');
                $surname    = $this->input('members.'.$memberKey.".grand_father_surname",'');
                $fullName   = $name." ".$surname;
                if(mb_strlen($fullName) > 30){
                    return $fail('نام و تخلص پدر کلان باید بیشتر از 30 حرف نباشد!');
                }

                return false;
             }],
            'members.'.$memberKey.'.gender'=>'required',
            'members.'.$memberKey.'.living_status'=>'required',
            'members.'.$memberKey.'.apply_for_new_id'=>[Rule::requiredIf($this->input('members.'.$memberKey.'.living_status') == '1')],
            'members.'.$memberKey.'.english_name'=>[
                    'required_if:members.'.$memberKey.'.apply_for_new_id,"بلی"',
                    'alpha_spaces',
                    function($attribute,$value,$fail) use($memberKey){
                    $name       = $this->input('members.'.$memberKey.".english_name",'');
                    $surname    = $this->input('members.'.$memberKey.".english_surname",'');
                    $fullName   = $name." ".$surname;
                    if(mb_strlen($fullName) > 30){
                        return $fail('نام و تخلص انگلیسی باید بیشتر از 30 حرف نباشد!');
                    }

                    return false;
            }],
                'members.'.$memberKey.'.english_surname'=>['alpha_spaces'],
                'members.'.$memberKey.'.partner_name'=>['max:30'],
                'members.'.$memberKey.'.occupation'=>['max:60'],
                'members.'.$memberKey.'.mother_name'=>'required_if:members.'.$memberKey.'.apply_for_new_id,"بلی"|alpha_spaces|max:30',
                'members.'.$memberKey.'.mother_husband_name'=>'alpha_spaces',
                'members.'.$memberKey.'.birth_place.country'=>'required_if:members.'.$memberKey.'.apply_for_new_id,"بلی"',
                'members.'.$memberKey.'.birth_place.province'=>'required_if:members.'.$memberKey.'.apply_for_new_id,"بلی"|alpha_spaces',
                'members.'.$memberKey.'.birth_place.district'=>'required_if:members.'.$memberKey.'.apply_for_new_id,"بلی"',
                'members.'.$memberKey.'.birthday_day'=>'required_if:members.'.$memberKey.'.apply_for_new_id,"بلی"',
                'members.'.$memberKey.'.birthday_month'=>'required_if:members.'.$memberKey.'.apply_for_new_id,"بلی"',
                'members.'.$memberKey.'.birthday_year'=>[function($attribute,$value,$fail) use($memberKey){
                   if($this->input('members.'.$memberKey.".birthday_year")){
                     
                        if($memberKey == '*'){
                            return false ;
                        }
      
                        return $this->isDobValid($memberKey,$fail);
                           
                        
                   }
                
                },
                'required_if:members.'.$memberKey.'.apply_for_new_id,"بلی"'
                ],
                'members.'.$memberKey.'.military_service'=>'nullable|boolean|required_if:members.'.$memberKey.'.apply_for_new_id,"بلی"',
                'members.'.$memberKey.'.is_educated'=>'nullable|boolean',
                'members.'.$memberKey.'.education_level'=>'required_if:is_educated,true',
                'members.'.$memberKey.'.original_residence.village'=>[
                    'required_if:members.'.$memberKey.'.apply_for_new_id,"بلی"'],
                'members.'.$memberKey.'.original_residence.district'=>['required_if:members.'.$memberKey.'.apply_for_new_id,"بلی"'],
                'members.'.$memberKey.'.original_residence.province'=>'required_if:members.'.$memberKey.'.apply_for_new_id,"بلی"',
                'members.'.$memberKey.'.current_residence.village'=>['required_if:members.'.$memberKey.'.apply_for_new_id,"بلی"'],
                'members.'.$memberKey.'.current_residence.district'=>'required_if:members.'.$memberKey.'.apply_for_new_id,"بلی"',
                'members.'.$memberKey.'.current_residence.province'=>'required_if:members.'.$memberKey.'.apply_for_new_id,"بلی"',
                'members.'.$memberKey.'.primary_contact_no'=>'required_if:members.'.$memberKey.'.apply_for_new_id,"بلی"|max:16',
                'members.'.$memberKey.'.secondary_contact_no'=>'max:16',
                'members.'.$memberKey.'.email_address'=>'nullable|email|max:60',
                'members.'.$memberKey.'.mother_tongue'=>'required_if:members.'.$memberKey.'.apply_for_new_id,"بلی"',
                'members.'.$memberKey.'.marital_status'=>['required_if:members.'.$memberKey.'.apply_for_new_id,"بلی"','required_if:members.'.$memberKey.'.relationship_with_head_of_family,"1"'  ],
                'members.'.$memberKey.'.blood_group'=>[ Rule::in(['O-','O+','AB-','AB+','B-','B+','A-','A+','','نا معلوم'] )],
                'members.'.$memberKey.'.disability_type'=>[ Rule::in(['نه / نخیر','کلی','قسمی','']) ],
                'members.'.$memberKey.'.is_kochi'=>'nullable|boolean|required_if:members.'.$memberKey.'.apply_for_new_id,"بلی"',
                'members.'.$memberKey.'.ethnicity'=>'required_if:members.'.$memberKey.'.apply_for_new_id,"بلی"',
                'members.'.$memberKey.'.religion'=>'required_if:members.'.$memberKey.'.apply_for_new_id,"بلی"',
                //'members.'.$memberKey.'.religion_sector'=>'required_if:members.'.$memberKey.'.apply_for_new_id,"بلی"',
             
                'members.'.$memberKey.'.has_second_citizenship'=>'boolean',
                'members.'.$memberKey.'.kochi_spring_residence_district'=>'required_if:is_kochi,1',
                'members.'.$memberKey.'.kochi_spring_residence_province'=>'required_if:is_kochi,1',
                'members.'.$memberKey.'.kochi_winter_residence_district'=>'required_if:is_kochi,1',
                'members.'.$memberKey.'.kochi_winter_residence_province'=>'required_if:is_kochi,1',
               // 'members.'.$memberKey.'.id_issue_place.province'=>[Rule::requiredIf( $this->isMemberIdIssueInfoRequired($memberKey)) ],
                //'members.'.$memberKey.'.id_issue_place.district'=>[Rule::requiredIf( $this->isMemberIdIssueInfoRequired($memberKey) )],
                //'members.'.$memberKey.'.id_issue_place.village'=>[Rule::requiredIf( $this->isMemberIdIssueInfoRequired($memberKey) )],
                'members.'.$memberKey.'.id_issue_date_day'=>[Rule::requiredIf( $this->isMemberIdIssueInfoRequired($memberKey) )],
                'members.'.$memberKey.'.id_issue_date_month'=>[Rule::requiredIf( $this->isMemberIdIssueInfoRequired($memberKey) )],
                'members.'.$memberKey.'.identification_type'=>'required_if:members.'.$memberKey.'.apply_for_new_id,"بلی"',
                'members.'.$memberKey.'.id_issue_date_year'=>[Rule::requiredIf( $this->isMemberIdIssueInfoRequired($memberKey) ),
                function($attribute,$value,$fail) use($memberKey){
                    if($this->input('members.'.$memberKey.".apply_for_new_id") == "بلی" && $this->input('members.'.$memberKey.".birthday_year")){
                        if($memberKey == '*'){
                            return false ;
                        }
                        $dobDate= $this->input('members.'.$memberKey.".birthday_year")."-".$this->input('members.'.$memberKey.".birthday_month")."-".$this->input('members.'.$memberKey.".birthday_day");
                        $issueDate= $this->input('members.'.$memberKey.'.id_issue_date_year')."-".$this->input('members.'.$memberKey.'.id_issue_date_month')."-".$this->input('members.'.$memberKey.'.id_issue_date_day');
                        //Validating Qamari Date
                        if($this->input('members.'.$memberKey.'.id_issue_date_year')){
                            $year = $this->input('members.'.$memberKey.'.id_issue_date_year');
                            $year=$this->toEnglishNumber($year);
                            $thisYear = \Hijri::now();
                            //If Shamsi year is smaller than Qamari year, assume qamari year was entered by the user
                            if($thisYear->format('Y')  < $year){
                                $year = $year-43;
                                $issueDate =  $year."-".$this->input('members.'.$memberKey.'.id_issue_date_month')."-".$this->input('members.'.$memberKey.'.id_issue_date_day');
                             
                            }

                        }
                 
                        if( $this->input('members.'.$memberKey.'.identification_type') == 'تذکره  دارد' && $this->dobIsSmallerThanIssueDate($dobDate,$issueDate) == false ){
                            return $fail('تذکره شما نمیتواند قبل از تولد شما صادر شده باشد. لطفا تاریخ تولد یا تاریخ صدور تذکره را مرور نماید!');
                        }
                        //return $this->isDobValid($memberKey,$fail);
                           
                        
                    }
                
                }
                ],
                'members.'.$memberKey.'.paper_id_year'=>[Rule::requiredIf( $this->isMemberIdIssueInfoRequired($memberKey) ),new MaxLength(4), new NumericIf($this->isMemberIdIssueInfoRequired($memberKey),'سال تذکره کاغذی')],
                'members.'.$memberKey.'.paper_id_volume'=>[Rule::requiredIf( $this->isMemberIdIssueInfoRequired($memberKey) ),'max:11'],
                'members.'.$memberKey.'.paper_id_page'=>[Rule::requiredIf( $this->isMemberIdIssueInfoRequired($memberKey) ),new NumericIf($this->isMemberIdIssueInfoRequired($memberKey),'صفحه تذکره کاغذی'),new MaxLength(3,'صفحه تذکره کاغذی')],
                'members.'.$memberKey.'.paper_id_registration'=>[Rule::requiredIf( $this->isMemberIdIssueInfoRequired($memberKey) ),new NumericIf($this->isMemberIdIssueInfoRequired($memberKey),'ثبت تذکره کاغذی'),new MaxLength(4,'ثبت تذکره کاغذی')],
                'members.'.$memberKey.'.paper_id_sokok'=>[Rule::requiredIf( $this->isMemberIdIssueInfoRequired($memberKey) ),new NumericIf($this->isMemberIdIssueInfoRequired($memberKey),'صکوک تذکره کاغذی'),new MaxLength(10,'صکوک تذکره کاغذی')],
                'members.'.$memberKey.'.paper_id_files'=>[Rule::requiredIf( $this->isMemberIdIssueInfoRequired($memberKey) )],
                'members.'.$memberKey.'.photo'=>[function($attribute,$value,$fail) use($memberKey){
                if($this->input('members.'.$memberKey.".birthday_year") && $this->input('members.'.$memberKey.".birthday_month") && $this->input('members.'.$memberKey.".birthday_day")){
              
                        if($memberKey == '*'){
                            return false;
                            
                        }
                        $dobDate= new \Hijri($this->input('members.'.$memberKey.".birthday_year"),$this->input('members.'.$memberKey.".birthday_month"),$this->input('members.'.$memberKey.".birthday_day"));
                        $dobDate = $dobDate->toCarbon();
                        if( \Carbon\Carbon::now()->diffInYears($dobDate) > 5  && $this->input('members.'.$memberKey.".apply_for_new_id") == "بلی" && ($this->input('members.'.$memberKey.".photo") =="" || $this->input('members.'.$memberKey.".photo") ==[])){
                            return $fail('تمام اشخاص که سن آن بیشتر از ۶ سال باشد باید عکس خود را آپلود نمایند');
                        }
                        
                      
               
                        
                    }
                
                }],
              //  'members.'.$memberKey.'.education_documents'=>[Rule::requiredIf( $this->isEducationDocumentsRequired($memberKey) ) ],
                'members.'.$memberKey.'.digital_id_number'=>[function($attribute,$value,$fail) use($memberKey){
                        if($memberKey == '*'){
                            return false ;
                        }
               
                        return $this->isValidDigitalIdNumber($memberKey,$fail);
                }],
                'members.'.$memberKey.'.relative_id_document'=>[Rule::requiredIf( $this->isGurantorRequired($memberKey) && $this->isMoreThan18($memberKey) )],
                'members.'.$memberKey.'.first_gurantor_name'=>[Rule::requiredIf( $this->isGurantorRequired($memberKey) ),function($attribute,$value,$fail) use($memberKey){
                    $name       = $this->input('members.'.$memberKey.".first_gurantor_name",'');
                    $surname    = $this->input('members.'.$memberKey.".first_gurantor_surname",'');
                    $fullName   = $name." ".$surname;
                    if(mb_strlen($fullName) > 30){
                        return $fail('نام و تخلص تصدیق کننده اولی باید بیشتر از 30 حرف نباشد!');
                    }

                    return false;
                }],
                'members.'.$memberKey.'.first_gurantor_father_name'=>[
                    Rule::requiredIf( $this->isGurantorRequired($memberKey)),
                    function($attribute,$value,$fail) use($memberKey){
                        $name       = $this->input('members.'.$memberKey.".first_gurantor_father_name",'');
                        $surname    = $this->input('members.'.$memberKey.".first_gurantor_father_surname",'');
                        $fullName   = $name." ".$surname;
                        if(mb_strlen($fullName) > 30){
                            return $fail('نام و تخلص پدر تصدیق کننده اولی باید بیشتر از 30 حرف نباشد!');
                        }

                        return false;
                    }
                ],
                'members.'.$memberKey.'.first_gurantor_identity_type'=>Rule::requiredIf( $this->isGurantorRequired($memberKey) ),
                'members.'.$memberKey.'.first_gurantor_paper_id_year'=>[Rule::requiredIf( $this->isGurantorPaperIdDetailsRequired('first',$memberKey))],
                'members.'.$memberKey.'.first_gurantor_paper_id_volume'=>[Rule::requiredIf( $this->isGurantorPaperIdDetailsRequired('first',$memberKey))],
                'members.'.$memberKey.'.first_gurantor_paper_id_page'=>[Rule::requiredIf( $this->isGurantorPaperIdDetailsRequired('first',$memberKey)),'max:3'],
                'members.'.$memberKey.'.first_gurantor_paper_id_registration'=>[Rule::requiredIf( $this->isGurantorPaperIdDetailsRequired('first',$memberKey)),'max:4'],
                'members.'.$memberKey.'.first_gurantor_paper_id_sokok'=>[Rule::requiredIf( $this->isGurantorPaperIdDetailsRequired('first',$memberKey))],
                'members.'.$memberKey.'.first_gurantor_digital_id'=>[Rule::requiredIf( $this->isGurantorEIdDetailsRequired('first',$memberKey))],
                'members.'.$memberKey.'.first_gurantor_id_issue_place.province'=>[Rule::requiredIf( $this->isGurantorPaperIdDetailsRequired('first',$memberKey))],
                'members.'.$memberKey.'.first_gurantor_id_issue_place.district'=>[Rule::requiredIf( $this->isGurantorPaperIdDetailsRequired('first',$memberKey))],
                'members.'.$memberKey.'.first_gurantor_id_issue_date_day'=>[Rule::requiredIf( $this->isGurantorPaperIdDetailsRequired('first',$memberKey))],
                'members.'.$memberKey.'.first_gurantor_id_issue_date_month'=>[Rule::requiredIf( $this->isGurantorPaperIdDetailsRequired('first',$memberKey))],
                'members.'.$memberKey.'.first_gurantor_id_issue_date_year'=>[Rule::requiredIf( $this->isGurantorPaperIdDetailsRequired('first',$memberKey))],
               // 'members.'.$memberKey.'.first_gurantor_gender'=>Rule::requiredIf( $this->isGurantorRequired($memberKey)),
                'members.'.$memberKey.'.first_gurantor_dob_day'=>Rule::requiredIf( $this->isGurantorRequired($memberKey) ),
                'members.'.$memberKey.'.first_gurantor_dob_month'=>Rule::requiredIf( $this->isGurantorRequired($memberKey)),
                'members.'.$memberKey.'.first_gurantor_dob_year'=>Rule::requiredIf( $this->isGurantorRequired($memberKey) ),
                'members.'.$memberKey.'.first_gurantor_contact_no'=>Rule::requiredIf( $this->isGurantorRequired($memberKey) ),
                'members.'.$memberKey.'.second_gurantor_name'=>[Rule::requiredIf( $this->isGurantorRequired($memberKey)),function($attribute,$value,$fail) use($memberKey){
                    $name       = $this->input('members.'.$memberKey.".second_gurantor_name",'');
                    $surname    = $this->input('members.'.$memberKey.".second_gurantor_surname",'');
                    $fullName   = $name." ".$surname;
                    if(mb_strlen($fullName) > 30){
                        return $fail('نام و تخلص تصدیق کننده دومی باید بیشتر از 30 حرف نباشد!');
                    }

                    return false;
                }],
                'members.'.$memberKey.'.second_gurantor_father_name'=>[
                    Rule::requiredIf( $this->isGurantorRequired($memberKey)),
                    function($attribute,$value,$fail) use($memberKey){
                        $name       = $this->input('members.'.$memberKey.".second_gurantor_father_name",'');
                        $surname    = $this->input('members.'.$memberKey.".second_gurantor_father_surname",'');
                        $fullName   = $name." ".$surname;
                        if(mb_strlen($fullName) > 30){
                            return $fail('نام و تخلص پدر تصدیق کننده دومی باید بیشتر از 30 حرف نباشد!');
                        }

                        return false;
                    }
                ],
                'members.'.$memberKey.'.second_gurantor_identity_type'=>Rule::requiredIf( $this->isGurantorRequired($memberKey)),
                'members.'.$memberKey.'.second_gurantor_paper_id_year'=>[Rule::requiredIf( $this->isGurantorPaperIdDetailsRequired('second',$memberKey))],
                'members.'.$memberKey.'.second_gurantor_paper_id_volume'=>[Rule::requiredIf( $this->isGurantorPaperIdDetailsRequired('second',$memberKey))],
                'members.'.$memberKey.'.second_gurantor_paper_id_page'=>[Rule::requiredIf( $this->isGurantorPaperIdDetailsRequired('second',$memberKey)),'max:3'],
                'members.'.$memberKey.'.second_gurantor_paper_id_registration'=>[Rule::requiredIf( $this->isGurantorPaperIdDetailsRequired('second',$memberKey)),'max:4'],
                'members.'.$memberKey.'.second_gurantor_paper_id_sokok'=>[Rule::requiredIf( $this->isGurantorPaperIdDetailsRequired('second',$memberKey))],
                'members.'.$memberKey.'.second_gurantor_digital_id'=>[Rule::requiredIf( $this->isGurantorEIdDetailsRequired('second',$memberKey))],
                'members.'.$memberKey.'.second_gurantor_id_issue_place.province'=>[Rule::requiredIf( $this->isGurantorPaperIdDetailsRequired('second',$memberKey))],
                'members.'.$memberKey.'.second_gurantor_id_issue_place.district'=>[Rule::requiredIf( $this->isGurantorPaperIdDetailsRequired('second',$memberKey))],
                'members.'.$memberKey.'.second_gurantor_id_issue_date_day'=>[Rule::requiredIf( $this->isGurantorPaperIdDetailsRequired('second',$memberKey))],
                'members.'.$memberKey.'.second_gurantor_id_issue_date_month'=>[Rule::requiredIf( $this->isGurantorPaperIdDetailsRequired('second',$memberKey))],
                'members.'.$memberKey.'.second_gurantor_id_issue_date_year'=>[Rule::requiredIf( $this->isGurantorPaperIdDetailsRequired('second',$memberKey))],
               // 'members.'.$memberKey.'.second_gurantor_gender'=>Rule::requiredIf( $this->isGurantorRequired($memberKey)),
                'members.'.$memberKey.'.second_gurantor_dob_day'=>Rule::requiredIf( $this->isGurantorRequired($memberKey)),
                'members.'.$memberKey.'.second_gurantor_dob_month'=>Rule::requiredIf( $this->isGurantorRequired($memberKey)),
                'members.'.$memberKey.'.second_gurantor_dob_year'=>Rule::requiredIf( $this->isGurantorRequired($memberKey)),
                'members.'.$memberKey.'.second_gurantor_contact_no'=>Rule::requiredIf( $this->isGurantorRequired($memberKey)),
            ];
            $reference_no = $this->input('members.'.$memberKey.'.reference_no');
            if($reference_no){
                $isCancelled=\App\Individualform::where('apply_for_new_id','بلی')->where('reference_no',$reference_no)->where('status',13)->exists();
                if($isCancelled){
                    $rules['members.'.$memberKey.'.reference_no']='required';
                }
            }
       

            return $rules;
    }
}
