<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

use App\Models\Microsite;
use App\Models\Experience;

class DeleteExperienceVideo extends FormRequest
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
            $microsite = Microsite::findByExperienceId($this->experienceId);
            if($microsite){
                $micrositeAdminId =$microsite->userId;
                return $micrositeAdminId==$sessionUser->id;
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
            'experienceId' => 'required|numeric|min:0|exists:'.Experience::class.',id',
            'videoId'=> 'required|numeric'
        ];
    }
}
