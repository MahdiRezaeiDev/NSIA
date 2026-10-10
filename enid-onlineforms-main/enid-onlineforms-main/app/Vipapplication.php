<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Vipapplication extends Model
{
    private $end_point = "http://43.249.42.236:100/verification/update/process-type";

    public function updateQueue($token){
        $request = $this->getRequest();

        $client     = new \GuzzleHttp\Client(['http_errors' => false]);
        $clientResponse = $client->request("POST",$this->end_point,[
                'json'=>$request,
                'delay'=>200,
                'headers'=>[
                    'Authorization'=>'Bearer '.$token,
                    'Content-Type'=>'application/json'
                 ]
        ]);
        $response = json_decode( (String) $clientResponse->getBody() );
        if($clientResponse->getStatusCode() == 200){
            $this->request  = json_encode($request);
            $this->response = json_encode($response);
            $this->is_sent=true;
            $this->tried=true;
            $this->save();
            return true;
        } 
            $this->is_sent=false;
            $this->tried=true;
            $this->response = json_encode($response);
            $this->request = json_encode($request);
            $this->save();
            return false;
        
    }

    public static function syncQueue(){
        $token = \App\Individualform::getIvpToken();
        $applications = Vipapplication::where('tried',false)->get();
        foreach($applications as $a):
            $a->updateQueue($token);
        endforeach;
    }

    public function getRequest(){
        $request = [
            'family_form_reference_no'=>$this->family_form_reference_no,
            'queue_no'=>$this->queue_no,
            'appointment_date'=>\Hijri::fromFormat('Y-m-d',$this->new_appointment_date)->toCarbon()->format('Y-m-d')
        ];
        return $request;
    }

    public static function putAppointmentsToFuture($ids,$newDate){
        
        foreach($ids as $i):
            $a                                  = \App\Appointment::where('family_form_reference_no',$i)->first();
            if($a){
                $q                              = new Vipapplication;
                $q->family_form_reference_no    = $i;
                $q->old_appointment_date        = $a->appointment_date;
                $q->new_appointment_date        = $newDate;
                $q->queue_no                    = $a->queue_no;
                $q->user_id                     = 1;
                $q->center_id                   = 4;
                $q->save();           
            }
                        
        endforeach;
    }
}
