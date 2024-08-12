<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MicrositeVideoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         //creating user types
         \DB::table('microsite_videos')->insert([
            ['url' => 'https://www.youtube.com/watch?v=wOmmzKRK24Q', 'position' => 1, 'micrositeId' => 1],
         ]);
    }
}
