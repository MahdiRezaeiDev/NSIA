<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\User;
use \App\Individualform;
use \App\Events\ApplicationOpenedEvent;
use App\Note;
use App\Services\ApplicationAccess;
use App\Services\AttachmentStorage;
class MainController extends Controller
{
    /*
    * Views applications list in the backend ( Users and Admin )
    */
 
    public function individualApplications(Request $r){
        $params = json_encode( $r->all() );
     
       
    
        return view('applications/individual_applications',['params'=>$params]);
    }

    /*
    *   Returns individual applications list
    */
    public function getIndividualApplications(Request $r){
        $limit=50;
        $status         = $r->input('status',false);
        $searchQuery    = $r->input('q');
        $allowedStatus  = \Auth::user()->getApplicationAccessStatus();
        $applications   = \DB::table('familyapplications');
        $limit          = $r->input('limit',200);
        $applications = $applications->selectRaw('count(reference_no) as total_applicants,reference_no,family_form_reference_no,name,surname,father_name,father_surname,appointment_date,center_id,status,opened_by,opened,primary_contact_no,secondary_contact_no,queue_no');
          if( $r->input('appointment_start_date') ){
            $d= explode("-",$r->input('appointment_start_date'));
            $startDate = new \Hijri($d[0],$d[1],$d[2]);
          
            $applications = $applications->where('appointment_date','>=',$startDate->format('Y-m-d') );
           // $limit = $applications->count();
        }

        if( $r->input('appointment_end_date') ){
            $d= explode("-",$r->input('appointment_end_date'));
            $endDate = new \Hijri($d[0],$d[1],$d[2]);
           $applications = $applications->where('appointment_date','<=',$endDate->format('Y-m-d') );
        }
        
        if(  \Auth::user()->role != 'admin'){
            $applications       = $applications->whereIn('status',$allowedStatus);
            if($status!==false && !$searchQuery){
                $applications       = $applications->where('status',$status);
            }
            if(\Auth::user()->role !='center_manager'){
                $applications       = $applications->where('center_id',\Auth::user()->center_id);
                $today = \Hijri::now()->addDays(15);
               // $applications       = $applications->where('appointment_date','<=',$today->format('Y-m-d'));
            }else{
                $applications=$applications->where('center_id','>',13)->where('center_id','<',89);
            }
           
            
            
        }
        else{
           
            if($r->input('status')!=null){
                $applications   =  $applications->where('status',$r->input('status') );
            } 

            if($r->user()->role == 'center_manager'){
                $applications->where('center_id','>',13)->where('center_id','<',89);
            }
           
        } 
        
      
        $applications = $applications->where('apply_for_new_id','بلی');
       
        if($searchQuery){
            $applications=$applications->where(function($query) use ($searchQuery){ 
                $query->orWhere('family_form_reference_no',$searchQuery); 
                $query->orWhere('reference_no',$searchQuery); 
                $query->orWhere('name','like','%'.$searchQuery."%");
                $query->orWhere('surname','like','%'.$searchQuery."%");
                $query->orWhere('grand_father_name','like','%'.$searchQuery."%");
                $query->orWhere('father_name','like','%'.$searchQuery."%");
            });
        }
        $today = \Hijri::now();
        $appointmentDate= collect([
            'year'=>(int)$today->format('Y'),
            'month'=>(int)$today->format('m'),
            'day'=>(int)$today->format('d'),
            'enabled'=>false
        ]);
    
        if($r->input('appointment_year')){
            $formattedDate=new \Hijri($r->input('appointment_year'),$r->input('appointment_month'),$r->input('appointment_day'));
            $appointmentDate= collect([
                'year'=>(int)$formattedDate->format('Y'),
                'month'=>(int)$formattedDate->format('m'),
                'day'=>(int)$formattedDate->format('d'),
                'enabled'=>true
            ]);
        }
        
  
           
        if($r->input('appointment_year')){
            $applications = $applications->where('appointment_date',$formattedDate->format("Y-m-d"));
        }
        
      
       
  
        if($r->input('center_id')){
            
            $applications = $applications->where('center_id',$r->input('center_id'));
        }
      //  dd('abc');
       //$applications=$applications->where('relationship_with_head_of_family',1);
       $result=$applications->orderBy('appointment_date','asc')->orderBy('queue_no','asc')->groupBy('family_form_reference_no')->take($limit);
    
        return ['applications'=>['data'=>$result->get()],'appointmentDate'=>$appointmentDate];
    }

    /*
    * View the details of application
    */ 
    public function viewIndividualApplication(Request $r){

        $application = Individualform::where('reference_no',$r->input('reference_no'))->first();
        if(!$application){
            abort(404);
        }
        ApplicationAccess::read($r->user(), $application);
        /*
        if( !$r->user()->canAccessApplication($application->status) ){
            abort(403);
        }
        */
        session(['_old_input'=>$application->toArray()]);
        $token = $r->user()->createToken('tmpToken')->accessToken;
        $copyAction = config('app.rm_path')."/application/individual?application_id=".$application->reference_no."&token=".$token;
        try{
            event( new ApplicationOpenedEvent($r->user(),$application));
        }
        catch(\Exception $e){
            
        }
        return view('view_individual_application',['application'=>$application,'copyAction'=>$copyAction]);
    }

    /*
    * Updates the application status to the next stp
    */
    public function moveApplicationToNextStep(Request $r)
    {
        $response = app(MobileAppController::class)->moveApplicationToNextStep($r);
        $application = ApplicationAccess::find($r->input('reference_no'));
        $rmId = $r->input('rm_appliction_id', '');
        if (is_string($rmId) && strlen($rmId) === 13) {
            $application->rm_id = $rmId;
            $application->save();
        }
        return (int) $application->status === 13 ? $response : redirect()->back();
    }

    public function applicationViewClosed(Request $r){
        $form = \App\Individualform::where('reference_no',$r->input('reference_no'))->first();
        if(!$form){
            abort(404);
        }
        ApplicationAccess::read($r->user(), $form);
        event( new \App\Events\CloseApplicationEvent($r->user(),$form));
        return ['status'=>'ok'];
    }


    public function getNotes(Request $r){
        ApplicationAccess::read($r->user(), ApplicationAccess::find($r->input('reference_no')));
        $notes = \App\Note::where('type',$r->input('type'))->where('reference_no',(string)$r->input('reference_no'))->orderBy('created_at','desc')->get();
        return $notes;
    }
    public function saveNote(\App\Http\Requests\SaveNoteRequest $r){
        $application = null;
        if($r->input('type') == 'individualform'){
            $application     = \App\Individualform::where('reference_no',$r->input('reference_no'))->first();    
        }
         
        if(!$application){
            return response([
                'errors'=>[
                    'سیستم نمیتواند این نوت را ثبت کند.'
                ]
                ],403);
        }
        ApplicationAccess::read($r->user(), $application);
        $note            = new Note;
        $note->type      = $r->input('type');
        $note->note      = $r->input('note');
        $note->user_id   = $r->user()->id;
        $note->username   = $r->user()->name;
        $note->reference_no = $application->reference_no;
        $note->save();
        return ['status'=>'ok','note_id'=>$note->id];
    }

    public function viewImage(Request $r){
        $path = $r->input('path');
        AttachmentStorage::authorizePath($r->user(), $path);
        $width = $r->input('width',100);
        $height = $r->input('height',130);
        $image = \App\ApplicationForm::resizeImage($path,$width,$height);
      
        return response($image)->header('Content-Type','image/jpeg');
    }
}
