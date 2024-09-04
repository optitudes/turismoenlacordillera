<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ExperienceImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       \DB::table('experience_images')->insert([
            [
                'url' => 'https://img.freepik.com/foto-gratis/rio-hojas-otono_23-2147677721.jpg',
                'experienceId' => 1,
            ],
            [
                'url' => 'https://img.freepik.com/fotos-premium/hoja-verde-sienta-arroyo-bosque_1072191-109880.jpg',
                'experienceId' => 1,
            ],
            [
                'url' => 'https://img.freepik.com/foto-gratis/arriba-hojas-plantas-tropicales_23-2147810784.jpg',
                'experienceId' => 1,
            ],
            [
                'url' => 'https://img.freepik.com/foto-gratis/primer-plano-planta-cactus-gota-rocio-selva_23-2148248843.jpg',
                'experienceId' => 1,
            ],
            [
                'url' => 'https://img.freepik.com/foto-gratis/ai-genero-hojas-otono_23-2150648499.jpg',
                'experienceId' => 1,
            ],
            [
                'url' => 'https://img.freepik.com/foto-gratis/ai-genero-hojas-otono_23-2150648499.jpg',
                'experienceId' => 2,
            ],
            [
                'url' => 'https://img.freepik.com/fotos-premium/dos-caballos-estan-pie-campo-casa-fondo_1308172-177363.jpg',
                'experienceId' => 2,
            ],
            
        ]);
    }
}
