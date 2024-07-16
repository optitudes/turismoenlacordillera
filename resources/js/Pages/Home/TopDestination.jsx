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
          return City1;
        case 1:
          return City2;
        case 2:
          return City3;
        case 3:
          return City4;
        case 4:
          return City5;
        case 5:
          return City6;
        default:
          return "";
      }
    },
    []
  );

  return (
    <section className="w-full h-auto flex flex-col items-center justify-center relative lg:px-24 md:px-20 px-6 my-20">

<Text as="p" className="font-light text-base text-color3/80 tracking-widest">
        {TopDestinationTexts.firstText}
      </Text>
      <Text as="h2" className="md:text-4xl text-2xl font-medium capitalize text-color3 py-2">
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
                    <ArrowCircleLeft size={40} color={Colors.primarydark2} weight="fill" />

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
                    <ArrowCircleRight size={40} color={Colors.primarydark2} weight="fill" />

                  </button>
                )
              }
            
    >
    {TopDestinationTexts.cards.map((card, index) => (
          <div key={index} className=" px-6 w-100">
            <Card
              cardClass="overflow-hidden shadow-md rounded-lg cursor-pointer group"
              imageAlt={card.country}
              imageSrc={renderCities(index)}
              imageWrapperClass="w-full h-[250px] overflow-hidden"
              cover="group-hover:scale-125 transition duration-500 ease"
              textWrapperClass="flex flex-col gap-4 w-full px-5 py-5"
            >
             <div className="flex justify-between items-center">
                <Text as="h4" className="text-base font-medium text-color3">
                  {card.country}
                </Text>
                <Text as="small" className="text-color3 font-light text-sm">
                  {card.price}
                </Text>
              </div>
              <div className="w-full flex gap-4 items-center text-color3">
                <AirplaneTilt size={20} color="currentColor" weight="fill" />
                <Text as="p" className="text-color3 font-light text-base">
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
