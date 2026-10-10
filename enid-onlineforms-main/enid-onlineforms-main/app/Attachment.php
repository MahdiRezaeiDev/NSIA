<?php
namespace App;
use Imagick;
class Attachment{
    public static function resize($file){
        
        if( Attachment::getExtension($file) == 'pdf' ){
            return \App\Pdf::resize($file);
        }else{
            $fileContents   = $file->get();
            $im             = new Imagick();
            $im->readImageBlob($fileContents);
            $height =   $im->getImageHeight();
            $width  =   $im->getImageWidth();
            if( $width > $height ){
                $im->rotateImage("#000",90);
            }
           
            $im->adaptiveResizeImage(500,707);
            
            return $im->getImageBlob();
        }
    
    }

    public static function getExtension($file){
        $fileExtension = \File::extension($file->getClientOriginalName());
        if($fileExtension ==""){
            $fileExtension = Attachment::getFileExtensionFromMimeType($file);
        }
        return $fileExtension;
    }

    private static function getFileExtensionFromMimeType($file){
        $mimeType   =   $file->getMimeType();
        if($mimeType == 'image/jpeg'){
            return 'jpg';
        }
        if($mimeType == 'image/jpg'){
            return 'jpg';
        }
        if($mimeType == 'image/png'){
            return 'png';
        }
        if($mimeType == 'application/pdf'){
            return 'pdf';
        }
    }
}