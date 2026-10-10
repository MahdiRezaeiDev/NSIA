<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use \DB;
class Testform extends Model
{
    public static function getDuplicateRecords(){
        $records = \DB::select("select * from (select  count(*) as total,
        id,status,name,father_name,grand_father_name,original_residence_province,
        original_residence_district from testforms where apply_for_new_id='بلی' and 
        relationship_with_head_of_family=1 and status!=13
        group by concat(name,father_name,grand_father_name,original_residence_province,original_residence_district)
        having count(name) > 1 order by status desc, created_at desc) as result");
        return $records;
    }

    public static function getAllDuplicates(){
        $records = Testform::getDuplicateRecords();
        $results=collect();
        foreach($records as $r):
            $duplicateRecords = Testform::where('name',$r->name)
            ->where('father_name',$r->father_name)
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
        $duplicates = Testform::getAllDuplicates();

        foreach($duplicates as $duplicateSet):
            foreach($duplicateSet as $key=>$d):
                if($key !=0){
                        $d->old_status = $d->status;
                        $d->status = 15;
                        $d->save();
                     
                }
            endforeach;
           
        endforeach;
    }
}
