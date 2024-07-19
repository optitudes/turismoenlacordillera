<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use App\Helpers\ImageValidator;
use App\Models\User;

class UpdateProfileImageRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'image' => 'required|file',
            'userId' => 'required|numeric|min:0|exists:'.User::class.',id',
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $file = $this->file('image');
            $sessionUser = Auth::user();

            $isAbleToUpdatePicture =$sessionUser->id == $this->userId || $sessionUser->role_id == config('constants.ROLES_ID.ADMIN') || $sessionUser->role_id == config('constants.ROLES_ID.ROOT'); 

            if($isAbleToUpdatePicture){
               if($file == null){
                    $validator->errors()->add('imagen', "Error al cargar la imagen");
                }else{
                    $validation = ImageValidator::validateImage($file);

                    if (!$validation["status"]) {
                        $validator->errors()->add('imagen', !$validation["status"]?"No se pudo cargar el archivo": $validation["msg"]);
                    }
                }
            }else{
                    $validator->errors()->add('usuario', "El usuario no tiene permisos para realizar el cambio ");
            }
        });
    }
}
