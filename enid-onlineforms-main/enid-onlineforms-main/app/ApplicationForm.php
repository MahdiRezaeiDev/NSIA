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
            $im->readImageBlob(\App\Services\AttachmentStorage::disk()->get($path));
            $im->setImageFormat("jpg");
            $im->adaptiveResizeImage($width,$height);
      
            return $im->getImageBlob();
        }catch(\Exception $e){
        
            if (\Storage::disk('local')->exists('placeholder.jpg')) {
                return \Storage::disk('local')->get('placeholder.jpg');
            }
            $fallback = new \Imagick();
            $fallback->newImage($width, $height, new \ImagickPixel('#f1f5f9'));
            $fallback->setImageFormat('jpg');
            $draw = new \ImagickDraw();
            $draw->setStrokeColor('#9ca3af');
            $draw->setStrokeWidth(2);
            $draw->line(0, 0, $width, $height);
            $draw->line(0, $height, $width, 0);
            $fallback->drawImage($draw);
            return $fallback->getImageBlob();
        }

        return $placeholder;
       
    }
}
