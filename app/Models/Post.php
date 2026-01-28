<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'titulo',
        'slug',
        'resumen',
        'contenido',
        'categoria',
        'imagen_ruta',
        'tiempo_lectura',
    ];

    public function autor()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
