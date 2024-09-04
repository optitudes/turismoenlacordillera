<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateExperienceImagesRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'images' => 'nullable|array',
            'images.*.id' => 'required|integer',
            'images.*.created_at' => 'nullable',
            'images.*.updated_at' => 'nullable',
            'images.*.experienceId' => 'required|integer|min:0',
            'images.*.url' => 'required', 

            'idsImagesToDel' => 'nullable|array',
            'idsImagesToDel.*' => 'required|integer',
            
            'imageFiles' => 'nullable|array',
            'imageFiles.*.file' => 'required|file|mimes:jpg,png|max:10240', 
        ];
    }
}
