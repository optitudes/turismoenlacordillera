<?php

namespace App\Http\Services;

use App\Models\Microsite;
use Illuminate\Support\Facades\Auth;

class MicrositeService {

    public function getMicrositeBasicInfo($micrositeId = null)
    {
        if($micrositeId){
            $userRole = Auth::user()->role_id; 
            $isAbleToUpdatePicture = $userRole == config('constants.ROLES_ID.ADMIN') || $userRole == config('constants.ROLES_ID.ROOT'); 
            if($isAbleToUpdatePicture){
                return ['status'=>true,'microsite'=>Microsite::findOrFail($micrositeId),'msg'=>'Micrositio obtenido con éxito'] ;
            }else{
                return ['status'=>false,'microsite'=>null,'msg'=>'El usuario no tiene los permisos necesarios'];
            }
        }else{
            return ['status'=>true,'microsite'=>Microsite::getMicrositeBasicInfoByUserId(Auth::user()->id),'msg'=>'Micrositio obtenido con éxito'] ;
        }

    }
}
