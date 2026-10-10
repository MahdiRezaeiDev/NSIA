<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Verification;
class VerificationController extends Controller
{
    public function loadImage(Request $r){
        if($r->user()->role == 'id_verifier'){
            \App\Log::record('viewVerification',$r);
            if($r->input('type') =='cropped'){
                $image=Verification::getCroppedImage($r->input('pageNumber'));
                return ['image'=>base64_encode($image)];
                return \Response::make($image, 200, ['Content-Type'=>'image/jpeg']);
            }
            if($r->input('type') =='full'){
               $image=Verification::getFullImage($r->input('pageNumber'));
               return ['image'=>base64_encode($image)];
               return \Response::make($image, 200, ['Content-Type'=>'image/jpeg']);
            }
            abort(404);
        }
   
    }

    public function getMatches(Request $r){
        $result = \App\Verification::where('reference_no',$r->input('reference_no'))->orderBy('match_score','desc')->take(5)->get();
        return $result;
    }
}
