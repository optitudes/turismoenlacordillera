<?php

namespace App\Http\Services;

use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use App\Models\User;
use App\Mail\SendNewMicrositeSolicitudeToAdmin;

class MailService {

    //envi'a una notificacion a todos los admins que este'n registrados avisando
    //la creacio'n de una solicitud de micrositio
    public function sendNewMicroSiteSolicitudeToAdmin($userNames, $micrositeName, $ventureName){
        $adminsEmails = User::getAdminsEmails();
        foreach($adminsEmails as $email){
          try{
            Mail::to($email)->send(new SendNewMicrositeSolicitudeToAdmin($userNames,$micrositeName,$ventureName));
          }catch(\Throwable $e){
            //TODO: create a table to save all emails failures
            Log::error('Error al enviar el correo', [
                'email' => $email,
                'userNames' => $userNames,
                'micrositeName' => $micrositeName,
                'ventureName' => $ventureName,
                'exception' => $e
            ]);
          }

        }
    }
}

