import {useState,useEffect, useCallback } from "react";
import Text from "@/Components/Text"
import { TopDestinationTexts } from "@/Constants/dataLists"
import { ArrowCircleRight } from "@phosphor-icons/react";
import { ArrowCircleLeft } from "@phosphor-icons/react";
import Card from "@/Components/Card"
import { AirplaneTilt, CaretLeft, CaretRight } from "@phosphor-icons/react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Colors from '@/Constants/Colors';
import City1 from "@/Assets/gallery1.jpeg";
import City2 from "@/Assets/gallery2.jpeg";
import City3 from "@/Assets/gallery3.jpeg";
import City4 from "@/Assets/gallery4.jpeg";
import City5 from "@/Assets/gallery5.jpeg";
import City6 from "@/Assets/gallery6.jpeg";

const TopDestination = () => {
  const [centerSlidePercentage, setCenterSlidePercentage] = useState(
    window.innerWidth < 768 ? 100 : 33.33
  );

  const handleResize = () => {
    setCenterSlidePercentage(window.innerWidth < 768 ? 100 : 33.33);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const renderCities = useCallback(
    (element) => {
      switch (element) {
        case 0:
          return "https://img.freepik.com/foto-gratis/delicioso-cafe-organico-naturaleza-muerta_23-2151762390.jpg";
        case 1:
          return "https://img.freepik.com/fotos-premium/vista-trasera-mujer-caminando-arboles_1048944-527721.jpg";
        case 2:
          return "https://img.freepik.com/foto-gratis/primer-disparo-enfoque-selectivo-frutos-rojos-arbusto-plantas_181624-21522.jpg";
        case 3:
          return "https://img.freepik.com/foto-gratis/plano-general-pilas-lena-campo-hierba-rodeado-arboles-atardecer_181624-1618.jpg";
        case 4:
          return "https://img.freepik.com/fotos-premium/vista-palmeras-angulo_1048944-14985921.jpg";
        case 5:
          return "https://img.freepik.com/foto-gratis/grupo-turistas-camina-montanas-bali_72229-1004.jpg";
        default:
          return "";
      }
    },
    []
  );

  return (
    <section className="w-full h-auto flex flex-col items-center justify-center relative lg:px-24 md:px-20 px-6 my-20">

      <Text as="p" className="font-light text-base text-white tracking-widest">
        {TopDestinationTexts.firstText}
      </Text>
      <Text as="h2" className="md:text-4xl text-2xl font-medium capitalize text-white py-2">
        {TopDestinationTexts.secondText}
      </Text>

    
    <div className="max-w-full">
    <Carousel
            showStatus={false}
            showIndicators={true}
            infiniteLoop={true}
            centerMode
            centerSlidePercentage={centerSlidePercentage} // Adjust the percentage based on your needs


            renderArrowPrev={(onClickHandler, hasPrev, label) =>
                hasPrev && (
                  <button
                    type="button"
                    onClick={onClickHandler}
                    title={label}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: 0,
                      cursor: 'pointer',
                      zIndex: 2,
                      // Agrega más estilos según tus necesidades
                    }}
                  >
                    <ArrowCircleLeft className="text-mediumseagreen" size={40}  weight="fill" />

                  </button>
                )
              }
              renderArrowNext={(onClickHandler, hasNext, label) =>
                hasNext && (
                  <button
                    type="button"
                    onClick={onClickHandler}
                    title={label}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      right: 0,
                      cursor: 'pointer',
                      zIndex: 2,
                      // Agrega más estilos según tus necesidades
                    }}
                  >
                    <ArrowCircleRight className="text-mediumseagreen" size={40}  weight="fill" />

                  </button>
                )
              }
            
    >
    {TopDestinationTexts.cards.map((card, index) => (
          <div key={index} className=" px-6 w-100">
            <Card
              cardClass="overflow-hidden shadow-md rounded-lg cursor-pointer group border border-springgreen border-dashed bg-aquadark"
              imageAlt={card.country}
              imageSrc={renderCities(index)}
              imageWrapperClass="w-full h-[250px] overflow-hidden"
              cover="group-hover:scale-125 transition duration-500 ease"
              textWrapperClass="flex flex-col gap-4 w-full px-5 py-5"
            >
             <div className="flex justify-between items-center ">
                <Text as="h4" className="text-base font-medium text-white">
                  {card.country}
                </Text>
                <Text as="small" className="text-white font-light text-sm">
                  {card.price}
                </Text>
              </div>
              <div className="w-full flex gap-4 items-center text-white">
                <AirplaneTilt size={20} className=" text-[#98fb98]" weight="fill" />
                <Text as="p" className="text-white font-light text-base">
                  {card.duration}
                </Text>
              </div>
            </Card>
          </div>
        ))}
            </Carousel>
</div>
     
    </section>
  );
};

export default TopDestination;
