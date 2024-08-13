<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use App\Models\Microsite;
use App\Models\MicrositeTheme;

class UpdateThemeRequest extends FormRequest
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
                'micrositeId' => 'required|numeric|min:0|exists:'.Microsite::class.',id',
                'youtubeId' => 'nullable|string',
                'themeId' => 'required|numeric|min:0|exists:'.MicrositeTheme::class.',id'
        ];
    }
}
