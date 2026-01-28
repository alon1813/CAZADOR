<?php

namespace App\Http\Controllers;

use App\Models\Anuncio;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Mail;
use App\Mail\AvisoInteresado;

class MercadoController extends Controller
{
    public function index(Request $request)
    {
        // Iniciamos la consulta cargando los datos del vendedor (usuario)
        $query = Anuncio::with('usuario')->latest();

        // Si hay búsqueda por texto (opcional, para el futuro)
        if ($request->has('search')) {
            $query->where('titulo', 'like', '%' . $request->search . '%');
        }

        // Si hay filtro por categoría
        if ($request->has('categoria') && $request->categoria !== 'Todo') {
            $query->where('categoria', $request->categoria);
        }

        return Inertia::render('Mercado/Index', [
            'anuncios' => $query->get(),
            'filtros' => $request->all()
        ]);
    }

    public function store(Request $request)
    {
        $datos = $request->validate([
            'titulo' => 'required|string|max:255',
            'precio' => 'required|numeric',
            'categoria' => 'required|string',
            'estado' => 'required|string',
            'ubicacion' => 'required|string',
            'descripcion' => 'required|string',
            'imagen' => 'nullable|image|max:5120', // 5MB
        ]);

        if ($request->hasFile('imagen')) {
            $datos['imagen_ruta'] = $request->file('imagen')->store('mercado', 'public');
        }

        $request->user()->anuncios()->create($datos);

        return redirect()->back();
    }

    /**
     * Envía un correo al dueño del anuncio.
     */
    public function contactarVendedor(Request $peticion, $idAnuncio)
    {
        $datosValidados = $peticion->validate([
            'mensaje' => 'required|string|min:10|max:500',
        ]);

        // Buscamos el anuncio y su dueño
        $anuncio = Anuncio::with('usuario')->findOrFail($idAnuncio);

        // Preparamos los datos de quien envía el mensaje (el usuario logueado)
        $datosInteresado = [
            'nombre' => $peticion->user()->name,
            'email' => $peticion->user()->email,
            'mensaje' => $datosValidados['mensaje'],
        ];

        // Enviamos el correo al dueño del anuncio
        // (En local se guardará en storage/logs/laravel.log si usas MAIL_MAILER=log)
        Mail::to($anuncio->usuario->email)->send(new AvisoInteresado($anuncio, $datosInteresado));

        return redirect()->back()->with('exito', '¡Mensaje enviado correctamente al vendedor!');
    }
}