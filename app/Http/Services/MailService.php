<?php

namespace App\Http\Services;

use Illuminate\Support\Facades\Mail;
use App\Mail\SendNewMicrositeSolicitudeToAdmin;

class MailService {

    //funcion que crea un usuario, le da por defecto el rol de cliente y lo retorna
    public function sendNewMicroSiteSolicitudeToAdmin($userNames, $micrositeName, $ventureName){
        Mail::to('optt.itudes@gmail.com')->send(new SendNewMicrositeSolicitudeToAdmin());
    }
    
}

