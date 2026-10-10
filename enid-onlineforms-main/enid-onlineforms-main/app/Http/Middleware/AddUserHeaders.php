<?php

namespace App\Http\Middleware;

use Closure;

class AddUserHeaders
{
    public function handle($request, Closure $next)
    {
        $response = $next($request);

        // If user is authenticated, add custom headers
        if ($request->user()) {
            $response->header('X-User-Id', $request->user()->id);
            $response->header('X-User-Email', $request->user()->email);
        }

        return $response;
    }
}
