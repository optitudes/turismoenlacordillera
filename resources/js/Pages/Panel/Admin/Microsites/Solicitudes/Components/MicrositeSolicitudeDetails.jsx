import React from 'react';

const MicrositeDetails = ({ selectedMicrosite, handleCloseModal, getStatusColor }) => {

  return (
      <div className="z-50 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-md shadow-md max-w-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            {selectedMicrosite.comment} Detalles
          </h2>
          <p className={`text-gray-800 mb-2 ${getStatusColor(selectedMicrosite.status)}`}>
            Estado Actual: {selectedMicrosite.status}
          </p>
          <p>Nombre del Usuario: {selectedMicrosite.userName} {selectedMicrosite.userLastName}</p>
          <div className="flex space-x-2 mt-4">
            <button
              onClick={handleCloseModal}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-300"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    )
};

export default MicrositeDetails;
