<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Captura extends Model
{
    use HasFactory;

    protected $fillable = [
        'jornada_id',
        'especie',
        'peso',
        'sexo',
        'imagen_ruta'
    ];

    public function jornada()
    {
        return $this->belongsTo(Jornada::class);
    }
}