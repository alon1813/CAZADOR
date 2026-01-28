<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index(Request $request)
    {
        $query = Post::with('autor')->latest();

        // Filtro por categoría (botones del diseño)
        if ($request->has('categoria') && $request->categoria !== 'Todos') {
            $query->where('categoria', $request->categoria);
        }

        // Buscador
        if ($request->has('search')) {
            $query->where('titulo', 'like', '%' . $request->search . '%');
        }

        return Inertia::render('Blog/Index', [
            'posts' => $query->get(),
            'filtros' => $request->all()
        ]);
    }

    public function show($slug)
    {
        $post = Post::with('autor')->where('slug', $slug)->firstOrFail();
        
        return Inertia::render('Blog/Show', [
            'post' => $post
        ]);
    }
}