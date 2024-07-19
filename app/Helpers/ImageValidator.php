<?php

namespace App\Helpers;

use Illuminate\Http\UploadedFile;

class ImageValidator 
{
    public static function validateImage(UploadedFile $file)
    {
        // Validar extensión
        $allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
        if (!in_array($file->getClientOriginalExtension(), $allowedExtensions)) {
            return ['status'=>false,'msg' => 'El archivo debe tener extensión una de las siguientes: .jpg .jpeg .png .gif'];
        }

        // Validar tamaño (10MB = 10240KB)
        if ($file->getSize() > 10240 * 1024) {
            return ['status'=>false,'msg' => 'El archivo debe pesar menos de 10MB'];
        }

        return ['status'=>true,'msg' => 'El archivo debe pesar menos de 10MB'];
    }
}
