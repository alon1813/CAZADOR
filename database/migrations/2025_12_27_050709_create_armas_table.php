<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
{
    Schema::create('armas', function (Blueprint $table) {
        $table->id();
        
        
        $table->foreignId('user_id')->constrained()->onDelete('cascade');
        
        // Detalles del arma
        $table->string('nombre');          // Ej: "Winchester 70"
        $table->string('tipo');            // Ej: "Rifle", "Escopeta"
        $table->string('calibre')->nullable(); // Ej: ".308 Win"
        $table->string('numero_serie')->nullable(); // Privado
        $table->text('notas')->nullable(); // Notas de mantenimiento o agrupación
        $table->string('imagen_ruta')->nullable();
        
        $table->timestamps(); // Crea created_at y updated_at
    });
}

    public function down(): void
    {
        Schema::dropIfExists('armas');
    }
};
