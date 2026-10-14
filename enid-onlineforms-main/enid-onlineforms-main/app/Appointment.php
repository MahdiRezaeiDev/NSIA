<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use \Hijri;
use App\Center;
class Appointment extends Model
{
    public static function days(){
        $days =[];
        $day  = 1;
        while($day <= 31){
            $days[] = $day;
            $day ++;
        }
        return $days;
    }
    public static function months(){
        $months =[];
        $month  = 1;
        while($month <= 12){
            $months[] = $month;
            $month ++;
        }
        return $months;
    }
    public static function years(){
        $years =[];
        $year  = Hijri::now()->getYear();
        while($year <= Hijri::now()->getYear()+3 ){
            $years[] = $year;
            $year ++;
        }
        return $years;
    }

    public static function times(){
        $time = \Carbon\Carbon::now();
        $time->setTime(7,0,0);
        $result=[];
        while( $time->format('H') <= 18){
            if($time <= $time->format('H')){
                $result[]=[
                    'from_value'=>$time->format('Hi'),
                    'from_label'=>$time->format('H:i'),
                    'to_value'=>$time->copy()->addMinutes(30)->format('Hi'),
                    'to_label'=>$time->copy()->addMinutes(30)->format('H:i')
                ];
            }else{
                
                $result[]=[
                    'from_value'=>$time->format('Hi'),
                    'from_label'=>$time->format('H:i'),
                    'to_value'=>$time->copy()->format('Hi'),
                    'to_label'=>$time->copy()->format('H:i')
                ];
            }
            $time= $time->addMinutes(30);
        }

        return collect($result);

    }

    public static function formatTime($time){
        $hour=substr($time,0,2);
        $minute=substr($time,2,4);
        if($hour<= 11){
            return $hour.":".$minute." قبل از ظهر ";
        }else{
            $hour = $hour -12;
            if($hour == 0){
                $hour = 12;
            }
            $time=$hour.":".$minute." بعد از ظهر";
        }
        return $time;
    }

    public function isAvailable(){
        $date      = explode("-",$this->appointment_date);
        if( count($date) != 3){
            return false;
        }
        $year   = $date[0];
        $month  = $date[1];
        $day    = $date[2];
        $date   = new \Hijri($year,$month,$day);
        $center = \App\Center::where('id',$this->center_id)->first();
        if(!$center){
            return false;
        }
        return $center->getAvailableSlots($date->toCarbon(),$this->start_time,$this->end_time) > 0 ? true : false;
    }

    public function getStartTime(){
        return Appointment::formatTime($this->start_time);
    }
    public function getEndTime(){
        return Appointment::formatTime($this->end_time);
    }

    public function getDateTime(){
        return $this->appointment_date." ".$this->getStartTime()." الی ". $this->getEndTime();
    }
    public function center(){
        return $this->belongsTo(\App\Center::class);
    }
    public function address(){
        $center = $this->center()->first();
        if(!$center){
            return '';
        }

        return $center->address();
    }

    public function getCurrentQueueNo(){
        $date = \Hijri::fromFormat('Y-m-d',$this->appointment_date);
        $lastAppointment = Appointment::where('appointment_date',$date->format('Y-m-d'))->where('center_id',$this->center_id)->orderBy('queue_no','desc')->first();
        if($lastAppointment){
            return $lastAppointment->queue_no+1;
        }
        return 1;
    }

    public static function getAppointments($user,$formsTable,$center_id=false,$status=false){
        $appointments= \DB::table('familyapplications')->where('apply_for_new_id','بلی');
        if ($user->role === 'center_manager') {
            $appointments->where('center_id', '>', 13)->where('center_id', '<', 89)
                ->whereIn('status', $user->getApplicationAccessStatus());
        }
        
        $filterByRole = ['admin','center_manager'];
        if( !in_array($user->role,$filterByRole) ){
            $center_id = $user->center_id;
            $allowedStatus = $user->getApplicationAccessStatus();
            $appointments = $appointments->where('center_id',$center_id)->whereIn('status',$allowedStatus);
            if($status!==false){
                $appointments = $appointments->where('status',$status);
            }
            
            $today = \Hijri::now()->addDays(15);
          
         //   $appointments = $appointments->where('appointments.appointment_date','<=',$today->format('Y-m-d'))->where('status',$status);
        }else{
            if($status!==false){
                $appointments->where('status',$status);
            }

            if($center_id){
                $appointments->where('center_id',$center_id);
            }
        }


        $appointments=$appointments->selectRaw('count(appointment_date) as total_individual,count(distinct(family_form_reference_no)) as total_family,appointment_date,date_format(appointment_date,"%Y") as y,date_format(appointment_date,"%m") as m, date_format(appointment_date,"%d") as d')
        ->groupBy('appointment_date')
        ->orderBy('appointment_date','asc')->get();
   

        
        $result=[];
        foreach( Appointment::groupAppointmentDates($appointments) as $year=>$months):   
            $years=['year'=>$year,'months'=>[],'open'=>false];
            foreach($months as $month=>$days):
                $monthName = \App\HijriMonth::getMonthName($month);
                $years['months'][]=['value'=>$month,'month'=>$monthName,'days'=>$days,'open'=>false];
            endforeach;
            $result[]=$years;
        endforeach;

        return $result;
        
    }


    private static function groupAppointmentDates($appointments){
        $result=[];
        foreach($appointments as $key=>$a):
        
            $result[$a->y][$a->m][]=[
                'total_individual'=>$a->total_individual,
                'total_family'=>$a->total_family,
                'value'=>$a->appointment_date,
                'y'=>$a->y,
                'm'=>$a->m,
                'd'=>$a->d,
          

            ];
                   
        endforeach;
        return $result;
    }

    
    public static function getAppointmentDateByReferenceNo($reference_no){
        $i=\DB::table('familyapplications')->where('reference_no',$reference_no)->first();
        if(!$i){
            return '';
        }
       

        return $i->appointment_date;
    }

    public static function autoAllocate(){
        $centers = \App\Center::get();
        foreach($centers as $c):
            $appointmentsChunks = Appointment::where('appointment_date','1399-12-20')->where('center_id',$c->id)->get()->chunk(200);
            $newAppointmentDate = \Hijri::now()->addDays(2);
            $lastAppointment    =\App\Appointment::where('center_id',$c->id)->where('appointment_date','<>','1399-12-20')->orderBy('id','desc')->first();
            if($lastAppointment){
                $newAppointmentDate = \Hijri::fromFormat('Y-m-d',$lastAppointment->appointment_date)->addDays(2);
            }
          
            
            foreach($appointmentsChunks as $appointments):
                if($newAppointmentDate->format('w') == 6){
                    $newAppointmentDate=$newAppointmentDate->addDays(1);
                }
                foreach($appointments as $appointment):
                    $appointment->appointment_date = $newAppointmentDate->format('Y-m-d');
                    $appointment->save();
                endforeach;
                $newAppointmentDate=$newAppointmentDate->addDays(1);
            endforeach;
        endforeach;
    }

    public static function fixAppointmentsIssue(){
        $appointments= \App\Appointment::where('center_id','>',13)->where('center_id','<',89)->get();
    }

    public static function sendSmsNotifications(){
        /*
        "message":"Message 32",
        "number":"0702302030",
        "send_at":"2021-04-12 09:32:00"
        */
        $appointment = Appointment::first();
        $notificateDateAndTime = \Carbon\Carbon::now()->addMinutes(1)->format('Y-m-d H:i:s');
        $client = new \GuzzleHttp\Client();
        $response=$client->request('post',env('sms_url').'/send',[
            'headers'=>[
                'Content-Type'=>'application/json',
                'Authorization'=>'Bearer '.env('sms_token')
            ],
            'json'=>[
                'message'=>$appointment->formatSmsMessage(),
                'number'=>'0702302030',
                'send_at'=>$notificateDateAndTime
            ]
        ]);
        $response = json_decode((String) $response->getBody());
        dd($response);
    }

    public function formatSmsMessage(){
        $dateOfAppointment      = \Hijri::fromFormat('Y-m-d',$this->appointment_date);
        $appointmentHour        = $dateOfAppointment->toCarbon()->hour($this->start_time)->minute(0)->format('H:i');
        $appointmentDateDay     = $dateOfAppointment->format('l');
        $appointmentDate        = $dateOfAppointment->format('d/m/Y');
        $center                 = $this->center()->first();
        $centerName             = $center->name;
        $message="متقاضی محترم!";
        $message.="%0a";
        $message.="برای طی‌مراحل درخواستی تذکرۀ الکترونیکی خویش فورم‌ها را پرنت نموده و به‌روز {$appointmentDateDay} تاریخ {$appointmentDate} ساعت {$appointmentHour} بجه به مرکز {$centerName} با تمام اعضای فامیل که برای دریافت تذکره درخواست نموده بودند، مراجعه نمائید.";
        $message.="%0a";
        $message.="ګرانه غوښتونکیه!";
        $message.="%0a";
        $message.="   د خپلې الکترونیکي تذکرې د طي مراحل کېدو په موخه خپلې فورمې پرنټ کړه، د {$dateOfAppointment->format('Y')} کال د {$dateOfAppointment->format('m')} میاشتې په {$dateOfAppointment->format('d')} مه نېټه یې، د {$appointmentDateDay} ورځ په {$appointmentHour} بجو د کورنۍ د ټولو هغو غړیو چې غواړي تذکرې واخلي، سره یو ځای د {$centerName} څانګې ته مراجعه وکړئ.";
        return $message;
        /*
        ګرانه غوښتونکیه!
        د خپلې الکترونیکي تذکرې د طي مراحل کېدو په موخه خپلې فورمې پرنټ کړه، د ۱۴۰۰ کال د ...... میاشتې په ...... مه نېټه یې، د ........ ورځ په ....... بجو د کورنۍ د ټولو هغو غړیو چې غواړي تذکرې واخلي، سره یو ځای د ........ څانګې ته مراجعه وکړئ.
        */    
    }

    public function setNewDate($today){
        
        $vipApplication                                 =   new \App\Vipapplication;
        $vipApplication->family_form_reference_no       =   $this->family_form_reference_no;
        $vipApplication->old_appointment_date           =   $this->appointment_date;
        $vipApplication->new_appointment_date           =   $today;
        $vipApplication->user_id                        =   \Auth::user()? \Auth::user()->id :0;
        $vipApplication->center_id                      =   $this->center_id;
        $vipApplication->queue_no                       =   $this->getQueueNumber();
        $vipApplication->save();
        $this->appointment_date                         =   $today;

        return $vipApplication;
    }

    public function getQueueNumber(){
        return  $this->getTotalVipApplications() + 1;
    }

    public function getTotalVipApplications(){
        return Vipapplication::where('center_id',$this->center_id)->where('new_appointment_date',$this->new_appointment_date)->count();
    }
}
