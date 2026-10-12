<?php

namespace App\Http\Middleware;

use Illuminate\Routing\Middleware\ThrottleRequests;

class PublicThrottle extends ThrottleRequests
{
    public function handle($request, \Closure $next, $maxAttempts = 120, $decayMinutes = 1)
    {
        $limits = ['api/login' => 10, 'api/submit-individual-form' => 10,
            'api/track' => 20, 'api/findApplication' => 20];
        return parent::handle($request, $next, $limits[$request->path()] ?? $maxAttempts, $decayMinutes);
    }

    protected function resolveRequestSignature($request)
    {
        return parent::resolveRequestSignature($request).'|'.$request->route()->uri();
    }
}
