<?php

namespace App\Http\Middleware;

use Closure;

class ActiveApiUser
{
    public function handle($request, Closure $next)
    {
        if (!$request->user() || !(int) $request->user()->active) {
            \App\Services\ApplicationAccess::fail('حساب کاربری شما غیرفعال است.', 403);
        }
        return $next($request);
    }
}
