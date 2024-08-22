<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \DB::table('services')->insert([
            [
                "title" => "Experiencias de Café",
                "description" => "Sumérgete en el mundo del café con experiencias únicas en las fincas cafeteras de la región. Aprende sobre el proceso de cultivo, participa en catas y disfruta del mejor café de origen en un entorno natural incomparable.",
                "imageUrl" => "https://img.freepik.com/foto-gratis/mujer-joven-arreglando-su-pasteleria_23-2149210428.jpg",
                "categoryId" => 1,
                "micrositeId" => 1,
                "isVisible" => true,
            ],
            [
                "title" => "Senderismo en Génova, Quindío",
                "description" => "Descubre la belleza de Génova, Quindío, a través de emocionantes rutas de senderismo. Atraviesa paisajes montañosos y exuberantes bosques mientras exploras la flora y fauna local en un recorrido lleno de aventura.",
                "imageUrl" => "https://img.freepik.com/foto-gratis/senderista-camino-bosque_23-2147683099.jpg",
                "categoryId" => 2,
                "micrositeId" => 1,
                "isVisible" => true,
            ],
            [
                "title" => "Hospedaje en Casas de Campo",
                "description" => "Relájate y desconéctate en nuestras acogedoras casas de campo. Disfruta de la tranquilidad del campo, rodeado de naturaleza, y experimenta la auténtica hospitalidad quindiana en un entorno rural único.",
                "imageUrl" => "https://img.freepik.com/foto-gratis/mujer-joven-mascara-medica-mirando-hermosa-vista-naturaleza_23-2149066296.jpg",
                "categoryId" => 3,
                "micrositeId" => 1,
                "isVisible" => true,
            ],
            [
                "title" => "Retos de Montaña en Génova",
                "description" => "Acepta el desafío de caminar 5 km escalando la montaña de Génova. Pon a prueba tu resistencia y disfruta de vistas impresionantes mientras superas este reto en uno de los paisajes más espectaculares del Quindío.",
                "imageUrl" => "https://img.freepik.com/foto-gratis/vista-trasera-mujer-joven-descendiendo_23-2147617548.jpg",
                "categoryId" => 4,
                "micrositeId" => 1,
                "isVisible" => true,
            ],
            [
                "title" => "Experiencias de Café",
                "description" => "Sumérgete en el mundo del café con experiencias únicas en las fincas cafeteras de la región. Aprende sobre el proceso de cultivo, participa en catas y disfruta del mejor café de origen en un entorno natural incomparable.",
                "imageUrl" => "https://img.freepik.com/foto-gratis/mujer-joven-arreglando-su-pasteleria_23-2149210428.jpg",
                "categoryId" => 1,
                "micrositeId" => 2,
                "isVisible" => true,
            ],
            [
                "title" => "Senderismo en Génova, Quindío",
                "description" => "Descubre la belleza de Génova, Quindío, a través de emocionantes rutas de senderismo. Atraviesa paisajes montañosos y exuberantes bosques mientras exploras la flora y fauna local en un recorrido lleno de aventura.",
                "imageUrl" => "https://img.freepik.com/foto-gratis/senderista-camino-bosque_23-2147683099.jpg",
                "categoryId" => 2,
                "micrositeId" => 2,
                "isVisible" => true,
            ],
            [
                "title" => "Hospedaje en Casas de Campo",
                "description" => "Relájate y desconéctate en nuestras acogedoras casas de campo. Disfruta de la tranquilidad del campo, rodeado de naturaleza, y experimenta la auténtica hospitalidad quindiana en un entorno rural único.",
                "imageUrl" => "https://img.freepik.com/foto-gratis/mujer-joven-mascara-medica-mirando-hermosa-vista-naturaleza_23-2149066296.jpg",
                "categoryId" => 3,
                "micrositeId" => 2,
                "isVisible" => true,
            ],
            [
                "title" => "Retos de Montaña en Génova",
                "description" => "Acepta el desafío de caminar 5 km escalando la montaña de Génova. Pon a prueba tu resistencia y disfruta de vistas impresionantes mientras superas este reto en uno de los paisajes más espectaculares del Quindío.",
                "imageUrl" => "https://img.freepik.com/foto-gratis/vista-trasera-mujer-joven-descendiendo_23-2147617548.jpg",
                "categoryId" => 4,
                "micrositeId" => 2,
                "isVisible" => true,
            ],
        ]);

    }
}
