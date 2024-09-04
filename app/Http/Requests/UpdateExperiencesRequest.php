<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateExperiencesRequest extends FormRequest
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
            'experiences' => 'nullable|array',
            'experiences.*.id' => 'required|integer',
            'experiences.*.description' => 'required|string|max:255',
            'experiences.*.title' => 'required|string|max:255',
            'experiences.*.imageUrl' => 'nullable|string', // or URL validation if needed
            'experiences.*.isVisible' => 'required|boolean',
            'experiences.*.categoryId' => 'required|integer',

            'idsExperiencesToDel' => 'nullable|array',
            'idsExperiencesToDel.*' => 'required|integer',
            
            'imageFiles' => 'nullable|array',
            'imageFiles.*.file' => 'required|file|mimes:jpg,png|max:10240', 
        ];
    }
}
