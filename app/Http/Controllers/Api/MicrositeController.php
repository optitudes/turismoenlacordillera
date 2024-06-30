<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\BaseController as BaseController;

class MicrositeController extends BaseController
{
    public function getMicrositesSolicitudes()
    {
        try {

            return $this->sendResponse(null, 'Información del usuario obtenida con éxito');

        } catch (\Throwable $th) {
            return $this->sendError($th->getMessage());
        }
    }
}
