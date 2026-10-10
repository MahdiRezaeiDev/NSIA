<?php
namespace App;
use \DB;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
class GeneralReport  implements FromCollection, ShouldAutoSize,WithStyles{
    protected $start_date;
    protected $end_date;
    protected $center_id=false;
    public function __construct($start_date,$end_date,$center_id){
        $this->start_date   = $start_date;
        $this->end_date     = $end_date;
        $this->center_id    = $center_id;
    }   
    public function collection()
    {
       return $this->generateReport();

    }

    public function getStatusValue($list,$status){
        foreach($list as $s):
            if($s->description == $status){
                return $s->event_date;
            }
        endforeach;

        return 'X';
    }

    public function styles(Worksheet $sheet)
    {
        return [
            // Style the first row as bold text.
            1    => ['font' => ['bold' => true]],
        ];
    }

    public function generateReport(){
        $events = $this->getQuery();
        $events=$events->orderBy('event_date','desc')->orderBy('reference_no')->get();
       // dd($events->toArray());
        $statusNames = $events->unique('status_description')->map(function($s){
            return $s->status_description;
        });
        $events = $events->groupBy('reference_no');
        
        $header= [
            'مرکز',
            'شماره درخواستی',
            'نام',
            'تخلص',
            'نام پدر',
            'تخلص پدر',
            'نام پدرکلان',
            'تخلص پدرکلان',

        ];
        foreach($statusNames as $n):
            $header[]=$n;
        endforeach;
        $result[]=$header;
        foreach($events as $list):
            $row = false;
            foreach($list as $e):
                if(!$row){
             
                    $row=[
                        $e->center_name,
                        $e->reference_no,
                        $e->name,
                        $e->surname,
                        $e->father_name,
                        $e->father_surname,
                        $e->grand_father_name,
                        $e->grand_father_surname,
                     ];
                }
                
               
            endforeach;
            foreach($statusNames as $s):
                $row[]= $this->getStatusValue($list,$s);
            endforeach;
            $result[] = $row;
            $row=false;
        endforeach;
       // dd($result);
        return collect($result);
    }

    public function getStats(){
        $events = $this->getQuery(true);
        $events=$events->selectRaw('count(description) as total,status_description as description')->groupBy('status_description')->get();
        $total = \App\Individualform::where('apply_for_new_id','بلی')->where('center_id',$this->center_id)->count();
        return $events;
    }

    public function getQuery($excludeNew=false){
        $events = \DB::table('reports')
        ->whereDate('event_date','>=',$this->start_date)
        ->whereDate('event_date','<=',$this->end_date);
        
        if($this->center_id){
            $events = $events->where('center_id',$this->center_id);
        }
       return $events;
    }


    public function getIndividualFormReport(){
        
    }
}