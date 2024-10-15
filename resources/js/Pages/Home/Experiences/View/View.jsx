import { useState,useEffect } from 'react';
import {Head } from '@inertiajs/react';
import Card from "@/Components/Card";
import Text from "@/Components/Text"
import Video from "@/Components/Video";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import { MapContainer, TileLayer, Marker, useMap,useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';
import L from 'leaflet';


import { WhatsappLogo } from '@phosphor-icons/react';

export default function View({experienceInfo}) {

  const [position, setPosition] = useState([4.207591620492386,-75.78945795575576]); // Latitud y longitud inicial

  const [centerSlidePercentage, setCenterSlidePercentage] = useState(
    window.innerWidth < 768 ? 100 : 33.33
  );

  const handleResize = () => {
    setCenterSlidePercentage(window.innerWidth < 768 ? 100 : 33.33);
  };
  useEffect(()=>{console.log(experienceInfo)},[]);

  useEffect(()=>{
    if(experienceInfo.gps_map){
      setPosition([experienceInfo.gps_map.latitude,experienceInfo.gps_map.longitude]);
    }

  },[]);

  const LocationMarker = () => {
    const map = useMap();

    useEffect(() => {
      const geocoder = L.Control.Geocoder.nominatim();
      const control = L.Control.geocoder({
        defaultMarkGeocode: false,
        geocoder,
      })
        .on('markgeocode', (e) => {
          const latlng = e.geocode.center;
          setPosition([latlng.lat, latlng.lng]);
        })
        .addTo(map);
        map.setView([position[0], position[1]], map.getZoom());
      return () => map.removeControl(control);
    }, [position]);

     useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
      },
    });
    return position ? <Marker position={position}></Marker> : null;
  };



  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

    return (
      <>
          <Head title={experienceInfo.title??"Experiencia"} />
          {experienceInfo.imageUrl != null && (
          <section className="w-full h-full ">
            <Card
              cardClass="overflow-hidden shadow-md cursor-pointer group relative"
              imageAlt={experienceInfo.imageUrl}
              imageSrc={experienceInfo.imageUrl}
              imageWrapperClass="w-full h-[300px] overflow-hidden sm:h-[600px]"
            >
            </Card>
          </section>
          ) }

          <div className='py-9'>
            <div className="max-h-72 rounded-lg border border-[#117864] mx-3 md:mx-20 overflow-auto ">
                <div className="text-white text-center mx-4 md:mx-16 whitespace-normal break-words text-2xl">
                  {experienceInfo.description}
                </div>
            </div>
          </div>


      <Text as="h1" className="lg:text-3xl md:text-2xl text-xl text-center text-white lg:w-3/5 w-full py-9">
       Galeria de la experiencia
      </Text>

      <div className='py-9'>
          <div className="max-h-62 rounded-lg border-2  border-[#117864] mx-1 md:mx-20 ">
          <Carousel
                  showStatus={true}
                  showIndicators={true}
                  infiniteLoop={false}
                  showArrows={true}
                  emulateTouch={false}
                  centerMode
                  centerSlidePercentage={centerSlidePercentage}

          >
          {experienceInfo.images && experienceInfo.images.map((card, index) => (
                <div key={index}>
                  <Card
                    cardClass="overflow-hidden shadow-md  cursor-pointer group relative"
                    imageSrc={card.url}
                    imageWrapperClass="w-90 h-72 overflow-hidden "
                    textWrapperClass="flex flex-col gap-4 w-full px-5 py-5"
                  >
                  </Card>
                </div>
              ))}
            </Carousel>
          </div>
        </div>

      <Text as="h1" className="lg:text-3xl md:text-2xl text-xl text-center text-white lg:w-3/5 w-full py-9 ">
        Itinerario
      </Text>

      <div className='w-[23rem] h-[400px] overflow-hidden sm:h-[550px] sm:w-[75rem] border-2 border-[#117864] rounded-lg  '>
            {experienceInfo.itinerary != null && <iframe className="w-full h-full" src={experienceInfo.itinerary.url} />}

      </div>

     {experienceInfo.itinerary != null &&
      <a
          href={experienceInfo.itinerary.url}
          download
          className="bg-springgreen hover:bg-green-500 text-white font-bold py-3 px-9 rounded mt-4 inline-block text-center"
        >
          Descargar
        </a>

      }

      <Text as="h1" className="lg:text-3xl md:text-2xl text-xl text-center text-white lg:w-3/5 w-full py-9">
        Vídeos de la experiencia
      </Text>

      <div className="flex flex-wrap w-full justify-center align-center">
        {experienceInfo.videos && experienceInfo.videos.map((video, index) => (
          <div className="py-3 w-[37rem] px-3 max-h-100 rounded-lg border-2 border-[#117864] mx-1 md:mx-1 overflow-auto  "  key={index}>
            {video.vCode != null && <Video isBanner={true} videoId={video.vCode} />}
          </div>

        ))}
      </div>




      <Text as="h1" className="lg:text-3xl md:text-2xl text-xl text-center text-white lg:w-3/5 w-full py-9">
       Mapa de la experiencia
      </Text>

      {experienceInfo.interactive_map && (
        <div className="w-full flex justify-center py-3 col">
            <div className="w-[74rem] min-h-96 text-center border border-2 border-[#117864] rounded-lg">
                    <img src={experienceInfo.interactive_map.url} alt="Selected" className="w-full h-full object-cover" />
                    <div
                        className=" flex items-center justify-center bg-yellow-500 bg-opacity-50 cursor-pointer rounded-lg"
                      >
                    </div>
            </div>
        </div>
      )}
      <Text as="h1" className="lg:text-3xl md:text-2xl text-xl text-center text-white lg:w-3/5 w-full py-9">
       Cómo llegar
      </Text>
      {experienceInfo.gps_map && (
       <div className="w-full flex justify-center py-9">
                <div className="w-full lg:w-[74rem] text-center bg-rose-200 border border-2 border-[#117864] rounded-lg">
                  <MapContainer center={[experienceInfo.gps_map.latitude,experienceInfo.gps_map.longitude]} zoom={13} style={{ height: '600px', width: '100%' }}>
                        <TileLayer
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                      <LocationMarker />
                  </MapContainer>
                </div>
       </div>
      )}
      <div className="fixed bottom-4 right-4 bg-white rounded-full p-3">
        <WhatsappLogo size={64}  color="#57e389" />
      </div>
      </>
      );

}
