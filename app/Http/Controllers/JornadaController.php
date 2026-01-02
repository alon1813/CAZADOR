<?php

namespace App\Http\Controllers;

use App\Models\Jornada;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB; // Para usar transacciones

class JornadaController extends Controller
{
    public function index()
    {
        // Traemos las jornadas con sus capturas para mostrar resumenes (ej: "3 Jabalíes")
        $jornadas = request()->user()->jornadas()
            ->with('capturas') // Carga impaciente (Eager loading)
            ->orderBy('fecha', 'desc')
            ->get();
        
        return Inertia::render('Diario/Index', [
            'jornadas' => $jornadas
        ]);
    }

    public function create()
    {
        // Pasamos las armas por si quieres poner el select en el futuro
        $misArmas = request()->user()->armas;
        
        return Inertia::render('Diario/Crear', [
            'misArmas' => $misArmas
        ]);
    }

    public function store(Request $request)
    {
        // 1. Validación Avanzada (incluyendo arrays)
        $datos = $request->validate([
            'fecha' => 'required|date',
            'ubicacion_texto' => 'required|string|max:255',
            'latitud' => 'required|numeric',
            'longitud' => 'required|numeric',
            'comentarios' => 'nullable|string',
            'imagen' => 'nullable|image|max:10240', // Máx 10MB
            
            // Validación del array de capturas
            'capturas' => 'nullable|array',
            'capturas.*.especie' => 'required|string',
            'capturas.*.cantidad' => 'required|integer|min:1',
            'capturas.*.peso' => 'nullable|numeric',
        ]);

        // Usamos una Transacción: Si falla algo al guardar las capturas, 
        // no se guarda la jornada tampoco. Todo o nada.
        DB::transaction(function () use ($request, $datos) {
            
            // A. Gestionar Imagen Principal
            $rutaImagen = null;
            if ($request->hasFile('imagen')) {
                $rutaImagen = $request->file('imagen')->store('jornadas', 'public');
            }

            // B. Crear la Jornada
            $jornada = $request->user()->jornadas()->create([
                'fecha' => $datos['fecha'],
                'ubicacion_texto' => $datos['ubicacion_texto'],
                'latitud' => $datos['latitud'],
                'longitud' => $datos['longitud'],
                'comentarios' => $datos['comentarios'],
                'imagen_ruta' => $rutaImagen,
            ]);

            // C. Crear las Capturas (Bucle)
            if (!empty($request->capturas)) {
                foreach ($request->capturas as $capturaData) {
                    // Si el usuario pone cantidad 3, ¿creamos 3 registros o 1 con cantidad 3?
                    // Tu modelo actual es individual, así que crearemos un registro por cada "bicho"
                    // O podemos simplificar guardando 1 registro con el campo 'peso' genérico.
                    
                    // Opción: Crear tantos registros como diga "cantidad"
                    for ($i = 0; $i < $capturaData['cantidad']; $i++) {
                        $jornada->capturas()->create([
                            'especie' => $capturaData['especie'],
                            'peso' => $capturaData['peso'], // Peso aproximado individual
                            //'sexo' => ... (si lo añades al form)
                        ]);
                    }
                }
            }
        });

        return redirect()->route('diario.index');
    }
}