<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VentureSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         \DB::table('ventures')->insert([
            [
                'address' => 'Génova - Quindío  calle 34 n 66',
                'name' => 'viajes agradables',
                'isActive' => true,
                'isPublish' => true,
                'mapLatitude' => 4.206968,
                'mapLongitude' => -75.789697,
                'userId' =>3
            ]
        ]);
       
    }
}
