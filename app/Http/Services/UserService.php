<?php

namespace App\Http\Services;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserService {

    public function getSessionUserInfo()
    {
        $user = Auth::user();
        $user->profile;
        $user->role;

        return $user;

    }
}
