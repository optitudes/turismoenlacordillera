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
         $this->call(MicrositeSeeder::class);
         $this->call(MicrositeSolicitudeSeeder::class);
    }
}
