import React, { useState, useEffect, useRef } from 'react';
import Image from "@/Components/Image";
import { PencilSimple, Trash } from '@phosphor-icons/react';
import { useMicrositeInfo } from '@/Context/MicrositeInfoContext';
import httpClient from "@/Utils/httpClient";

export default function Theme() {
  const {micrositeInfo,setMicrositeInfo } = useMicrositeInfo();
  const [themes,setThemes] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState(1);
  const [imageFiles, setImageFiles] = useState([]);
  const [youtubeLink, setYoutubeLink] = useState('');
  const [maxImages, setMaxImages] = useState(5);
  const [editIndex, setEditIndex] = useState(null);
  const fileInputRef = useRef(null);
  const hiddenFileInputRef = useRef(null);


  useEffect(() => {
      // With this id, we get the cities list
    httpClient.get('microsites/themes')
        .then(response => {setThemes(response.data.payload);console.log(themes);console.log(response.data.payload)})
        .catch(error => console.log(error));

    if (selectedTheme === 'theme1') {
      setMaxImages(5);
    } else if (selectedTheme === 'theme2') {
      setMaxImages(8);
    }
    setImageFiles([]); // Reset the image files when changing themes
    console.log(micrositeInfo);

  }, [selectedTheme]);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    if (editIndex !== null) {
      // Update the existing image
      setImageFiles(prevFiles => prevFiles.map((file, index) => index === editIndex ? files[0] : file));
      setEditIndex(null);
    } else {
      // Add new images
      setImageFiles(prevFiles => [...prevFiles, ...files]);
    }
  };

  const handleAddImageField = () => {
    if (imageFiles.length < maxImages) {
      fileInputRef.current.click();
    }
  };

  const handleEditImage = (index) => {
    setEditIndex(index);
    hiddenFileInputRef.current.click();
  };

  const handleDeleteImage = (index) => {
    setImageFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };
  const handleSaveChanges = () => {


  };

  return (
    <div className="flex flex-col p-4 rounded-lg border border-gray-300 h-full w-full">
      <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex-1">
          <label htmlFor="theme-select" className="block mb-2 text-lg font-semibold">Seleccione un tema:</label>
          <select
            id="theme-select"
            className="block w-full p-2 border border-gray-300 rounded-md"
            value={selectedTheme}
            onChange={(e) => setSelectedTheme(e.target.value)}
          >
            {themes && themes.map(theme => (
              <option key={theme.id} value={theme.id}>{theme.name}</option>
            ))}
          </select>
        </div>
        <div className="flex-1  border border-gray-300 rounded-lg p-4">
          <h2 className="text-lg font-bold mb-4 text-center">Previsualización</h2>
          <Image
            image={themes != null? themes.find(theme => theme.id == selectedTheme).demoImageUrl : null}
            className=" h-96  w-auto max-w-xs mx-auto rounded-lg hover:scale-150 hover:shadow-2xl hover:bg-gray-100 cursor-pointer"
          />
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-bold mb-2">Imágenes del micrositio (máx. {maxImages})</h3>
        <div className="flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0 overflow-x-auto">
          {imageFiles.map((file, index) => (
            <div key={index} className="relative w-24 h-24 border border-gray-300 rounded-md overflow-hidden">
              <Image
                image={URL.createObjectURL(file)}
                alt={`Vista previa de la imagen ${index + 1}`}
                className="object-cover w-full h-full"
              />
              <div className="absolute top-1 right-1 flex space-x-1">
                <button
                  type="button"
                  className="bg-white p-2 rounded-full shadow-md"
                  onClick={() => handleEditImage(index)}
                >
                  <PencilSimple size={24} className="text-blue-500" />
                </button>
                <button
                  type="button"
                  className="bg-white p-2 rounded-full shadow-md"
                  onClick={() => handleDeleteImage(index)}
                >
                  <Trash size={24} className="text-red-500" />
                </button>
              </div>
            </div>
          ))}
          {imageFiles.length < maxImages && (
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={handleAddImageField}
            >
              Añadir otra imagen
            </button>
          )}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
          <input
            type="file"
            accept="image/*"
            ref={hiddenFileInputRef}
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
         
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-bold mb-2">Enlace de YouTube</h3>
        <input
          type="text"
          placeholder="URL del video de YouTube"
          className="block w-full p-2 border border-gray-300 rounded-md"
          value={youtubeLink}
          onChange={(e) => setYoutubeLink(e.target.value)}
        />
      </div>
         <button
            type="button"
            className="bg-green-500 text-white px-4 py-2 rounded-md mt-4"
            onClick={handleSaveChanges}
          >
            Guardar todos los cambios 
          </button>
        </div>
  );
}
