<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\BaseController as BaseController;
use App\Http\Requests\UpdateMicrositeSolicitudeRequest;
use App\Http\Services\MicrositeSolicitudeService;
use App\Models\MicrositeSolicitude;




class MicrositeController extends BaseController
{
    public function __construct( private MicrositeSolicitudeService $micrositeSolicitudeService){}



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
                $solicitudes = $this->micrositeSolicitudeService->updateMicrositeSolicitude($request);
                return $this->sendResponse($solicitudes, 'Estado del micrositio actualizado correctamente, se notificará al usuario por correo');

            } catch (\Throwable $th) {
                return $this->sendError($th->getMessage());
            }
        }
    }
