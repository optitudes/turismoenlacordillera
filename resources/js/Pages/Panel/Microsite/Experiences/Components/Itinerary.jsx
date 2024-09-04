import { useEffect,useState,useRef } from "react";
import httpClient from "@/Utils/httpClient";
import {validateImage} from "@/Validators/validator";
import Modal from "@/Components/Modal";
import { PencilSimple, Trash } from '@phosphor-icons/react';
import Loader from '@/Components/Loader';
import QuestionPopup from '@/Components/QuestionPopup';

export default function Itinerary ({experienceId}){
   
    const [isEditing,setIsEditing] = useState(false);

   


    //useStates relacionados al popup
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const [onCancelPopup, setOnCancelPopup] = useState(undefined);
    const [onAcceptPopup, setOnAcceptPopup] = useState(undefined);
    const [popupMessage,setPopupMessage] = useState("");
    const [isLoading,setIsLoading] = useState(false);



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
                  
                </div>
                
              </div>
              <div className="flex justify-around py-3">
                <button
                  type="button"
                  className=" bg-green-500 text-white p-2 rounded-md"
                  onClick={() =>{console.log("guardando")}}
                >
                  Guardar cambios
                </button>
                <button
                  type="button"
                  className=" bg-red-500 text-white p-2 rounded-md"
                  onClick={() => setIsEditing(false)}
                >
                  Cerrar edición
                </button>
              </div>
            </div>
            <input
                type="file"
                accept="image/*"
                ref={imageFileInputRef}
                style={{ display: 'none' }}
                onChange={changeImage}
            />
          </Modal>

          
        </>:<>
        <button
            type="button"
            className="w-full bg-yellow-500 text-white p-2 rounded-md"
            onClick={() => {setIsEditing(true)}}
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