<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use App\Helpers\ImageValidator;
use App\Models\Microsite;



class UpdateMicrositeImageRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $sessionUser = Auth::user();
        if($sessionUser->role_id == config('constants.ROLES_ID.ADMIN') || $sessionUser->role_id == config('constants.ROLES_ID.ROOT')){
            return true;
        }else{
            $microsite = Microsite::find($this->micrositeId);
            if($microsite){
                $ventureAdminId =($microsite->venture)->userId;
                return $ventureAdminId==$sessionUser->id;
            }
            return false;
        }
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'image' => 'required|file',
            'micrositeId' => 'required|numeric|min:0|exists:'.Microsite::class.',id',
        ];
    }
    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $file = $this->file('image');
            $micrositeAdminId = 
            $sessionUser = Auth::user();
            if($file == null){
                $validator->errors()->add('imagen', "Error al cargar la imagen");
            }else{
                $validation = ImageValidator::validateImage($file);
                if (!$validation["status"]) {
                    $validator->errors()->add('imagen', !$validation["status"]?"No se pudo cargar el archivo": $validation["msg"]);
                }
            }
        });
    }
}
