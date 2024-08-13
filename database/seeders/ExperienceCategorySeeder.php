<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ExperienceCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \DB::table('experience_categories')->insert([
            [
                "name" => "Gastronomía",
            ],
            [
                "name" => "Senderismo",
            ],
            [
                "name" => "Hospedaje",
            ],
            [
                "name" => "Escalada",
            ]
        ]);
    }
}
