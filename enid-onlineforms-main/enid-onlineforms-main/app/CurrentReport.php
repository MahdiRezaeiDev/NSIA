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
    protected $individual = false;
    public function __construct($start_date,$end_date,$center_id,$status,$individual=false){
        $this->start_date   = $start_date;
        $this->end_date     = $end_date;
        $this->center_id    = $center_id;
        $this->status       = $status;
        $this->individual   = $individual;
    }   

    public function generateReport(){
        $applications = $this->getQuery();
        $applications=$applications->orderBy('created_at');
        $applications= $applications->get();
        $status = $this->status;
        if (!$this->individual) {
            $applications= $applications->filter(function($a) use ($status){
                return $a->status == $status;
            });
        }
        $applications=$applications->map(function($a){
            if ($this->individual) {
                return [
                    'شماره فامیلی' => $a->family_form_reference_no,
                    'شماره انفرادی' => $a->reference_no,
                    'اسم' => trim($a->name.' '.$a->surname),
                    'ولد' => trim($a->father_name.' '.$a->father_surname),
                    'مرکز' => $a->center_name,
                    'تاریخ مراجعه' => $a->appointment_date,
                ];
            }
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
        if ($this->individual) {
            return $this->getIndividualQuery();
        }
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

    private function getIndividualQuery(){
        $user = \Auth::user();
        $query = \DB::table('familyapplications')->where('apply_for_new_id', 'بلی')
            ->where('appointment_date', '>=', $this->start_date->format('Y-m-d'))
            ->where('appointment_date', '<=', $this->end_date->format('Y-m-d'));
        if ($user->role !== 'admin') {
            $query->whereIn('status', $user->getApplicationAccessStatus());
            if ($user->role === 'center_manager') {
                $query->where('center_id', '>', 13)->where('center_id', '<', 89);
            } else {
                $query->where('center_id', $user->center_id);
            }
        }
        if ($this->center_id) {
            $query->where('center_id', $this->center_id);
        }
        if ($this->status !== false && $this->status !== null && $this->status !== '') {
            $query->where('status', $this->status);
        }
        return $query->orderBy('appointment_date')->orderBy('queue_no')
            ->orderBy('family_form_reference_no')->orderBy('reference_no');
    }
}
