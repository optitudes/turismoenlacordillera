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
                'demoImageUrl' => env("APP_URL").':8000/storage/theme1.png',
                'viewIndex' => 1,
                'maxVideos' => 1,
                'maxServices' => 8,

            ],
            [
                'name' => 'Tema 2',
                'demoImageUrl' => env("APP_URL").':8000/storage/theme2.png',
                'viewIndex' => 2,
                'maxVideos' => 1,
                'maxServices' => 8,
            ],
        ]);
    }
}
