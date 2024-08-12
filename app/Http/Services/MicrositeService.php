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
            $isAbleToMakeChanges = $userRole == config('constants.ROLES_ID.ADMIN') || $userRole == config('constants.ROLES_ID.ROOT'); 
            if($isAbleToMakeChanges){
                $microsite = Microsite::findOrFail($micrositeId);
                $microsite->theme;
                $microsite->venture;
                $microsite->user;
                $microsite->images;
                $microsite->videos;
                return ['status'=>true,'microsite'=>$microsite,'msg'=>'Micrositio obtenido con éxito'] ;
            }else{
                return ['status'=>false,'microsite'=>null,'msg'=>'El usuario no tiene los permisos necesarios'];
            }
        }else{
                $microsite = Microsite::where('userId',Auth::user()->id)->where("isActive",true)->whereNull("deleted_at")->first();
                if($microsite){
                    $microsite->theme;
                    $microsite->venture;
                    $microsite->user;
                    $microsite->images;
                    $microsite->videos;
                    return ['status'=>true,'microsite'=>$microsite,'msg'=>'Micrositio obtenido con éxito'] ;
                }
                return ['status'=>false,'microsite'=>null,'msg'=>'Error al obtener el micrositio'] ;
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
    public function getMicrositeViewInfo($name){
        $info['microsite']  = Microsite::where('name',$name)->where('isActive',true)->where('isPublish',true)->whereNull('deleted_at')->first();
        $info['theme'] = $info['microsite']->theme;
        $info['venture'] = $info['microsite']->venture;
        $info['user'] = $info['microsite']->user;
        $info['images'] = $info['microsite']->images;
        $info['videos'] = $info['microsite']->videos;
        return $info;
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