import { useEffect,useState,useRef } from "react";
import httpClient from "@/Utils/httpClient";
import Modal from "@/Components/Modal";
import Video from "@/Components/Video";
import Loader from '@/Components/Loader';
import QuestionPopup from '@/Components/QuestionPopup';
import getYoutubeVideoIdFromLink from '@/Utils/Utilities';

export default function VideoForm ({experienceId}){

    const [video,setVideo] = useState({vCode:""});
    const [isEditing,setIsEditing] = useState(false);


    //useStates relacionados al popup
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const [onCancelPopup, setOnCancelPopup] = useState(undefined);
    const [onAcceptPopup, setOnAcceptPopup] = useState(undefined);
    const [popupMessage,setPopupMessage] = useState("");
    const [isLoading,setIsLoading] = useState(false);


    useEffect(()=>{
      updateVideoFromNet();
    },[]);
    const updateVideoFromNet = ()  => {
      httpClient.get("panel/experience/get/video/"+experienceId)
        .then(response => {
            if(response.data.success){
              if(response.data.payload != null)
                  setVideo(response.data.payload);
            }
        })
        .catch(error =>{
            console.log(error);
        });
    }

    const handleVCodeChange = (e) => {
        const vCode = getYoutubeVideoIdFromLink(e.target.value);
        setVideo(prevVideo => ({
            ...prevVideo,
            vCode: vCode
        }));
    }
    const handleSubmit = () => {
        //se hace la peticio[n
        httpClient.post("panel/experience/update/video", {experienceId: experienceId,vCode:video.vCode})
        .then(response => {
            setPopupMessage(response.data.message);
            setOnAcceptPopup(() => ()=> {setIsOpenPopup(false);});
            setIsOpenPopup(true);
            setIsEditing(false);
        })
        .catch(error =>{
            const msg = JSON.parse(error?.request?.response).message || error.message;
            setPopupMessage(msg);
            setOnAcceptPopup(() => ()=> {setIsOpenPopup(false);});
            setIsOpenPopup(true);
            setIsEditing(false);
        });

    }

    return <>
     {isEditing? 
        <>
          <Modal show={isEditing} closeable={true}>
            <div className="px-9 overflow-y-auto ">
              <div className="px-4 py-3 text-center text-xl font-bold">
                Video de la experiencia ó el id del video
              </div>
                <input
                  type="text"
                  placeholder="URL del video de YouTube"
                  className="block w-full p-2 border border-gray-300 rounded-md"
                  value={video.vCode}
                  onChange={handleVCodeChange}
                />

                {video.vCode != null && <Video isBanner={false} videoId={video.vCode} />}


              <div className="flex justify-around py-3">
                <button
                  type="button"
                  className=" bg-green-500 text-white p-2 rounded-md"
                  onClick={handleSubmit}
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
            
          </Modal>

          
        </>:<>
        <button
            type="button"
            className="w-full bg-yellow-500 text-white p-2 rounded-md"
            onClick={() => {updateVideoFromNet();setIsEditing(true)}}
        >
            Editar video 
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