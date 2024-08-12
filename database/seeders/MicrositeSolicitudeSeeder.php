<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MicrositeSolicitudeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \DB::table('microsite_solicitudes')->insert([
            [
                'comment' => '[29 de jun 21:16]  El micrositio cuenta con todos los papeles al dia',
                'status' => 'APROBADO',
                'adminId' => 2,
                'userId' => 3,
                'ventureId' =>1,
                'micrositeId' =>1
            ],
            [
                'comment' => '[29 de jun 21:16]  El micrositio cuenta con todos los papeles al dia',
                'status' => 'APROBADO',
                'adminId' => 2,
                'userId' => 5,
                'ventureId' =>2,
                'micrositeId' =>2
            ],
        ]);

    }
}
