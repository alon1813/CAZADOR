<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jornada extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'fecha',
        'ubicacion_texto',
        'latitud',
        'longitud',
        'datos_climaticos',
        'comentarios',
        'imagen_ruta',
    ];

    protected $casts = [
        'fecha' => 'date',
        'datos_climaticos' => 'array', // Para que Laravel convierta el JSON automáticamente
    ];

    // Una jornada tiene muchas capturas
    public function capturas()
    {
        return $this->hasMany(Captura::class);
    }

    // Una jornada pertenece a un usuario
    public function usuario()
    {
        return $this->belongsTo(User::class);
    }
}