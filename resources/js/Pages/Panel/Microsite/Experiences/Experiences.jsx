import {useState,useRef } from "react";
import Image from "@/Components/Image";
import { PencilSimple, Trash } from '@phosphor-icons/react';
import Checkbox from '@/Components/Checkbox';
import Gallery from '@/Pages/Panel/Microsite/Experiences/Components/Gallery';
import VideoForm from '@/Pages/Panel/Microsite/Experiences/Components/VideoForm';
import Itinerary from '@/Pages/Panel/Microsite/Experiences/Components/Itinerary';
import QuestionPopup from '@/Components/QuestionPopup';
import { Link } from '@inertiajs/react';
import Loader from '@/Components/Loader';
import {validateImage} from "@/Validators/validator";
import httpClient from "@/Utils/httpClient";
import {Head } from '@inertiajs/react';
import { router } from '@inertiajs/react';

export default function Experiences({information}) {
    const [experiences,setExperiences] = useState(information.experiences);
    const [theme] = useState(information.theme);
    const [categories] = useState(information.availableCategories);

    //para el manejo de las imagenes
    const [imageId,setImageId] = useState(null);
    const  imageFileInputRef = useRef(null);
    const [imageFiles, setImageFiles] = useState([]);
    //para el manejo de servicios a borrar
    const [experiencesIdToDel,setExperiencesIdToDel] = useState([]);

    //useStates relacionados al popup
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const [onCancelPopup, setOnCancelPopup] = useState(undefined);
    const [onAcceptPopup, setOnAcceptPopup] = useState(undefined);
    const [popupMessage,setPopupMessage] = useState("");
    const [isLoading,setIsLoading] = useState(false);


   
    const handleExperienceChange = (id, field, value) => {
        setExperiences((prevExperiences) =>
            prevExperiences.map((experience) =>
                experience.id === id ? { ...experience, [field]: value } : experience
            )
        );
    };

    const handleDeleteExperience = (id) => {
        setExperiences((prevExperiences) =>
            prevExperiences.filter((experience) => experience.id !== id)
        );
        if(id != -1){
            setExperiencesIdToDel(prevIds =>[...prevIds,id]);
        }
    };
    const addExperience = () => {
        const randomNegativeId = -Math.floor(Math.random() * 100); 
        setExperiences(prevExperiences => [...prevExperiences, {

            categoryId: categories[0].id,
            created_at: null,
            description: '',
            id: randomNegativeId, 
            imageUrl: null,
            isVisible: 1,
            title: ''
        }]);
    }

    const handleEditExperienceImage = (id) => {
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
            
            experiencesIdToDel.forEach((experienceToDel, index) => {
                formData.append(`idsExperiencesToDel[${index}]`, experienceToDel);
            });

            experiences.forEach((experience, index) => {
                formData.append(`experiences[${index}][categoryId]`, experience.categoryId);
                formData.append(`experiences[${index}][description]`, experience.description);
                formData.append(`experiences[${index}][imageUrl]`, experience.imageUrl);
                formData.append(`experiences[${index}][id]`, experience.id);
                formData.append(`experiences[${index}][isVisible]`, experience.isVisible);
                formData.append(`experiences[${index}][micrositeId]`, experience.micrositeId);
                formData.append(`experiences[${index}][title]`, experience.title);
            });
  
            imageFiles.forEach((image, index) => {
                formData.append(`imageFiles[${image.id}][file]`, image.file);
            });

            //se hace la peticio[n
            httpClient.post("panel/microsite/update/experiences", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
            })
            .then(response => {
                setPopupMessage(response.data.message);
                setOnAcceptPopup(() => ()=> {setIsOpenPopup(false);    window.location.reload();});
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

    const changeExperienceImage = (event) => {
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
          handleExperienceChange(imageId, 'imageUrl', URL.createObjectURL(imageFile));
        }
        setImageId(null);
      };
      

    return (<>
           <Head title="Experiencias" />
             <div className="bg-white w-dvw justify-center">
                <h3 className="text-lg font-bold mb-2 text-center">Experiencias del micrositio (máx. {theme.maxServices})</h3>
                <div className="flex flex-wrap space-x-2 space-y-2 justify-start">
                    {experiences.map((experience, index) => (
                    <div key={index} className="relative w-64 border border-gray-300 rounded-md p-4 space-y-4">

                        <label className="flex justify-around items-center" >
                            <span className="text-sm text-zinc-950 px-3">Hacer visible</span >
                            <Checkbox
                                name="remember"
                                checked={experience.isVisible}
                                onChange={(e) => handleExperienceChange(experience.id, 'isVisible', e.target.checked)}
                            />
                        </label>

                        <div className="relative w-full h-40 border border-gray-300 rounded-md overflow-hidden">
                            <Image
                                image={experience.imageUrl??"https://img.freepik.com/vector-premium/ilustracion-plana-album_120816-29716.jpg"}
                                alt={`Vista previa de la imagen ${index + 1}`}
                                className="object-cover w-full h-full"
                            />
                            <div className="absolute inset-0 flex justify-center items-center">
                                <button
                                    type="button"
                                    className="bg-white p-2 rounded-full shadow-md"
                                    onClick={() => handleEditExperienceImage(experience.id)}
                                >
                                    <PencilSimple size={40} className="text-yellow-500" />
                                </button>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-zinc-950 mb-1">Título</label>
                            <input
                                type="text"
                                placeholder="Título"
                                value={experience.title}
                                onChange={(e) => handleExperienceChange(experience.id, 'title', e.target.value)}
                                className="w-full border border-gray-300 rounded-md p-2"
                                    maxLength={50}  // Limita a 50 caracteres
                            />
                        </div>

    
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-zinc-950 mb-1">Descripción</label>
                            <textarea
                                placeholder="Descripción"
                                    maxLength={250}
                                value={experience.description}
                                onChange={(e) => handleExperienceChange(experience.id, 'description', e.target.value)}
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
    
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-zinc-950 mb-1">Categoría</label>
                            <select
                                value={experience.categoryId}
                                onChange={(e) => handleExperienceChange(experience.id, 'categoryId', e.target.value)}
                                className="w-full border border-gray-300 rounded-md p-2"
                            >
                                {categories.map((category)=>(
                                    <option key={category.id} value={category.id} >{category.name}</option>
                                ))}
                            </select>
                        </div>
                        {experience.id >0?  
                            <>
                                <Gallery experienceId={experience.id} />
                                <VideoForm experienceId={experience.id} />
                                <Itinerary experienceId={experience.id} />
                                <div className="text-center border border-solid text-white bg-yellow-500 rounded-lg p-2">
                                    <Link href={route('panel.microsite.experience.editMaps', { experienceId: experience.id })} className='h-16 w-full py-2 text-center'>
                                    Editar mapas 
                                    </Link>
                                </div>
                            </>:
                            <div className="flex w-full justify-center ">
                                <button
                                    type="button"
                                    className=" bg-blue-500 text-white p-3 my-9 rounded-md "
                                    onClick={handleSubmit}
                                >
                                   Guardar cambios y desbloquear más modificaciones 
                                </button>
                            </div>
                            }

                        <button
                            type="button"
                            className="w-full bg-red-500 text-white p-2 rounded-md"
                            onClick={() => handleDeleteExperience(experience.id)}
                        >
                        Eliminar Experiencia 
                        </button>
                    </div>
                    ))}


                    {(experiences.length) < theme.maxServices && (
                        <button
                        type="button"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        onClick={addExperience}
                        >
                        Añadir una experiencia 
                        </button>
                    )}
                      <input
                            type="file"
                            accept="image/*"
                            ref={imageFileInputRef}
                            style={{ display: 'none' }}
                            onChange={changeExperienceImage}
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