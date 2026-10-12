<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Request;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Log; // <-- added for logging

class Handler extends ExceptionHandler
{

    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [

    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
        'token',
        'signature',
    ];

    /**
     * Report or log an exception.
     *
     * @param  \Exception  $exception
     * @return void
     */
    public function report(Exception $exception)
    {
        $request = request();

        if($this->shouldReport($exception)) {
            // Try saving to DB but ignore DB errors
            try {
                \App\ExceptionLog::create([
                    'status' => $exception->getCode(),
                    'file'   => $exception->getFile(),
                    'trace'  => json_encode([
                        'request' => \App\Log::safeData($request->all()),
                        'url'     => $request->url(),
                        'exception_type' => get_class($exception),
                        'error_code' => $exception->getCode()
                    ])
                ]);
            } catch (\Exception $e) {
                // ignore DB errors
            }

            // Always log to laravel.log
            Log::error('Backend request failed', ['exception_type' => get_class($exception),
                'error_code' => $exception->getCode(), 'file' => $exception->getFile(), 'line' => $exception->getLine()]);
        }

    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $exception)
    {
        $response = parent::render($request, $exception);
        if ($request->is('api/*') && $response->getStatusCode() >= 500 && !($exception instanceof \Illuminate\Http\Exceptions\HttpResponseException)) {
            return response()->json(['status' => 'error', 'errors' => ['یک مشکل در سیستم رخ داد؛ دوباره کوشش نمایید.']], $response->getStatusCode());
        }
        return $response;
    }
}
