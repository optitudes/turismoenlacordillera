<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ExperienceGpsMapSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \DB::table('experience_gps_maps')->insert([
            [
                'latitude' => '4.209293616847394',
                'longitude' => '-75.8133888244629',
                'experienceId' => 1,
            ],[
                'latitude' => '3.8899448919963895',
                'longitude' => '-77.08213806152345',
                'experienceId' => 2,
            ],[
                'latitude' => '-0.45043481325254864',
                'longitude' => '-91.07116699218751',
                'experienceId' => 3,
            ],[
                'latitude' => '51.06211251399775',
                'longitude' => '24.927978515625004',
                'experienceId' => 4,
            ],
            
            
        ]);
    }
}
