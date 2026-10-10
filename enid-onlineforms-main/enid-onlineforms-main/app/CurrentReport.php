<?php
namespace App;
use \DB;
use Rap2hpoutre\FastExcel\FastExcel;
use Box\Spout\Writer\Style\StyleBuilder;
class CurrentReport{
    protected $start_date;
    protected $end_date;
    protected $center_id=false;
    protected $status = false;
    public function __construct($start_date,$end_date,$center_id,$status){
        $this->start_date   = $start_date;
        $this->end_date     = $end_date;
        $this->center_id    = $center_id;
        $this->status       = $status;
    }   

    public function generateReport(){
        $applications = $this->getQuery();
        $applications=$applications->orderBy('created_at');
        $applications= $applications->get();
        $status = $this->status;
        $applications= $applications->filter(function($a) use ($status){
            return $a->status == $status;
        });
        $applications=$applications->map(function($a){
            return [
                'نام'=>$a->name." ".$a->surname,
                'ولد'=>$a->father_name." ".$a->father_surname,
                'شماره تلیفون اولی'=>$a->primary_contact_no,
                'شماره تلیفون دومی'=>$a->secondary_contact_no,
                'کود فامیلی'=>$a->family_form_reference_no,
                'تعداد اعضاء فامیل'=>$a->total_applicants,
                'سکونت فعلی'=>$a->current_residence,
                'تاریخ'=>$a->appointment_date,
                'تاریخ درخواستی'=>\Hijri::fromCarbon(\Carbon\Carbon::createFromFormat('Y-m-d H:i:s',$a->created_at))->format('Y-m-d'),
            ];
        });
        
        $header_style = (new StyleBuilder())->setFontBold()->setFontSize(12)->build();

        $rows_style = (new StyleBuilder())
            ->setFontSize(12)
            ->setShouldWrapText(false)
            ->build();

        //dd($result->flatten());
        return (new FastExcel($applications))->headerStyle($header_style)
        ->rowsStyle($rows_style)->download('    report.xlsx');
    }

    public function getQuery($excludeNew=false){
        $query = \DB::table('familyapplications')->where('apply_for_new_id','بلی')->orderBy('family_form_reference_no');
        $query=$query->selectRaw('name,surname,father_name,current_residence,father_surname,grand_father_name,grand_father_surname,appointment_date,reference_no,status,family_form_reference_no,relationship_with_head_of_family,primary_contact_no,secondary_contact_no,center_name,count(reference_no) as total_applicants,created_at');
        $filterFieldName='appointment_date';
        $query=$query
        ->where($filterFieldName,'>=',$this->start_date->format('Y-m-d'))
        ->where($filterFieldName,'<=',$this->end_date->format('Y-m-d'));
        
        if($this->center_id && in_array( \Auth::user()->role,['admin','center_manager'] )){
            $query = $query->where('center_id',$this->center_id);
        }else{
            $query = $query->where('center_id',\Auth::user()->center_id);
        }
       
        if($this->status == false){
            $this->status=0;
        }
        if($this->status!==false){
            $query = $query->where('status',$this->status);
        }
       // dd($query->groupBy('family_form_reference_no')->get());
       return $query->groupBy('family_form_reference_no');
    }

   
}