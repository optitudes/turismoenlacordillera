import React, { useState,useEffect } from 'react';
import { PencilSimple } from '@phosphor-icons/react';
import { useUserInfo } from '@/Pages/Panel/Context/UserInfoContext';
import httpClient from "@/Utils/httpClient";
import {validateImage} from "@/Validators/validator";
import QuestionPopup from '@/Components/QuestionPopup';
import Loader from '@/Components/Loader';


export default function UpdateProfileImageForm({ mustVerifyEmail, status, className = '' }) {

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageObject, setSelectedImageObject] = useState(null);
  const { userInfo,fetchUserInfo } = useUserInfo();
  const newImage = React.useRef(null);
  const [isLoading,setIsLoading] = useState(false);

  //popup states

  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [onCancelPopup, setOnCancelPopup] = useState(undefined);
  const [onAcceptPopup, setOnAcceptPopup] = useState(undefined);
  const [popupMessage,setPopupMessage] = useState("");

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(URL.createObjectURL(event.target.files[0]));
      setSelectedImageObject(event.target.files[0]);

    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let validation = validateImage(selectedImageObject);
    if(validation.success){
        setIsLoading(true);

         // Crear un objeto FormData
        const formData = new FormData();
        formData.append('image', selectedImageObject);
        formData.append('userId', userInfo.id);
        //se hace la peticio[n
        httpClient.post("panel/profile/update/profileImage", formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then(response => {
            setPopupMessage(response.data.message);
            setOnAcceptPopup(() => ()=> {setIsOpenPopup(false);});
            setIsOpenPopup(true);
            fetchUserInfo();
          })
          .catch(error =>{
            const msg = JSON.parse(error?.request?.response).message || error.message;
            setPopupMessage(msg);
            setOnAcceptPopup(() => ()=> {setIsOpenPopup(false);});
            setIsOpenPopup(true);
          }).finally(() => {setIsLoading(false)});

    }else{
      setPopupMessage(validation.msg);
      setOnAcceptPopup(() => ()=> {setIsOpenPopup(false);});
      setIsOpenPopup(true);

    }

  };
    useEffect(() => {
      setSelectedImage(userInfo?.profile?.pictureUrl || null);
    }, []);

  const handleIconClick = () => {
    newImage.current.click();
  };

  return (
    <div className={`bg-white shadow-md rounded-lg p-6 max-w-md w-full ${className}`}>
      <h2 className="text-2xl font-bold mb-4 text-center">Actualizar imagen de perfil</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center mb-4 relative">
          <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden mb-4 relative">
            {selectedImage ? (
              <img src={selectedImage} alt="Selected" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                Sin imagen
              </div>
            )}
            <div
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer"
              onClick={handleIconClick}
            >
              <PencilSimple size={32} className="text-white" />
            </div>
          </div>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange} 
            ref={newImage}
            className="hidden"
          />
        </div>
        <div className="text-center">
          <button 
            type="submit" 
            className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300"
          >
            Actualizar Imagen
          </button>
        </div>
      </form>
      <QuestionPopup
          isOpen = {isOpenPopup}
          question= {popupMessage}
          onAccept={onAcceptPopup}
          onCancel={onCancelPopup}
      />
      {isLoading?<Loader/>:<></>}
    </div>

  );
}
