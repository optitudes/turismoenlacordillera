import {useState} from 'react';
import RichText from '@/Components/RichText';
import { useMicrositeInfo } from '@/Context/MicrositeInfoContext';
import { Eye, EyeSlash } from '@phosphor-icons/react';
import QuestionPopup from '@/Components/QuestionPopup';
import httpClient from "@/Utils/httpClient";

export default function General() {
  const {micrositeInfo,setMicrositeInfo } = useMicrositeInfo();
  const[description, setDescription] = useState(micrositeInfo?.description || "");
  const [state, setState] = useState('public');

  //popup

  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [onCancelPopup] = useState(undefined);
  const [onAcceptPopup, setOnAcceptPopup] = useState(undefined);
  const [popupMessage,setPopupMessage] = useState("");

   const updateMicrositeDescription = () => {

      console.log('Descripción:', description);
      let oldDescription = micrositeInfo.description;
      var newMicrositeInfo = micrositeInfo;
      newMicrositeInfo.description = description;
      setMicrositeInfo(newMicrositeInfo);

      httpClient.post("panel/microsite/update/description", {
        micrositeId:micrositeInfo.id,
        description:description
        })
        .catch(error =>{
          //revertir cambios visuales y en context
          setDescription(oldDescription);
          newMicrositeInfo.description =  oldDescription;
          setMicrositeInfo(newMicrositeInfo);
          //mostrar el popup con el mensaje de error
          const msg = JSON.parse(error?.request?.response).message || error.message;
          setPopupMessage(msg);
          setOnAcceptPopup(() => ()=> {setIsOpenPopup(false);});
          setIsOpenPopup(true);
        });

    };


  const onStateUpdated = (newState) => {
    var newMicrositeInfo = micrositeInfo;
    let oldIsPublish =  micrositeInfo.isPublish;
    if(newState == "public")
      newMicrositeInfo.isPublish = 1;
    else {
      newMicrositeInfo.isPublish = 0;
    }
    setState(newState);
    setMicrositeInfo(newMicrositeInfo);

    httpClient.post("panel/microsite/update/isPublic", {
        micrositeId:micrositeInfo.id,
        isPublic:(newState=="public"?"true":"false")
        })
        .catch(error =>{
          //revertir cambios visuales y en context
          setState( (oldIsPublish==1?"private":"public") );
          newMicrositeInfo.isPublish =  oldIsPublish;
          setMicrositeInfo(newMicrositeInfo);
          //mostrar el popup con el mensaje de error
          const msg = JSON.parse(error?.request?.response).message || error.message;
          setPopupMessage(msg);
          setOnAcceptPopup(() => ()=> {setIsOpenPopup(false);});
          setIsOpenPopup(true);
        });
  }
  const getIsPublicCard = (isPublic) => {
    console.log(isPublic);
    return isPublic ? (
      <div className="flex items-center space-x-2 text-green-500">
        <Eye size={24} />
        <span>Visible al público</span>
      </div>
    ) : (
      <div className="flex items-center space-x-2 text-red-500">
        <EyeSlash size={24} />
        <span>No visible al público</span>
      </div>
    );
  };


   return (
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4 flex items-center">
        <label className="block text-gray-700 text-sm font-bold mr-4" htmlFor="estado">
          Estado actual:
        </label>
        {getIsPublicCard(micrositeInfo?.isPublish || 0)}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="estado-select">
         Seleccionar un nuevo estado: 
        </label>
        <select
          id="estado-select"
          value={state}
          onChange={(e) => onStateUpdated(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="public">Visible al público</option>
          <option value="private">No visible al público</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descripcion">
          Descripción
        </label>
        <RichText onChange={setDescription} initialText={micrositeInfo?.description} />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={updateMicrositeDescription}
        >
          Actualizar descripción
        </button>
      </div>
      <QuestionPopup
          isOpen = {isOpenPopup}
          question= {popupMessage}
          onAccept={onAcceptPopup}
          onCancel={onCancelPopup}
      />
    </form>
  );
}
