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
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // El autor

            $table->string('titulo');
            $table->string('slug')->unique(); // Para la URL amigable (ej: nueva-ley-caza)
            $table->text('resumen');          // Texto corto para la tarjeta
            $table->longText('contenido');    // El artículo completo
            $table->string('categoria');      // Normativas, Seguridad, Análisis...
            $table->string('imagen_ruta')->nullable();

            $table->integer('tiempo_lectura')->default(5); // Minutos

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
