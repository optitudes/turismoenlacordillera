import { useEffect,useState } from "react";
import {Head } from '@inertiajs/react';
import Card from "@/Components/Card";
import Text from "@/Components/Text";
import Video from "@/Components/Video";
import ServiceList1 from '@/Pages/Home/Microsites/View/Components/ServiceList1';
import Services1 from '@/Pages/Home/Microsites/View/Components/Services1';

export default function View1(data) {
  const[microsite,setMicrosite] = useState(data.information.microsite);
  const[theme,setTheme] = useState(data.information.theme);
  const[venture,setVenture] = useState(data.information.venture);
  const[user,setUser] = useState(data.information.user);
  const[services,setServices] = useState(data.information.services);

  useEffect(() => {
    console.log(data.information);
  },[]);


  const toUpperCase = (texto) => {
    return texto.toUpperCase();
  }

    return (
        <>
          <Head title={venture.name} />
          <section className="w-full h-full ">
          <Card
              cardClass="overflow-hidden shadow-md cursor-pointer group relative"
              imageAlt={microsite.bannerImageUrl}
              imageSrc={microsite.bannerImageUrl}
              imageWrapperClass="w-full h-[300px] overflow-hidden sm:h-[600px]"
            >
            </Card>
          </section>

          <section className="w-full py-9 px-3.5" >
            <Text as="h2" className=" text-center md:text-4xl text-2xl font-medium capitalize text-white py-9">
                  {toUpperCase(venture.name)}
            </Text>
            <div className="max-h-72 rounded-lg border border-[#117864] mx-3 md:mx-20 overflow-auto">
              <div className="text-white text-justify mx-4 md:mx-16 whitespace-normal break-words">
                {microsite.description}
              </div>
            </div>

          </section>
          <Services1/>       
          <Video  videoId="NKealNqjWR8" bannerMode = {true}/>
          <ServiceList1/>       
        </>
      );
      
}