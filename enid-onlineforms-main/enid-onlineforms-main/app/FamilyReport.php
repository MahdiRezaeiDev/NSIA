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
class FamilyReport  implements FromView, ShouldAutoSize,WithStyles,WithEvents{
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
            $applications->isEmpty() ? '' : $applications->first()->center_name
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
        $query = \App\Services\ApplicationReports::scopeApplications(\DB::table('familyapplications'))
            ->where('apply_for_new_id','بلی');
        $query=$query
        ->where('appointment_date','>=',$this->start_date->format('Y-m-d'))
        ->where('appointment_date','<=',$this->end_date->format('Y-m-d'));
        
        if($this->center_id){
            $query = $query->where('center_id',$this->center_id);
        }
        if($this->status !== false && $this->status !== null && $this->status !== ''){
            $query = $query->where('status',$this->status);
        }
        // Count only the filtered, authorized applicants. Prefer the head of family
        // for the displayed name; if absent, choose a stable eligible member.
        $families = (clone $query)->selectRaw('family_form_reference_no as family_key,
            count(distinct reference_no) as total_applicants,
            coalesce(min(case when relationship_with_head_of_family = 1 then reference_no end), min(reference_no)) as representative_reference')
            ->groupBy('family_form_reference_no');
        return $query->joinSub($families, 'report_families', function ($join) {
            $join->on('familyapplications.family_form_reference_no', '=', 'report_families.family_key')
                ->on('familyapplications.reference_no', '=', 'report_families.representative_reference');
        })->select('familyapplications.*', 'report_families.total_applicants')
            ->orderBy('familyapplications.family_form_reference_no');
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
