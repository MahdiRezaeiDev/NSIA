<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $appends=['date','username'];
    protected $fillable=['reference_no','description','timeTaken','user_id'];

    public function getDateAttribute(){
        if(is_null($this->created_at)){
            return '';
        }
       return \Hijri::fromCarbon($this->created_at)->format('d/m/Y H:i:s');
    }

    public function getTimeTakenAttribute(){
        if( is_null($this->finished) ){
            return 'در جریان ';
        }

        return $this->minutes." دقیقه ";
    }

    public function user(){
        return $this->belongsTo(\App\User::class)->first();
    }

    public function username(){
        $user = $this->user();
        if(!$user){
            return 'نامعلوم';
        }
        return $this->user()->name;
    }

    public function getUserNameAttribute(){
        return $this->username();
    }
    
    public function application(){
        return $this->belongsTo(\App\Individualform::class,'reference_no','reference_no');
    }

    public static function createEvent($reference_no,$description,$user_id){
        $event = new Event;
        $event->reference_no    = $reference_no;
        $event->description     = $description;
        $event->user_id         = $user_id;
        $event->save();
        return $event;
    }

}
