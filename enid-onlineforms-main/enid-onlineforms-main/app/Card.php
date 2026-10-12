<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Card extends Model
{
    public function findCard($number){
        $result=[];
        $number = str_replace(" ","",$number);
        $number = str_replace("-","",$number);
        $card=\DB::connection('printing')->table('cards')->where('number',$number)->orderBy('printDate','desc')->first();
        if($card){
            if( $this->isPrinted($card) ){
                $result[]=['description'=>'کارت تان چاپ شد در حال ارسال به مرکز'];
            }
            
        }
    }
}
