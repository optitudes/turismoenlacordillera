<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MicrositeThemeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \DB::table('microsite_themes')->insert([
            [
                'name' => 'Tema 1',
                'demoImageUrl' => 'https://api.maloca.co/sitio_templates/letmos/blue/letmos-home.png',
                'viewIndex' => 1,
                'maxImages' => 5,
                'maxVideos' => 1,
            ],
            [
                'name' => 'Tema 2',
                'demoImageUrl' => 'https://api.maloca.co/sitio_templates/space/dark_violet/space-home.png',
                'viewIndex' => 2,
                'maxImages' => 8,
                'maxVideos' => 1,
            ],
        ]);
    }
}
