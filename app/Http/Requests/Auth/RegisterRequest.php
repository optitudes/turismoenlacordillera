<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
class RegisterRequest extends FormRequest
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
        $rules = [
            'userInfo.email' => 'required|string|email|max:255|unique:users,email',
            'userInfo.password' => 'required|string|min:8|confirmed',
            'profileInfo.names' => 'required|string|max:50|min:3',
            'profileInfo.lastNames' => 'required|string|max:50|min:3',
            'profileInfo.address' => 'nullable|string|max:50',
            'profileInfo.idNumber' => 'required|string|max:255|min:4|unique:profiles,idNumber',
            'profileInfo.pictureUrl' => 'nullable|string|max:255',
            'profileInfo.phoneNumber' => 'nullable|numeric|min:0',
            'profileInfo.phonePrefix' => 'nullable|string|max:7',
            'profileInfo.municipality' => 'nullable|string|min:3',
            'profileInfo.department' => 'nullable|string|max:3',
        ];

        if ($this->filled('ventureInfo') || $this->filled('micrositeInfo')) {
            $rules = array_merge($rules, [
                'ventureInfo.name' => 'required|string|max:255|min:3|unique:ventures,name',
                'ventureInfo.address' => 'required|string|max:50',
                'ventureInfo.description' => 'nullable|string|max:255',
                'ventureInfo.mapLatitude' => 'nullable|numeric',
                'ventureInfo.mapLongitude' => 'nullable|numeric',
            ]);
        }

        if ($this->filled('micrositeInfo') || $this->filled('ventureInfo')) {
            $rules = array_merge($rules, [
                'micrositeInfo.name' => 'required|string|max:255|unique:microsites,name',
                'micrositeInfo.description' => 'nullable|string',
                'experiences' =>'nullable|string'
            ]);
        }

        return $rules;

    }
}
