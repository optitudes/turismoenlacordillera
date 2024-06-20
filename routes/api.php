<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\Auth\AuthController;

Route::get('/', function (Request $request) {
    return "conected to backend";
});

// authentication routes
Route::prefix('auth')->group(function() {
    //allows user to login
    //Route::post('login', [AuthController::class, 'login']);
    //allows user to register
    Route::post('register', [AuthController::class, 'register']);
    /*
    //allows user to send a mail with the recovery password token
    Route::post('forgot-password', [AuthController::class, 'forgotPassword']);
    //allows user to  reset his password
    Route::post('reset-password', [AuthController::class, 'resetPassword']);
    // Parties routes
    Route::middleware(['auth:sanctum'])->group(function () {
        //allows user to logout removing token
        Route::post('logout', [AuthController::class, 'logout']);
        //responses true if the email was verified, false if it doesnt
        Route::get('verify-email', [AuthController::class, 'getEmailVerificationStatus']);
        //allow to verify the email using id and hash TODO: check if there are some better throttle that returns api responses
        Route::get('verify-email/{id}/{hash}', [AuthController::class,'verifyEmail'])->middleware('throttle:6,1');
        //sends a email with the token for validate de email
        Route::post('email/verification-notification', [AuthController::class, 'verificationNotification'])->middleware('throttle:6,1');
        //verify if the password is the same of the user
        Route::post('confirm-password', [AuthController::class, 'confirmPassword']);
        //allows to update users password
        Route::put('update-password', [AuthController::class, 'updatePassword']);

    });
    */

});
