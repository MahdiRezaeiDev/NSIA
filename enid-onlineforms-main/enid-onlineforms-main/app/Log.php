<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
    // Optional: explicitly allow response_time
    protected $fillable = ['action', 'data', 'ip', 'user_id', 'response_time'];

    public static function write($request)
    {
        $log = new Log;
        $log->action  = $request->path();
        $log->ip      = Log::ip($request);
        $log->user_id = $request->user() ? $request->user()->id : 0;
        $log->data    = json_encode($request->all(), JSON_UNESCAPED_UNICODE);
        $log->save();
    }

    public static function ip($request)
    {
        return isset($_SERVER['HTTP_X_FORWARDED_FOR']) 
            ? $_SERVER['HTTP_X_FORWARDED_FOR'] 
            : $request->ip();
    }

    public static function record($action, $data)
    {
        if (is_array($data)) {
            $data = json_encode($data, JSON_UNESCAPED_UNICODE);
        }
        $log = new Log;
        $log->action  = $action;
        $log->ip      = '';
        $log->user_id = '';
        $log->data    = $data ?? ''; // ✅ never null
        $log->save();
    }

    public static function recordSubmission($family_form_reference_no, $ip)
    {
        $log = new Log;
        $log->action  = 'submitForm';
        $log->ip      = $ip;
        $log->user_id = '';
        $log->data    = json_encode(['family_form_reference_no' => $family_form_reference_no]);
        $log->save();
        return $log;
    }

    public static function recordWithDetails($action, $request, $data)
    {
        if (is_array($data)) {
            $data = json_encode($data, JSON_UNESCAPED_UNICODE);
        }
        $log = new Log;
        $log->action  = $action;
        $log->ip      = Log::ip($request);
        $log->user_id = $request->user() ? $request->user()->id : 0;
        $log->data    = $data ?? ''; // ✅ never null
        $log->save();
    }

    public static function logRequest($request, $responseTime)
    {
        $excludedPathsToSaveData = ['submit-individual-form','saveForm','uploadFile'];
        $user_id = $request->user() ? $request->user()->id : 0;

        $log = new Log;
        $log->action  = $request->path();
        $log->ip      = $request->ip();
        $log->user_id = $user_id;

        $requestData = [];
        if (!in_array($log->action, $excludedPathsToSaveData)) {
            $requestData = $request->all();
            unset($requestData['requestStartTime']);
        }

        // ✅ always JSON string, never []
        $log->data = json_encode($requestData, JSON_UNESCAPED_UNICODE);

        $log->response_time = $responseTime;
        $log->save();

        return $log;
    }
}
