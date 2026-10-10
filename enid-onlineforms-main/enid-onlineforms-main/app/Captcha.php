<?php
namespace App;

use Illuminate\Database\Eloquent\Model;
use App\RequestLogger;

class Captcha extends Model {

    public static function isRobot($token, $action, $request = []) {
        try {
            $client = new \GuzzleHttp\Client();
            $response = $client->request('POST', 'https://www.google.com/recaptcha/api/siteverify', [
                'form_params' => [
                    'secret' => config('app.captchaKey'),
                    'response' => $token
                ]
            ]);

            $response = json_decode($response->getBody());

            if (isset($response->success) && $response->success == true) {
                if ($response->action != $action) {
                    //RequestLogger::email('Robot Detected',$token.' Robot Detected for action:'.$action);
                    //return true;
                }
                if ($response->score < 0.3) {
                    // RequestLogger::email('Robot Detected',$token.' Robot Detected with score:'.$response->score);
                    return true;
                }
                return false;
            }

            // Safe logging to prevent breaking
            try {
                if (class_exists('\App\Log')) {
                    \App\Log::record('Robot Detected', $token . ' Robot Detected with failed response from Google:' . json_encode($response) . " Request:" . json_encode($request));
                }
            } catch (\Exception $e) {
                // Do nothing, prevent crash
            }

            return true;

        } catch (\Exception $e) {
            // Treat any exception as robot
            try {
                if (class_exists('\App\Log')) {
                    \App\Log::record('Captcha request failed', $e->getMessage() . " Token: $token Action: $action");
                }
            } catch (\Exception $ex) {
                // Ignore logging exceptions
            }
            return true;
        }
    }

    public static function generateCode($action, $ip = "") {
        $c = new Captcha;
        $c->code = substr(md5(microtime()) . rand(1, 12000000), 0, 100);
        $c->action = $action;
        $c->ip = $ip;
        $c->save();

        return $c->code;
    }

    public static function verifyCode($code, $action) {
        try {
            $c = Captcha::where('code', $code)->where('action', $action)->first();
            if (!$c) {
                try {
                    RequestLogger::email('Captcha Code failed', 'Captcha Code failed:' . $code . "/Action:" . $action);
                } catch (\Exception $e) {
                    // Prevent crash if email fails
                }
                return false;
            }

            // Ensure created_at is Carbon instance
            $created = $c->created_at;
            if (!$created instanceof \Carbon\Carbon) {
                $created = \Carbon\Carbon::parse($created);
            }

            if ($created->diffInMinutes(now()) > 120) {
                //RequestLogger::email('Captcha Code failed timout','Captcha Code failed timeout:'.$code."/Action:".$action);
                return false;
            }

            //$c->delete();
            return true;

        } catch (\Exception $e) {
            return false;
        }
    }
}
