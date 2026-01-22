<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\User; // Importamos el modelo

class DashboardController extends Controller
{
    /**
     * Muestra el panel principal con estadísticas.
     */
    public function index()
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        // 1. Calculamos las estadísticas
        // No existe la columna 'cantidad' en la base de datos.
        $jornadas = $user->jornadas()->withCount('capturas')->get();
        
        $totalArmas = $user->armas()->count();
        $totalJornadas = $jornadas->count();
        
        // Sumamos el conteo de filas de cada jornada
        $totalPiezas = $jornadas->sum('capturas_count');

        // 2. Renderizamos la vista enviando los datos
        return Inertia::render('Dashboard', [
            'stats' => [
                'armas' => $totalArmas,
                'jornadas' => $totalJornadas,
                'piezas' => $totalPiezas
            ]
        ]);
    }
}