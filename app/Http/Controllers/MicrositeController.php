<?php

namespace App\Http\Controllers;

use App\Http\Services\UserService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MicrositeController extends Controller
{

    public function __construct(private UserService $userService  ){}

    /**
     * Display the dashboard view.
     */
    public function solicitudes(Request $request)
    {
        return Inertia::render('Panel/Admin/Microsites/Solicitudes/MicrositeSolicitude');
   }

}
