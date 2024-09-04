<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\MicrositeController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\ExperienceController;


use App\Http\Middleware\HasRoles;

Route::get('/', function (Request $request) {
    return "conected to backend";
});



Route::prefix('users')->group(function() {
    //permite obtener toda la informacion del usuario en sesion
    Route::get('/getSessionUserInfo', [UserController::class, 'getSessionUserInfo'])->middleware('auth:sanctum');
});

Route::prefix('microsites')->group(function() {
    Route::get('/search/{filter?}', [MicrositeController::class, 'search']);
    Route::get('/themes', [MicrositeController::class, 'getThemes']);

    Route::middleware(['auth:sanctum'])->group(function () {

        //rutas accessibles como admin o root
        Route::middleware(HasRoles::class.":". config('constants.ROLES_ID.ROOT'). "-" .config('constants.ROLES_ID.ADMIN'))->group(function () {
            //permite obtener la lista de solicitudes 
            Route::get('/solicitudes/{filter?}', [MicrositeController::class, 'getMicrositesSolicitudes']);
            Route::post('/solicitudes/updateStatus', [MicrositeController::class, 'updateMicrositeSolicitude']);
        });
    });
});


// authenticated routes
Route::middleware(['auth:sanctum'])->group(function () {
    Route::prefix('panel')->group(function() {
        Route::prefix('profile')->group(function() {
            Route::prefix('update')->group(function() {
                Route::post('profileImage', [ProfileController::class, 'updateProfileImage']);
            });
        });
        Route::prefix('microsite')->group(function() {
            Route::prefix('update')->group(function() {
                Route::post('isPublic', [MicrositeController::class, 'updateIsPublic']);
                Route::post('description', [MicrositeController::class, 'updateDescription']);
                Route::post('smallImage', [MicrositeController::class, 'updateSmallImage']);
                Route::post('bannerImage', [MicrositeController::class, 'updateBannerImage']);
                Route::post('theme', [MicrositeController::class, 'updateTheme']);
                Route::post('experiences/{micrositeId?}', [ExperienceController::class, 'updateExperiences']);
            });
            Route::get('experienceImagesByExperienceId/{id}',[ExperienceController::class, 'getExperienceImagesByExperienceId']);
        });

        Route::prefix('experience')->group(function() {
            Route::prefix('update')->group(function() {
                Route::post('video', [ExperienceController::class, 'updateExperienceVideo']);
                Route::post('images/{experienceId?}', [ExperienceController::class, 'updateGalleryImages']);
            });
            Route::prefix('get')->group(function() {
                Route::get('video/{experienceId}', [ExperienceController::class, 'experienceVideo']);
            });
        });
    });

});

// authentication routes
Route::prefix('auth')->group(function() {
    //allows user to login
    //Route::post('login', [AuthController::class, 'login']);
    //allows user to register
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    /*
    //allows user to send a mail with the recovery password token
    Route::post('forgot-password', [AuthController::class, 'forgotPassword']);
    //allows user to  reset his password
    Route::post('reset-password', [AuthController::class, 'resetPassword']);
    // Parties routes
    */
    Route::middleware(['auth:sanctum'])->group(function () {
        //allows user to logout removing token
        Route::post('logout', [AuthController::class, 'logout']);
        /*
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
        */

    });

});
