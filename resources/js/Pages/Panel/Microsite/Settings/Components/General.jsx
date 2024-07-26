import {useState,useRef,useEffect} from 'react';
import RichText from '@/Components/RichText';
import { PencilSimple } from '@phosphor-icons/react';
import { useMicrositeInfo } from '@/Context/MicrositeInfoContext';
import { Eye, EyeSlash } from '@phosphor-icons/react';
import {validateImage} from "@/Validators/validator";
import QuestionPopup from '@/Components/QuestionPopup';
import httpClient from "@/Utils/httpClient";

export default function General() {
  const {micrositeInfo,setMicrositeInfo } = useMicrositeInfo();
  const[description, setDescription] = useState(micrositeInfo?.description || "");
  const [state, setState] = useState('public');

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedBannerImage, setSelectedBannerImage] = useState(null);
  const newImage = useRef(null);
  const newBannerImage = useRef(null);


  //popup

  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [onCancelPopup] = useState(undefined);
  const [onAcceptPopup, setOnAcceptPopup] = useState(undefined);
  const [popupMessage,setPopupMessage] = useState("");

  //funciones

  useEffect(() => {
        setSelectedImage(micrositeInfo?.smallImageUrl || null);
        setSelectedBannerImage(micrositeInfo?.bannerImageUrl || null);
        console.log(micrositeInfo);
  }, []);

  const updateSmallImage = (event) => {
    if (event.target.files && event.target.files[0]  ) {
       let validation = validateImage(event.target.files[0]);
       if(validation.success){
          // Crear un objeto FormData
        const formData = new FormData();
        formData.append('image', event.target.files[0]);
        formData.append('micrositeId', micrositeInfo?.id || -1);
        //se hace la peticio[n
        httpClient.post("panel/microsite/update/smallImage", formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then(response => {
            if(response.data.success){
              setSelectedImage(URL.createObjectURL(event.target.files[0]));
            }else{
              setPopupMessage(response.data.message);
              setOnAcceptPopup(() => ()=> {setIsOpenPopup(false);});
              setIsOpenPopup(true);
              }
          })
          .catch(error =>{
            const msg = JSON.parse(error?.request?.response).message || error.message;
            setPopupMessage(msg);
            setOnAcceptPopup(() => ()=> {setIsOpenPopup(false);});
            setIsOpenPopup(true);
          });
      }else{
        setPopupMessage(validation.msg);
        setOnAcceptPopup(() => ()=> {setIsOpenPopup(false);});
        setIsOpenPopup(true);
      }
    }
  };

  const updateBannerImage = (event) => {
    if (event.target.files && event.target.files[0]  ) {
       let validation = validateImage(event.target.files[0]);
       if(validation.success){
          // Crear un objeto FormData
        const formData = new FormData();
        formData.append('image', event.target.files[0]);
        formData.append('micrositeId', micrositeInfo?.id || -1);
        //se hace la peticio[n
        httpClient.post("panel/microsite/update/bannerImage", formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then(response => {
            if(response.data.success){
              setSelectedBannerImage(URL.createObjectURL(event.target.files[0]));
            }else{
              setPopupMessage(response.data.message);
              setOnAcceptPopup(() => ()=> {setIsOpenPopup(false);});
              setIsOpenPopup(true);
              }
          })
          .catch(error =>{
            const msg = JSON.parse(error?.request?.response).message || error.message;
            setPopupMessage(msg);
            setOnAcceptPopup(() => ()=> {setIsOpenPopup(false);});
            setIsOpenPopup(true);
          });
      }else{
        setPopupMessage(validation.msg);
        setOnAcceptPopup(() => ()=> {setIsOpenPopup(false);});
        setIsOpenPopup(true);
      }
    }

  }

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
      <div className='flex flex-col md:flex-row justify-around'>
        <div className="flex flex-col items-start ">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="estado-select">
            Imagen pequeña (960 × 644 ) : 
            </label>
            <div className="w-32 h-32 bg-gray-200 rounded-lg overflow-hidden mb-4 relative">
              {selectedImage ? (
                <img src={selectedImage} alt="Selected" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  Sin imagen
                </div>
              )}
              <div
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer"
                onClick={() => {newImage.current.click();}}
              >
                <PencilSimple size={32} className="text-white" />
              </div>
            </div>
            <input 
              type="file" 
              accept="image/*" 
              onChange={updateSmallImage} 
              ref={newImage}
              className="hidden"
            />
          </div>

          <div className="flex flex-col items-start ">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="estado-select">
              Imagen banner (1280 × 853 ) : 
            </label>

            <div className="w-52 h-32 bg-gray-200 rounded-lg overflow-hidden mb-4 relative">
              {selectedBannerImage ? (
                <img src={selectedBannerImage} alt="Selected" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  Sin imagen
                </div>
              )}
              <div
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer"
                onClick={() => {newBannerImage.current.click();}}
              >
                <PencilSimple size={32} className="text-white" />
              </div>
            </div>
            <input 
              type="file" 
              accept="image/*" 
              onChange={updateBannerImage} 
              ref={newBannerImage}
              className="hidden"
            />
          </div>
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
