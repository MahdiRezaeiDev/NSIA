<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use GuzzleHttp\Client;
class Verification extends Model
{
    public static $url = 'http://149.54.11.58:5050';

    public static function getCroppedImage($pageNumber){
        $token = \App\Verification::getToken();
        $client = new \GuzzleHttp\Client();
        $response=$client->request('GET',Verification::$url."/download/cropped",[
            'query'=>[
                'ID'=>$pageNumber,
            ],
            'headers'=>['Authorization'=>'Bearer '.$token]
        ]);
        $res=(string)$response->getBody();
        return $res;

    }

    public static function getToken(){
        $client = new \GuzzleHttp\Client();
        $response=$client->request('POST',Verification::$url."/user/authenticate",[
            'json'=>[
                'UserName'=>'NIDDownloader',
                'Password'=>'u6Wq2aX15odNJRaT0KVPBF4qd08',
            ],
        ]);
        $res=(string)$response->getBody();
        $result = json_decode($res);
        return $result->token;

    }

    public static function getFullImage($pageNumber){
        $token = \App\Verification::getToken();
        $client = new \GuzzleHttp\Client();
        $response=$client->request('GET',Verification::$url."/download/page",[
            'query'=>[
                'ID'=>$pageNumber,
            ],
            'headers'=>['Authorization'=>'Bearer '.$token]
        ]);
        $res=(string)$response->getBody();
        return $res;

    }
}
