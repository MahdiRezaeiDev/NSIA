<?php
namespace App;
use Illuminate\Support\Facades\Log;
class RequestLogger{

    public static function log($url,$request="",$response=""){
        if(is_array($request)){
            $request = json_encode($request);
        }
        if(is_array($response)){
            $response = json_encode($response);
        }
        Log::emergency($url." ".$request."-----------------> ".$response);
    }

    public static function email($subject,$message){
       // return false;
        if( is_array($message) ){
            $message= json_encode($message);
        }
        Log::emergency($subject." ".$message);
    	
        \Mail::send( new \App\Mail\SimpleMail('sulayman.mohmand@gmail.com',$subject,$message));
    }

    public static function emailAttachment($subject,$message,$attachmentContent){

        \Mail::send( new \App\Mail\SimpleMail('sulayman.mohmand@gmail.com',$subject,$message,$attachmentContent));
    }
}