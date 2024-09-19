import { useEffect,useState,useRef } from "react";
import httpClient from "@/Utils/httpClient";
import Modal from "@/Components/Modal";
import Video from "@/Components/Video";
import Loader from '@/Components/Loader';
import QuestionPopup from '@/Components/QuestionPopup';
import getYoutubeVideoIdFromLink from '@/Utils/Utilities';

export default function VideoForm ({experienceId}){

    const [videos,setVideos] = useState([]);
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
      httpClient.get("panel/experience/get/videos/"+experienceId)
        .then(response => {
            if(response.data.success){
              if(response.data.payload != null)
                  setVideos(response.data.payload);
            }
        })
        .catch(error =>{
            console.log(error);
        });
    }
    const handleVCodeChange = (id, value) => {
        const vCode = getYoutubeVideoIdFromLink(value);
        setVideos((prevVideos) =>
            prevVideos.map((video) =>
                video.id === id ? { ...video, ["vCode"]: vCode } : video
            )
        );
    };
    const deleteVideo = (currentVideo) =>{
      setVideos((prevVideos) =>
          prevVideos.filter((video) => video.id !== currentVideo.id)
      );
      if(currentVideo.id >0){
        httpClient.post("panel/experience/delete/video", {experienceId: experienceId,videoId:currentVideo.id})
          .then(response => {
              alert(response.data.message);
          })
          .catch(error =>{
              const msg = JSON.parse(error?.request?.response).message || error.message;
              alert(msg);
          });

            setImagesToDel(prevIds =>[...prevIds,id]);
        }
    }
    const handleSubmit = (video) => {
        httpClient.post("panel/experience/update/video", {experienceId: experienceId,vCode:video.vCode,videoId:video.id})
        .then(response => {
            alert(response.data.message);
        })
        .catch(error =>{
            const msg = JSON.parse(error?.request?.response).message || error.message;
            alert(msg);
        });
    }

    const addNewVideo = () => {
      const randomNegativeId = -Math.floor(Math.random() * 100); 
      setVideos(prevVideos => [...prevVideos, {
          experienceId: experienceId,
          id: randomNegativeId, 
          vCode: "",
      }]);
    }

    return <>
     {isEditing? 
        <>
          <Modal show={isEditing} closeable={true}>
            <div className="px-9">
              <div className="px-4 py-1 text-center text-xl font-bold">
                Videos de la experiencia 
              </div>
              <div className="flex  flex-row  overflow-x-auto">
              {videos && 
                videos.map((video,index)=>(
                  <div key={index} className="px-9 border rounded-lg">
                     <div className="px-4 py-1 text-center  font-bold">
                       Ingresa la url del video ó el id del video 
                      </div>
                    <input
                      type="text"
                      placeholder="URL del video de YouTube"
                      className="block w-full p-2 border border-gray-300 rounded-md"
                      value={video.vCode}
                      onChange={(e)=>{handleVCodeChange(video.id,e.target.value)}}
                    />

                    {video.vCode != null && <Video isBanner={true} videoId={video.vCode} />}


                  <div className="flex justify-around py-3">
                    <button
                      type="button"
                      className=" bg-green-500 text-white p-2 rounded-md"
                      onClick={()=>{handleSubmit(video)}}
                    >
                      Guardar cambios
                    </button>
                    <button
                      type="button"
                      className=" bg-red-500 text-white p-2 rounded-md"
                      onClick={() => {deleteVideo(video)}}
                    >
                     Eliminar  video
                    </button>
                  </div>
              </div>
              ))}
              {videos && videos.length <2 &&
              <button
                        type="button"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        onClick={addNewVideo}
                        >
                        Añadir un video 
              </button> }
              </div>
            </div>
         <button
            type="button"
            className="w-full bg-rose-500 text-white p-2 rounded-md"
            onClick={() => {updateVideoFromNet();setIsEditing(false)}}
        >
            Cerrar edición 
        </button>   
          </Modal>

          
        </>:<>
        <button
            type="button"
            className="w-full bg-yellow-500 text-white p-2 rounded-md"
            onClick={() => {setIsEditing(true);updateVideoFromNet()}}
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