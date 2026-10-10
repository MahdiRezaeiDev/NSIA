<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Requests\CallOutcomeRequest;

class CallCenterController extends Controller
{
    public function getCallList(){
        $forms = \DB::table('familyapplications')
        ->where('status',0)
        ->whereIn('last_call_status',[0,4])
        ->where('apply_for_new_id','بلی')
        ->select(
        'name',
        'primary_contact_no',
        'secondary_contact_no',
        'family_form_reference_no',
        'appointment_date'
        )->groupBy('family_form_reference_no')->take(50)->orderBy('appointment_date')->get();

        return $forms;
    }

    public function getOutcomeList(Request $r){
        $dariOutcomes=[
            ['description'=>'تماس موفقانه','code'=>1,'color'=>'#57a166'],
            ['description'=>'تذکره قبلا گفته شده','code'=>2,'color'=>'#ffa34d'],
            ['description'=>'شماره تماس غلط است','code'=>3,'color'=>'#f70733'],
            ['description'=>'تماس نا موفق','code'=>4,'color'=>'#f70733'],
        ];

        $pashtoOutcomes=[
            ['description'=>'بریالی زنګ','code'=>1,'color'=>'#57a166'],
            ['description'=>'پیژند کارت ویشل شوی وو','code'=>2,'color'=>'#ffa34d'],
            ['description'=>'د اړیکې شمیره غلط ده','code'=>3,'color'=>'#f70733'],
            ['description'=>'تماس نا موفق','code'=>4,'color'=>'#f70733']
        ];

        if($r->input('lang') == 'ps'){
            return $pashtoOutcomes;
        }

        return $dariOutcomes;
        
        
    }

    public function submitOutcome(CallOutcomeRequest $r){
        $application = \App\Individualform::where('center_id',$r->user()->center_id)->where('family_form_reference_no',$r->input('reference_no'))->first();
        if(!$application){
            abort(404);
        }

        $folderName = 'recordings/'.$r->input('reference_no');
        if($r->file('recording')){
            $path = \Storage::disk('s3')->putFile($folderName, $r->file('recording'));
        }else{
            $path = '';
        } 
      
        $outcome                    = new \App\Callrecord;
        $outcome->reference_no      = $r->input('reference_no');
        $outcome->code              = $r->input('code');
        $outcome->recording         = $path;
        $outcome->call_duration     = $r->input('call_duration');
        $outcome->user_id           = $r->user()->id;
        if( $outcome->save() ){
            \App\Individualform::where('family_form_reference_no',$r->input('reference_no'))->update([
                'call_call_status'=> $r->input('code')
            ]);
            return [
                'status'=>'Success'
            ];
        }

        return response(404)->json([
            'status'=>'error'
        ]);

       
    }

    public function updateApplicationsStatus(\App\Http\Requests\SubmitStatusRequest $r){
        $ids=$r->input('ids');
        \App\Log::record('UpdateApplicationStatusAPI',$ids);
        return ['status'=>'ok'];
    }
}
