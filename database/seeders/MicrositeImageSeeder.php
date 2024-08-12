<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MicrositeImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       \DB::table('microsite_images')->insert([
            [
                'url' => 'https://img.freepik.com/foto-gratis/prado-arboles-valla-madera_1160-287.jpg',
                'position' => 1,
                'micrositeId' =>1
            ],
            [
                'url' => 'https://img.freepik.com/fotos-premium/picturesque-countryside-living_960396-626344.jpg',
                'position' => 2,
                'micrositeId' =>1
            ],
            [
                'url' => 'https://img.freepik.com/foto-gratis/foto-panoramica-hermosa-naturaleza-isla-kauai-hawaii_181624-48159.jpg',
                'position' => 3,
                'micrositeId' =>1
            ],
            [
                'url' => 'https://img.freepik.com/fotos-premium/vista-panoramica-paisaje-rural_960396-626210.jpg',
                'position' => 4,
                'micrositeId' =>1
            ],
            [
                'url' => 'https://img.freepik.com/foto-gratis/camino-traves-campo-verde_1353-222.jpg',
                'position' => 5,
                'micrositeId' =>1
            ],
            [
                'url' => 'https://img.freepik.com/foto-gratis/mujer-sombrero-felicidad-naturaleza_1150-9377.jpg',
                'position' => 5,
                'micrositeId' =>1
            ],
        ]);
    }
}
