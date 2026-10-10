<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Imagick;
class ApplicationForm extends Model
{
    /*
    * Gets application type by referenece no 
    */

    public static function getType($reference_no){
        if(strpos($reference_no,'F-')!==false){
            return 'individual';
        }


        return false;
    }

    public static function getImagePath($path){
        return config('app.url')."/api/viewImage?name=".$path;
    }
    public static function resizeImage($path,$width=300,$height=600 ){
        try{
            $im             = new Imagick();
            $im->readImageBlob(\Storage::disk('s3')->get($path));
            $im->setImageFormat("jpg");
            $im->adaptiveResizeImage($width,$height);
      
            return $im->getImageBlob();
        }catch(\Exception $e){
        
            $placeholder = \Storage::disk('local')->get("placeholder.jpg");
        }

        return $placeholder;
       
    }
}
