<?php

namespace App\Http\Services;

use Illuminate\Support\Facades\Hash;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Services\MailService;
use App\Models\User;
use App\Models\Profile;
use App\Models\Venture;
use App\Models\Microsite;
use App\Models\MicrositeSolicitude;
/*
use App\Models\Role;
use App\Models\ProductiveUnit;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\UpdatePasswordRequest;
use App\Http\Controllers\Api\BaseController as BaseController;
use Illuminate\Validation\ValidationException;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Auth\Events\Verified;
use Illuminate\Support\Facades\Password;
use Validator;
*/

class AuthService {

    public function __construct(
        private MailService $mailService
     ){}
    
    //funcion que crea un usuario, le da por defecto el rol de cliente y lo retorna
    public function createUser($userInfo){
        $user = new User;
        $user->fill($userInfo);
        $user->password = Hash::make($user->password);
        $user->isActive = true;
        $user->role_id = 4;
        $user->save();
        return $user;
    }
    //crea un perfil y lo asocia al usuario cuyo id es pasado como $userId
    public function createProfile($profileInfo,$userId){
        $profile = new Profile;
        $profile->fill($profileInfo);
        $profile->userId = $userId;
        $profile->save();
        return $profile;
    }

    /*
    * funcion que crea un emprendimiento y lo asocia al usuario
    *por defecto el emprendimiento no esta' activo  y no es pu'blico
    */

    public function createVenture($ventureInfo,$userId){
            $venture = new Venture;
            $venture->fill($ventureInfo);
            $venture->isActive = false;
            $venture->isPublish = false;
            $venture->userId = $userId;
            $venture->save();
            return $venture;
    }
    public function createMicrosite($micrositeInfo,$ventureId){
            $microsite = new Microsite;
            $microsite->fill($micrositeInfo);
            $microsite->isActive = false;
            $microsite->isPublish = false;
            $microsite->ventureId = $ventureId;
            $microsite->save();
            return $microsite;

    }
    public function createMicrositeSolicitude($status,$userId,$ventureId,$micrositeId){
            $micrositeSolicitude = new MicrositeSolicitude;
            $micrositeSolicitude->status = $status;
            $micrositeSolicitude->userId = $userId;
            $micrositeSolicitude->ventureId = $ventureId;
            $micrositeSolicitude->micrositeId = $micrositeId;
            $micrositeSolicitude->save();
            return $micrositeSolicitude;

    }
    public function register(RegisterRequest $request){
        //mensaje que se le retorna al usuario
        $msg = "Usuario creado con éxito  debe confirmar su correo eléctronico por medio de un link que le llegará al correo";
        //creacion del usuario
        $user = $this->createUser($request->userInfo);
        //creacion del perfil
        $profile = $this->createProfile($request->profileInfo,$user->id);
        //creacion de la empresa y micrositio en estado inactivo en caso de que 
        //se requiera
        if($request->ventureInfo != null && $request->micrositeInfo ){
            //creacion del emprendimiento inactivo
            $venture = $this->createVenture($request->ventureInfo,$user->id);

            //creacion del micrositio
            $microsite = $this->createMicrosite($request->micrositeInfo, $venture->id);

            //creacion de la solicitud de micrositio
            $micrositeSolicitude = $this->createMicrositeSolicitude("PENDIENTE",$user->id,$venture->id,$microsite->id);

            $msg = $msg . ", los administradores pronto validarán su petición de micrositio";
        }
        $user->sendVerificationEmailNotification();

        return ['msg' => $msg,'success'=>true];
    }
    /*
    public function logoutApi(){
        Auth::user()->tokens()->delete();
    }
    public function sendPasswordRecoveryEmail($email = ""){
        // We will send the password reset link to this user. Once we have attempted
        // to send the link, we will examine the response then see the message we
        // need to show to the user. Finally, we'll send out a proper response.
        $status = Password::sendResetLink($email);
        return $status;
    }
    public function resetPassword($resetInfo = []){
            // Here we will attempt to reset the user's password. If it is successful we
            // will update the password on an actual user model and persist it to the
            // database. Otherwise we will parse the error and return the response.
            $status = Password::reset(
                $resetInfo,
                function ($user) use ($resetInfo) {
                    $user->forceFill([
                        'password' => Hash::make($resetInfo['password']),
                        'remember_token' => Str::random(60),
                    ])->save();
                    event(new PasswordReset($user));
                }
            );
            return $status;
    }

    //permite verificar el email
    public function verifyEmail(){
        $user = Auth::user();
        if(!$user->hasVerifiedEmail()){
            if ($user->markEmailAsVerified())
                event(new Verified($user));
        }
    }

    //in case the user has not verified the emaio, send the sendEmailVerificationNotification
    public function sendVerificationEmailNotification(Request $request){
        if ($request->user()->hasVerifiedEmail()) {
            return false;
        }
        $request->user()->sendEmailVerificationNotification();
        return true;
    }
    public function confirmPassword(Request $request){

           if (! Auth::guard('web')->validate([
            'email' => $request->user()->email,
            'password' => $request->password,
        ])) {
            throw ValidationException::withMessages([
                'password' => __('auth.password'),
            ]);
        }
    }
    public function updatePassword(UpdatePasswordRequest $updatePasswordRequest){
        Auth::user()->update([
            'password' => Hash::make($updatePasswordRequest->password),
        ]);
    }
        */
}

