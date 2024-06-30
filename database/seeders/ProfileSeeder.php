<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProfileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       \DB::table('profiles')->insert([
            [
                'idNumber' => '1191191919',
                'lastNames' => 'Alderson',
                'names' => 'Elliot',
                'phoneNumber' => '3233812999',
                'phonePrefix' => '+57',
                'pictureUrl' => 'https://img.freepik.com/foto-gratis/entrega-joven-mujer-vistiendo-polo-rojo-gorra-amarilla-haciendo-gesto-llamarme-mirando-confiado-sobre-fondo-rosa-aislado-jpg_141793-20036.jpg',
                'municipality' => 'Génova',
                'department' => 'Quindío',
                'userId' => 1
            ],
            [
                'idNumber' => '2191191919',
                'lastNames' => 'Robot',
                'names' => 'Mister',
                'phoneNumber' => '3233812666',
                'phonePrefix' => '+57',
                'pictureUrl' => 'https://img.freepik.com/foto-gratis/retrato-hacker-mascara_23-2148165907.jpg',
                'municipality' => 'Génova',
                'department' => 'Quindío',
                'userId' => 2
            ],           
            [
                'idNumber' => '3191191919',
                'lastNames' => 'Alderson',
                'names' => 'Darlene',
                'phoneNumber' => '32338123838',
                'phonePrefix' => '+57',
                'pictureUrl' => 'https://img.freepik.com/foto-gratis/mujer-negocios-chaqueta-negra-que-mira-camara_23-2148053688.jpg',
                'municipality' => 'Génova',
                'department' => 'Quindío',
                'userId' => 3
            ],           
            [
                'idNumber' => '3191191919',
                'lastNames' => 'Wellic',
                'names' => 'Tyrell',
                'phoneNumber' => '32338123938',
                'phonePrefix' => '+57',
                'pictureUrl' => 'https://img.freepik.com/foto-gratis/cerrar-vista-cara-feliz-excursionista-atractivo-barba-sonriendo-mientras-toma-selfie_273609-1602.jpg',
                'municipality' => 'Génova',
                'department' => 'Quindío',
                'userId' => 4
            ], 
        ]);
    }
}
