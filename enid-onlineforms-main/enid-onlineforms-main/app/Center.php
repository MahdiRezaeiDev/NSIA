<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use \Hijri;
use \Carbon\Carbon;
use \App\Appointment;
use \App\HijriMonth;
class Center extends Model
{
    protected $casts=['appointments'=>'array'];

    public function getAvailableAppointments(){
        $totalTries = 0;
        if($this->number_of_days_before_appointment < 1){
            $this->number_of_days_before_appointment =1;
        }
        $today                  = Carbon::now()->addDays($this->number_of_days_before_appointment);
        $appointments=[];
            while(count($appointments) !=4 && $totalTries < 1000){
                try{
                    $available = $this->getAppointmentsByDay($today);
                    $hijriToday = \Hijri::fromCarbon($today);
                    if($available){
                        $key = $hijriToday->format('l')." ".$hijriToday->format('d')." ".HijriMonth::getMonthName($hijriToday->format('m'))." ".$hijriToday->format('Y');
                        $appointments[]=['month'=>$key,'times'=>$available];
                       
                    }
                    $today = $today->addDay();
                
                   
                }catch(\Exception $e){
                  
                }
                $totalTries ++;
            }
      

        return $appointments;

    }

    public function getAppointmentsByDay($date){
        if( $this->isPublicHoliday($date) ){
            return false;
        }
        $days        = isset($this->appointments['data']['days']) ? $this->appointments['data']['days']:[];
        $slots = [];
        foreach ($days as $day) {
            if ($day['active'] && $date->format('N') == $day['value']) {
                foreach ($day['slots'] as $slot) {
                    $slots[] = $slot;
                }
            }
        }
        if (!$slots) {
            return false;
        }
        $hijriDate = \Hijri::fromCarbon($date);
        $counts = Appointment::where('appointment_date', $hijriDate->format('Y-m-d'))
            ->where('center_id', $this->id);
        foreach ($slots as $index => $slot) {
            // Let SQL compare the slot values exactly as in getAvailableTimes().
            $counts->selectRaw('COUNT(CASE WHEN start_time = ? AND end_time = ? THEN 1 END) AS slot_'.$index,
                [$slot['start'], $slot['end']]);
        }
        $taken = $counts->first();
        $appointments=[];
        foreach ($slots as $index => $slot) {
            $availableTimes = static::formatAvailableTime($hijriDate, $slot, (int) $taken->{'slot_'.$index});
            if ($availableTimes) {
                $appointments[] = $availableTimes;
            }
        }

        return count($appointments) > 0 ? $appointments :false;

    }
    public static function getAvailableTimes($date,$slot,$center_id){
        $hijriDate= \Hijri::fromCarbon($date);
        $taken_appointments = Appointment::where('appointment_date',$hijriDate->format('Y-m-d'))
            ->where('start_time',$slot['start'])
            ->where('center_id',$center_id)
            ->where('end_time',$slot['end'])->count();
        return static::formatAvailableTime($hijriDate, $slot, $taken_appointments);
    }

    private static function formatAvailableTime($hijriDate, $slot, $taken_appointments){
        $available_appointments = $slot['number_of_appointments'] - $taken_appointments;
        if($available_appointments < 1){
            return false;
        }

  
        return [
                'appointment_date_day_label'=>$hijriDate->format('l'),
                'appointment_date_day'=>$hijriDate->format('d'),
                'appointment_date_month'=>$hijriDate->format('m'),
                'appointment_date_month_label'=>\App\HijriMonth::getMonthName($hijriDate->format('m')),
                'appointment_date_year'=>$hijriDate->format('Y'),
                'appointment_date'=>$hijriDate->format('Y-m-d'),
                'number_of_appointments'=>$available_appointments,
                'start'=>$slot['start'],
                'start_label'=>Appointment::formatTime($slot['start']),
                'label'=>Appointment::formatTime($slot['start'])." الی ".Appointment::formatTime($slot['end']),
                'end'=>$slot['end'],
                'end_label'=>Appointment::formatTime($slot['end'])
            
        ];

    }

    public function isPublicHoliday(Carbon $date){
        $public_holidays = $this->getPublicHolidays();
        foreach($public_holidays as $p){
            if( $date->isSameDay($p) ){
                return true;
            }
        }

        return false;
    }
    public function getPublicHolidays(){
        $public_holidays = [];
        $holidays        = isset($this->appointments['data']['public_holidays'])?$this->appointments['data']['public_holidays']:[];
        foreach($holidays as $h):
            $d= new Hijri($h['year'], $h['month'], $h['day']);
            $public_holidays[]=$d->toCarbon();
        endforeach;
        return $public_holidays;
    }

    public function getAvailableSlots($date,$start,$end){
        $appointments = $this->getAppointmentsByDay($date);
        if($appointments == false){
            return 0;
        }
        foreach($appointments as $a):
            if($a['start'] == $start && $a['end'] == $end){
                return $a['number_of_appointments'];
            }
        endforeach;
        return 0;
    }

    public function address(){
        return $this->name;
        //." ".$this->village." ".$this->town." ".$this->province." ".\App\Village::getCountryNameById($this->country);
    }


    public static function isIpAllowed($ip){
       return \App\Center::where('ip',$ip)->exists();
    }

    public function getTotalFamilyFormsByStatus($today=false){
        $applications = \DB::table('familyapplications')
        ->selectRaw('count(center_id) as total_family,status')
        ->where('center_id',$this->id)
        ->where('apply_for_new_id','بلی')
        ->where('relationship_with_head_of_family',1);
        $todayDate= \Hijri::now()->format('Y-m-d');
        if($today){
            $appointments = $applications->whereDate('appointment_date',$todayDate);
        }else{
            $appointments = $applications->whereDate('appointment_date','<>',$todayDate);
        }
        
        return $applications->groupBy('status')->get();
        
    }

    public function getTotalIndividualFormsByStatus($today=false){
        $applications = \DB::table('familyapplications')
        ->selectRaw('count(center_id) as total_individual,status')
        ->where('center_id',$this->id)
        ->where('apply_for_new_id','بلی');
        $todayDate= \Hijri::now()->format('Y-m-d');
        if($today){
            $appointments = $applications->whereDate('appointment_date',$todayDate);
        }else{
            $appointments = $applications->whereDate('appointment_date','<>',$todayDate);
        }
        
        return $applications->groupBy('status')->get();
        
    }

    public function getCountReport($today=false){
        $family         = $this->getTotalFamilyFormsByStatus($today);
        $individual     = $this->getTotalIndividualFormsByStatus($today)->map(function($i) use ($family){
            $familyWithStatusCount = $family->filter(function($f) use ($i){ return $f->status==$i->status;})->first();
            if($familyWithStatusCount){
                $familyCount = $familyWithStatusCount->total_family;
            }else{
                $familyCount=0;
            }
            $i = (Array) $i;
           
            $i['total_family'] = $familyCount;
            $i['status_text'] = \App\Individualform::getStatusDescription($i['status']);
            return $i;
        });

        return $individual;
    }
    public function centerReport(){
        return static::reportsFor(collect([$this]))->first();
    }

    public static function reportsFor($centers){
        if ($centers->isEmpty()) {
            return collect();
        }
        $counts = \DB::table('familyapplications')
            ->whereIn('center_id', $centers->pluck('id')->all())
            ->where('apply_for_new_id', 'بلی')
            // Both old date comparisons exclude NULL/invalid dates.
            ->whereRaw('DATE(appointment_date) IS NOT NULL')
            ->selectRaw('center_id, status, DATE(appointment_date) = ? AS is_today,
                COUNT(center_id) AS total_individual,
                COUNT(CASE WHEN relationship_with_head_of_family = 1 THEN 1 END) AS total_family',
                [\Hijri::now()->format('Y-m-d')])
            ->groupBy('center_id', 'status', 'is_today')->orderBy('status')->get()
            ->groupBy('center_id');

        return $centers->values()->map(function ($center) use ($counts) {
            $rows = $counts->get($center->id, collect());
            $format = function ($row) {
                return ['total_individual' => (int) $row->total_individual, 'status' => $row->status,
                    'total_family' => (int) $row->total_family,
                    'status_text' => \App\Individualform::getStatusDescription($row->status)];
            };
            return ['name' => $center->name, 'id' => $center->id,
                'todayApplications' => $rows->where('is_today', 1)->map($format)->values(),
                'oldApplications' => $rows->where('is_today', 0)->map($format)->values()];
        });
    }

    public static function getOverseasCenterIds(){
        return \App\Center::where('country','<>',1)->get()->map(function($c){ return $c->id;})->toArray();
    }

    public function getAppointmentsReportByDay(){
        $report = [];
        $report['center_name']= $this->name." ".$this->province;
        $days   = $this->appointments['data']['days'];
        foreach($days as $d):
            $appointments=0;
            foreach($d['slots'] as $s):
                $appointments+= $s['number_of_appointments'];
            endforeach;
            $report[$d['label']]=$appointments;
        endforeach;
        
        return array_values($report);
    }

    public function updateNameInIvp(){
        $token = \App\Individualform::getIvpToken();
        $client = new \GuzzleHttp\Client(['http_errors' => false]);
        $request = [
            'ID'=>$this->id,
            'Title'=>$this->name
        ];
        $clientResponse = $client->request("POST",env('ivp_url')."/verification/branch/update",[
            'json'=>$request,
            'delay'=>200,
            'headers'=>[
                'Authorization'=>'Bearer '.$token,
                'Content-Type'=>'application/json'
             ]
        ]);
        $response = json_decode( (String) $clientResponse->getBody() );
        if($clientResponse->getStatusCode() == 200){
            \App\Log::record('CenterNameUpdate',['request'=>$request,'response'=>$response]);
        }else{
            \App\Log::record('CenterNameUpdateFailed',['request'=>$request,'response'=>$response]);
        }
    }
}
