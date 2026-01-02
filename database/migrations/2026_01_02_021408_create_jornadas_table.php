<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('jornadas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            
            $table->date('fecha');             // Día de la salida
            $table->string('ubicacion_texto'); // Nombre del sitio (Ej: "Coto Norte")
            
            // Coordenadas para el mapa (Double tiene más precisión que Float)
            $table->double('latitud', 15, 8);
            $table->double('longitud', 15, 8);
            
            // Clima (lo dejaremos preparado para cuando usemos la API del tiempo)
            $table->json('datos_climaticos')->nullable(); 
            
            $table->text('comentarios')->nullable();
            
            $table->timestamps();
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jornadas');
    }
};
