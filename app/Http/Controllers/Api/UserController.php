<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\BaseController as BaseController;
use App\Http\Services\UserService;

class UserController extends BaseController
{

    public function __construct(private UserService $userService  ){}



    public function getSessionUserInfo()
    {
        try {

            $sessionUserInfo = $this->userService->getSessionUserInfo();
            return $this->sendResponse($sessionUserInfo, 'Información del usuario obtenida con éxito');

        } catch (\Throwable $th) {
            return $this->sendError($th->getMessage());
        }
    }
}
