<?php

namespace App\Http\Controllers;

use App\Models\Arma;
use Illuminate\Http\Request;
use Inertia\Inertia; // Importante: El puente entre Laravel y React
use Illuminate\Support\Facades\Auth;

class ArmaController extends Controller
{
    /**
     * Muestra la lista de armas del usuario conectado.
     */
    public function index()
    {
        // 1. Obtenemos las armas SOLO del usuario logueado
        $armas = Arma::where('user_id', Auth::id())->get();

        // 2. Renderizamos la vista de React 'Armeria/Index' y le enviamos los datos
        return Inertia::render('Armeria/Index', [
            'misArmas' => $armas
        ]);
    }

    /**
     * Guarda un arma nueva en la base de datos.
     */
    public function store(Request $request)
    {
        // 1. Validamos los datos (siempre en español los mensajes si quieres personalizarlos)
        $datosValidados = $request->validate([
            'nombre' => 'required|string|max:255',
            'tipo' => 'required|string|max:100',
            'calibre' => 'nullable|string|max:50',
            'notas' => 'nullable|string',
        ]);

        // 2. Creamos el arma asignando el ID del usuario automáticamente
        $request->user()->armas()->create($datosValidados);

        // 3. Redirigimos de vuelta (Inertia actualizará la lista sin recargar la página)
        return redirect()->route('armeria.index');
    }
}