<?php
   
namespace App\Http\Controllers\Api\Auth;

use App\Http\Services\AuthService;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;

use App\Http\Controllers\Api\BaseController as BaseController;

  
class AuthController extends BaseController
{

    public function __construct( private AuthService $authService ){}



    public function login(LoginRequest $loginRequest)
    {
        try {
            $response = $this->authService->loginApi($loginRequest);
            if ($response){
                return $this->sendResponse($response, 'Usuario logeado correctamente');
            }
            return $this->sendError('Error, el usuario debe verificar el email o revisar las credenciales');
            
        } catch (\Throwable $th) {
            return $this->sendError('Unauthorised.', ['error'=>$th->getMessage()]);
        }
    }
    //metodo que crea un usuario
    public function register(RegisterRequest $request)
    {
        try{

            $status = $this->authService->register($request);
            if($status['success'])
                return $this->sendResponse( null, $status['msg']);
            return $this->sendError($status['msg']);
        }catch(\Throwable $e){
            return $this->sendError('Error al registrar el usuario.', ['error'=>$e->getMessage()]);
        }
    }
    //metodo que deslogea un usuario usando solo el bearer token de autenticacion
    public function logout(Request $request)
    {
        try{
            $this->authService->logout($request);
            return $this->sendResponse(true, 'Cierre de sesión exitoso');
        }catch(\Throwable $e){
            return $this->sendError($e->getMessage());
        }
    }

    /*
    //metodo que envia un correo con un link de recuperacion al usuario para que pueda recuperar
    //la contrasenia
    public function forgotPassword(Request $request){
        try{
            $request->validate([
                'email' => 'required|string|lowercase|email|max:255|exists:'.User::class.',email'
            ]);

            $status = $this->authService->sendPasswordRecoveryEmail($request->only('email'));
            if($status == Password::RESET_LINK_SENT )
               return  $this->sendResponse($status, 'Se ha enviado un link de recuperación de contraseña ');
            return $this->sendError($status, 'Ocurrió un error al enviar el correo de recuperación');

        }catch(\Throwable $e){
            return $this->sendError('Error al enviar el correo de recuperación.', ['error'=>$e->getMessage()]);
        }
    }

    //metodo que envia un correo con un link de recuperacion al usuario para que pueda recuperar
    //la contrasenia
    public function resetPassword(Request $request){
        try{
            $request->validate([
                'token' => 'required',
                'email' => 'required|email',
                'password' => ['required', 'confirmed', Rules\Password::defaults()],
            ]);

            $resetInfo = $request->only('email', 'password', 'password_confirmation', 'token');
            $status = $this->authService->resetPassword($resetInfo);

            // If the password was successfully reset, we will redirect the user back to
            // the application's home authenticated view. If there is an error we can
            // redirect them back to where they came from with their error message.
            if ($status == Password::PASSWORD_RESET) {
               return  $this->sendResponse($status, 'Se ha actualizado la contraseña ');
            }
            return $this->sendError(['error'=>$status], 'Error al reinicar la contraseña.');

        }catch(\Throwable $e){
            return $this->sendError(['error'=>$e->getMessage()], 'Error al reinicar la contraseña.' );
        }
    }

    public function getEmailVerificationStatus(Request $request){
        try{
            $emailStatus['isVerified'] = Auth::guard('api')->user()->hasVerifiedEmail();
               return  $this->sendResponse($emailStatus, 'Se ha obtenido el estado de la verificación del email. ');

        }catch(\Throwable $e){
            return $this->sendError(['error'=>$e->getMessage()], 'Error al obtener el estado de la verificación del email.' );
        }
    }
    public function verifyEmail(Request $request, $id="",$hash=""){
        try{
            //TODO: cambiar el metodo de verifyEmail, de momento se deja asi ya que es adaptacio'n de como funciona en web
            $this->authService->verifyEmail();
            return  $this->sendResponse(true, 'Se ha verificado el email correctamente.');
        }catch(\Throwable $e){
            return $this->sendError(['error'=>$e->getMessage()], 'Error al  verificar el email.' );
        }
    }
    public function  verificationNotification(Request $request){
        try{
           $status =  $this->authService->sendVerificationEmailNotification($request);
           if($status)
                return  $this->sendResponse(true, 'Se ha enviado un correo para validar el email.');
            return  $this->sendError(false, 'El email ya se ha validado, no es necesario enviar el correo.');
        }catch(\Throwable $e){
            return $this->sendError(['error'=>$e->getMessage()], 'Error al  enviar el correo para validar el email el email.' );
        }
    }
    public function confirmPassword(Request $request){
        try{
            $isConfirmed = $this->authService->confirmPassword($request);
            return $this->sendResponse(true, 'La contraseña es correcta.' );
        }catch(\Throwable $e){
            return $this->sendError(['error'=>$e->getMessage()], 'La contraseña es incorrecta.' );
        }
    }
    public function updatePassword(UpdatePasswordRequest $updatePasswordRequest){
        try{
            $this->authService->updatePassword($updatePasswordRequest);
            return $this->sendResponse(true, 'La contraseña se actualizó correctamente.' );
        }catch(\Throwable $e){
            return $this->sendError(['error'=>$e->getMessage()], 'La contraseña es incorrecta.' );
        }
    }
        */
}
