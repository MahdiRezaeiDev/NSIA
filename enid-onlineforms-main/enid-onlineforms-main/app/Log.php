<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
    public static function safeData($data)
    {
        if (!is_array($data)) {
            return ['details_omitted' => true];
        }
        $allowed = ['reference_no', 'family_form_reference_no', 'family_reference_no', 'center_id',
            'type', 'status', 'step', 'member', 'action', 'record_id', 'error_code', 'method'];
        return array_filter(array_intersect_key($data, array_flip($allowed)), function ($value) {
            return is_scalar($value) || $value === null;
        });
    }
    // Optional: explicitly allow response_time
    protected $fillable = ['action', 'data', 'ip', 'user_id', 'response_time'];

    public static function write($request)
    {
        $log = new Log;
        $log->action  = $request->path();
        $log->ip      = Log::ip($request);
        $log->user_id = $request->user() ? $request->user()->id : 0;
        $log->data    = json_encode(static::safeData($request->all()), JSON_UNESCAPED_UNICODE);
        $log->save();
    }

    public static function ip($request)
    {
        return $request->ip();
    }

    public static function record($action, $data)
    {
        $data = static::safeData($data);
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
        $data = static::safeData($data);
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
        $excludedPathsToSaveData = ['api/submit-individual-form','api/saveForm','api/uploadFile'];
        $user_id = $request->user() ? $request->user()->id : 0;

        $log = new Log;
        $log->action  = $request->path();
        $log->ip      = $request->ip();
        $log->user_id = $user_id;

        $requestData = [];
        if (!in_array($log->action, $excludedPathsToSaveData)) {
            $requestData = static::safeData($request->all());
            unset($requestData['requestStartTime']);
        }

        // ✅ always JSON string, never []
        $log->data = json_encode($requestData, JSON_UNESCAPED_UNICODE);

        $log->response_time = $responseTime;
        $log->save();

        return $log;
    }
}
