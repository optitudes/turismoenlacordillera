<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\BaseController as BaseController;
use App\Http\Requests\UpdateMicrositeSolicitudeRequest;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\UpdateServicesRequest;
use App\Http\Requests\UpdateMicositeIsPublicRequest;
use App\Http\Requests\UpdateThemeRequest;
use App\Http\Requests\UpdateMicositeDescriptionRequest;
use App\Http\Requests\UpdateMicrositeImageRequest;
use App\Http\Services\MicrositeSolicitudeService;
use App\Http\Services\MicrositeService;
use App\Models\MicrositeSolicitude;
use App\Models\Microsite;
use App\Models\MicrositeTheme;




class MicrositeController extends BaseController
{
    public function __construct(
        private MicrositeSolicitudeService $micrositeSolicitudeService,
        private MicrositeService $micrositeService
        ){}



    public function getMicrositesSolicitudes($filter = null)
    {
        try {
            $solicitudes = MicrositeSolicitude::getMicrositeSolicitudes($filter);
            return $this->sendResponse($solicitudes, 'Información de las solicitudes de micrositios obtenida con éxito');

        } catch (\Throwable $th) {
            return $this->sendError($th->getMessage());
        }
    }

    public function updateMicrositeSolicitude(UpdateMicrositeSolicitudeRequest $request)
        {
            try {
                $status = $this->micrositeSolicitudeService->updateMicrositeSolicitude($request);
                if($status['success'])
                    return $this->sendResponse(null,$status['msg'] );
                return $this->sendError($status['msg']);

            } catch (\Throwable $th) {
                return $this->sendError($th->getMessage());
            }
        }

    public function updateIsPublic(UpdateMicositeIsPublicRequest $request)
        {
            try {
                $status = $this->micrositeService->updateIsPublic($request);
                if($status['success'])
                    return $this->sendResponse(null,$status['msg'] );

            } catch (\Throwable $th) {
                return $this->sendError($th->getMessage());
            }
        }
    public function updateDescription(UpdateMicositeDescriptionRequest $request)
        {
            try {
                $status = $this->micrositeService->updateDescription($request);
                if($status['success'])
                    return $this->sendResponse(null,$status['msg'] );

            } catch (\Throwable $th) {
                return $this->sendError($th->getMessage());
            }
        }
    public function updateSmallImage(UpdateMicrositeImageRequest $request)
        {
            try {
                $status = $this->micrositeService->updateSmallImage($request);
                if($status['success'])
                    return $this->sendResponse(null,$status['msg'] );
                return $this->sendError("hola papu");

            } catch (\Throwable $th) {
                return $this->sendError($th->getMessage());
            }
        }
    public function updateBannerImage(UpdateMicrositeImageRequest $request)
        {
            try {
                $status = $this->micrositeService->updateBannerImage($request);
                if($status['success'])
                    return $this->sendResponse(null,$status['msg'] );
                return $this->sendError($status['msg']);

            } catch (\Throwable $th) {
                return $this->sendError($th->getMessage());
            }
        }
    public function updateTheme(UpdateThemeRequest $request)
        {
            try {
                $status = $this->micrositeService->updateTheme($request);
                if($status['success'])
                    return $this->sendResponse(null,$status['msg'] );
                return $this->sendError($status['msg']);

            } catch (\Throwable $th) {
                return $this->sendError($th->getMessage());
            }
        }



    public function search($filter = null)
        {
            try {
                $microsites = Microsite::basicInfoSearch($filter);
                return $this->sendResponse($microsites,"Micrositios filtrados con exito".$filter);

            } catch (\Throwable $th) {
                return $this->sendError($th->getMessage());
            }
        }
    public function getThemes()
        {
            try {
                $microsites = MicrositeTheme::whereNull('deleted_at')->get();
                return $this->sendResponse($microsites,"Temas de micrositios obtenidos correctamente");

            } catch (\Throwable $th) {
                return $this->sendError($th->getMessage());
            }
        }
    public function updateServices(UpdateServicesRequest $request,$micrositeId = null)
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

                $status = $this->micrositeService->updateServices($request,$micrositeId);
                if($status['success']){
                    return $this->sendResponse($request->all(),$status['msg']);
                }
                return $this->sendError($status['msg']);


            } catch (\Throwable $th) {
                return $th;
                return $this->sendError($th->getMessage());
            }
        }

    }


    
