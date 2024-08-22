<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateServicesRequest extends FormRequest
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
            'services' => 'nullable|array',
            'services.*.id' => 'required|integer',
            'services.*.description' => 'required|string|max:255',
            'services.*.title' => 'required|string|max:255',
            'services.*.imageUrl' => 'nullable|string', // or URL validation if needed
            'services.*.isVisible' => 'required|boolean',
            'services.*.categoryId' => 'required|integer',

            'idsServicesToDel' => 'nullable|array',
            'idsServicesToDel.*' => 'required|integer',
            
            'imageFiles' => 'nullable|array',
            'imageFiles.*.file' => 'required|file|mimes:jpg,png|max:10240', 
        ];
    }
}
