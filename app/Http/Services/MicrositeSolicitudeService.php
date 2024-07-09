<?php

namespace App\Http\Services;

use App\Http\Requests\UpdateMicrositeSolicitudeRequest;
use Illuminate\Support\Facades\Auth;
use App\Models\MicrositeSolicitude;
use App\Models\User;
use App\Models\Microsite;
use App\Models\Venture;

class MicrositeSolicitudeService {

    public function __construct(
        private MailService $mailService
     ){}

    public function updateMicrositeSolicitude(UpdateMicrositeSolicitudeRequest $request){

      $micrositeSolicitude = MicrositeSolicitude::find($request->id);
      //seccin donde se valida que en caso de que la solicitud ya
      //tenga un administrador encargado sea el administrador que esta' haciendo la
      //modificacion del estado

      if ($micrositeSolicitude->adminId != null && $micrositeSolicitude->adminId != Auth::user()->id)
        return ['success'=>false,'msg'=> 'Esta solicitud está siendo tramitada por otro administrador'];

        //si no hay ningun administrador asociado a la solicitud se asigna al administrador en sesion
      if($micrositeSolicitude->adminId == null)
        $micrositeSolicitude->adminId = Auth::user()->id;


      $currentStatus = $micrositeSolicitude->status;

      //TODO: Extraer a un enum en constantes evitando rebundancia

      //seccion en la que modifica el rol del usuario y el estado del micrositio y la empresa
      if($currentStatus === "APROBADO" && in_array($request->status,["PENDIENTE","EN_PROCESO","RECHAZADO"])){

          User::updateUserRole($micrositeSolicitude->userId,config('constants.ROLES_ID.CLIENT'));
          Microsite::updateActive($micrositeSolicitude->micrositeId,false);
          Venture::updateActive($micrositeSolicitude->ventureId,false);

      }

      if($request->status === "APROBADO" && in_array($currentStatus,["PENDIENTE","EN_PROCESO","RECHAZADO"])){

          User::updateUserRole($micrositeSolicitude->userId,config('constants.ROLES_ID.ENTREPRENEUR'));
          Microsite::updateActive($micrositeSolicitude->micrositeId,true);
          Venture::updateActive($micrositeSolicitude->ventureId,true);

      }

      $micrositeSolicitude->status = $request->status;
      $micrositeSolicitude->comment .= $this->formatMicrositeSolicitudeComment($request->comment);
      $micrositeSolicitude->save();

      //seccion para enviar los correos y la informacion



      return $micrositeSolicitude;

    }
    public function formatMicrositeSolicitudeComment($comment){
      $date = date('Y-m-d H:i:s');
      $commentCreator = Auth::user()->profile->names;

      return "<div style=\"background-color: #fff; border: 1px solid #ddd; border-radius: 5px; padding: 20px; max-width: 600px; margin: 20px auto; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\">
                  <div style=\"display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;\">
                      <div style=\"font-weight: bold; color: #333;\">$commentCreator</div>
                      <div style=\"font-size: 0.9em; color: #999;\">$date</div>
                  </div>
                  <div style=\"font-size: 1em; color: #555;\">
                      $comment
                  </div>
              </div>
        ";
    }
}

