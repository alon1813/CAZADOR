<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    
    public function up(): void
    {
        Schema::create('anuncios', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            
            $table->string('titulo');          // Ej: Rifle Blaser R8
            $table->text('descripcion');
            $table->decimal('precio', 10, 2);  // Ej: 3500.00
            $table->string('categoria');       // Armas, Óptica, Ropa, Accesorios
            $table->string('estado');          // Nuevo, Como Nuevo, Usado
            $table->string('ubicacion');       // Ej: Toledo, España
            
            $table->string('imagen_ruta')->nullable();
            
            // Datos de contacto (si quiere mostrar teléfono o solo email)
            $table->boolean('mostrar_telefono')->default(false);
            $table->boolean('mostrar_email')->default(true);
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('anuncios');
    }
};
