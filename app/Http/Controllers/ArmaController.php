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
        // 1. Validamos (Añadimos reglas para la imagen)
        $datosValidados = $request->validate([
            'nombre' => 'required|string|max:255',
            'tipo' => 'required|string|max:100',
            'calibre' => 'nullable|string|max:50',
            'notas' => 'nullable|string',
            'imagen' => 'nullable|image|max:3072', // Máx 3MB, solo imágenes
        ]);

        // 2. Gestión de la imagen (Si el usuario subió una)
        if ($request->hasFile('imagen')) {
            // Guarda la imagen en la carpeta 'storage/app/public/armas'
            // y nos devuelve la ruta, ej: "armas/foto1.jpg"
            $rutaImagen = $request->file('imagen')->store('armas', 'public');
            
            // Añadimos la ruta a los datos que vamos a guardar
            $datosValidados['imagen_ruta'] = $rutaImagen;
        }

        // 3. Crear el arma
        $request->user()->armas()->create($datosValidados);

        return redirect()->route('armeria.index');
    }
}