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
import { useEffect } from "react"
import { Link } from '@inertiajs/react';

const Experiences = ({experienceList}) => {

    useEffect(() => {
        console.log(experienceList.length);
    },[]);

   return (
        <section className="w-full h-auto flex flex-col items-center justify-center relative lg:px-24 md:px-20 px-6">
            <Image image={GroupOfPlus} alt="Vector" className="absolute top-0 right-4 lg:h-36 h-24" />
            <main className="w-full pt-32 flex flex-col gap-3 items-center justify-center">
                
                <Text  className="md:text-4xl text-2xl font-medium capitalize text-white">
                    <Fade>Nuestras experiencias</Fade>
                </Text>

                <div className="w-full h-auto grid lg:grid-cols-4 md:grid-cols-2 lg:gap-7 md:gap-10 gap-7 my-12 z-20 px-8 md:px-0">
                    { experienceList.length > 0 &&
                        experienceList.map((card, index) => (
                            <Link href={route('home.experiences.view',{experienceId:card.id})} key={index}>
                                <Card cardClass="border border-salmon border-4 w-full bg-white flex flex-col items-center justify-center py-6 cursor-pointer transition duration-300 hover:shadow-xl px-5 rounded-xl cardPseudo after:bg-color1 hover:scale-105" imageWrapperClass="w-28 h-28 relative z-10 before:content-[''] before:absolute before:top-3 before:right-3 before:w-16 before:h-16 before:bg-color2/30 before:-z-10 before:rounded-tl-3xl before:rounded-br-3xl" cover="object-cover" imageAlt={card.firstText} imageSrc={card.imageUrl} textWrapperClass="w-full flex flex-col items-center gap-2 "  >
                                        <Text as="h4" className="text-base rounded font-medium text-redwinee">
                                        <strong> {card.title}</strong>
                                        </Text>
                                        <Text as="p" className="text-sm  font-light text-center text-color3">
                                            {card.description}
                                        </Text>
                                </Card>
                            </Link>
                        ))
                    }
                </div>
            </main>

        </section>
    )
}

export default Experiences 