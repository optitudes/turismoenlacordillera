<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {

        return [
            'names' => 'required|string|max:50|min:3',
            'lastNames' => 'required|string|max:50|min:3',
            'idNumber' => [
                'required',
                'string',
                'max:255',
                'min:4',
                Rule::unique('profiles', 'idNumber')->ignore(Auth::user()->profile->id, 'id')
            ],
            'phoneNumber' => 'nullable|numeric|min:0',
            'phonePrefix' => 'nullable|string|max:7',
            'pictureUrl' => 'nullable|string|max:255',
            'municipality' => 'nullable|string|min:3',
            'department' => 'nullable|string|min:3',
        ];
    }
}
