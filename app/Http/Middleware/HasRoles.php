<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class HasRoles
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string  $allowedRoles
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function handle(Request $request, Closure $next, $allowedRoles = "*"): Response
    {
        if ($allowedRoles != '*') {
            $roleArray = explode('-', $allowedRoles);
            if (!in_array(auth()->user()->role_id, $roleArray)) {
                // 401 response
                return response()->json("Acceso no autorizado", 401);
            }
        }
        return $next($request);
    }
}
