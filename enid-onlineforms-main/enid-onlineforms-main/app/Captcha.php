<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Captcha extends Model
{
    public static function isRobot($token, $action, $request = [])
    {
        if (config('security.captcha_driver') === 'disabled' && app()->environment(['local', 'testing'])) {
            return false;
        }
        if (!is_string($token) || $token === '' || !config('app.captchaKey')) {
            return true;
        }
        try {
            $client = app()->bound('captcha.client') ? app('captcha.client') : new \GuzzleHttp\Client();
            $response = $client->request('POST', 'https://www.google.com/recaptcha/api/siteverify', [
                'timeout' => 8, 'connect_timeout' => 3,
                'form_params' => ['secret' => config('app.captchaKey'), 'response' => $token],
            ]);
            $data = json_decode((string) $response->getBody(), true);
            return !is_array($data) || ($data['success'] ?? false) !== true ||
                ($data['action'] ?? '') !== $action ||
                !is_numeric($data['score'] ?? null) ||
                $data['score'] < config('security.captcha_min_score', 0.3) ||
                !in_array($data['hostname'] ?? '', config('security.captcha_hostnames', []), true);
        } catch (\Throwable $exception) {
            Log::record('CaptchaVerificationFailed', ['action' => $action]);
            return true;
        }
    }

    public static function generateCode($action, $ip = '')
    {
        $c = new static;
        $c->code = bin2hex(random_bytes(32));
        $c->action = $action;
        $c->ip = $ip;
        $c->save();
        return $c->code;
    }

    public static function verifyCode($code, $action)
    {
        if (!is_string($code) || $code === '') {
            return false;
        }
        return static::where('code', $code)->where('action', $action)
            ->where('created_at', '>=', now()->subMinutes(120))->exists();
    }
}
