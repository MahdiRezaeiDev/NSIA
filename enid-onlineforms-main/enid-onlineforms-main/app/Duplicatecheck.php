<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use \DB;
use App\Individualform;
class Duplicatecheck extends Model
{
    public static function getDuplicateRecords(){
        $records = \DB::select("select * from (select  count(*) as total,
        id,status,name,father_name,grand_father_name,original_residence_province,
        original_residence_district from individualforms where apply_for_new_id='بلی' and 
        relationship_with_head_of_family=1 and status!='13' and status!=15
        group by concat(name,father_name,grand_father_name,original_residence_province,original_residence_district)
        having count(name) > 1 order by status desc, created_at desc) as result");
        return $records;
    }

    public static function getAllDuplicates(){
        $records = Duplicatecheck::getDuplicateRecords();
        $results=collect();
        foreach($records as $r):
            $duplicateRecords = Individualform::where('name',$r->name)
            ->where('father_name',$r->father_name)
            ->where ('status','<>',13)
            ->where('grand_father_name',$r->grand_father_name)
            ->where('original_residence_province',$r->original_residence_province)
            ->where('original_residence_district',$r->original_residence_district)
            ->orderBy('status','desc')
            ->orderBy('created_at','desc')->get();
            $results = $results->push($duplicateRecords);
        endforeach;

        return $results;
    }

    public static function updateDuplicateRecords(){
        $duplicates = Duplicatecheck::getAllDuplicates();

        foreach($duplicates as $duplicateSet):
            foreach($duplicateSet as $key=>$d):
                $duplicate = new Duplicatecheck;
                $duplicate->duplicate_of_reference_no                       = $duplicateSet[0]->reference_no;
                $duplicate->duplicate_of_family_form_reference_no           = $duplicateSet[0]->family_form_reference_no;
                if($key !=0){
                    $duplicate->reference_no                                    = $d->reference_no;
                    $duplicate->family_form_reference_no                        = $d->family_form_reference_no;
                    $duplicate->save();
                     
                }
            endforeach;
           
        endforeach;
    }

    public static function removeDuplicateChecks(){
        Duplicatecheck::updateDuplicateRecords();
        $toRemove = Duplicatecheck::where('isUpdated',false)->get();
        foreach($toRemove as $r):
            $i = \App\Individualform::where('reference_no',$r->reference_no)->first();
            if( $i->status !=6 ){
                $data                =  [];
                $members             =  $i->familyMembers()->get();
                foreach($members as $m):
                    $data[$m->reference_no]=$m->status;
                    $m->status       = 15;
                    $m->save();
                    $m->updateTracking( $m->statusDescription );
                endforeach;

                $r->data             =  json_encode($data);
                $r->isUpdated        =  true;
                $r->save();
            }
        endforeach;
            
    }
}
