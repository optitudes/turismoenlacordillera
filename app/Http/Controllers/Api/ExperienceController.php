<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\BaseController as BaseController;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\UpdateExperiencesRequest;
use App\Http\Requests\UpdateExperienceImagesRequest;
use App\Http\Requests\UpdateExperienceVideoRequest;
use App\Http\Requests\UpdateExperienceItinerary;
use App\Http\Requests\UpdateExperienceGpsMap;
use App\Http\Requests\UpdateExperienceInteractiveMap;
use App\Http\Requests\DeleteExperienceVideo;

use App\Http\Services\ExperienceService;

use App\Models\Microsite;
use App\Models\Experience;


class ExperienceController  extends BaseController
{
    public function __construct(
        private ExperienceService $experienceService
        ){}

   public function updateExperiences(UpdateExperiencesRequest $request,$micrositeId = null)
        {
            try {

                if($micrositeId == null){
                    $microsite = Microsite::where('userId',Auth::user()->id)->where('isActive',true)->whereNull('deleted_at')->first();
                    if($microsite){
                        $micrositeId = $microsite->id;
                    }else{
                        return $this->sendError("Error al obtener la información del micrositio, puede que el microsition no esté activo o haya sido borrado, contacte con soporte.");
                    }
                }else{
                    $isAbleToUpdate =  Auth::user()->role_id == config('constants.ROLES_ID.ADMIN') || Auth::user()->role_id == config('constants.ROLES_ID.ROOT'); 
                    if($isAbleToUpdate == false){
                        return $this->sendError("Error al obtener la información del micrositio, el usuario no cuenta con los permisos necesarios.");
                    }
                }

                $status = $this->experienceService->updateExperiences($request,$micrositeId);
                if($status['success']){
                    return $this->sendResponse(null,$status['msg']);
                }
                return $this->sendError($status['msg']);


            } catch (\Throwable $th) {
                return $this->sendError($th->getMessage());
            }
        }


    public function getExperienceImagesByExperienceId($id)
        {
            try {

                $status = $this->experienceService->getExperienceImagesByExperienceId($id);
                if($status['success']){
                    return $this->sendResponse($status['experienceImages'],$status['msg']);
                }
                return $this->sendError($status['msg']);


            } catch (\Throwable $th) {
                return $this->sendError($th->getMessage());
            }
        }
    public function updateGalleryImages(UpdateExperienceImagesRequest $request,$experienceId= null){
            try {

                if($experienceId == null){
                    return $this->sendError("Error al obtener la información de la experiencia, puede que la experiencia  haya sido borrado, contacte con soporte.");
                }else{
                    $isAdmin =  Auth::user()->role_id == config('constants.ROLES_ID.ADMIN') || Auth::user()->role_id == config('constants.ROLES_ID.ROOT'); 
                    if($isAdmin == false){
                        $microsite = Microsite::where('userId',Auth::user()->id)->where('isActive',true)->whereNull('deleted_at')->first();
                        $experience = Experience::where('micrositeId',$microsite->id)->first();
                        if($experience == null){
                            return $this->sendError("Error al obtener la información de la experiencia, el usuario no cuenta con los permisos necesarios.");
                        }
                    }
                }
                $status = $this->experienceService->updateGalleryImages($request,$experienceId);
                if($status['success']){
                    return $this->sendResponse(null,$status['msg']);
                }
                return $this->sendError($status['msg']);


            } catch (\Throwable $th) {
                return $this->sendError($th->getMessage());
            }

    }

    public function experienceVideos($experienceId= -1){
        try {

                $status = $this->experienceService->getExperienceVideos($experienceId);
                if($status['success']){
                    return $this->sendResponse($status['videos'],$status['msg']);
                }
                return $this->sendError($status['msg']);


            } catch (\Throwable $th) {
                return $this->sendError($th->getMessage());
            }
    }
    public function experienceItinerary($experienceId= -1){
        try {
                $status = $this->experienceService->getExperienceItinerary($experienceId);
                if($status['success']){
                    return $this->sendResponse($status['itinerary'],$status['msg']);
                }
                return $this->sendError($status['msg']);


            } catch (\Throwable $th) {
                return $this->sendError($th->getMessage());
            }
    }
    public function updateExperienceVideo(UpdateExperienceVideoRequest $request){
        try {
                $status = $this->experienceService->updateExperienceVideo($request);
                if($status['success']){
                    return $this->sendResponse(null,$status['msg']);
                }
                return $this->sendError($status['msg']);

            } catch (\Throwable $th) {
                return $this->sendError($th->getMessage());
            }
    }
    public function updateItinerary(UpdateExperienceItinerary $request){
        try {
                $status = $this->experienceService->updateItinerary($request);
                if($status['success']){
                    return $this->sendResponse(null,$status['msg']);
                }
                return $this->sendError($status['msg']);

            } catch (\Throwable $th) {
                return $this->sendError($th->getMessage());
            }
        }
    public function updateGpsMap(UpdateExperienceGpsMap $request){
        try {

                $status = $this->experienceService->updateGpsMap($request);
                if($status['success']){
                    return $this->sendResponse(null,$status['msg']);
                }
                return $this->sendError($status['msg']);
            } catch (\Throwable $th) {
                return $this->sendError($th->getMessage());
            }
        }
    public function updateInteractiveMap(UpdateExperienceInteractiveMap $request){
        try {

                $status = $this->experienceService->updateInteractiveMap($request);
                if($status['success']){
                    return $this->sendResponse(null,$status['msg']);
                }
                return $this->sendError($status['msg']);
            } catch (\Throwable $th) {
                return $this->sendError($th->getMessage());
            }
        }
    public function deleteVideo(DeleteExperienceVideo $request){
        try {

            $status = $this->experienceService->deleteVideo($request);
            if($status['success']){
                return $this->sendResponse(null,$status['msg']);
            }
            return $this->sendError($status['msg']);
        } catch (\Throwable $th) {
            return $this->sendError($th->getMessage());
        }
    }
    }


    
