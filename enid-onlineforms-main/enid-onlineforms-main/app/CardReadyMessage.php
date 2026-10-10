<?php

namespace App;
use Storage;
use thiagoalessio\TesseractOCR\TesseractOCR;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;
use Intervention\Image\ImageManager;
use App\Ocr;
class CardReadyMessage extends Model
{
    protected $table = "cardreadymessages";

    public function getIdFromImage(){
        $tmpFileName = "ocr_".$this->id.".jpg";
        Storage::disk('local')->put($tmpFileName,base64_decode($this->image));
        return Ocr::readAndExtractIdCard($tmpFileName);
    }   


   
}
