<?php

namespace App\Http\Controllers;

use App\Models\Jornada;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JornadaController extends Controller
{
    public function index()
    {
        // Listamos las jornadas ordenadas por fecha (la más reciente primero)
        $jornadas = request()->user()->jornadas()->orderBy('fecha', 'desc')->get();
        
        return Inertia::render('Diario/Index', [
            'jornadas' => $jornadas
        ]);
    }

    public function create()
    {
        return Inertia::render('Diario/Crear');
    }

    public function store(Request $request)
    {
        $request->validate([
            'fecha' => 'required|date',
            'ubicacion_texto' => 'required|string|max:255',
            'latitud' => 'required|numeric',
            'longitud' => 'required|numeric',
            'comentarios' => 'nullable|string',
        ]);

        // Guardamos la jornada
        $request->user()->jornadas()->create($request->all());

        return redirect()->route('diario.index');
    }
}