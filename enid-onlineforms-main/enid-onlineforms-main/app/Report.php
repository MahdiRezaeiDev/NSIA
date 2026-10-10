<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use \DB;
use \Carbon\Carbon;
use App\Pdf;
use League\Csv\Reader;
use League\Csv\Statement;
use Box\Spout\Reader\Common\Creator\ReaderEntityFactory;
use \App\Jobs\ImportEventsJob;
class Report extends Model
{
    public static function getAppointmentsByCenter($center_id,Carbon $date){
        $appointments=\DB::table('familyapplications')
            ->where('appointment_date',\Hijri::fromCarbon($date)->format('Y-m-d'))
            ->where('center_id',$center_id)
            ->orderBy('queue_no')->orderBy('reference_no')->get();
        return $appointments;
    }

    public static function getEventsByRoleAndCenter($center_id,Carbon $date){
        $events = \DB::table('eventsandusers')->selectRaw('count("id") as total,user_id,role')
                    ->where('created_at','>=',$date->setTime(0,0,0)->format('Y-m-d H:i:s'))
                    ->where('created_at','<=',$date->setTime(23,59,59)->format('Y-m-d H:i:s'))
                    ->where('user_id','<>',0)
                    ->where('center_id',$center_id)
                    ->groupBy('role')
                    ->get();

    
        return $events;
        
    }

    public static function getEventsByUserAndCenter($center_id,Carbon $date){
        $events = \DB::table('eventsandusers')->selectRaw('count("id") as total,user_id,role,username')
                    ->where('created_at','>=',$date->setTime(0,0,0)->format('Y-m-d H:i:s'))
                    ->where('created_at','<=',$date->setTime(23,59,59)->format('Y-m-d H:i:s'))
                    ->where('user_id','<>',0)
                    ->where('center_id',$center_id)
                    ->groupBy('username')
                    ->get();

    
        return $events;
        
    }

    public static function getEventsByUserFullAndCenter($center_id,Carbon $date){
        $events = \DB::table('eventsandusers')
                    ->where('created_at','>=',$date->setTime(0,0,0)->format('Y-m-d H:i:s'))
                    ->where('created_at','<=',$date->setTime(23,59,59)->format('Y-m-d H:i:s'))
                    ->where('user_id','<>',0)
                    ->where('center_id',$center_id)
                    ->get();

    
        return $events;
        
    }

    public static function importRm(){
        $filePath =\Storage::disk('local')->path('rmreport.xlsx');
        $reader = ReaderEntityFactory::createXLSXReader($filePath);
        $reader->open($filePath);
        $rowCount=0;
        $result=[];
    
        foreach ($reader->getSheetIterator() as $sheet) {

            foreach ($sheet->getRowIterator() as $row) {
                $data=[];
                if($rowCount > 0){
                    $rmRecord=new \App\Rmrecord;
                    $cells                        = $row->getCells();
                    $rmRecord->name               = $cells[0]->getValue();
                    $rmRecord->surname            = $cells[1]->getValue();
                    $rmRecord->fathername         = $cells[2]->getValue();
                    $rmRecord->grandfathername    = $cells[3]->getValue();
                    $rmRecord->nid                = number_format($cells[4]->getValue(),0,".","");
                    $rmRecord->pob                = $cells[5]->getValue();
                    $rmRecord->save();

                }
                    
                $rowCount++;
            }
        }

        $reader->close();
       
    }   

    public static function crossMatch(){
        $processedApplications =\App\Rmrecord::get();
        $foundApplications=collect();
        $processedCount=0;
        $allApplications = \DB::table('individualforms')
        ->where('apply_for_new_id','بلی')
        ->where('status','<>',6)
        ->get([
            'name',
            'surname',
            'status',
            'father_name',
            'grand_father_name',
            'original_residence_district_code',
            'reference_no',
            'family_form_reference_no'
        ]);
        foreach($processedApplications as $p):
            $grandFatherName = explode("|",$p->grandfathername);
            $fatherName = explode("|",$p->fathername);
            if( count($fatherName) == 1){
                $fatherName = $fatherName[0];
            }else{
                $fatherName = $fatherName[1];
            }
            if( count($grandFatherName) == 1){
                $grandFatherName = $grandFatherName[0];
            }else{
                $grandFatherName = $grandFatherName[1];
            }
            $originalDistrictCode = sprintf('%04d', $p->pob);
            $rmRecordSearchText = $fatherName.$grandFatherName;
            $applications=$allApplications
            ->where('name',$p->name)
            ->where('original_residence_district_code',$originalDistrictCode);
            foreach($applications as $application):
                    $onlineFormSearchText = $application->father_name.$application->grand_father_name;
                    $compareScore =0;
                    similar_text(Report::removeCommonNames($rmRecordSearchText),Report::removeCommonNames($onlineFormSearchText,$compareScore));
                    if($compareScore > 80){
                        $foundApplications->push($application->reference_no);
                        $rmLog                  = new \App\Rmmatch;
                        $rmLog->reference_no    = $application->reference_no;
                        $rmLog->family_form_reference_no = $application->family_form_reference_no;
                        $rmLog->nid_no          = $p->nid;
                        $rmLog->current_status  = $application->status;
                        $rmLog->match_score     =$compareScore;
                        $rmLog->save();
                    }
                   
            endforeach;
            $processedCount++;
            echo $foundApplications->count()." applications found out of ".$processedCount.PHP_EOL;
        endforeach;

        return $foundApplications;
    }

    public static function resetCrossMatch(){
        $forms = \App\Individualform::where('status',6)->get();
        foreach($forms as $f):
            $f->status = $f->old_status;
            $f->nid_no ='';
            $f->save();
        endforeach;
    }

    public static function removeCommonNames($name){
        $commonNames=[
            "محمد",
            "احمد",
            "حاجی",
            "خان",
            "جان",
            "الله"
        ];
        if(strpos($name," ")){
            foreach($commonNames as $c):
                $name = str_replace($c,"",$name);
            endforeach;
        }

        return $name;
    }
    
    public static function createImportEventJobs(){
        $lastEvent =\App\Report::orderBy('id','desc')->first();
        $events = new \App\Event;
        if($lastEvent){
            $date=\Hijri::fromFormat('Y-m-d H:i:s',$lastEvent->event_date);
            $events = $events->whereDate('created_at','>',$date);
        }
        $eventChunks = $events->get()->chunk(1000);
        foreach($eventChunks as $chunk):
            \App\Jobs\ImportEventsJob::dispatch($chunk);
        endforeach;

    }
    public static function importFromEvents($events){
      
        foreach($events as $e):
            $isVerification=false;
            if(Report::isVerified($e->description)){
                $isVerification=true;
            }
            if(Report::isNotVerified($e->description)){
                $isVerification=true;
            }
            $application = \DB::table('familyapplications')->where('reference_no',$e->reference_no)->where('apply_for_new_id','بلی')->first();
            
            if($application){
                $reportExists = Report::where('reference_no',$application->reference_no)->where('status_description',Report::getStatusDescription($e->description))->exists();
                if($reportExists == false){
                    $eventDate=\Hijri::fromCarbon(\Carbon\Carbon::createFromFormat('Y-m-d H:i:s',$e->created_at));
                    $report                                     = new Report;
                    $report->family_form_reference_no           = $application->family_form_reference_no;
                    $report->reference_no                       = $application->reference_no;
                    $report->center_id                          = $application->center_id;
                    $report->center_name                        = $application->center_name;
                    $report->name                               = $application->name;
                    $report->surname                            = $application->surname;
                    $report->father_name                        = $application->father_name;
                    $report->father_surname                     = $application->father_surname;
                    $report->grand_father_name                  = $application->grand_father_name;
                    $report->grand_father_surname               = $application->grand_father_surname;
                    $report->primary_contact_no                 = $application->primary_contact_no;
                    $report->secondary_contact_no               = $application->secondary_contact_no;
                    $report->description                        = $e->description;
                    $report->status_description                 = Report::getStatusDescription($e->description);
                    $report->event_date                         = $isVerification ? $application->appointment_date." 00:00:00" :$eventDate;
                    $report->save();
                }
            }

        endforeach;
        
        


    }

    public static function getStatusDescription($event){
        if(Report::isNewApplication($event)){
            return 'فورم جدید';
        }
        if(Report::isVerified($event)){
            return 'تثبیت هویت شد';
        }
        
        if(Report::isNotVerified($event)){
            return 'تثبیت هویت نشد';
        } 
        
        if(Report::isChecked($event)){
            return 'چک شد';
        }

        if(Report::isRegistered($event)){
            return 'ثبت شد';
        }
        if(Report::isCancelled($event)){
            return 'لغوه شد';
        }
        if(Report::isDistributed($event)){
            return 'توزیع شد';
        }

        return 'نا معلوم';
    }

    public static function isVerified($event){
        $search=[
            'شماره ثبت',
            'تثبیت هویت شد',
        ];

        foreach($search as $s):
            if(strpos($event,$s)!==false){
                return true;
            }
        endforeach;

        return false;
    }

    public static function isNotVerified($event){
        $search=[
            'هویت تثبیت نگردید',
            'تثبیت هویت نشد',
        ];

        foreach($search as $s):
            if(strpos($event,$s)!==false){
                return true;
            }
        endforeach;

        return false;
    }

    public static function isNewApplication($event){
        $search=[
            'فارم رسید',
        ];

        foreach($search as $s):
            if(strpos($event,$s)!==false){
                return true;
            }
        endforeach;

        return false;
    }

    public static function isChecked($event){
        return $event == 'چک شد';
    }

    public static function isCancelled($event){
        $search=[
            'لغوه شده',
        ];

        foreach($search as $s):
            if(strpos($event,$s)!==false){
                return true;
            }
        endforeach;

        return false;
    }

    public static function isRegistered($event){
        $search=[
            'ثبت شد',
        ];

        foreach($search as $s):
            if(strpos($event,$s)!==false){
                return true;
            }
        endforeach;

        return false;
    }

    public static function isDistributed($event){
        $search=[
            'توزیع شد',
            'توزیع گردید',
        ];

        foreach($search as $s):
            if(strpos($event,$s)!==false){
                return true;
            }
        endforeach;

        return false;
    }
   public static function stringToDate($date){
       $date = \App\Individualform::formatDate($date);
       $date = \Hijri::fromFormat('Y-m-d',$date);
       return $date;
   }
}
