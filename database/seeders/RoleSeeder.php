<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;


class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       //creating user types
       \DB::table('roles')->insert([
            ['rol' => 'root', 'code' => '0', 'description' => 'posee todos los permisos del sistema'],
            ['rol' => 'admin', 'code' => '1001', 'description' => 'posee algunos permisos sobre emprendedores y usuarios'],
            ['rol' => 'emprendedor', 'code' => '2001', 'description' => 'posee algunos permisos sobre su propio micro sitio y emprendimiento'],
            ['rol' => 'cliente', 'code' => '3001', 'description' => 'posee algunos permisos sobre su propia cuenta']]
        );
    }
}
