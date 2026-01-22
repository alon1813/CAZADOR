<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Muestra el formulario de perfil con el nuevo diseño.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            // Pasamos estadísticas simples para el sidebar
            'stats' => [
                'jornadas' => $request->user()->jornadas()->count(),
                'armas' => $request->user()->armas()->count(),
            ]
        ]);
    }

    /**
     * Actualiza la información del perfil.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        // Validamos los campos extra manualmente aquí o en ProfileUpdateRequest
        $request->user()->fill($request->validated());
        
        // Rellenamos los campos extra que no están en la validación por defecto de Breeze
        $request->user()->fill($request->only([
            'licencia_caza', 
            'ubicacion', 
            'biografia',
            'notificaciones_veda',
            'perfil_publico'
        ]));

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Eliminar cuenta (Breeze por defecto).
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}