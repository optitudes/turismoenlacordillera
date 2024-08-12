import Image from "@/Components/Image"
import Text from "@/Components/Text"
import GroupOfPlus from "@/Assets/plusGroup.png"
import Card from "@/Components/Card"
import { useCallback } from "react"
import Icon1 from "@/Assets/icon1.png"
import Icon2 from "@/Assets/icon2.png"
import Icon3 from "@/Assets/mapa.png"
import Icon4 from "@/Assets/al-aire-libre.png"
import { Fade } from "react-awesome-reveal"

const Services2 = () => {

    const ServiceTexts = {
        title: "Nuestros servicios",
        cards: [
            {
                firstText: "Experiencias de Café",
                secondText: "Sumérgete en el mundo del café con experiencias únicas en las fincas cafeteras de la región. Aprende sobre el proceso de cultivo, participa en catas y disfruta del mejor café de origen en un entorno natural incomparable."
            },
            {
                firstText: "Senderismo en Génova, Quindío",
                secondText: "Descubre la belleza de Génova, Quindío, a través de emocionantes rutas de senderismo. Atraviesa paisajes montañosos y exuberantes bosques mientras exploras la flora y fauna local en un recorrido lleno de aventura."
            },
            {
                firstText: "Hospedaje en Casas de Campo",
                secondText: "Relájate y desconéctate en nuestras acogedoras casas de campo. Disfruta de la tranquilidad del campo, rodeado de naturaleza, y experimenta la auténtica hospitalidad quindiana en un entorno rural único."
            },
            {
                firstText: "Retos de Montaña en Génova",
                secondText: "Acepta el desafío de caminar 5 km escalando la montaña de Génova. Pon a prueba tu resistencia y disfruta de vistas impresionantes mientras superas este reto en uno de los paisajes más espectaculares del Quindío."
            }
        ]
    }

    const renderServiceIcon = useCallback((element) => {
        switch (element) {
            case 0:
                return Icon1;
            case 1:
                return Icon2;
            case 2:
                return Icon3;
            case 3:
                return Icon4;
            default:
                return "";
        }
    }, []);
    return (
        <section className="w-full h-auto flex flex-col items-center justify-center relative lg:px-24 md:px-20 px-6">
            <Image image={GroupOfPlus} alt="Vector" className="absolute top-0 right-4 lg:h-36 h-24" />
            <main className="w-full pt-32 flex flex-col gap-3 items-center justify-center">
                
                <Text  className="md:text-4xl text-2xl font-medium capitalize text-white">
                    <Fade>{ServiceTexts.title}</Fade>
                </Text>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {
                        ServiceTexts.cards.map((card, index) => (
                            <>
                            {index%2==0?
                                <div className="bg-salmon p-6 rounded-lg flex flex-col items-center cursor-pointer transform transition-transform duration-300 hover:scale-105">
                                    <img src="https://img.freepik.com/foto-gratis/madre-su-hija-pie-cerca-cerca-pie-olivar_23-2147907341.jpg" alt="Descripción 1" className="w-full h-40 object-cover mb-4 rounded" />
                                    <Text as="h4" className="text-base rounded font-medium text-redwinee">
                                        <strong> {card.firstText}</strong>
                                    </Text>
                                    <Text as="p" className="text-sm  font-light text-center text-color3">
                                        {card.secondText}
                                    </Text>
                                </div>
                                :
                                <div className="bg-redwinee p-6 rounded-lg flex flex-col items-center cursor-pointer transform transition-transform duration-300 hover:scale-105 ">
                                    <Text as="h4" className="text-base rounded font-medium text-white">
                                        <strong> {card.firstText}</strong>
                                    </Text>
                                    <Text as="p" className="text-sm  font-light text-center text-white py-3">
                                        {card.secondText}
                                    </Text>
                                    <img src="https://img.freepik.com/foto-gratis/madre-su-hija-pie-cerca-cerca-pie-olivar_23-2147907341.jpg" alt="Descripción 2" className="w-full h-40 object-cover mb-4 rounded" />
                                </div>
                            }
                            </>
                        ))
                    }
                </div>
            </main>

        </section>
    )
}
export default Services2