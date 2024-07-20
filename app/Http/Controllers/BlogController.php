<?php

namespace App\Http\Controllers;

use App\Http\Services\UserService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogController extends Controller
{

    public function __construct(private UserService $userService  ){}

   
    /**
     * Display the blogs search view.
     */
    public function blogs(Request $request)
    {
        return Inertia::render('Home/Blogs/Search');
   }

}
