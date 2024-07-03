<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\BaseController as BaseController;
use App\Models\MicrositeSolicitude;



class MicrositeController extends BaseController
{
    public function getMicrositesSolicitudes($filter = null)
    {
        try {
            $solicitudes = MicrositeSolicitude::getMicrositeSolicitudes($filter);
            return $this->sendResponse($solicitudes, 'Información de las solicitudes de micrositios obtenida con éxito');

        } catch (\Throwable $th) {
            return $this->sendError($th->getMessage());
        }
    }

}
