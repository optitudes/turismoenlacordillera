<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ExperienceVideoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \DB::table('experience_videos')->insert([
            [
                'vCode' => '2-sD2TvJw2w',
                'experienceId' => 1,
            ],
            [
                'vCode' => 'zJozVAJAMy0',
                'experienceId' => 2,
            ],
            [
                'vCode' => 'sgZabD6wBa0',
                'experienceId' => 3,
            ],
            
        ]);
    }
}
