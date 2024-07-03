import React, { useState, useMemo, useEffect } from 'react';
import CustomSidebar from '@/Pages/Panel/Partials/CustomSidebar';
import httpClient from "@/Utils/httpClient";

const ITEMS_PER_PAGE = 3;

const MicrositeSolicitude = () => {
  const [microsites, setMicrosites] = useState([]);
  const [selectedMicrosite, setSelectedMicrosite] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState(null);

  const totalPages = useMemo(() => Math.ceil(microsites.length / ITEMS_PER_PAGE), [microsites]);

  const showApplicationMicrosite = async () => {
  try {
    const response = await httpClient.get("microsites/solicitudes/");
    const newMicrosites = response.data.payload;
    setMicrosites(prevMicrosites => {
      // Verifica si el id ya existe en la lista
      const hasId = prevMicrosites.some(microsite => newMicrosites.some(newMicrosite => newMicrosite.id === microsite.id));
      if (hasId) {
        // Si el id ya existe, no agrega el nuevo micrositio
        return prevMicrosites;
      } else {
        // Si el id no existe, agrega el nuevo micrositio
        return [...prevMicrosites, ...newMicrosites];
      }
    });
  } catch (error) {
    console.error(error);
  }
 } 
 
 useEffect(() => {
  showApplicationMicrosite();
 },[]);

 const handleStatusChange = async (microsite, status) => {
  const updatedMicrosites = microsites.map((m) =>
      m.id === microsite.id ? { ...m, status } : m
    );
    console.log(status);
    // Actualizar el estado local
    setMicrosites(updatedMicrosites);
    // Actualizar el estado en el servidor
    try {
    const response = await httpClient.post("microsite/admin/updateSolicitudeStatus", {
      "id": microsite.id,
      "status": status,
      "comment": "Se han cumplido casi todos los requisitos"
    });
    if (!response.ok) {
      throw new Error("Failed to update status");
    }
    } catch (error) {
    console.error(error);
    }
    setSelectedMicrosite(null);
  }; 

  const handleViewDetails = (microsite) => {
  setSelectedMicrosite(microsite);
  };

 const handleCloseModal = () => {
  setSelectedMicrosite(null);
 };

 const handlePageChange = (page) => {
  setCurrentPage(page);
 };

 const handleFilterChange = (newFilter) => {
  setFilter(newFilter);
  setCurrentPage(1); // Resetear la página actual al cambiar el filtro
 };

 const getStatusColor = (status) => {
  switch (status) {
    case 'PENDIENTE':
      return 'text-yellow-500';
    case 'RECHAZADO':
      return 'text-red-500';
    case 'APROBADO':
      return 'text-green-500';
      case 'EN_PROCESO':
        return 'text-blue-500';
    default:
      return '';
  }
 };

 const filteredMicrosites = useMemo(() => filter === 'TODOS' || filter === null ? microsites : microsites.filter((m) => m.status === filter), [microsites, filter]);
 const paginatedMicrosites = useMemo(() => filteredMicrosites.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE), [filteredMicrosites, currentPage]);
 
  return (
    <>
<CustomSidebar />
    <div className="w-full bg-[#f0f0f0] pt-8 pr-16 pl-16 pb-8 mt-4 mr-16 ml-16 mb-4 rounded-md shadow-md">
      <h1 className="text-3xl font-semibold mb-4 text-gray-800">Micrositios</h1>
      {/* Selector de filtro */}
      <div className="mb-4">
        <label htmlFor="filter" className="mr-2 font-semibold text-gray-800">
          Filtrar por Estado:
        </label>
        <select
          id="filter"
          value={filter}
          onChange={(e) =>
            handleFilterChange(e.target.value)
          }
          className="p-2 border rounded-md"
        >
          <option value="TODOS">Todos</option>
          <option value="PENDIENTE">Pendiente</option>
          <option value="RECHAZADO">Rechazado</option>
          <option value="APROBADO">Aprobado</option>
          <option value="EN_PROCESO">En proceso</option>
        </select>
      </div>

      {/* Lista de micrositios paginados */}
      <ul>
        {paginatedMicrosites.map((microsite) => (
          <li
            key={microsite.id}
            className="mb-4 p-4 bg-white bg-opacity-80 rounded transition transform hover:scale-105 border-b border-[#08403E]"
          >
            <div className="flex justify-between items-center border-b pb-2">
              <span className="font-semibold text-gray-800">{microsite.micrositeName}</span>
              <div className="flex space-x-2 items-center">
                <span className={`text-sm font-semibold ${getStatusColor(microsite.status)}`}>
                  Estado: {microsite.status.charAt(0).toUpperCase() + microsite.status.slice(1)}
                </span>
                <div className="flex space-x-2">
                  {(microsite.status === 'PENDIENTE' || microsite.status === 'RECHAZADO' || microsite.status === 'EN_PROCESO') && (
                    <>
                      <button
                        onClick={() => handleStatusChange(microsite, 'APROBADO')}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition duration-300"
                      >
                        Aprobar
                      </button>
                    </>
                  )}
                  {(microsite.status === 'PENDIENTE' || microsite.status === 'EN_PROCESO' || microsite.status === 'APROBADO') && (
                    <button
                      onClick={() => handleStatusChange(microsite, 'RECHAZADO')}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300"
                    >
                      Rechazar
                    </button>
                  )}
                  {(microsite.status === 'PENDIENTE' || microsite.status === 'RECHAZADO' || microsite.status === 'APROBADO') && (
                    <button
                      onClick={() => handleStatusChange(microsite, 'EN_PROCESO')}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300"
                    >
                      En proceso
                    </button>
                  )}
                  <button
                    onClick={() => handleViewDetails(microsite)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-300"
                  >
                    Ver más
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              Creado por {microsite.userName} {microsite.userLastNames} para la empresa {microsite.ventureName}
            </div>
          </li>
        ))}
      </ul>


      {/* Paginación */}
      <div className="flex justify-between items-center mt-4">
        <div>
          Página {currentPage} de {totalPages}
        </div>
        <div className="flex space-x-2">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`bg-gray-300 px-3 py-1 rounded ${
                page === currentPage ? 'bg-gray-500' : ''
              } hover:bg-gray-400 transition duration-300`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>

      {/* Detalles del micrositio seleccionado */}
      {selectedMicrosite && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-md max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              {selectedMicrosite.comment} Detalles
            </h2>
            <p className={`text-gray-800 mb-2 ${getStatusColor(selectedMicrosite.status)}`}>
              Estado Actual: {selectedMicrosite.status}
            </p>
            <p>Nombre del Usuario: {selectedMicrosite.userName} {selectedMicrosite.userLastName}</p>
            <div className="flex space-x-2 mt-4">
              {(selectedMicrosite.status === 'PENDIENTE' || selectedMicrosite.status === 'RECHAZADO' || selectedMicrosite.status === 'EN_PROCESO') && (
                <>
                  <button
                    onClick={() => handleStatusChange(selectedMicrosite, 'APROBADO')}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition duration-300"
                  >
                    Aprobar
                  </button>
                </>
              )}
              {(selectedMicrosite.status === 'PENDIENTE' || selectedMicrosite.status === 'EN_PROCESO' || selectedMicrosite.status === 'APROBADO') && (
                <button
                  onClick={() => handleStatusChange(selectedMicrosite, 'RECHAZADO')}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300"
                >
                  Rechazar
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
      )}
    </div>

    </>
  );
};
export default MicrositeSolicitude;