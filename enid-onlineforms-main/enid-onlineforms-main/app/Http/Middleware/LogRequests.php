<?php

namespace App\Http\Middleware;

use Closure;
class LogRequests
{
    private $start=0;
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {   
   
        $this->start = microtime(true);
        $request->merge(['requestStartTime'=>$this->start]);
       
        return $next($request);
    }
    public function terminate($request, $response)
    {
        $responseTime =  microtime(true) - $request->input('requestStartTime');
       \App\Log::logRequest($request,$responseTime);
    }
         
}
