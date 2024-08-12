<?php

namespace App\Http\Controllers;

use App\Http\Services\MicrositeService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExperienceController extends Controller
{

    public function __construct(private MicrositeService $micrositeService  ){}

    /**
     * Display the experiences search as client.
     */
    public function search(Request $request)
    {
        return Inertia::render('Home/Experiences/Search/Search');
    }
}
