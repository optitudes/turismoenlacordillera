<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;


class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       //creating user types
       \DB::table('users')->insert([
            [
                'email' => 'root@example.com',
                'email_verified_at' => now(),
                'password' => Hash::make("asdfasdfasdf"),
                'isActive' => true,
                'role_id' =>1
            ],
            [
                'email' => 'admin@example.com',
                'email_verified_at' => now(),
                'password' => Hash::make("asdfasdfasdf"),
                'isActive' => true,
                'role_id' =>2
            ],
            [
                'email' => 'entrepreneur@example.com',
                'email_verified_at' => now(),
                'password' => Hash::make("asdfasdfasdf"),
                'isActive' => true,
                'role_id' =>3
            ],
            
            [
                'email' => 'client@example.com',
                'email_verified_at' => now(),
                'password' => Hash::make("asdfasdfasdf"),
                'isActive' => true,
                'role_id' =>4
            ],
            [
                'email' => 'entrepreneur2@example.com',
                'email_verified_at' => now(),
                'password' => Hash::make("asdfasdfasdf"),
                'isActive' => true,
                'role_id' =>3
            ],
        ]);
    }
}
