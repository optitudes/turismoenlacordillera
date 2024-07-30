<?php

namespace App\Http\Services;

use App\Http\Requests\UpdateMicositeIsPublicRequest;
use App\Http\Requests\UpdateMicositeDescriptionRequest;
use App\Http\Requests\UpdateMicrositeImageRequest;

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

    public function updateIsPublic(UpdateMicositeIsPublicRequest $request){
        $newIsPublic = $request->isPublic =="true";
        Microsite::updatePublish($request->micrositeId,$newIsPublic);
        return ['success'=>true,"msg"=>"Se ha actualizado la visibilidad al público"];
    }
    public function updateDescription(UpdateMicositeDescriptionRequest $request){

        $descriptionCleared = $this->clearDescription($request->description);

        Microsite::updateDescription($request->micrositeId,$descriptionCleared);
        return ['success'=>true,"msg"=>"Se ha actualizado la descripción del micrositio"];
    }

    public function updateSmallImage(UpdateMicrositeImageRequest $request){
        $microsite = Microsite::findOrFail ($request->micrositeId);
        $image = $request->file('image');
 
        // Obtener la extensión original del archivo
        $extension = $image->getClientOriginalExtension();

        // Nombre deseado para la imagen con la extensión
        $imageName = 'smallImage.'. $extension;

        // Guardar la imagen y obtener su ruta en el servidor
        $path = $image->storeAs('microsites/'.$microsite->name.'/media/pictures', $imageName, 'public');
        $fullImagePath = url("/")."/storage/".$path;
        $microsite->smallImageUrl = $fullImagePath;
        $microsite->save();
        return ["success"=>true,"msg"=>"Imagen actualizada correctamente  ".$fullImagePath];

    }

    public function updateBannerImage(UpdateMicrositeImageRequest $request){
        $microsite = Microsite::findOrFail ($request->micrositeId);
        $image = $request->file('image');
 
        // Obtener la extensión original del archivo
        $extension = $image->getClientOriginalExtension();

        // Nombre deseado para la imagen con la extensión
        $imageName = 'bannerImage.'. $extension;

        // Guardar la imagen y obtener su ruta en el servidor
        $path = $image->storeAs('microsites/'.$microsite->name.'/media/pictures', $imageName, 'public');
        $fullImagePath = url("/")."/storage/".$path;
        $microsite->bannerImageUrl = $fullImagePath;
        $microsite->save();
        return ["success"=>true,"msg"=>"Imagen actualizada correctamente  ".$fullImagePath];

    }



    
    public function clearDescription($description = ""){
        // Elimina las etiquetas <script> y su contenido
        $description = preg_replace('#<script(.*?)>(.*?)</script>#is', '', $description);

        // Elimina los atributos de eventos JavaScript
        $description = preg_replace('/on\w+="[^"]*"/i', '', $description);
        $description = preg_replace("/on\w+='[^']*'/i", '', $description);
        $description = preg_replace('/on\w+=\w+/i', '', $description);

        // Elimina otros elementos relacionados con JavaScript como `javascript:` en href o src
        $description = preg_replace('/href\s*=\s*"javascript:[^"]*"/i', '', $description);
        $description = preg_replace("/href\s*=\s*'javascript:[^']*'/i", '', $description);
        $description = preg_replace('/href\s*=\s*javascript:[^"]+/i', '', $description);
        $description = preg_replace('/src\s*=\s*"javascript:[^"]*"/i', '', $description);
        $description = preg_replace("/src\s*=\s*'javascript:[^']*'/i", '', $description);
        $description = preg_replace('/src\s*=\s*javascript:[^"]+/i', '', $description);
        return $description;
    }
}