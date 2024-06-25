<?php

namespace App\Http\Controllers;

use App\Http\Services\UserService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PanelController extends Controller
{

    public function __construct(private UserService $userService  ){}

    /**
     * Display the dashboard view.
     */
    public function dashboard(Request $request)
    {
        $token = Auth::user()->createToken(env('APP_KEY'))->plainTextToken;
        $userInfo = $this->userService->getSessionUserInfo();
        return Inertia::render('Dashboard',['token'=>$token,'userInfo'=>$userInfo]);
   }

}
