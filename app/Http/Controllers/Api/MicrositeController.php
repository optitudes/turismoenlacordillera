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
                $status = $this->micrositeSolicitudeService->updateMicrositeSolicitude($request);
                if($status['success'])
                    return $this->sendResponse(null,$status['msg'] );
                return $this->sendError($status['msg']);

            } catch (\Throwable $th) {
                return $this->sendError($th->getMessage());
            }
        }
    }
