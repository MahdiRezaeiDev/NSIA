<?php
namespace App;
use \DB;
use Rap2hpoutre\FastExcel\FastExcel;
use Box\Spout\Writer\Style\StyleBuilder;
class ActivityReport{
    protected $start_date;
    protected $end_date;
    protected $description  =   false;
    protected $user_id      =   false;
    public function __construct($start_date,$end_date,$user_id,$description){
        $this->start_date   = $start_date;
        $this->end_date     = $end_date;
        $this->user_id      = $user_id;
        $this->description  = $description;
    }   

    public function generateReport(){
        $applications = $this->getQuery();
        $applications=$applications->orderBy('created_at');
        $applications= $applications->get();
     
        $applications=$applications->map(function($a){
            return [
                'تاریخ'=>\Hijri::fromCarbon(\Carbon\Carbon::createFromFormat('Y-m-d H:i:s',$a->created_at))->format('Y-m-d'),
                'شماره فارم انفرادی'=>$a->reference_no,
                'تفصیلات'=>$a->description,
                'اسم کارمند'=>$a->username,
                'شماره تماس اولی'=>$a->primary_contact_no,
                'شماره تماس دومی'=>$a->secondary_contact_no,
            ];
        });
        
        $header_style = (new StyleBuilder())->setFontBold()->setFontSize(12)->build();

        $rows_style = (new StyleBuilder())
            ->setFontSize(12)
            ->setShouldWrapText(false)
            ->build();

        //dd($result->flatten());
        return (new FastExcel($applications))->headerStyle($header_style)
        ->rowsStyle($rows_style)->download('report.xlsx');
    }

    public function getQuery(){
            $description = $this->description;
            $ivpDescription=false;
            if($this->description=='هویت تثبیت شد'){
                $ivpDescription ="تثبیت هویت شد";
            }
            if($this->description=='بعد از تحقیقات بیشتر هویت تثبیت نشد'){
                $ivpDescription ="تثبیت هویت نشد";
            }
        $result=\DB::query()->fromSub(\App\Services\ApplicationReports::events(), 'centeractivities')
        ->where('created_at','>=',$this->start_date->format('Y-m-d 00:00:00'))
        ->where('created_at','<=',$this->end_date->format('Y-m-d 23:59:59'))
        ->where('center_id',\Auth::user()->center_id)
        ->where(function($query) use ($description,$ivpDescription){
            $query->orWhere('description','like','%'.$description.'%');
            if($ivpDescription){
                $query->orWhere('description','like','%'.$ivpDescription.'%');
            }
        });
       
    
        
        if($this->user_id){
            $result=$result->where('user_id',$this->user_id);
        }
       return $result;
    }



   
}
