import { useEffect,useState,useRef } from "react";
import httpClient from "@/Utils/httpClient";
import {validateImage} from "@/Validators/validator";
import Modal from "@/Components/Modal";
import { PencilSimple, Trash } from '@phosphor-icons/react';
import Loader from '@/Components/Loader';
import QuestionPopup from '@/Components/QuestionPopup';

export default function Itinerary ({experienceId}){
    const [images,setImages] = useState([]);
    const [imagesToDel,setImagesToDel] = useState([]);
    const [isEditing,setIsEditing] = useState(false);

    //para el manejo de las imagenes
    const [imageId,setImageId] = useState(null);
    const  imageFileInputRef = useRef(null);
    const [imageFiles, setImageFiles] = useState([]);


    //useStates relacionados al popup
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const [onCancelPopup, setOnCancelPopup] = useState(undefined);
    const [onAcceptPopup, setOnAcceptPopup] = useState(undefined);
    const [popupMessage,setPopupMessage] = useState("");
    const [isLoading,setIsLoading] = useState(false);


    useEffect(()=>{
      updateImagesFromNet();
    },[]);
    const updateImagesFromNet = ()  => {
      httpClient.get("panel/microsite/experienceImagesByExperienceId/"+experienceId)
        .then(response => {
            if(response.data.success){
                setImages(response.data.payload);
            }
        })
        .catch(error =>{
            console.log(error);
        });
    }

    const handleImageAttributeChange = (id, field, value) => {
      setImages((prevImages) =>
          prevImages.map((image) =>
              image.id === id ? { ...image, [field]: value } : image
          )
      );
    };

    const addImage = () => {
      const randomNegativeId = -Math.floor(Math.random() * 100); 
      setImages(prevImages => [...prevImages, {
          experienceId: experienceId,
          id: randomNegativeId, 
          url: null,
      }]);

    }
    const handleEditImage = (id) => {
        setImageId(id);
        imageFileInputRef.current.click();
    }
     const changeImage = (event) => {
        const imageFile = (Array.from(event.target.files))[0];
        if (imageFile) {
          if (imageId !== null && imageFiles.length !==0) {
            setImageFiles((prevImageFiles) => {
              const existingImageIndex = prevImageFiles.findIndex((image) => image.id === imageId);
              if (existingImageIndex !== -1) {
                // Si el id existe, actualizar el archivo
                const updatedImageFiles = prevImageFiles.map((image, index) =>
                  index === existingImageIndex ? { ...image, file: imageFile } : image
                );
                return updatedImageFiles;
              } else {
                // Si el id no existe, agregar un nuevo objeto
                const newImageFiles = [...prevImageFiles, { id: imageId, file: imageFile }];
                return newImageFiles;
              }
            });
          } else {
            setImageFiles((prevImageFiles) => {
              const newFiles = [...prevImageFiles, { id: imageId, file: imageFile }];
              return newFiles;
            });
          }
          handleImageAttributeChange(imageId, 'url', URL.createObjectURL(imageFile));
        }
        setImageId(null);
      };
      
    const handleDeleteImage = (id) => {
      setImages((prevImages) =>
          prevImages.filter((image) => image.id !== id)
      );
      if(id != -1){
          setImagesToDel(prevIds =>[...prevIds,id]);
      }
  };


    const submit = () => {
      let isValidImages = !imageFiles.some((image) => {
        return validateImage(image.file).success === false;
      });
      if(!isValidImages){
          setPopupMessage("Revisa que las imagenes de los servicios sean .jpg .png y su tamaño no exceda las 10MB");
          setOnAcceptPopup(() => ()=> {setIsOpenPopup(false);});
          setIsOpenPopup(true);
      }else{


         // Crear un objeto FormData
        const formData = new FormData();
        
        imagesToDel.forEach((imageToDel, index) => {
            formData.append(`idsImagesToDel[${index}]`, imageToDel);
        });

        images.forEach((image, index) => {
            formData.append(`images[${index}][experienceId]`, image.experienceId);
            formData.append(`images[${index}][id]`, image.id);
            formData.append(`images[${index}][url]`, image.url);
        });

        imageFiles.forEach((image, index) => {
            formData.append(`imageFiles[${image.id}][file]`, image.file);
        });

        //se hace la peticio[n
        httpClient.post("panel/experience/update/images/"+experienceId, formData, {
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
                Imágenes de la experiencia
              </div>
              <div className="w-full h-auto">
                <div className="flex flex-wrap justify-center gap-4 p-4 md:p-9">
                  {images.map((image, index) => (
                    <div key={index} className="w-44 h-44  m-9  ">
                      <img
                        src={image.url ?? "https://img.freepik.com/vector-premium/ilustracion-plana-album_120816-29716.jpg"}
                        alt={`Vista previa de la imagen ${index + 1}`}
                        className="object-cover w-full h-full rounded-md"
                      />
                    <div className="flex justify-around border-x-2 border-b-2 py-3">
                      <button onClick={() => handleEditImage(image.id)}>
                        <PencilSimple size={32} className="text-blue-500 hover:text-blue-700" />
                      </button>
                      <button onClick={() => handleDeleteImage(image.id)}>
                        <Trash size={32} className="text-red-500 hover:text-red-700" />
                      </button>
                    </div>
                    </div>
                  ))}
                </div>
                
              </div>

              { images.length <5 &&
                <div className="flex w-full justify-center">
                  <button
                    type="button"
                    className=" bg-blue-500 text-white p-2 rounded-md text-center "
                    onClick={addImage}
                  >
                  Agregar imagen 
                  </button>
                </div>
              }
              <div className="flex justify-around py-3">
                <button
                  type="button"
                  className=" bg-green-500 text-white p-2 rounded-md"
                  onClick={submit}
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
            onClick={() => {updateImagesFromNet();setIsEditing(true)}}
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