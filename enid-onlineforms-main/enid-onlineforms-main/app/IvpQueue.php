<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Individualform;
use App\Cancelledform;
class IvpQueue extends Model
{
    protected $table='ivpqueues';
    protected $fillable=['family_form_reference_no','center_id','application_date','process','priority'];

    public static function updateQueue(){
        $start = \Carbon\Carbon::now();
        \App\Log::record('QueueStarted',['time'=>$start->format('Y-m-d h:i:m')]);
        $lastTenDays = \Carbon\Carbon::now()->subDays(10);
        $individualforms = \App\Individualform::where('apply_for_new_id','بلی')->whereDate('created_at','>',$lastTenDays)->where('status',0)->where('isSendToIVP',false)->where('tried_ivp',false)->groupBy('family_form_reference_no')->get();
        foreach($individualforms as $i):
            if( IvpQueue::where('family_form_reference_no',$i->family_form_reference_no)->where('tried',false)->exists()== false ){
                $priority =0;
                if(in_array($i->center_id,[6,165])){
                    $priority=4;
                }
                if($i->isCancelled()){
                    $priority = 2;
                }
                $process = $i->shouldExtend() ? 1 :0;
                IvpQueue::create([
                    'family_form_reference_no'=>$i->family_form_reference_no,
                    'center_id'=>$i->center_id,
                    'process'=>$process,
                    'priority'=>$priority,
                    'application_date'=>$i->created_at
                    ]);
            }
        endforeach;
     
        \App\Log::record('QueueFinished',['time'=>\Carbon\Carbon::now()->diffInSeconds($start)]);
    }


    public static function updateCancelledQueue(){
        $start = \Carbon\Carbon::now();
        \App\Log::record('QueueStarted',['time'=>$start->format('Y-m-d h:i:m')]);
        $lastTenDays = \Carbon\Carbon::now()->subDays(2);
        $individualforms = \App\Individualform::where('apply_for_new_id','بلی')->whereDate('updated_at','>',$lastTenDays)->where('status',0)->where('isSendToIVP',false)->where('tried_ivp',false)->groupBy('family_form_reference_no')->get();
        foreach($individualforms as $i):
            if( Cancelledform::where('family_form_reference_no',$i->family_form_reference_no)->exists() ){
                if(!IvpQueue::where('family_form_reference_no',$i->family_form_reference_no)->where('tried',false)->exists())
                {
                    $priority =12;                
                    IvpQueue::create([
                        'family_form_reference_no'=>$i->family_form_reference_no,
                        'center_id'=>$i->center_id,
                        'process'=>1,
                        'priority'=>$priority,
                        'application_date'=>$i->created_at
                        ]);
                }
            }
        endforeach;
     
        \App\Log::record('QueueFinished',['time'=>\Carbon\Carbon::now()->diffInSeconds($start)]);
    }
    

    public static function syncQueue($limit){
        $start = \Carbon\Carbon::now();
        $token = Individualform::getIvpToken();
        $twoMinutesAgo=\Carbon\Carbon::now()->subMinutes(2)->format('Y-m-d H:i:s');
        $records = IvpQueue::where('is_sent',false)->where('tried',false)->where('created_at','<',$twoMinutesAgo)->take($limit)->orderBy('priority','desc')->get();
        IvpQueue::sendRecords($token,$records);
      //  foreach($records->chunk(30) as $r):
        //    \App\Jobs\SendApplicationDetailsToIVP::dispatch($r);
        //endforeach;
        $finished = \Carbon\Carbon::now();

        \App\Log::record('SyncFinishedIn',['records'=>count($records),'time'=>$finished->diffInSeconds($start)]);
        
    }
    public static function createSyncJobs(){
        $totalWaiting = \App\IvpQueue::where('is_sent',false)->where('tried',false)->where('in_queue',false)->take(1000)->get(['family_form_reference_no'])->chunk(200);
        $result=[];
        foreach( $totalWaiting as $t):
            $result[]=dispatch( new \App\Jobs\SendApplicationDetailsToIVP($t->map(function($m){ return $m->family_form_reference_no;})->toArray()) );
        endforeach;
        return $result;
    }
    public function sendFamilyApplication($token,$request){
        $client     = new \GuzzleHttp\Client(['http_errors' => false]);
        Individualform::where('family_form_reference_no',$this->family_form_reference_no)->update(['tried_ivp'=>true]);
        $clientResponse = $client->request("POST",env('ivp_url')."/verification/request",[
                'json'=>$request,
                'delay'=>200,
                'headers'=>[
                    'Authorization'=>'Bearer '.$token,
                    'Content-Type'=>'application/json'
                 ]
        ]);
        $this->tried=true; 
        $this->request=json_encode($request);
        $response = json_decode( (String) $clientResponse->getBody() );
        if($clientResponse->getStatusCode() == 200){
            Individualform::where('family_form_reference_no',$this->family_form_reference_no)->update(['isSendToIVP'=>true]);
            $this->response = json_encode($response);
            $this->is_sent=true;
            $this->save();
            return true;
        }else if( $clientResponse->getStatusCode() == 400 ){
            $this->is_sent=false;
            $this->response = json_encode($response);
            $this->save();
            if(isset($response->status) && $response->status == -4){
                $this->is_sent=true;
                //$this->sendCancelledFamilyApplication($token,$request);
            }
            if(isset($response->status) && $response->status == -4){
                $this->is_sent=true;
                $this->save();
                Individualform::where('family_form_reference_no',$this->family_form_reference_no)->update(['isSendToIVP'=>true]);
            }
            if(isset($response->status) && $response->status == -5){
                IvpQueue::addToQueue($this->family_form_reference_no);
            }
            if(isset($response->status) && $response->status == -6){
                IvpQueue::addToQueue($this->family_form_reference_no);
            }
            
            return false;
        }
          
    }


    public function sendCancelledFamilyApplication($token,$request){
        $client     = new \GuzzleHttp\Client(['http_errors' => false]);
        Individualform::where('family_form_reference_no',$this->family_form_reference_no)->update(['tried_ivp'=>true]);
        $clientResponse = $client->request("POST",env('ivp_url')."/verification/extend",[
                'json'=>$request,
                'delay'=>200,
                'headers'=>[
                    'Authorization'=>'Bearer '.$token,
                    'Content-Type'=>'application/json'
                 ]
        ]);
        $this->tried=true; 
        $this->request=json_encode($request);
        $response = json_decode( (String) $clientResponse->getBody() );
        if($clientResponse->getStatusCode() == 200){
            Individualform::where('family_form_reference_no',$this->family_form_reference_no)->update(['isSendToIVP'=>true]);
            $this->response = json_encode($response);
            $this->is_sent=true;
            $this->save();
            return true;
        }else if( $clientResponse->getStatusCode() == 400 ){
            $this->is_sent=false;
            $this->response = json_encode($response);
            if($response->status == -4){
                $this->is_sent=true;
                Individualform::where('family_form_reference_no',$this->family_form_reference_no)->update(['isSendToIVP'=>true]);
            }

            if($response->status == -5){
                $this->save();
                IvpQueue::addToQueue($this->family_form_reference_no);
                return false;
            }
            if($response->status == -6){
                \App\Individualform::cancelFamilyApplicationInIvpById(\App\Individualform::getIvpToken(),'INC',$this->family_form_reference_no);
                sleep(4);
                 IvpQueue::addToQueue($this->family_form_reference_no);
            }
            $this->save();
            return false;
        }
          
    }

    public static function updateOverseasQueue(){
        $centers=\App\Center::getOverseasCenterIds();
        $individualforms = \App\Individualform::where('apply_for_new_id','بلی')->whereIn('center_id',$centers)->where('status',0)->orderBy('id','desc')->where('isSendToIVP',false)->where('tried_ivp',false)->groupBy('family_form_reference_no')->get();
        foreach($individualforms as $i):
            if( IvpQueue::where('family_form_reference_no',$i->family_form_reference_no)->exists()== false && $i->isAllMembersNew()){
                IvpQueue::create([
                    'family_form_reference_no'=>$i->family_form_reference_no,
                    'center_id'=>$i->center_id,
                    'application_date'=>$i->created_at
                    ]);
            }
        endforeach;
    }

    public static function updateManualQueue(){
        return false;
        $individualforms = \App\Individualform::where('apply_for_new_id','بلی')->where('status',3)->where('isSendToIVP',false)->where('tried_ivp',false)->where('updated_at','>','2021-01-0l 00:00:00')
        ->groupBy('family_form_reference_no')->get()
        ->filter(function($i){
            return $i->isAllMembersProcessed();
        });

        foreach($individualforms as $i):
            $queue = IvpQueue::where('family_form_reference_no',$i->family_form_reference_no)->first();
            $shouldCreate=true;
            if($queue){
                if($queue->updated_at->diffInHours() > 1){
                    $shouldCreate=true;
                }else{
                    $shouldCreate=false;
                }
            }
            if($shouldCreate){
                IvpQueue::create([
                    'family_form_reference_no'=>$i->family_form_reference_no,
                    'center_id'=>$i->center_id,
                    'process'=>1,
                    'application_date'=>$i->created_at
                    ]);
            }
        endforeach;
        
    }

    
    public static function addToQueue($family_form_reference_no,$process=0){
        $i = \App\Individualform::where('family_form_reference_no',$family_form_reference_no)->first();
        $priority =4;
        if(in_array($i->center_id,IvpQueue::getVipCenterIds())){
            $priority=10;
        }
        if($i->isCancelled()){
            $priority = 0;
        }
        $q = \App\IvpQueue::where('family_form_reference_no',$i->family_form_reference_no)->where('is_sent',0)->where('tried',false)->exists();
        if($q){
            return $q;
        }
        return IvpQueue::create([
            'family_form_reference_no'=>$i->family_form_reference_no,
            'center_id'=>$i->center_id,
            'process'=>$process,
            'priority'=>$priority,
            'application_date'=>$i->created_at
            ]);
    }
    
    public static function sendRecords($token,$records){
        foreach($records as $r):
            $form = \App\Individualform::where('family_form_reference_no',$r->family_form_reference_no)->first();
            $request=$form->formatToIvp(false,$r->process);
            if($request){
                if($r->process == 1){
                    $r->sendCancelledFamilyApplication($token,$request);
                }else{
                    $r->sendFamilyApplication($token,$request);
                }
            }
         
        endforeach;
    }

    public static function sendByOffset($offset,$limit){
        $token = \App\Individualform::getIvpToken();
        $records = IvpQueue::where('is_sent',false)->where('tried',false)->skip($offset)->limit($limit)->orderBy('priority','desc')->get();
        IvpQueue::sendRecords($token,$records);
    }

    public static function getVipCenterIds(){
        return [
            6, // VIP CENTER
            165, // NID Center for Passport
            181 // MOI Office
        ];
    }

    public static function sendRecordsByReferences($references){
        $token = Individualform::getIvpToken();
        $records = IvpQueue::where('is_sent',false)->where('tried',false)->where('family_form_reference_no',$references)->orderBy('priority','desc')->get();
        IvpQueue::sendRecords($token,$records);
    }
}
