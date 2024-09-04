<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
         $this->call(RoleSeeder::class);
         $this->call(UserSeeder::class);
         $this->call(ProfileSeeder::class);
         $this->call(VentureSeeder::class);
         $this->call(MicrositeThemeSeeder::class);
         $this->call(MicrositeSeeder::class);
         $this->call(MicrositeImageSeeder::class);
         $this->call(MicrositeVideoSeeder::class);
         $this->call(MicrositeSolicitudeSeeder::class);
         $this->call(ExperienceCategorySeeder::class);
         $this->call(ExperienceSeeder::class);
         $this->call(ExperienceImageSeeder::class);
         $this->call(ExperienceVideoSeeder::class);
    }
}
