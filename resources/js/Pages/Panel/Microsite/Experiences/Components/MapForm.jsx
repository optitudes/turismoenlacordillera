import { useEffect,useState,useRef } from "react";
import httpClient from "@/Utils/httpClient";
import Loader from '@/Components/Loader';
import QuestionPopup from '@/Components/QuestionPopup';
import {Head } from '@inertiajs/react';
import {validateImage} from "@/Validators/validator";
import { PencilSimple,CameraPlus,ArrowArcLeft } from '@phosphor-icons/react';

import { MapContainer, TileLayer, Marker, useMap,useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';
import L from 'leaflet';

export default function MapForm ({maps,experienceId}){
  const [position, setPosition] = useState([4.207591620492386,-75.78945795575576]); // Latitud y longitud inicial

  const [selectedInteractiveMapUrl, setSelectedInteractiveMapUrl] = useState(null);
  const [newInteractiveMap,setNewInteractiveMap] = useState(null);
  const  imageFileInputRef = useRef(null);

  useEffect(()=>{
    console.log(maps);
    let gpsCoordenates = maps.gps?maps.gps:null;
    let interactiveMap = maps.interactive? maps.interactive:null;
    if(gpsCoordenates){
      setPosition([gpsCoordenates.latitude,gpsCoordenates.longitude]);
    }
    if(interactiveMap){
      setSelectedInteractiveMapUrl(interactiveMap.url);
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



    //useStates relacionados al popup
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const [onCancelPopup, setOnCancelPopup] = useState(undefined);
    const [onAcceptPopup, setOnAcceptPopup] = useState(undefined);
    const [popupMessage,setPopupMessage] = useState("");
    const [isLoading,setIsLoading] = useState(false);


    const changeInteractiveMap = (event) => {
        const imageFile = (Array.from(event.target.files))[0];
        if (imageFile) {
          setNewInteractiveMap(imageFile);
          setSelectedInteractiveMapUrl(URL.createObjectURL(imageFile));
        }
          
    }

    const handleSubmitGpsMap = () => {
      httpClient.post("panel/experience/update/gpsMap", {experienceId: experienceId,coordenates:position})
        .then(response => {
          alert(response.data.message)
        })
        .catch(error =>{
            const msg = JSON.parse(error?.request?.response).message || error.message;
            alert(msg);
        });

    }
    const handleSubmitInteractiveMap = () => {
      let validation = validateImage(newInteractiveMap);
      
       if(!validation.success){
            setPopupMessage(validation.msg);
            setOnAcceptPopup(() => ()=> {setIsOpenPopup(false);});
            setIsOpenPopup(true);
        }else{
            const formData = new FormData();
            formData.append('newInteractiveMap', newInteractiveMap);
            formData.append('experienceId', experienceId);
             //se hace la peticio[n
            httpClient.post("panel/experience/update/interactiveMap", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
            })
            .then(response => {
                setPopupMessage(response.data.message);
                setOnAcceptPopup(() => ()=> {setIsOpenPopup(false);});
                setIsOpenPopup(true);
            })
            .catch(error =>{
                const msg = JSON.parse(error?.request?.response).message || error.message;
                setPopupMessage(msg);
                setOnAcceptPopup(() => ()=> {setIsOpenPopup(false);});
                setIsOpenPopup(true);
            });

        }

    }

    return <>
           <Head title="Mapas de la experiencia" />
             <div className="bg-white w-dvw justify-center">
              <div className="flex flex-col items-start text-start px-3 cursor-pointer"
                onClick={() => {window.history.back()}}
              >
                <ArrowArcLeft size={36} />
                <span>Volver atrás</span>
              </div>
              <div className="px-4 py-3 text-center text-xl font-bold">
               Mapas de la experiencia 
              </div>

              <label className="block text-gray-700 text-md font-bold mb-2 text-center py-3" htmlFor="estado-select">
                Cómo llegar : 
              </label>


              <div className="w-full flex justify-center">
                <div className="w-full lg:w-1/2 text-center bg-rose-200 border border-2 border-salmon rounded-lg">
                  <MapContainer center={position} zoom={13} style={{ height: '550px', width: '100%' }}>
                        <TileLayer
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                      <LocationMarker />
                  </MapContainer> 
                </div>
              </div>

              <div className="flex justify-around py-3">
                <button
                  type="button"
                  className=" bg-green-500 text-white p-2 rounded-md"
                  onClick={handleSubmitGpsMap}
                >
                  Guardar cambios mapa GPS 
                </button>
              </div>

              <label className="block text-gray-700 text-md font-bold mb-2 text-center py-3" htmlFor="estado-select">
                Mapa de la experiencia (1280 × 853 ) : 
              </label>

              <div className="w-full flex justify-center py-3 col">
                <div className="w-full lg:w-1/2 text-center bg-rose-200 border border-2 border-salmon rounded-lg">
                    {selectedInteractiveMapUrl ? (
                      <>
                        <img src={selectedInteractiveMapUrl} alt="Selected" className="w-full h-full object-cover" />
                        <div
                            className=" flex items-center justify-center bg-yellow-500 bg-opacity-50 cursor-pointer rounded-lg"
                            onClick={() => {imageFileInputRef.current.click()}}
                          >
                            <PencilSimple size={32} className="text-white" />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="  text-gray-500">
                          Sin imagen
                        </div>
                        <div
                            className=" flex items-center justify-center bg-blue-500 bg-opacity-50 cursor-pointer rounded-lg"
                            onClick={() => {imageFileInputRef.current.click()}}
                          >
                            <CameraPlus size={32} className="text-white" />
                        </div>
                      </>
                    )}
                  
                </div>
              </div>
              <input
                  type="file"
                  accept="image/*"
                  ref={imageFileInputRef}
                  style={{ display: 'none' }}
                  onChange={changeInteractiveMap}
              /> 

              <div className="text-center my-3 py-3">
                <button
                  type="button"
                  className=" bg-green-500 text-white p-2 rounded-md"
                  onClick={handleSubmitInteractiveMap}
                >
                  Guardar cambios mapa descargable 
                </button>
              </div>
            </div>
            {isLoading?<Loader/>:<></>}
              <QuestionPopup
                  isOpen = {isOpenPopup}
                  question= {popupMessage}
                  onAccept={onAcceptPopup}
                  onCancel={onCancelPopup}
              />
       </>
}