import {useState,useRef } from "react";
import Image from "@/Components/Image";
import { PencilSimple, Trash } from '@phosphor-icons/react';
import Checkbox from '@/Components/Checkbox';
import QuestionPopup from '@/Components/QuestionPopup';
import {validateImage} from "@/Validators/validator";
import httpClient from "@/Utils/httpClient";
import {Head } from '@inertiajs/react';

export default function Services({information}) {
    const [services,setServices] = useState(information.services);
    const [theme] = useState(information.theme);
    const [categories] = useState(information.availableCategories);

    //para el manejo de las imagenes
    const [imageId,setImageId] = useState(null);
    const  imageFileInputRef = useRef(null);
    const [imageFiles, setImageFiles] = useState([]);
    //para el manejo de servicios a borrar
    const [servicesIdToDel,setServicesIdToDel] = useState([]);
    //para el manejo del loader y el popup

    //useStates relacionados al popup
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const [onCancelPopup, setOnCancelPopup] = useState(undefined);
    const [onAcceptPopup, setOnAcceptPopup] = useState(undefined);
    const [popupMessage,setPopupMessage] = useState("");
    const [isLoading,setIsLoading] = useState(false);


   
    const handleServiceChange = (id, field, value) => {
        setServices((prevServices) =>
            prevServices.map((service) =>
                service.id === id ? { ...service, [field]: value } : service
            )
        );
    };

    const handleDeleteService = (id) => {
        setServices((prevServices) =>
            prevServices.filter((service) => service.id !== id)
        );
        if(id != -1){
            setServicesIdToDel(prevIds =>[...prevIds,id]);
        }
    };
    const addService = () => {
        const randomNegativeId = -Math.floor(Math.random() * 100); 
        setServices(prevServices => [...prevServices, {

            categoryId: categories[0].id,
            created_at: null,
            description: '',
            id: randomNegativeId, 
            imageUrl: null,
            isVisible: 1,
            title: ''
        }]);
    }

    const handleEditServiceImage = (id) => {
        setImageId(id);
        imageFileInputRef.current.click();

    }
    const handleSubmit = () => {
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
            
            servicesIdToDel.forEach((serviceToDel, index) => {
                formData.append(`idsServicesToDel[${index}]`, serviceToDel);
            });

            services.forEach((service, index) => {
                formData.append(`services[${index}][categoryId]`, service.categoryId);
                formData.append(`services[${index}][description]`, service.description);
                formData.append(`services[${index}][imageUrl]`, service.imageUrl);
                formData.append(`services[${index}][id]`, service.id);
                formData.append(`services[${index}][isVisible]`, service.isVisible);
                formData.append(`services[${index}][micrositeId]`, service.micrositeId);
                formData.append(`services[${index}][title]`, service.title);
            });
  
            imageFiles.forEach((image, index) => {
                formData.append(`imageFiles[${image.id}][file]`, image.file);
            });

            //se hace la peticio[n
            httpClient.post("panel/microsite/update/services", formData, {
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

    const changeServiceImage = (event) => {
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
          handleServiceChange(imageId, 'imageUrl', URL.createObjectURL(imageFile));
        }
        setImageId(null);
      };
      

    return (<>
           <Head title="Servicios" />
             <div className="bg-white w-dvw justify-center">
                <h3 className="text-lg font-bold mb-2 text-center">Servicios del micrositio (máx. {theme.maxServices}). La cantidad de servicios depende del tema del micrositio (editalo en el panel de ajustes de micrositio)</h3>
                <div className="flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0 overflow-x-auto justify-center">
                    {services.map((service, index) => (
                    <div key={index} className="relative w-64 border border-gray-300 rounded-md p-4 space-y-4">

                        <label className="flex justify-around items-center" >
                            <span className="text-sm text-zinc-950 px-3">Hacer visible</span >
                            <Checkbox
                                name="remember"
                                checked={service.isVisible}
                                onChange={(e) => handleServiceChange(service.id, 'isVisible', e.target.checked)}
                            />
                        </label>

                        <div className="relative w-full h-40 border border-gray-300 rounded-md overflow-hidden">
                            <Image
                                image={service.imageUrl??"https://img.freepik.com/vector-premium/ilustracion-plana-album_120816-29716.jpg"}
                                alt={`Vista previa de la imagen ${index + 1}`}
                                className="object-cover w-full h-full"
                            />
                            <div className="absolute inset-0 flex justify-center items-center">
                                <button
                                    type="button"
                                    className="bg-white p-2 rounded-full shadow-md"
                                    onClick={() => handleEditServiceImage(service.id)}
                                >
                                    <PencilSimple size={40} className="text-yellow-500" />
                                </button>
                            </div>
                        </div>

                        <input
                            type="text"
                            placeholder="Título"
                            value={service.title}
                            onChange={(e) => handleServiceChange(service.id, 'title', e.target.value)}
                            className="w-full border border-gray-300 rounded-md p-2"
                        />
    
                        <textarea
                            placeholder="Descripción"
                            value={service.description}
                            onChange={(e) => handleServiceChange(service.id, 'description', e.target.value)}
                            className="w-full border border-gray-300 rounded-md p-2"
                        />
    
                        <select
                            value={service.categoryId}
                            onChange={(e) => handleServiceChange(service.id, 'categoryId', e.target.value)}
                            className="w-full border border-gray-300 rounded-md p-2"
                        >
                            {categories.map((category)=>(
                                <option key={category.id} value={category.id} >{category.name}</option>
                            ))}
                        </select>

                        <button
                            type="button"
                            className="w-full bg-red-500 text-white p-2 rounded-md"
                            onClick={() => handleDeleteService(service.id)}
                        >
                        Eliminar Servicio
                        </button>
                    </div>
                    ))}


                    {(services.length) < theme.maxServices && (
                        <button
                        type="button"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        onClick={addService}
                        >
                        Añadir un servicio 
                        </button>
                    )}
                      <input
                            type="file"
                            accept="image/*"
                            ref={imageFileInputRef}
                            style={{ display: 'none' }}
                            onChange={changeServiceImage}
                        />
         
                </div>
                <div className="flex w-full justify-center ">
                    <button
                        type="button"
                        className=" bg-green-500 text-white p-3 my-9 rounded-md "
                        onClick={handleSubmit}
                    >
                        Guardar Todos los Cambios
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
            </>);
}