<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PanelController;
use App\Http\Controllers\MicrositeController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Http\Middleware\HasWebRole;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');


Route::middleware('auth')->group(function () {
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::prefix('panel')->group(function() {
    Route::middleware(['auth','verified'])->group(function () {
        //ruta para obtener la vista de editar cuenta
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        //ruta para obtener la vista de dashboard
        Route::get('/dashboard', [PanelController::class, 'dashboard'])->name('dashboard');
        //rutas relacionadas a la administracion del micrositio
        Route::prefix('admin')->group(function() {
            Route::prefix('microsites')->group(function() {
                Route::middleware(HasWebRole::class.":". config('constants.ROLES_ID.ROOT'). "-" .config('constants.ROLES_ID.ADMIN'))->group(function () {
                    Route::get('/solicitudes', [MicrositeController::class, 'solicitudes'])->name('panel.admin.microsites.solicitudes');
                });
            });
        });
    });

});

require __DIR__.'/auth.php';
