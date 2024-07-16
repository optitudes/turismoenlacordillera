import React, { useState } from 'react';
import { PencilSimple } from '@phosphor-icons/react';

export default function UpdateProfileImageForm({ mustVerifyEmail, status, className = '' }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = React.useRef(null);

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes manejar la lógica para subir la imagen
  };

  const handleIconClick = () => {
    fileInputRef.current.click();
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
            ref={fileInputRef}
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
    </div>
  );
}
