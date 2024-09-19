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
                'vCode' => 'PWAiP0mKMrw',
                'experienceId' => 1,
            ],
            [
                'vCode' => '-sOLGqfj6TI',
                'experienceId' => 1,
            ],
            [
                'vCode' => 'a8gCtUfZdbU',
                'experienceId' => 2,
            ],
            [
                'vCode' => 'PWAiP0mKMrw',
                'experienceId' => 2,
            ],
            [
                'vCode' => '-sOLGqfj6TI',
                'experienceId' => 3,
            ]
            
        ]);
    }
}
