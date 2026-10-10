<?php
namespace App;
use Intervention\Image\ImageManager;
use \Storage;
use thiagoalessio\TesseractOCR\TesseractOCR;
class Ocr{
    
    public static function readImage($fileName){
        $path = Storage::disk('local')->path($fileName);
        $ocr=new TesseractOCR($path);
        $result = $ocr->run();
        return $result;
    }

    public static function toGray($fileName){
        $path = Storage::disk('local')->path($fileName);
        $manager = new ImageManager(array('driver' => 'imagick'));
        $img = $manager->make($path)->greyscale();
        $img->save($path);
    }

    public static function extractIdCard($text){
        $text = str_replace(" ","",$text);
        $text = str_replace("\n","",$text);
        $start      = strpos($text,"<A")+4;
        $year       = substr($text,$start,4);
        $firstPart  = substr($text,$start+4,4);
        $start      = strpos($text,"<",$start) +2;
        $secondPart = substr($text,$start,5);

        $text=$year."-".$firstPart."-".$secondPart;

    
   
        if(strlen($text) == 15){
            return $text;
        }
        return false;
    }


    public static function readAndExtractIdCard($imageName){
        $textOnId= Ocr::readImage($imageName);
        return Ocr::extractIdCard($textOnId);
    }
}