<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Anuncio extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'titulo',
        'descripcion',
        'precio',
        'categoria',
        'estado',
        'ubicacion',
        'imagen_ruta',
        'mostrar_telefono',
        'mostrar_email'
    ];

    // Relación: Un anuncio pertenece a un usuario (vendedor)
    public function usuario()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}