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
        Schema::create('capturas', function (Blueprint $table) {
            $table->id();
            
            // Relación: Una captura pertenece a una Jornada
            $table->foreignId('jornada_id')->constrained('jornadas')->onDelete('cascade');
            
            $table->string('especie');       // Ej: Jabalí, Perdiz
            $table->float('peso')->nullable(); // En Kilos
            $table->string('sexo')->nullable(); // Macho/Hembra
            $table->string('imagen_ruta')->nullable(); // Foto del trofeo
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('capturas');
    }
};
