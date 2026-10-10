<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Individualform;
use App\Village;
class Familyform extends Model
{

    protected $appends=['original_residence','current_residence','head_id_issue'];
    public function setData($request){
        $this->session_id                   = uniqid().rand(10,100).uniqid();
        $this->head_of_family_name          = $request->input('head_of_family_name');
        $this->head_of_family_surname       = $request->input('head_of_family_surname');
        $this->fathername                   = $request->input('fathername');
        $this->father_surname               = $request->input('father_surname','');
        $this->grand_father_name            = $request->input('grand_father_name');
        $this->grand_father_surname         = $request->input('grand_father_surname','');
        $this->dob_day                      = $request->input('dob_day');
        $this->dob_month                    = $request->input('dob_month');
        $this->dob_year                     = $request->input('dob_year');
        $this->gender                       = $request->input('gender');
        $this->marital_status               = $request->input('marital_status','');
        $this->partner_name                 = $request->input('partner_name','');
        $this->partner_surname              = $request->input('partner_surname','');
        $this->original_residence_village   = $request->input('original_residence.village','');
        $this->original_residence_district  = $request->input('original_residence.district','');
        $this->original_residence_district_code  = Village::getDistrictCode($request->input('original_residence.district',''));
        $this->original_residence_province  = $request->input('original_residence.province','');
        $this->current_residence_village    = $request->input('current_residence.village','');
        $this->current_residence_district   = $request->input('current_residence.district','');
        $this->current_residence_district_code   = Village::getDistrictCode($request->input('current_residence.district',''));
        $this->current_residence_province   = $request->input('current_residence.province','');
        $this->head_id_volume               = $request->input('head_id_volume','');
        $this->head_id_page                 = $request->input('head_id_page','');
        $this->head_id_page                 = $request->input('head_id_page','');
        $this->head_id_registration         = $request->input('head_id_registration','');
        $this->head_id_sokok                = $request->input('head_id_sokok','');
        $this->head_id_issue_province       = $request->input('head_id_issue.province','');
        $this->head_id_issue_district       = $request->input('head_id_issue.district','');
        $this->head_id_issue_district_code       = Village::getDistrictCode($request->input('head_id_issue.district',''));
        $this->head_id_issue_date_day       = $request->input('head_id_issue_date_day',0);
        $this->head_id_issue_date_month     = $request->input('head_id_issue_date_month',0);
        $this->head_id_issue_date_year      = $request->input('head_id_issue_date_year',0);
        $this->reference_no                 = Familyform::generateReferenceNo();

        return $this;
    }

    public static function generateReferenceNo(){
        return Familyform::random(8);
    }


    public static function saveForm($request){
        $familyForm = new Familyform;
        $familyForm->setData($request);
  
       
        if( $familyForm->save() ){
            $individualForms=Individualform::formatData($request,$familyForm);
          
            foreach($individualForms as $form):
                $form['reference_no'] = Individualform::generateReferenceNo($familyForm->reference_no,$familyForm->individualForm()->count());
           
                    $result=$familyForm->individualForm()->create($form);
                
                    $result->markAsReceived();
              
             
               
             
              
         
            endforeach;
           
        }
        return [
            'reference_no'=>$familyForm->reference_no,
            'applications'=>$familyForm->individualFormIds(),
            'path'=>config('app.url')."/print-individual-form?reference_no=".$familyForm->reference_no."&session_id=".$familyForm->session_id
        ];
    }

    public function individualForm(){
        return $this->hasMany(\App\Individualform::class,'family_form_reference_no','reference_no');
    }

    public function applied(){
        return $this->hasMany(\App\Individualform::class,'family_form_reference_no','reference_no')->where('apply_for_new_id','بلی');
    }

    public function getOriginalResidenceAttribute(){
        return [
            'village'=>$this->original_residence_village,
            'district'=>$this->original_residence_district,
            'province'=>$this->original_residence_province
         
        ];
    }

    public function getCurrentResidenceAttribute(){
        return [
            'village'=>$this->current_residence_village,
            'district'=>$this->current_residence_district,
            'province'=>$this->current_residence_province
         
        ];
    }

    public function getHeadIdIssueAttribute(){
        return [
            'district'=>$this->head_id_issue_district,
            'province'=>$this->head_id_issue_province
         
        ];
    }

    public static function hasAtLeastOneApplication($request){
        $members = $request->input('members',[]);
        foreach($members as $m):
            if( isset($m['apply_for_new_id']) && $m['apply_for_new_id'] == 'بلی'){
                return true;
            }
        endforeach;

        return false;
    }
    public function individualFormIds(){
        return $this->applied()->get()->map(function($a){
            return ['name'=>$a->name,'reference_no'=>$a->reference_no];
        });
    }

    public function centerName(){
        $form = $this->individualForm()->first();
        if($form){
            $center = $form->center()->first();
            if($center){
                return $center->name." ".$center->village." ".$center->town." ".$center->province;
            }
           
        }
        return '';
    }

    public static function random($limit){
            $code = '';
            for($i = 0; $i < $limit; $i++) { 
                $code .= mt_rand(0, 9); 
            }
         
            $code   =$code;
            if(Familyform::where('reference_no',$code)->exists()){
                return Familyform::random($limit);
            }
          
            return $code;
    }
}
