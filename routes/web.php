<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\ArmaController;
use Inertia\Inertia;
use App\Http\Controllers\JornadaController;
use App\Http\Controllers\MercadoController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\BlogController;

Route::get('/', function () {
    return Auth::check() ? redirect()->route('dashboard') : redirect()->route('login');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'verified'])->group(function () {

    // Ruta limpia apuntando al controlador
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
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

    // Rutas para el Mercado
    Route::get('/mercado', [MercadoController::class, 'index'])->name('mercado.index');
    Route::post('/mercado', [MercadoController::class, 'store'])->name('mercado.store');
    Route::post('/mercado/{id}/contactar', [MercadoController::class, 'contactarVendedor'])->name('mercado.contactar');
});


// Rutas Públicas del Blog
Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/{slug}', [BlogController::class, 'show'])->name('blog.show');

require __DIR__.'/auth.php';
