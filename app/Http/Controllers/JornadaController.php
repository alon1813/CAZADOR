<?php

namespace App\Http\Controllers;

use App\Models\Jornada;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB; 
use App\Services\WeatherService;

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

    public function store(Request $request, WeatherService $weatherService)
    {
        // 1. Validación Avanzada (incluyendo arrays)
        $datos = $request->validate([
            'fecha' => 'required|date',
            'ubicacion_texto' => 'required|string|max:255',
            'latitud' => 'required|numeric',
            'longitud' => 'required|numeric',
            'comentarios' => 'nullable|string',
            'imagen' => 'nullable|image|max:10240',
            
            // Validación del array de capturas
            'capturas' => 'nullable|array',
            'capturas.*.especie' => 'required|string',
            'capturas.*.cantidad' => 'required|integer|min:1',
            'capturas.*.peso' => 'nullable|numeric',
        ]);

        // Usamos una Transacción: Si falla algo al guardar las capturas, 
        // no se guarda la jornada tampoco. Todo o nada.
        DB::transaction(function () use ($request, $datos, $weatherService) {
            
            // 1. Gestionar Imagen
            $rutaImagen = null;
            if ($request->hasFile('imagen')) {
                $rutaImagen = $request->file('imagen')->store('jornadas', 'public');
            }

            // 2. OBTENER CLIMA (NUEVO)
            // Solo pedimos el clima si la fecha es HOY. 
            // (La API gratuita no suele dar el histórico de hace 1 mes gratis, solo el actual)
            $datosClimaticos = null;
            if ($datos['fecha'] === date('Y-m-d')) {
                $datosClimaticos = $weatherService->getWeatherData($datos['latitud'], $datos['longitud']);
            }

            // 3. Crear la Jornada
            $jornada = $request->user()->jornadas()->create([
                'fecha' => $datos['fecha'],
                'ubicacion_texto' => $datos['ubicacion_texto'],
                'latitud' => $datos['latitud'],
                'longitud' => $datos['longitud'],
                'comentarios' => $datos['comentarios'],
                'imagen_ruta' => $rutaImagen,
                'datos_climaticos' => $datosClimaticos, // <--- GUARDAMOS EL JSON
            ]);

            // 4. Crear Capturas
            if (!empty($request->capturas)) {
                foreach ($request->capturas as $capturaData) {
                    for ($i = 0; $i < $capturaData['cantidad']; $i++) {
                        $jornada->capturas()->create([
                            'especie' => $capturaData['especie'],
                            'peso' => $capturaData['peso'],
                        ]);
                    }
                }
            }
        });

        return redirect()->route('diario.index');
    }
}