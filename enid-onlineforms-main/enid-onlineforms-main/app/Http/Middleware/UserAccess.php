<?php

namespace App\Http\Middleware;

use Closure;

class UserAccess
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string  $role
     * @return mixed
     */
    public function handle($request, Closure $next, $role)
    {
        // If user is not logged in, let other auth middleware handle it
        if (!$request->user()) {
            return $next($request);
        }

        // Check if account is active
        if ($request->user()->active !== 1) {
            \Auth::logout();
            return redirect('/login')->with('notActive', 'Currently, your account is not active! Please contact the system administrator!');
        }

        // Allow all users if role == 'allUsers'
        if ($role === 'allUsers') {
            return $next($request);
        }

        // Check user role
        if ($request->user()->role !== $role) {
            \Auth::logout();

            // Redirect depending on environment
            if (config('app.env') === 'local') {
                return redirect('/login'); // stay local
            } else {
                return redirect("http://127.0.0.1:8000"); // production
            }
        }

        return $next($request);
    }
}
