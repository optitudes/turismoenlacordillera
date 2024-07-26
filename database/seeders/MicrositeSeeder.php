<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MicrositeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \DB::table('microsites')->insert([
            [
                'description' => '<h1>Ruralidad y belleza</h1>',
                'smallImageUrl' => 'https://cdn.pixabay.com/photo/2019/11/13/03/44/village-4622441_960_720.jpg',
                'bannerImageUrl'=> 'https://img.freepik.com/vector-gratis/plantilla-banner-horizontal-plano-celebracion-cinco-mayo_23-2150310269.jpg',
                'name' => 'viajes_agradables',
                'experiences' => null,
                'isActive' => true,
                'isPublish' => true,
                'ventureId' => 1
            ],
        ]);
 
    }
}
