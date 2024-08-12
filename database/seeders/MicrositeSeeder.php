<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MicrositeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \DB::table('microsites')->insert([
            [
                'description' => '
                            Viajes Agradables es una empresa líder en el sector del turismo, con sede en Génova, Quindío, Colombia. Desde su fundación, se ha dedicado a ofrecer experiencias inolvidables a viajeros de todo el mundo, proporcionando un servicio personalizado que destaca por su compromiso con la excelencia y la satisfacción del cliente. Con una profunda conexión con el patrimonio natural y cultural de la región, Viajes Agradables se especializa en crear itinerarios únicos que permiten a los visitantes sumergirse en la riqueza de los paisajes, la cultura, y la historia del Quindío y sus alrededores.

            Ubicada en el corazón de Génova, un encantador pueblo conocido como la "Colina Iluminada de los Andes", la empresa se enorgullece de ser una puerta de entrada a la exploración de los mágicos cafetales, exuberantes montañas, y cristalinos ríos que caracterizan esta zona del Eje Cafetero. Viajes Agradables ofrece una amplia gama de servicios turísticos que incluyen tours guiados por fincas cafeteras tradicionales, caminatas ecológicas por reservas naturales, y visitas a parques nacionales como el Parque Nacional Natural Los Nevados.

            Además de su enfoque en el ecoturismo y el turismo de aventura, Viajes Agradables también se dedica a promover la cultura local a través de experiencias auténticas. Los visitantes pueden participar en talleres de artesanía, degustaciones de gastronomía típica, y festividades locales, todo bajo la guía de expertos que comparten su conocimiento y pasión por la región.

            El equipo de Viajes Agradables está compuesto por profesionales apasionados y conocedores de la región, quienes se esfuerzan por garantizar que cada viaje sea seguro, educativo, y sobre todo, agradable. La empresa también se distingue por su enfoque en el turismo sostenible, implementando prácticas que minimizan el impacto ambiental y apoyan a las comunidades locales.

            Para aquellos que buscan más que unas vacaciones convencionales, Viajes Agradables ofrece la oportunidad de conectarse profundamente con la naturaleza, aprender sobre el proceso del café desde la semilla hasta la taza, y descubrir los secretos ocultos de Génova y el Quindío. Ya sea que los visitantes busquen relajarse en un entorno natural o aventurarse en emocionantes exploraciones, Viajes Agradables se asegura de que cada itinerario sea cuidadosamente diseñado para satisfacer los deseos y necesidades de cada cliente.

            Con una reputación basada en la confianza, la calidad, y el servicio excepcional, Viajes Agradables se ha convertido en el referente para aquellos que desean experimentar lo mejor que Colombia tiene para ofrecer. Ven y descubre por qué tantos viajeros eligen a Viajes Agradables como su socio de confianza para explorar la belleza y la diversidad de Génova, Quindío, y más allá.
                ',
                'smallImageUrl' => 'https://cdn.pixabay.com/photo/2019/11/13/03/44/village-4622441_960_720.jpg',
                'bannerImageUrl'=> 'https://img.freepik.com/foto-gratis/retrato-anciano-dispositivo-camara-celebracion-dia-mundial-fotografia_23-2151657239.jpg?t=st=1723236003~exp=1723239603~hmac=0d00c5c499b7e7d0e7b70d1727caff3e7da042fa7cc42c82141d00cc103bc6f9&w=1380',
                'name' => 'viajes_agradables',
                'isActive' => true,
                'isPublish' => true,
                'ventureId' => 1,
                'userId' => 3,
                'themeId' => 1,
                'created_at' => now()

            ],
            [
                'description' => '
                                Casa Vida es una empresa dedicada al turismo en Génova, Quindío, Colombia, que se especializa en ofrecer experiencias de viaje transformadoras y llenas de significado. Fundada con la visión de conectar a las personas con la belleza natural, la cultura auténtica, y la tranquilidad que ofrece esta encantadora región del Eje Cafetero, Casa Vida se ha convertido en sinónimo de calidad, hospitalidad, y bienestar en el sector turístico.

                                Con Génova como su base de operaciones, Casa Vida ofrece una amplia variedad de servicios que van más allá del turismo convencional. La empresa se enfoca en crear experiencias personalizadas que permiten a los visitantes no solo descubrir los paisajes espectaculares de los Andes colombianos, sino también revitalizar su mente, cuerpo y espíritu. Desde retiros de bienestar en medio de la naturaleza hasta recorridos culturales que exploran las raíces históricas y tradiciones locales, Casa Vida se dedica a proporcionar viajes que nutren tanto el alma como el cuerpo.

                                La filosofía de Casa Vida está profundamente enraizada en el concepto de turismo sostenible. La empresa se esfuerza por minimizar su impacto ambiental a través de prácticas responsables y por apoyar a las comunidades locales al emplear guías y colaboradores que conocen y aman su tierra. Esto asegura que cada experiencia no solo sea enriquecedora para los visitantes, sino también beneficiosa para la región y sus habitantes.

                                Entre las ofertas más destacadas de Casa Vida se encuentran los tours de bienestar, que combinan actividades como el yoga, la meditación, y terapias holísticas con la exploración de la naturaleza. Estos retiros están diseñados para ayudar a los visitantes a desconectarse del estrés diario y reconectar con su esencia en un entorno sereno y rejuvenecedor. Además, Casa Vida organiza recorridos por las fincas cafeteras tradicionales, donde los viajeros pueden aprender sobre el proceso del café y degustar algunas de las mejores tazas que Colombia tiene para ofrecer.

                ',
                'smallImageUrl' => 'https://img.freepik.com/foto-gratis/madre-su-hija-pie-cerca-cerca-pie-olivar_23-2147907341.jpg',
                'bannerImageUrl'=> 'https://img.freepik.com/fotos-premium/plantaciones-cafe-america-sur-horizonte_1173099-4359.jpg?w=1380',
                'name' => 'casa_vida',
                'isActive' => true,
                'isPublish' => true,
                'ventureId' => 2,
                'userId' => 5,
                'themeId' => 2,
                'created_at' => now()

            ],
        ]);
 
    }
}
