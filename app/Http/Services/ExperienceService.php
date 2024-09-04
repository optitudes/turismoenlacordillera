<?php

namespace App\Http\Services;

use App\Models\ExperienceCategory;
use App\Models\Experience;
use App\Models\ExperienceImage;
use App\Models\ExperienceVideo;
use App\Models\Microsite;
use App\Http\Requests\UpdateExperiencesRequest;
use App\Http\Requests\UpdateExperienceImagesRequest;
use App\Http\Requests\UpdateExperienceVideoRequest;
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

    public function getExperienceVideo($experienceId = -1){
        return ['video'=>ExperienceVideo::where('experienceId',$experienceId)->first(),'msg'=>'video de la experiencia cargado correctamente','success'=>true];
    }


    public function updateExperienceVideo(UpdateExperienceVideoRequest $request){

        $experienceVideo = ExperienceVideo::where('experienceId',$request->experienceId)->first();
        if($experienceVideo == null){
            $experienceVideo =  ExperienceVideo::create(['vCode'=>$request->vCode,'experienceId'=>$request->experienceId]);
        }else{
            $experienceVideo->vCode = $request->vCode;
            $experienceVideo->save();
        }

        return ['msg'=>'video de la experiencia actualizado correctamente','success'=>true];
    }
    
}

