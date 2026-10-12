<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Event; 
use \App\User;
use \App\Individualform;
use \App\Events\ApplicationOpenedEvent;
use \PDF;
use iio\libmergepdf\Merger;
use Mpdf\Output\Destination;
use Maatwebsite\Excel\Facades\Excel;
class ReportsController extends Controller
{
    public function index(){
        return view('reports');
    }

    public function getUsersReports(Request $r)
    {
        $reports = DB::table('events')
            ->select('events.user_id','users.name', DB::raw('ROUND(COUNT(events.user_id)) as number_of_requests'),DB::raw('round(AVG(events.minutes)) as average_time'))
            ->leftJoin('users', 'events.user_id', '=', 'users.id');
        if($r->input('start_date')){
            $reports =  $reports->where('events.created_at','>=', $r->input('start_date'));
        }
        if($r->input('end_date')){
            $reports =  $reports->where('events.created_at','<=', $r->input('end_date'));
        }
        if($r->input('center_id')){
            $reports =  $reports->where('users.center_id', $r->input('center_id'));
        }
        $reports =  $reports->groupBy('events.user_id');

        if($r->input('csv')){
            $reports = $reports ->get();
            $mpdf = new \App\Pdf;
            $usersReportHtml = view('print_users_reports',[
                'reports'=>$reports,
                ])->render();
            $mpdf->WriteHTML($usersReportHtml);
            return $mpdf->output();
        }
        else {
            $reports = $reports->paginate($r->input('limit',50));
            return $reports;
        }
    }
    public function userReportsView(){
        return view('user_reports');
    }

    public function getUserReports(Request $r)
    {
        
        $reports = DB::table('events')->select('reference_no','minutes','created_at','description');

        if($r->input('start_date')){
            $reports =  $reports->where('created_at','>=', $r->input('start_date'));
        }
        if($r->input('end_date')){
            $reports =  $reports->where('created_at','<=', $r->input('end_date'));
        }
        $reports = $reports->where('user_id', $r->input('user_id'));
       
        if($r->input('print')){
            $reports = $reports ->get();
            $mpdf = new \App\Pdf;
            $userReportHtml = view('print_user_reports',[
                'reports'=>$reports,
                ])->render();
            $mpdf->WriteHTML($userReportHtml);
            return $mpdf->output();
        }
        else {
            $reports = $reports->paginate($r->input('limit',50));
            return $reports;
        }
    }

    public function pendingAppRepoView(){
        return view('pending_app_reports');
    }

    public function getPendingAppReports(Request $r){

        $applications   =  Individualform::where('status','=',$r->input('status','0')); 
      
        $applications = $applications->where('apply_for_new_id','بلی');
        
        $applications = $applications->leftJoin('appointments','appointments.family_form_reference_no','individualforms.family_form_reference_no')
        ->leftJoin('centers','appointments.center_id','centers.id');
        $today = \Hijri::now();
        $todayDate = (int)$today->format('Y')."-".(int)$today->format('m')."-".(int)$today->format('d');
        $applications = $applications->where('appointments.appointment_date','<',$todayDate);


        if($r->input('start_date')){
            $applications =  $applications->where('appointments.appointment_date','>=', $r->input('start_date'));
        }
        if($r->input('end_date')){
            $applications =  $applications->where('appointments.appointment_date','<=', $r->input('end_date'));
        }
    
        if($r->input('center_id')){
            $applications = $applications->where('centers.id',$r->input('center_id'));
        }
       $result=$applications
            ->selectRaw('replace(centers.name,"مرکز توزیع تذکره الکترونیکی","") as center_name,individualforms.family_form_reference_no,count(individualforms.family_form_reference_no) as total_applicants,individualforms.created_at,status,individualforms.family_form_reference_no as reference,reference_no,individualforms.name,surname,(select individualforms.name from individualforms where family_form_reference_no=reference and relationship_with_head_of_family=1 limit 1) as head_of_family_name,appointments.queue_no,appointments.appointment_date,opened,opened_by,opened_by_user_id')
            ->orderBy('appointments.appointment_date','asc')->orderBy('appointments.queue_no','asc')->groupBy('individualforms.family_form_reference_no');

        if($r->input('print')){
            $result = $result ->get();
                $mpdf = new \App\Pdf;
                $pendingAppReportHtml = view('print_pending_app_reports',[
                    'reports'=>$result,
                    ])->render();
                $mpdf->WriteHTML($pendingAppReportHtml);
                return $mpdf->output();
        }
        else{
            $result = $result->paginate($r->input('limit',200));
            return $result;
        }
        
    }

    public function downloadGeneralReport(Request $r){
        \App\Services\ApplicationReports::dates($r);
        $allowed=['admin','team_leader','center_manager'];
        if(!in_array($r->user()->role,$allowed)){
            abort(404);
        }
        $startDate = $r->input('appointment_start_date');
        $startDate = explode("-",$startDate);
        $startDate = new \Hijri($startDate[0],$startDate[1],$startDate[2],0,0,0);
       // $startDate = $startDate->toCarbon();

        $endDate = $r->input('appointment_end_date');
        $endDate = explode("-",$endDate);
        $endDate = new \Hijri($endDate[0],$endDate[1],$endDate[2],23,59,59);
       // $endDate = $endDate->toCarbon();
        
        $center_id = $r->input('center_id',false);
    
        if($r->user() && $r->user()->role=='team_leader'){
            $center_id = $r->user()->center_id;
        }else{
            $center_id = $r->input('center_id',false);
        }
        $report=new \App\GeneralReport($startDate,$endDate,$center_id);
        return Excel::download($report, 'Report.xlsx');
    }
 
    public function getGeneralReport(Request $r){
        return $this->getStats($r);
    }

    public function getStats(Request $r){
        $allowed=['admin','team_leader','center_manager'];
        if(!in_array($r->user()->role,$allowed)){
            abort(404);
        }
        list($startDate, $endDate) = \App\Services\ApplicationReports::dates($r);
        if($r->user() && $r->user()->role=='team_leader'){
            $center_id = $r->user()->center_id;
        }else{
            $center_id = $r->input('center_id',false);
        }
        $r=new \App\GeneralReport($startDate,$endDate,$center_id);
        return $r->getStats();
    }


    public function downloadCurrentReport(Request $r){
        \App\Services\ApplicationReports::dates($r);
        $allowed=['admin','team_leader','center_manager'];
        //\Auth::login(\App\User::first());
        if(!in_array($r->user()->role,$allowed)){
            abort(404);
        }
        $startDate = $r->input('appointment_start_date');
        $startDate = explode("-",$startDate);
        $startDate = new \Hijri($startDate[0],$startDate[1],$startDate[2],0,0,0);
       // $startDate = $startDate->toCarbon();
       
        $endDate = $r->input('appointment_end_date');
        $endDate = explode("-",$endDate);
        $endDate = new \Hijri($endDate[0],$endDate[1],$endDate[2],23,59,59);
        $center_id = $r->input('center_id',false);
     
        if($r->user() && $r->user()->role=='team_leader'){
            $center_id = $r->user()->center_id;
        }else{
            $center_id = $r->input('center_id',false);
        }
        $report=new \App\CurrentReport($startDate,$endDate,$center_id,$r->input('status',false));

        return $report->generateReport();
    }


    public function downloadFamilyReport(Request $r){
        \App\Services\ApplicationReports::dates($r);
        $allowed=['admin','team_leader','center_manager'];
        if(!in_array($r->user()->role,$allowed)){
            abort(404);
        }
        $startDate = $r->input('appointment_start_date');
        $startDate = explode("-",$startDate);
        $startDate = new \Hijri($startDate[0],$startDate[1],$startDate[2],0,0,0);
       // $startDate = $startDate->toCarbon();

        $endDate = $r->input('appointment_end_date');
        $endDate = explode("-",$endDate);
        $endDate = new \Hijri($endDate[0],$endDate[1],$endDate[2],23,59,59);
        $center_id = $r->input('center_id',false);
    
        if($r->user() && $r->user()->role=='team_leader'){
            $center_id = $r->user()->center_id;
        }else{
            $center_id = $r->input('center_id',false);
        }
        $report=new \App\FamilyReport($startDate,$endDate,$center_id,$r->input('status',false));

        return Excel::download($report, 'Report.xlsx');
    }
    
    public function getAuditReport(Request $r){
        \App\Services\ApplicationReports::dates($r);
        $startDate = $r->input('appointment_start_date');
        $startDate = explode("-",$startDate);
        $startDate = new \Hijri($startDate[0],$startDate[1],$startDate[2],0,0,0);
        $endDate = $r->input('appointment_end_date');
        $endDate = explode("-",$endDate);
        $endDate = new \Hijri($endDate[0],$endDate[1],$endDate[2],23,59,59);
        $center_id   =  $r->input('center_id');
       return \DB::table('documentchecks')
        ->where('check_date','>=',$startDate->toCarbon()->format('Y-m-d 00:00:00'))
        ->where('check_date','<=',$endDate->toCarbon()->format('Y-m-d 23:59:59'))
        ->where('center_id',$center_id)->orderBy('name')->get()->map(function($e){
            $e = (Array) $e;
            $e['check_date'] = \Hijri::fromCarbon(\Carbon\Carbon::createFromFormat('Y-m-d H:i:s',$e['check_date']))->format('Y-m-d');
            $e['application_date'] = \Hijri::fromCarbon(\Carbon\Carbon::createFromFormat('Y-m-d H:i:s',$e['application_date']))->format('Y-m-d');
            return $e;
        });
    }


    public function getTransferReport(Request $r){
        \App\Services\ApplicationReports::dates($r);
        $startDate = $r->input('appointment_start_date');
        $startDate = explode("-",$startDate);
        $startDate = new \Hijri($startDate[0],$startDate[1],$startDate[2],0,0,0);
        $endDate = $r->input('appointment_end_date');
        $endDate = explode("-",$endDate);
        $endDate = new \Hijri($endDate[0],$endDate[1],$endDate[2],23,59,59);
        $center_id   =  $r->input('center_id');
       return \DB::table('transferchecks')
        ->where('check_date','>=',$startDate->toCarbon()->format('Y-m-d 00:00:00'))
        ->where('check_date','<=',$endDate->toCarbon()->format('Y-m-d 23:59:59'))
        ->where('center_id',$center_id)->orderBy('name')->get()->map(function($e){
            $e = (Array) $e;
            $e['check_date'] = \Hijri::fromCarbon(\Carbon\Carbon::createFromFormat('Y-m-d H:i:s',$e['check_date']))->format('Y-m-d');
            $e['application_date'] = \Hijri::fromCarbon(\Carbon\Carbon::createFromFormat('Y-m-d H:i:s',$e['application_date']))->format('Y-m-d');
            return $e;
        });
    }

    public function downloadActivityReport(Request $r){
        \App\Services\ApplicationReports::dates($r, 'start', 'end');
        $user_id    = $r->input('user_id',0) =="0"? false :$r->input('user_id');
        $startDate  = \App\Report::stringToDate($r->input('start'))->toCarbon();
        $endDate    = \App\Report::stringToDate($r->input('end'))->toCarbon();
      
        $description = Individualform::getStatusDescription($r->input('status'));
        $report     =   new \App\ActivityReport($startDate,$endDate,$user_id,$description);
        return $report->generateReport();
    }


    public function chart(Request $r){
        $result=\Cache::get('result');
        if($result){
            return $result;
        }
        $centersReports = \DB::table('familyapplications')->selectRaw('count(reference_no) as total,center_name,center_id,year(created_at) as year')->where('apply_for_new_id','بلی')
        ->groupBy('center_id',\DB::raw('YEAR(created_at)'))->get()
        ->filter(function($c){
            return is_null($c->center_id)==false;
        });
        $result=[];
        $center_ids=[];
        foreach($centersReports as $c):
       
            if(!in_array($c->center_id,$center_ids)){
                $series = $centersReports->filter(function($center) use ($c){
                    return $c->center_id == $center->center_id;
                });
                $seriesArray=[];
                foreach($series as $o):
                    $seriesArray[]=['name'=>$o->year,'value'=>$o->total];
                endforeach;
                $result[]=['name'=>$c->center_name,'center_id'=>$c->center_id,'series'=>$seriesArray];
                $center_ids[]=$c->center_id;
            }
        endforeach;
        $result=\Cache::put('result', $result, 1600);
        return json_encode($result);

    }
    
}
