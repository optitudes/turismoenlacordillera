<?php

namespace App\Http\Services;

use App\Models\ExperienceCategory;
use App\Models\Experience;
use App\Models\ExperienceImage;
use App\Models\ExperienceGpsMap;
use App\Models\ExperienceInteractiveMap;
use App\Models\ExperienceItinerary;
use App\Models\ExperienceVideo;
use App\Models\Microsite;
use App\Http\Requests\UpdateExperiencesRequest;
use App\Http\Requests\UpdateExperienceImagesRequest;
use App\Http\Requests\UpdateExperienceVideoRequest;
use App\Http\Requests\UpdateExperienceItinerary;
use App\Http\Requests\UpdateExperienceGpsMap;
use App\Http\Requests\UpdateExperienceInteractiveMap;
use App\Http\Requests\DeleteExperienceVideo;

use Illuminate\Support\Facades\Storage;
class ExperienceService {

    public function getAvailableCategories(){
      return ExperienceCategory::get();
    }

    public function updateGalleryImages(UpdateExperienceImagesRequest $request,$experienceId= null){
        $gallery = $request->images;
        $newImages = $request->imageFiles;
        $galleryToDel = $request->idsImagesToDel;
        //seccion para la actualizacio'n y creacio'n de galleria de experiencia 
        if($gallery){
            foreach($gallery as $image){
                $newImage = $newImages[$image['id']]??null;
                if($image['id'] > 0){
                    $this->updateExperienceImage($image,$newImage['file']??null,$experienceId);
                }else{
                    $this->createExperienceImage($image,$newImage['file']??null,$experienceId);
                }
            }
        }
         //seccio'n para la eliminacion de imagenes de servicio
        if($galleryToDel){
            foreach($galleryToDel as $idExperienceImage){
                $this->deleteExperienceImage($idExperienceImage,$experienceId);
            }
        }

        return ['success'=>true,'msg'=>"Todos los cambios se han realizado de manera correcta"];

    }
    public function deleteExperienceImage($idExperienceImage,$experienceId){
        ExperienceImage::where('id', $idExperienceImage)
                   ->where('experienceId', $experienceId)
                   ->delete();
        $directory = 'microsites/experiences/' . $experienceId . '/gallery/';
        $experienceImageName = $idExperienceImage."experienceImage";
        $this->removeImage($directory,$experienceImageName);
    }
    public function removeImage($directory,$imageName){

        // Filtrar y renombrar los archivos que coinciden con el patrón
        collect(Storage::disk('public')->files($directory))
        ->filter(fn($file) => str_starts_with(basename($file), $imageName))
        ->each(function ($file) use ($directory, $imageName) {
            $extension = pathinfo($file, PATHINFO_EXTENSION);
            $newImagePath = $directory . 'deleted-' . $imageName  .'.'. $extension;
            Storage::disk('public')->move($file, $newImagePath);
        });
       
    }

     public function createExperienceImage($newExperienceImageInfo,$image=null,$experienceId=-1){
        $newExperienceImageInfo['experienceId'] = $experienceId;
        $newExperienceImageInfo['id'] = null;

        $experienceImage = ExperienceImage::create($newExperienceImageInfo);
        if($image){
            $experienceImage->url = $this->saveImage($experienceImage->id."experienceImage",'microsites/experiences/' . $experienceId . '/gallery/',$image);
            $experienceImage->save();
        }
    }   
    public function updateExperienceImage($newExperienceImageInfo,$image=null,$experienceId=-1){
        $experienceImage = ExperienceImage::findOrFail($newExperienceImageInfo['id']);
        $experienceImage->fill($newExperienceImageInfo);
        $experienceImage->save();
        if($image){
            $experienceImage->url = $this->saveImage($experienceImage->id."experienceImage",'microsites/experiences/' . $experienceId . '/gallery/',$image);
            $experienceImage->save();
        }
    }
    public function saveImage($imageName,$pathToStore,$image){
 
        // Obtener la extensión original del archivo
        $extension = $image->getClientOriginalExtension();

        // Nombre deseado para la imagen con la extensión
        $imageName = $imageName .'.'. $extension;

        // Guardar la imagen y obtener su ruta en el servidor
        $path = $image->storeAs($pathToStore, $imageName, 'public');
        $fullImagePath = url("/")."/storage/".$path;
        return $fullImagePath;
    }
    public function updateExperiences(UpdateExperiencesRequest $request,$micrositeId = -1){
        $experiences = $request->experiences;
        $newImages = $request->imageFiles;
        $experiencesIdToDel = $request->idsExperiencesToDel;

        //seccion para la actualizacio'n y creacio'n de experiencias
        if($experiences){
            foreach($experiences as $experience){
                $newImage = $newImages[$experience['id']]??null;
                if($experience['id'] > 0){
                    $this->updateExperience($experience,$newImage['file']??null,$micrositeId);
                }else{
                    $this->createExperience($experience,$newImage['file']??null,$micrositeId);
                }
            }
        }
        //seccio'n para la eliminacion de servicios
        if($experiencesIdToDel){
            foreach($experiencesIdToDel as $idExperience){
                $this->deleteExperience($idExperience,$micrositeId);
            }
        }

        return ['success'=>true,'msg'=>"Todos los cambios se han realizado de manera correcta"];
    }
    public function deleteExperience($idExperience,$micrositeId){
        //delete all the images related with the experience if it have
        $images = ExperienceImage::where('experienceId',$idExperience)->get();
        foreach($images as $image){
            $this->deleteExperienceImage($image->id,$idExperience);
            $image->delete();
        }
        //delete the videos
        ExperienceVideo::where('experienceId',$idExperience)->delete();
        //delete itinerary if exists
        $itinerary = ExperienceItinerary::where('experienceId',$idExperience)->first();
        if($itinerary){
            $this->removeExperienceItinerary($idExperience);
            $itinerary->delete();
        }
        //delete mapgps if exists
        ExperienceGpsMap::where('experienceId',$idExperience)->delete();

        //delete mapInteractive if exists

        $interactiveMap = ExperienceInteractiveMap::where('experienceId',$idExperience)->first();
        if($interactiveMap){
            $this->removeImage('microsites/experiences/' . $idExperience . '/maps/',"interactiveMap");
            $interactiveMap->delete();
        }


        Experience::where('id', $idExperience)
                   ->where('micrositeId', $micrositeId)
                   ->delete();
        $microsite = Microsite::find($micrositeId);
        if($microsite){
            $this->removeExperienceImage($idExperience,$microsite->name);
        }
    }
    public function updateExperience($newExperienceInfo,$image=null,$micrositeId=-1){
        $experience = Experience::findOrFail($newExperienceInfo['id']);
        $experience->fill($newExperienceInfo);
        $experience->save();
        if($image){
            $microsite = Microsite::find($micrositeId);
            if($microsite){
                $experience->imageUrl = $this->saveExperienceImage($experience->id,$microsite->name,$image);
                $experience->save();
            }
        }
    }
    public function createExperience($newExperienceInfo,$image=null,$micrositeId=-1){
        $newExperienceInfo['micrositeId'] = $micrositeId;
        $newExperienceInfo['isVisible'] = true;

        $experience = Experience::create($newExperienceInfo);
        if($image){
            $microsite = Microsite::find($micrositeId);
            if($microsite){
                $experience->imageUrl = $this->saveExperienceImage($experience->id,$microsite->name,$image);
                $experience->save();
            }
        }
    }
    public function saveExperienceImage($experienceId,$micrositeName,$image){
 
        // Obtener la extensión original del archivo
        $extension = $image->getClientOriginalExtension();

        // Nombre deseado para la imagen con la extensión
        $imageName = $experienceId.'experienceBanner.'. $extension;

        // Guardar la imagen y obtener su ruta en el servidor
        $path = $image->storeAs('microsites/'.$micrositeName.'/media/pictures/experiences', $imageName, 'public');
        $fullImagePath = url("/")."/storage/".$path;
        return $fullImagePath;
    }
    public function saveItineraryPDF($experienceId,$pdf){
        $pdfName = 'itinerario.pdf';
        $path = $pdf->storeAs('microsites/experiences/'.$experienceId.'/itinerary',$pdfName,'public');
        return url("/")."/storage/".$path;
    }
    public function removeExperienceItinerary($experienceId){

        $directory = 'microsites/experiences/'.$experienceId.'/itinerary';

        // Filtrar y renombrar los archivos que coinciden con el patrón
        collect(Storage::disk('public')->files($directory))
        ->filter(fn($file) => str_starts_with(basename($file),  'itinerario'))
        ->each(function ($file) use ($directory, $experienceId) {
            $extension = pathinfo($file, PATHINFO_EXTENSION);
            $newImagePath = $directory . '/deleted-' . 'itinerario.' . $extension;
            Storage::disk('public')->move($file, $newImagePath);
        });
       
    }
    public function removeExperienceImage($experienceId,$micrositeName){

        $directory = 'microsites/' . $micrositeName . '/media/pictures/experiences/';

        // Filtrar y renombrar los archivos que coinciden con el patrón
        collect(Storage::disk('public')->files($directory))
        ->filter(fn($file) => str_starts_with(basename($file), $experienceId . 'experienceBanner'))
        ->each(function ($file) use ($directory, $experienceId) {
            $extension = pathinfo($file, PATHINFO_EXTENSION);
            $newImagePath = $directory . 'deleted-' . $experienceId . 'experienceBanner.' . $extension;
            Storage::disk('public')->move($file, $newImagePath);
        });
       
    }
    public function getExperienceImagesByExperienceId($id){
        return ['experienceImages'=>ExperienceImage::where('experienceId',$id)->get(),'msg'=>'imagenes de la experiencia cargadas correctamente','success'=>true];
    }

    public function getExperienceVideos($experienceId = -1){
        return ['videos'=>ExperienceVideo::where('experienceId',$experienceId)->take(2)->get(),'msg'=>'videos de la experiencia cargados correctamente','success'=>true];
    }

    public function getExperienceItinerary($experienceId = -1){
        return ['itinerary'=>ExperienceItinerary::where('experienceId',$experienceId)->first(),'msg'=>'Itinerario de la experiencia cargado correctamente','success'=>true];
    }
    public function getMapsByExperienceId($experienceId = -1){
        $maps['gps'] = ExperienceGpsMap::where('experienceId',$experienceId)->first();
        $maps['interactive'] = ExperienceInteractiveMap::where('experienceId',$experienceId)->first();
        return $maps;
    }


    public function updateExperienceVideo(UpdateExperienceVideoRequest $request){

        if($request->videoId >0){
            $experienceVideo = ExperienceVideo::where('experienceId',$request->experienceId)->where('id',$request->videoId)->first();
            if($experienceVideo == null)
                return ['msg'=>'No se pudo hallar el video de la experiencia','success'=>false];
        }else{
            $totalVideos = ExperienceVideo::where('experienceId',$request->experienceId)->count();
            if($totalVideos >=2)
                return ['msg'=>'No se pueden tener más de dos videos por experiencia','success'=>false];
            $experienceVideo = ExperienceVideo::create(['vCode'=>$request->vCode,'experienceId'=>$request->experienceId]);
        }

        $experienceVideo->vCode = $request->vCode;
        $experienceVideo->save();
        return ['msg'=>'video de la experiencia actualizado correctamente','success'=>true];
    }

    public function updateItinerary(UpdateExperienceItinerary $request){

        $newItineraryPath = $this->saveItineraryPDF($request->experienceId,$request->itinerary);
        $experienceItinerary = ExperienceItinerary::find($request->experienceId);
        if($experienceItinerary == null){
            $experienceItinerary = new ExperienceItinerary(); 
            $experienceItinerary->experienceId = $request->experienceId;
        }
        $experienceItinerary->url = $newItineraryPath;
        $experienceItinerary->save();
        return ['msg'=>'Itinerario de la experiencia actualizado correctamente','success'=>true];
    }
    
    public function updateGpsMap(UpdateExperienceGpsMap $request){

        $experienceGpsMap = ExperienceGpsMap::find($request->experienceId);
        $latitude = $request->coordenates[0];
        $longitude = $request->coordenates[1];
        if($experienceGpsMap){
            $experienceGpsMap->latitude = $latitude;
            $experienceGpsMap->longitude = $longitude;
            $experienceGpsMap->save();
        }else{
            ExperienceGpsMap::create([
                "latitude" => $latitude,
                "longitude" => $longitude,
                "experienceId" => $request->experienceId
            ]);
        }
        return ['msg'=>'Mapa gps actualizado correctamente','success'=>true];
    }

    public function updateInteractiveMap(UpdateExperienceInteractiveMap $request){

        $imagePath = $this->saveImage("interactiveMap",'microsites/experiences/' . $request->experienceId . '/maps',$request->newInteractiveMap);

        if($imagePath){
            $interactiveMap = ExperienceInteractiveMap::where('experienceId',$request->experienceId)->first();
            if($interactiveMap){
                $interactiveMap->url = $imagePath;
                $interactiveMap->save();
            }else{
                ExperienceInteractiveMap::create([
                    'experienceId' => $request->experienceId,
                    'url' => $imagePath
                ]);
            }
        }
        return ['msg'=>'Mapa interactivo actualizado correctamente','success'=>true];
    }

    public function deleteVideo(DeleteExperienceVideo $request){
       $deleted =  ExperienceVideo::where('experienceId',$request->experienceId)->where('id',$request->videoId)->delete();
        return ['msg'=>'Video de la experiencia borrado correctamente','success'=>true];
    }
}

