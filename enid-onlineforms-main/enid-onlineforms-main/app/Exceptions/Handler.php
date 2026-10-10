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
                        'request' => $request->all(),
                        'url'     => $request->fullUrl(),
                        'message' => $exception->getMessage()
                    ])
                ]);
            } catch (\Exception $e) {
                // ignore DB errors
            }

            // Always log to laravel.log
            Log::error($exception);
        }

        parent::report($exception);
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
        return parent::render($request, $exception);
    }
}
