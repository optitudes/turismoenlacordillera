import {useState,useEffect, useCallback } from "react";
import { TopDestinationTexts } from "@/Constants/dataLists"
import Card from "@/Components/Card"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Hero1 from "@/Assets/hero1.jpg";
import City2 from "@/Assets/hero2.jpg";
import City3 from "@/Assets/hero3.jpg";
import City4 from "@/Assets/hero4.jpg";
import City5 from "@/Assets/hero5.jpg";
import City6 from "@/Assets/hero6.jpg";


const HeroSection = () => {

    
      const renderCities = useCallback(
        (element) => {
          switch (element) {
            case 0:
              return Hero1;
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
        <section className="w-full h-full ">
    
        <div className="max-w-full">
        <Carousel
                showStatus={false}
                showIndicators={true}
                infiniteLoop={true}
                showArrows={false}
                emulateTouch={true}
                centerMode
                centerSlidePercentage={100}

        >
        {TopDestinationTexts.cards.map((card, index) => (
              <div key={index}>
                <Card
                  cardClass="overflow-hidden shadow-md  cursor-pointer group relative"
                  imageAlt={card.country}
                  imageSrc={renderCities(index)}
                  imageWrapperClass="w-full h-[600px] overflow-hidden"
                  textWrapperClass="flex flex-col gap-4 w-full px-5 py-5"
                >
                  <div className="absolute bottom-10 left-0 p-4 text-white ">
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold">
                      Titulo temporal 
                    </h3>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
                      Descripción temporal 
                    </p>
                    <button className="mt-2 px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 bg-blue-500 bg-opacity-45 text-white rounded-full hover:bg-opacity-100">
                      Más información 
                    </button>
                  </div>

                </Card>
              </div>
            ))}
                </Carousel>
    </div>
         
        </section>
      );
}

export default HeroSection