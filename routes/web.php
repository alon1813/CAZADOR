<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ArmaController;
use Inertia\Inertia;
use App\Http\Controllers\JornadaController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'verified'])->group(function () {
    
    // Rutas para el perfil (ya venían con Breeze)
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // NUESTRAS RUTAS: Armería
    Route::get('/armeria', [ArmaController::class, 'index'])->name('armeria.index');
    Route::post('/armeria', [ArmaController::class, 'store'])->name('armeria.store');

    Route::get('/diario', [JornadaController::class, 'index'])->name('diario.index');
    Route::get('/diario/crear', [JornadaController::class, 'create'])->name('diario.create');
    Route::post('/diario', [JornadaController::class, 'store'])->name('diario.store');
});

require __DIR__.'/auth.php';
