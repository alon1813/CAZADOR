<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Arma extends Model
{
    use HasFactory;

    // Nombre de la tabla en la base de datos
    protected $table = 'armas';

    // Campos que permitimos rellenar masivamente
    protected $fillable = [
        'user_id',
        'nombre',
        'tipo',
        'calibre',
        'numero_serie',
        'notas',
        'imagen_ruta',
    ];

    /**
     * Relación: Un arma pertenece a un Usuario.
     */
    public function propietario()
    {
        // 'usuario_id' es la clave foránea en esta tabla 'armas'
        return $this->belongsTo(User::class, 'usuario_id');
    }
}