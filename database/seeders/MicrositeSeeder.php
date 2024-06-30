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
                'description' => 'Ruralidad y belleza',
                'name' => 'viajes_agradables',
                'experiences' => null,
                'isActive' => true,
                'isPublish' => true,
                'ventureId' => 1
            ],
        ]);
 
    }
}
