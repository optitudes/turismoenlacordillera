<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ExperienceItinerarySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       \DB::table('experience_itineraries')->insert([
            [
                'url' => 'https://riptutorial.com/Download/rust-es.pdf',
                'experienceId' => 1,
            ],
            [
                'vCode' => 'https://riptutorial.com/Download/rust-es.pdf',
                'experienceId' => 2,
            ],
            [
                'vCode' => 'https://riptutorial.com/Download/rust-es.pdf',
                'experienceId' => 3,
            ],
            
        ]);
    }
}
