<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Familyform;
class Savedform extends Model
{
    protected $casts=[
        'data'=>'array'
    ];
    protected $appends=['appointment'];

    public function setApplicationId(){
        $application_id         = Savedform::random(9);
        $exists                 = Savedform::where('application_id',$application_id)->exists();
        $familyFormExists       = \App\Individualform::where('family_form_reference_no',$application_id)->exists();
        if($exists){
            return $this->setApplicationId();
        }
        if($familyFormExists){
            return $this->setApplicationId();
        }
        $this->application_id   = $application_id;
        return $this->application_id;
    }
           
 
    public function getDataAttribute($val){
        $data = json_decode($val,true);
        if(is_array($data)){
           
            foreach($data['members'] as $key=>$m):
                if(isset($data['members'][$key]['birth_town'])){

                    $data['members'][$key]['place_of_birth']= [
                        'birth_town'=>$data['members'][$key]['birth_town'],
                        'birth_province'=>$data['members'][$key]['birth_province'],
                        'birth_country'=>$data['members'][$key]['birth_country']
                    ];
                }
                if(isset($data['members'][$key]['paper_id_page'])){

                    $data['members'][$key]['paper_id_no']= [
                        'paper_id_year'=>$data['members'][$key]['paper_id_year'],
                        'paper_id_page'=>$data['members'][$key]['paper_id_page'],
                        'paper_id_volume'=>$data['members'][$key]['paper_id_volume'],
                        'paper_id_registration'=>$data['members'][$key]['paper_id_registration'],
                        'paper_id_sokok'=>$data['members'][$key]['paper_id_sokok']
                        
                    ];
                }
                if(isset($data['members'][$key]['relationship_with_head_of_family'])){
                    $data['members'][$key]['relationship_with_head_of_family'] = (int) $data['members'][$key]['relationship_with_head_of_family'];
                }
                if(isset($data['members'][$key]['id_issue_date_day'])){

                    $data['members'][$key]['id_issue_date']= [
                        'id_issue_date_day'=>$data['members'][$key]['id_issue_date_day'],
                        'id_issue_date_month'=>$data['members'][$key]['id_issue_date_month'],
                        'id_issue_date_year'=>$data['members'][$key]['id_issue_date_year'],
                      
                    ];
                }
                if(isset($data['members'][$key]['primary_contact_no'])){

                    $data['members'][$key]['contact_numbers']= [
                        'primary_contact_no'=>$data['members'][$key]['primary_contact_no'],
                        'secondary_contact_no'=>$data['members'][$key]['secondary_contact_no'],
                       
                      
                    ];
                }
                
            if(isset($data['members'][$key]['birthday_day'])){
                $data['members'][$key]['dob']=[
                    'birthday_day'=>  $data['members'][$key]['birthday_day'],
                    'birthday_month'=>$data['members'][$key]['birthday_month'],
                    'birthday_year'=>$data['members'][$key]['birthday_year']
                ];
            }
            
            
            if(isset( $data['members'][$key]['first_gurantor_dob_day'] )){
                $data['members'][$key]['first_gurantor_dob']=[
                    'first_gurantor_dob_day'=>$data['members'][$key]['first_gurantor_dob_day'],
                    'first_gurantor_dob_month'=>$data['members'][$key]['first_gurantor_dob_month'],
                    'first_gurantor_dob_year'=>$data['members'][$key]['first_gurantor_dob_year']
                ];
            }
            if(isset( $data['members'][$key]['second_gurantor_dob_day'] )){
                $data['members'][$key]['second_gurantor_dob']=[
                    'second_gurantor_dob_day'=>$data['members'][$key]['second_gurantor_dob_day'],
                    'second_gurantor_dob_month'=>$data['members'][$key]['second_gurantor_dob_month'],
                    'second_gurantor_dob_year'=>$data['members'][$key]['second_gurantor_dob_year']
                ];
            }

            if(isset( $data['members'][$key]['military_entry_date_day'] )){
                $data['members'][$key]['military_service_entry_date']=[
                    'military_entry_date_day'=>$data['members'][$key]['military_entry_date_day'],
                    'military_entry_date_month'=>$data['members'][$key]['military_entry_date_month'],
                    'military_entry_date_year'=>$data['members'][$key]['military_entry_date_year'],
           
                ];
            }
            if(isset( $data['members'][$key]['military_exit_date_day'] )){
                $data['members'][$key]['military_service_exit_date']=[
                    'military_exit_date_day'=>$data['members'][$key]['military_exit_date_day'],
                    'military_exit_date_month'=>$data['members'][$key]['military_exit_date_month'],
                    'military_exit_date_year'=>$data['members'][$key]['military_exit_date_year'],
           
                ];
            }

      


            if(isset($data['members'][$key]['first_gurantor_id_issue_date_day'])){
                $data['members'][$key]['first_gurantor_id_issue_date']= [
                    'first_gurantor_id_issue_date_day'=>$data['members'][$key]['first_gurantor_id_issue_date_day'],
                    'first_gurantor_id_issue_date_month'=>$data['members'][$key]['first_gurantor_id_issue_date_month'],
                    'first_gurantor_id_issue_date_year'=>$data['members'][$key]['first_gurantor_id_issue_date_year'],
                  
                ];
            }

            if(isset($data['members'][$key]['second_gurantor_id_issue_date_day'])){
                $data['members'][$key]['second_gurantor_id_issue_date']= [
                    'second_gurantor_id_issue_date_day'=>$data['members'][$key]['second_gurantor_id_issue_date_day'],
                    'second_gurantor_id_issue_date_month'=>$data['members'][$key]['second_gurantor_id_issue_date_month'],
                    'second_gurantor_id_issue_date_year'=>$data['members'][$key]['second_gurantor_id_issue_date_year'],
                  
                ];
            }
            if(isset($data['members'][$key]['first_gurantor_paper_id_year'])){

                $data['members'][$key]['first_gurantor_paper_id']= [
                    'first_gurantor_paper_id_year'=>$data['members'][$key]['first_gurantor_paper_id_year'],
                    'first_gurantor_paper_id_page'=>$data['members'][$key]['first_gurantor_paper_id_page'],
                    'first_gurantor_paper_id_volume'=>$data['members'][$key]['first_gurantor_paper_id_volume'],
                    'first_gurantor_paper_id_registration'=>$data['members'][$key]['first_gurantor_paper_id_registration'],
                    'first_gurantor_paper_id_sokok'=>$data['members'][$key]['first_gurantor_paper_id_sokok']
                    
                ];
            }

            if(isset($data['members'][$key]['second_gurantor_paper_id_year'])){

                $data['members'][$key]['second_gurantor_paper_id']= [
                    'second_gurantor_paper_id_year'=>$data['members'][$key]['second_gurantor_paper_id_year'],
                    'second_gurantor_paper_id_page'=>$data['members'][$key]['second_gurantor_paper_id_page'],
                    'second_gurantor_paper_id_volume'=>$data['members'][$key]['second_gurantor_paper_id_volume'],
                    'second_gurantor_paper_id_registration'=>$data['members'][$key]['second_gurantor_paper_id_registration'],
                    'second_gurantor_paper_id_sokok'=>$data['members'][$key]['second_gurantor_paper_id_sokok']
                    
                ];
            }
            

            

           
            endforeach;
            
        }

        return $data;
    }
    

    public static function random($limit){
        $code = '';
        for($i = 0; $i < $limit; $i++) { 
            $code .= mt_rand(0, $limit); 
        }  
        return $code;
    }

    public function getAppointmentAttribute(){
        $application = \DB::table('familyapplications')->where('status',13)->where('family_form_reference_no',$this->application_id)->first();
        if(!$application){
            return false;
        }
        $appointment = \App\Appointment::where('family_form_reference_no',$application->family_form_reference_no)->first();
        if(!$appointment){
            return false;
        }
        $hijriDate = \Hijri::fromFormat('Y-m-d',$appointment->appointment_date);
        $center     = \App\Center::where('id',$appointment->center_id)->first();
        $date = [
                'center_id'=>$appointment->center_id,
                'center_province'=>$center->province,
                'month'=> $hijriDate->format('l')." ".$hijriDate->format('d')." ".\App\HijriMonth::getMonthName($hijriDate->format('m'))." ".$hijriDate->format('Y'),
                'times'=>[
                    [
                    'appointment_date_day_label'=>$hijriDate->format('l'),
                    'appointment_date_day'=>$hijriDate->format('d'),
                    'appointment_date_month'=>$hijriDate->format('m'),
                    'appointment_date_month_label'=>\App\HijriMonth::getMonthName($hijriDate->format('m')),
                    'appointment_date_year'=>$hijriDate->format('Y'),
                    'appointment_date'=>$hijriDate->format('Y-m-d'),
                    'number_of_appointments'=>1,
                    'start'=>$appointment->start_time,
                    'start_label'=>Appointment::formatTime($appointment->start_time),
                    'label'=>Appointment::formatTime($appointment->start_time)." الی ".Appointment::formatTime($appointment->end_time),
                    'end'=>$appointment->end_time,
                    'end_label'=>Appointment::formatTime($appointment->end_time)
                ]]
        ];
        return $date;
    }

    public static function cleanUp(){
        $today      = \Carbon\Carbon::now();
        $savedForms = Savedform::where('created_at','<',$today->format('Y-m-d 00-00-00'))->where('data','like','%"members":[]%')->delete();
        return $savedForms;
    }
    
    public function canRetreiveInfo(){
        return \App\Individualform::where('family_form_reference_no',$this->application_id)->where('apply_for_new_id','بلی')->where('status',13)->exists();
    }
 
}
