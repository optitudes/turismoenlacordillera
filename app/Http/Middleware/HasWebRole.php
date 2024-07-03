<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class HasWebRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next ,$allowedRoles = "*"): Response
    {
        if ($allowedRoles != '*') {
            $roleArray = explode('-', $allowedRoles);
            if (!in_array(auth()->user()->role_id, $roleArray)) {
                // 401 response
            return redirect('login');
            }
        }
        return $next($request);
    }
}
