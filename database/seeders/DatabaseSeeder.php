<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Post;


class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        // Crear un usuario admin si no existe
        $admin = User::firstOrCreate(
            ['email' => 'admin@hunterlog.com'],
            ['name' => 'Admin Hunter', 'password' => bcrypt('password')]
        );

        // Crear artículos de ejemplo
        Post::create([
            'user_id' => $admin->id,
            'titulo' => 'Review: Visor Térmico X-200',
            'slug' => 'review-visor-termico-x200',
            'categoria' => 'Análisis',
            'resumen' => 'Probamos el último modelo de visión térmica en condiciones de baja visibilidad. ¿Vale la pena la inversión?',
            'contenido' => 'Contenido completo del artículo...',
            'tiempo_lectura' => 8,
            'created_at' => now(),
        ]);

        Post::create([
            'user_id' => $admin->id,
            'titulo' => 'El papel del cazador en la conservación',
            'slug' => 'cazador-conservacion',
            'categoria' => 'Conservación',
            'resumen' => 'Un análisis profundo sobre cómo la caza gestionada contribuye al equilibrio de los ecosistemas locales.',
            'contenido' => 'Contenido completo...',
            'tiempo_lectura' => 12,
            'created_at' => now()->subDays(2),
        ]);

        Post::create([
            'user_id' => $admin->id,
            'titulo' => 'Checklist de seguridad antes de salir',
            'slug' => 'checklist-seguridad',
            'categoria' => 'Seguridad',
            'resumen' => 'No salgas al monte sin repasar estos 10 puntos críticos de seguridad. Tu vida depende de ello.',
            'contenido' => 'Contenido completo...',
            'tiempo_lectura' => 5,
            'created_at' => now()->subDays(5),
        ]);
    }
}
