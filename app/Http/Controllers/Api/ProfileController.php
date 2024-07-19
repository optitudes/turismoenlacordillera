<?php

namespace App\Http\Controllers\Api;

use App\Http\Services\ProfileService;
use App\Http\Requests\UpdateProfileImageRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends BaseController 
{
    public function __construct (private ProfileService $profileService){}


    public function updateProfileImage(UpdateProfileImageRequest $request)
    {
     try {
           $transactionInfo = $this->profileService->updateProfileImage($request);
           return $this->sendResponse($transactionInfo,"Imagen de perfil actualizada correctamente" );
        } catch (\Throwable $th) {
            return $this->sendError($th->getMessage());
        }
    }

}
