<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Individualform;
class Rmmatch extends Model
{
    protected $table = 'rmmatches5';
    public static function markAsComplete(){
        //$token = Individualform::getIvpToken();
        $records = Rmmatch::where('updated_at',null)->get();
        foreach($records as $record):
          $form = \App\Individualform::where('reference_no',$record->reference_no)->first();
          if(!$form){
            $form = \App\Individualform::where('reference_no',"0"+$record->reference_no)->first();
          }
          if($form && $form->status !=6 && $form->status !=15){
            $form->markAsComplete($record);
          }else{
            print($record->reference_no);
            $record->updated_at = \Carbon\Carbon::now();
            $record->save();
          }
          
        endforeach;
    }

    public static function updateRecords(){
        $records = Rmmatch::where('status',0)->get(['reference_no'])->map(function($r){
          return $r->reference_no;
        })->chunk(2000);
        $result=collect();
        foreach($records as $references):
          $applications = \App\Individualform::whereIn('reference_no',$references->all())
          ->whereNotIn('status',[6,15])->where('apply_for_new_id','بلی')->get();
          $events = [];
          foreach($applications as $a):
            $events[]=[
              'reference_no'=>$a->reference_no,
              'description'=>'توزیع شد',
              'finished'=>'',
              'user_id'=>''
            ];
          endforeach;
          \App\Event::insert($events);
          $referenceList = $applications->map(function($p){
            return $p->reference_no;
          });
          \App\Individualform::whereIn('reference_no',$referenceList)->update(['status'=>6]);
          \App\Rmmatch::whereIn('reference_no',$references)->update(['status'=>1]);
        endforeach;
    }
}
