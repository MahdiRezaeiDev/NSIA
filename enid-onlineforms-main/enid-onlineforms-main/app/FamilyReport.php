<?php
namespace App;
use \DB;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithEvents;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use Maatwebsite\Excel\Events\AfterSheet;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\Color;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;
class FamilyReport  implements FromView, ShouldAutoSize,WithStyles{
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
    public function collection()
    {
       return $this->generateReport();

    }

  

    public function styles(Worksheet $sheet)
    {
        return [
            // Style the first row as bold text.
            2    => [
                'font' => ['bold' => true],
                'fill' => [
                    'fillType' => Fill::FILL_SOLID,
                    'startColor' => ['argb' => 'A0A0A0']
                ]
                    ]
                ];
    }

    public function generateReport(){
        $applications = $this->getQuery();
        $applications=$applications->orderBy('created_at')->get();
        $result[]=[
            $applications->first()->center_name
        ];
        $header= [
            'شماره درخواستی فامیلی',
            'تعداد اعضاء فامیل',
            'نام پدر',
            'نام و تخلص',
            'شماره تماس اولی',
            'شماره تماس دومی'
        ];
        
        $result[]=$header;
        foreach($applications as $e):
            $result[]=[
                            $e->family_form_reference_no,
                            $e->total_applicants,
                            $e->father_name." ".$e->father_surname,
                            $e->name." ".$e->surname, 
                            $e->primary_contact_no,
                            $e->secondary_contact_no,
                ];
        endforeach;
    
        return collect($result);
    }

    public function getQuery($excludeNew=false){
        $query = \DB::table('familyapplications')->where('apply_for_new_id','بلی')->orderBy('family_form_reference_no');
        $query=$query
        ->whereDate('appointment_date','>=',$this->start_date)
        ->whereDate('appointment_date','<=',$this->end_date);
        
        if($this->center_id){
            $query = $query->where('center_id',$this->center_id);
        }
        if($this->status!==false){
            if($this->status == 4 || $this->status == 5){
                $query = $query->whereIn('status',[4,5]);
            }else{
                $query = $query->where('status',$this->status);
            }

        }
      
       return $query;
    }



    public function registerEvents(): array
    {
        return [
            AfterSheet::class    => function(AfterSheet $event) {
                $event->sheet->getDelegate()->setRightToLeft(true);
            },
        ];
    }
    public function view(): View
    {
        return view('reports.family_report', [
            'applications' =>$this->getQuery()->get()
        ]);
    }

   
}