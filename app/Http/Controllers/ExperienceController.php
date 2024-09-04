<?php

namespace App\Http\Controllers;

use App\Http\Services\MicrositeService;
use App\Http\Services\ExperienceService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExperienceController extends Controller
{

    public function __construct(
        private MicrositeService $micrositeService,
        private ExperienceService $experienceService
          ){}

    /**
     * Display the experiences search as client.
     */
    public function search(Request $request)
    {
        return Inertia::render('Home/Experiences/Search/Search');
    }
    public function experienceList(Request $request)
    {
        $experiencesStatus =$this->micrositeService->getMicrositeExperiences();
        $themeStatus =$this->micrositeService->getThemeInfo();
        $availableCategories = $this->experienceService->getAvailableCategories();

        if($experiencesStatus['success'] && $themeStatus['success'] ){
            $information['experiences'] = $experiencesStatus['experiences'];
            $information['theme'] = $themeStatus['theme'];
            $information['availableCategories'] = $availableCategories;
            return Inertia::render('Panel/Microsite/Experiences/Experiences',['information'=>$information]);
        }
        return Redirect::route('dashboard');
    }
}
