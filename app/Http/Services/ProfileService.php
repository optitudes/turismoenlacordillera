<?php

namespace App\Http\Services;

use Illuminate\Support\Facades\Auth;
use App\Http\Requests\UpdateProfileImageRequest;
use App\Models\User;

class ProfileService {

    public function updateProfileImage(UpdateProfileImageRequest $request)
    {
        $profile = (User::findOrFail ($request->userId))->profile;
        $image = $request->file('image');
 
        // Obtener la extensión original del archivo
        $extension = $image->getClientOriginalExtension();

        // Nombre deseado para la imagen con la extensión
        $imageName = $profile->id.'profileImage.'. $extension;

        // Guardar la imagen y obtener su ruta en el servidor
        $path = $image->storeAs('users/profile/'.$profile->id.'/pictures', $imageName, 'public');
        $fullImagePath = url("/")."/storage/".$path;
        $profile->pictureUrl = $fullImagePath;
        $profile->save();
        return ["status"=>true,"msg"=>"Imagen actualizada correctamente  ".$fullImagePath];
    }
}
