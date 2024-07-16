import { useRef } from 'react';


export default function MicrositeSolicitudeEditForm({selectedMicrosite, handleStatusChange, handleCloseModal, getStatusColor}) {
    const commentRef = useRef(null);

    return (
    <div className=" z-50 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-md shadow-md max-w-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Editar una solicitud de micrositio 
          </h2>
          <p className={`text-gray-800 mb-2 ${getStatusColor(selectedMicrosite.status)}`}>
            Estado Actual: {selectedMicrosite.status}
          </p>
          <p>Nombre del Usuario: {selectedMicrosite.userName} {selectedMicrosite.userLastName}</p>


          <div className="mb-4 py-3">
            <p className="font-medium mb-2">Comentario justificando el cambio de estado:</p>
            <textarea 
                ref={commentRef}
                className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Ingresa tu comentario aquí..."
                maxLength="600"
                 ></textarea>
           </div>

          <div className="flex space-x-2 mt-4">


            {(selectedMicrosite.status != 'APROBADO') && (
              <>
                <button
                  onClick={() => handleStatusChange(selectedMicrosite, 'APROBADO',commentRef.current.value)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition duration-300"
                >
                  Aprobar
                </button>
              </>
            )}
            {(selectedMicrosite.status != 'RECHAZADO') && (
              <button
                onClick={() => handleStatusChange(selectedMicrosite, 'RECHAZADO',commentRef.current.value)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300"
              >
                Rechazar
              </button>
            )}
            {(selectedMicrosite.status != 'EN_PROCESO') && (
                <button
                    onClick={() => handleStatusChange(selectedMicrosite, 'EN_PROCESO',commentRef.current.value)}
                    className="flex bg-blue-500 text-white mx-1 px-3 py-1 rounded hover:bg-blue-700 transition duration-300"
                >
                    En proceso
                </button>
            )}
            <button
              onClick={handleCloseModal}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-300"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
        
    );
}
