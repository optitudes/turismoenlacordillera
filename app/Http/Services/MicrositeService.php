<?php

namespace App\Http\Services;

use App\Http\Requests\UpdateMicositeIsPublicRequest;
use App\Http\Requests\UpdateMicositeDescriptionRequest;
use App\Http\Requests\UpdateMicrositeImageRequest;
use App\Http\Requests\UpdateThemeRequest;
use App\Http\Requests\UpdateServicesRequest;
use Illuminate\Support\Facades\Storage;

use App\Models\Microsite;
use App\Models\MicrositeVideo;
use App\Models\Service;
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


    public function updateTheme(UpdateThemeRequest $request){
        $microsite = Microsite::findOrFail($request->micrositeId);
        $microsite->themeId = $request->themeId;
        $microsite->save();
        if($request->youtubeId){
            //de momento dado que solo hay dos plantillas de micrositio, y en ambas solo
            //se permite un video, entonces se asume la posicion del video como 1
            $video = $microsite->videos->first();
            $video->url = $request->youtubeId;
            $video->save();
        }
        return ['success'=>true,"msg"=>"tema actualizado correctamente"];
    }

    public function getMicrositeViewInfo($name){
        $microsite = Microsite::where('name',$name)->where('isActive',true)->where('isPublish',true)->whereNull('deleted_at')->first();
        $info['microsite']  = $microsite;
        $info['theme'] = $microsite->theme;
        $info['venture'] = $microsite->venture;
        $info['user'] = $microsite->user;
        $info['images'] = $microsite->images;
        $info['videos'] = $microsite->videos;
        $info['services'] = $microsite->services;
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

    public function getMicrositeServices($micrositeId = null){

        if($micrositeId){
            $userRole = Auth::user()->role_id; 
            $isAbleToConsult = $userRole == config('constants.ROLES_ID.ADMIN') || $userRole == config('constants.ROLES_ID.ROOT'); 
            if($isAbleToConsult){
                $microsite = Microsite::findOrFail($micrositeId);
                return ['success'=>true,'services'=>$microsite->services,'msg'=>'Servicios obtenidos con éxito'] ;
            }else{
                return ['success'=>false,'services'=>null,'msg'=>'El usuario no tiene los permisos necesarios'];
            }
        }else{
                $microsite = Microsite::where('userId',Auth::user()->id)->where("isActive",true)->whereNull("deleted_at")->first();
                if($microsite){
                    return ['success'=>true,'services'=>$microsite->services,'msg'=>'Servicios obtenidos con éxito'] ;
                }
                return ['success'=>false,'services'=>null,'msg'=>'Error al obtener los servicios'] ;
        }
    }
    public function getThemeInfo($micrositeId = null){

        if($micrositeId){
            $userRole = Auth::user()->role_id; 
            $isAbleToConsult = $userRole == config('constants.ROLES_ID.ADMIN') || $userRole == config('constants.ROLES_ID.ROOT'); 
            if($isAbleToConsult){
                $microsite = Microsite::findOrFail($micrositeId);
                return ['success'=>true,'theme'=>$microsite->theme,'msg'=>'Tema del micrositio obtenido con éxito'] ;
            }else{
                return ['success'=>false,'theme'=>null,'msg'=>'El usuario no tiene los permisos necesarios'];
            }
        }else{
                $microsite = Microsite::where('userId',Auth::user()->id)->where("isActive",true)->whereNull("deleted_at")->first();
                if($microsite){
                    return ['success'=>true,'theme'=>$microsite->theme,'msg'=>'Tema del micrositio obtenido con éxito'] ;
                }
                return ['success'=>false,'theme'=>null,'msg'=>'Error al obtener el tema del micrositio'] ;
        }
    }

    public function updateServices(UpdateServicesRequest $request,$micrositeId = -1){
        $services = $request->services;
        $newImages = $request->imageFiles;
        $servicesIdToDel = $request->idsServicesToDel;

        //seccion para la actualizacio'n y creacio'n de servicios
        if($services){
            foreach($services as $service){
                $newImage = $newImages[$service['id']]??null;
                if($service['id'] > 0){
                    $this->updateService($service,$newImage['file']??null,$micrositeId);
                }else{
                    $this->createService($service,$newImage['file']??null,$micrositeId);
                }
            }
        }
        //seccio'n para la eliminacion de servicios
        if($servicesIdToDel){
            foreach($servicesIdToDel as $idService){
                $this->deleteService($idService,$micrositeId);
            }
        }

        return ['success'=>true,'msg'=>"Todos los cambios se han realizado de manera correcta"];
    }
    public function deleteService($idService,$micrositeId){
        Service::where('id', $idService)
                   ->where('micrositeId', $micrositeId)
                   ->delete();
        $microsite = Microsite::find($micrositeId);
        if($microsite){
            $this->removeServiceImage($idService,$microsite->name);
        }
    }
    public function updateService($newServiceInfo,$image=null,$micrositeId=-1){
        $service = Service::findOrFail($newServiceInfo['id']);
        $service->fill($newServiceInfo);
        $service->save();
        if($image){
            $microsite = Microsite::find($micrositeId);
            if($microsite){
                $service->imageUrl = $this->saveServiceImage($service->id,$microsite->name,$image);
                $service->save();
            }
        }
    }
    public function createService($newServiceInfo,$image=null,$micrositeId=-1){
        $newServiceInfo['micrositeId'] = $micrositeId;
        $newServiceInfo['isVisible'] = true;

        $service = Service::create($newServiceInfo);
        if($image){
            $microsite = Microsite::find($micrositeId);
            if($microsite){
                $service->imageUrl = $this->saveServiceImage($service->id,$microsite->name,$image);
                $service->save();
            }
        }
    }
    public function saveServiceImage($serviceId,$micrositeName,$image){
 
        // Obtener la extensión original del archivo
        $extension = $image->getClientOriginalExtension();

        // Nombre deseado para la imagen con la extensión
        $imageName = $serviceId.'service.'. $extension;

        // Guardar la imagen y obtener su ruta en el servidor
        $path = $image->storeAs('microsites/'.$micrositeName.'/media/pictures/services', $imageName, 'public');
        $fullImagePath = url("/")."/storage/".$path;
        return $fullImagePath;
    }
    public function removeServiceImage($serviceId,$micrositeName){

        $directory = 'microsites/' . $micrositeName . '/media/pictures/services/';

        // Filtrar y renombrar los archivos que coinciden con el patrón
        collect(Storage::disk('public')->files($directory))
        ->filter(fn($file) => str_starts_with(basename($file), $serviceId . 'service'))
        ->each(function ($file) use ($directory, $serviceId) {
            $extension = pathinfo($file, PATHINFO_EXTENSION);
            $newImagePath = $directory . 'deleted-' . $serviceId . 'service.' . $extension;
            Storage::disk('public')->move($file, $newImagePath);
        });
       
    }
}