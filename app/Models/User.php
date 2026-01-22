<?php

namespace App\Models;
use App\Models\Jornada;
use App\Models\Arma;
use App\Models\Anuncio;
// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'licencia_caza', 
        'ubicacion',     
        'biografia',     
        'notificaciones_veda', 
        'perfil_publico', 
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    // --- RELACIONES DEL PROYECTO DIARIO DE CAZA ---

    /**
     * Un usuario tiene muchas armas.
     */


    public function jornadas()
    {
        return $this->hasMany(Jornada::class);
    }

    public function armas()
    {
        return $this->hasMany(Arma::class);
    }

    /**
     * Un usuario tiene muchos anuncios en el mercado.
     */
    public function anuncios()
    {
        return $this->hasMany(Anuncio::class);
    }
}