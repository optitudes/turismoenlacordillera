<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ExperienceInteractiveMapSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \DB::table('experience_interactive_maps')->insert([
            [
                'url' => 'https://parquedelcafe.co/wp-content/uploads/2024/08/Mapa-2024-PDF-sitio-Web-2048x1582.jpg',
                'experienceId' => 1,
            ],
            [
                'url' => 'https://e7.pngegg.com/pngimages/935/65/png-clipart-ecoland-theme-park-gotjawal-forest-love-land-train-water-map-amusement-park-transport.png',
                'experienceId' => 2,
            ],
            [
                'url' => 'https://i.pinimg.com/736x/a1/ff/e3/a1ffe37686b0c5939fa89edfa6584aa0.jpg',
                'experienceId' => 3,
            ],
            
        ]);
    }
}
