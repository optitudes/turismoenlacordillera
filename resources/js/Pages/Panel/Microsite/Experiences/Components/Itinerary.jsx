import { useEffect,useState,useRef } from "react";
import httpClient from "@/Utils/httpClient";
import {validateImage} from "@/Validators/validator";
import Modal from "@/Components/Modal";
import { PencilSimple, Trash } from '@phosphor-icons/react';
import Loader from '@/Components/Loader';
import QuestionPopup from '@/Components/QuestionPopup';

export default function Itinerary ({experienceId}){
   
    const [itinerary,setItinerary] = useState({url:""});
    const [isEditing,setIsEditing] = useState(false);

    const [newItinerary,setNewItinerary] = useState(null);
    const  itineraryInputRef = useRef(null);



    //useStates relacionados al popup
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const [onCancelPopup, setOnCancelPopup] = useState(undefined);
    const [onAcceptPopup, setOnAcceptPopup] = useState(undefined);
    const [popupMessage,setPopupMessage] = useState("");
    const [isLoading,setIsLoading] = useState(false);

    useEffect(()=>{
      updateItineraryFromNet();
    },[]);
    const updateItineraryFromNet = ()  => {
      httpClient.get("panel/experience/get/itinerary/"+experienceId)
        .then(response => {
            if(response.data.success){
              if(response.data.payload != null)
                  setItinerary(response.data.payload);
            }
        })
        .catch(error =>{
            console.log(error);
        });
    }

    const updateItineraryFile = (newPdf) => {
      const fileURL = URL.createObjectURL(newPdf);
      setItinerary((prevState) => ({ ...prevState, url: fileURL }));
      setNewItinerary(newPdf);
    }

    const submit = () => {
      if(newItinerary){
        // Crear un objeto FormData
        const formData = new FormData();
        
        formData.append(`itinerary`, newItinerary);
        formData.append(`experienceId`, experienceId);

        //se hace la peticio[n
        httpClient.post("panel/experience/update/itinerary", formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
        })
        .then(response => {
            setIsEditing(false);
            setPopupMessage(response.data.message);
            setOnAcceptPopup(() => ()=> {setIsOpenPopup(false);});
            setIsOpenPopup(true);
        })
        .catch(error =>{
            setIsEditing(false);
            const msg = JSON.parse(error?.request?.response).message || error.message;
            setPopupMessage(msg);
            setOnAcceptPopup(() => ()=> {setIsOpenPopup(false);});
            setIsOpenPopup(true);
        });

      }

    }



    return <>
     {isEditing? 
        <>
          <Modal show={isEditing} closeable={true}>
            <div className="max-h-screen overflow-y-auto">
              <div className="px-4 py-3 text-center text-xl font-bold">
                Itinerario de la experiencia
              </div>
              <div className="w-full h-auto">
                <div className="flex flex-wrap justify-center gap-4 p-4 md:p-9">
                   <button
                      type="button"
                      className=" bg-blue-500 text-white p-2 rounded-md"
                      onClick={() =>{itineraryInputRef.current.click()}}
                    >
                      Elegir un itinerario (pdf)
                    </button>
                   <div className="w-full">
                    
                    {itinerary.url != "" && <iframe className="w-full h-96" src={itinerary.url} />}
                    </div>
                  
                </div>
                
              </div>
              <div className="flex justify-around py-3">
                {newItinerary && <button
                  type="button"
                  className=" bg-green-500 text-white p-2 rounded-md"
                  onClick={submit}
                >
                  Guardar cambios
                </button>}
                <button
                  type="button"
                  className=" bg-red-500 text-white p-2 rounded-md"
                  onClick={() => {setItinerary({url:""});setNewItinerary(null);setIsEditing(false)}}
                >
                  Cerrar edición
                </button>
              </div>
              <input
                ref={itineraryInputRef}
                style={{ display: 'none' }}
                type="file"
                accept=".pdf"
                onChange={(e) => updateItineraryFile(e.target.files[0])}
              />

            </div>
            
          </Modal>

          
        </>:<>
        <button
            type="button"
            className="w-full bg-yellow-500 text-white p-2 rounded-md"
            onClick={() => {updateItineraryFromNet();setIsEditing(true)}}
        >
            Editar itinerario 
        </button>
        </>
    }
 {isLoading?<Loader/>:<></>}
            <QuestionPopup
                isOpen = {isOpenPopup}
                question= {popupMessage}
                onAccept={onAcceptPopup}
                onCancel={onCancelPopup}
            />
       </>
}