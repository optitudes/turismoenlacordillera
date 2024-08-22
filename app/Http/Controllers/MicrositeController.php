<?php

namespace App\Http\Controllers;

use App\Http\Services\MicrositeService;
use App\Http\Services\ExperienceService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MicrositeController extends Controller
{

    public function __construct(
        private MicrositeService $micrositeService,
        private ExperienceService $experienceService

          ){}

    /**
     * Display the solicitudes list view.
     */
    public function solicitudes(Request $request)
    {
        return Inertia::render('Panel/Admin/Microsites/Solicitudes/MicrositeSolicitude');
   }
    /**
     * Display the microsites view as client.
     */
    public function microsites(Request $request)
    {
        return Inertia::render('Home/Microsites/Search');
    }
    public function entrepreneurSettings(Request $request){
        $info = $this->micrositeService->getMicrositeBasicInfo();
        if($info['status'])
            return Inertia::render('Panel/Microsite/Settings/Settings',['micrositeInfo'=>$info['microsite']]);
        return Redirect::route('dashboard');
    }
    /**
     * Display the microsites view as client.
     */
    public function viewMicrosite($name=null,Request $request)
    {
        if($name){
            $micrositeViewInfo = $this->micrositeService->getMicrositeViewInfo($name); 
            return Inertia::render('Home/Microsites/View/View'.$micrositeViewInfo['theme']->viewIndex,['information'=>$micrositeViewInfo]);
        }
        return Redirect::route('login');
    }
    public function serviceList(Request $request)
    {
        $servicesStatus =$this->micrositeService->getMicrositeServices();
        $themeStatus =$this->micrositeService->getThemeInfo();
        $availableCategories = $this->experienceService->getAvailableCategories();

        if($servicesStatus['success'] && $themeStatus['success'] ){
            $information['services'] = $servicesStatus['services'];
            $information['theme'] = $themeStatus['theme'];
            $information['availableCategories'] = $availableCategories;
            return Inertia::render('Panel/Microsite/Services/Services',['information'=>$information]);
        }
        return Redirect::route('dashboard');
    }

}
