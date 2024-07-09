import React, { useState, useMemo, useEffect } from 'react';
import MicrositeDetails from "@/Pages/Panel/Admin/Microsites/Solicitudes/Components/MicrositeSolicitudeDetails";
import MicrositeSolicitudeEditForm from "@/Pages/Panel/Admin/Microsites/Solicitudes/Components/MicrositeSolicitudeEditForm";
import  Colors from "@/Constants/Colors";
import { Head } from '@inertiajs/react';
import httpClient from "@/Utils/httpClient";

const ITEMS_PER_PAGE = 3;

const MicrositeSolicitude = () => {
  const [microsites, setMicrosites] = useState([]);
  const [selectedMicrosite, setSelectedMicrosite] = useState(null);
  const [selectedMicrositeToChangeStatus, setSelectedMicrositeToChangeStatus] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState(null);

  const totalPages = useMemo(() => Math.ceil(microsites.length / ITEMS_PER_PAGE), [microsites]);

  const showApplicationMicrosite = async () => {
  try {
    const response = await httpClient.get("microsites/solicitudes/");
    setMicrosites(response.data.payload );
  } catch (error) {
    console.error(error);
  }
 } 
 
 useEffect(() => {
  showApplicationMicrosite();
 },[]);


 const showEditMicrositeSolicitudeModal = (microsite) => {
    setSelectedMicrositeToChangeStatus(microsite);
 }

 const handleStatusChange = async (microsite, status,comment) => {
    // Actualizar el estado local
    const updatedMicrosites = microsites.map((m) =>
      m.id === microsite.id ? { ...m, status } : m
    );
    setMicrosites(updatedMicrosites);
    //TODO sanitizar del lado del fron el commentario
    // Actualizar el estado en el servidor
    try {
    const response = await httpClient.post("microsites/solicitudes/updateStatus", {
      "id": microsite.id,
      "status": status,
      "comment": comment 
    });

    if (!response.data.status!= true) {
      throw new Error("Failed to update status");
    }
    } catch (error) {
    console.error(error);
    }
    setSelectedMicrosite(null);
    handleFilterChange("TODOS");
  }; 

  const handleViewDetails = (microsite) => {
  setSelectedMicrosite(microsite);
  };

  const handleDeleteSolicitude = () => {
    console.log("implementing");
 };

 const handleCloseDetailsModal = () => {
  setSelectedMicrosite(null);
 };
const handleCloseEditModal = () => {
  setSelectedMicrositeToChangeStatus(null);
 };

 const handlePageChange = (page) => {
  setCurrentPage(page);
 };

 const handleFilterChange = async (newFilter) => {
  setFilter(newFilter);
  try {
    const response = await httpClient.get("microsites/solicitudes"+((newFilter != null && newFilter != "TODOS")?"/"+newFilter+"/":"/"));
    setMicrosites(response.data.payload);
  } catch (error) {
    console.error(error);
  }
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

 const paginatedMicrosites = useMemo(() => microsites.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE), [microsites, currentPage]);
 
  return (
    <>
    <Head title="Solicitudes" />
    <div className=" w-full bg-[#f0f0f0]  rounded-md shadow-md">
      <h1 className="  text-3xl font-semibold  text-gray-800">Solicitudes de micrositios</h1>
      {/* Selector de filtro */}
      <div className="mb-4 mx-3">
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
            className="mx-3 bg-white bg-opacity-80 rounded  border-b border-[#08403E]"
          >
            <div className="flex justify-between items-center border-b pb-2 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-2 gap-2">
              <span className="flex font-semibold text-gray-800 mx-3 ">{microsite.micrositeName}</span>
              <div className='flex items-end flex-col px-3' >
                <span className={` flex   text-right text-sm font-semibold ${getStatusColor(microsite.status)}`}>
                  Estado: {microsite.status.charAt(0).toUpperCase() + microsite.status.slice(1)}
                </span>

                <div className='flex justify-around ' >
                  <button
                      onClick={() => showEditMicrositeSolicitudeModal(microsite)}
                      className="flex bg-yellow-500 text-white mx-3 px-3 py-1 rounded hover:bg-yellow-800 transition duration-300"
                    >
                     Editar estado 
                    </button>
                    <button
                      onClick={() => handleDeleteSolicitude(microsite)}
                      className="flex bg-red-500 text-white mx-3 px-3 py-1 rounded hover:bg-red-700 transition duration-300"
                    >
                     Eliminar solicitud 
                    </button>
                 <button
                    onClick={() => handleViewDetails(microsite)}
                    className="flex bg-blue-500 text-white mx-1 px-3 py-1 rounded hover:bg-blue-600 transition duration-300"
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
        <MicrositeDetails 
          selectedMicrosite={selectedMicrosite}
          handleCloseModal={handleCloseDetailsModal}
          getStatusColor={getStatusColor}
        />
      )}

     {selectedMicrositeToChangeStatus && (
      <MicrositeSolicitudeEditForm 
          selectedMicrosite={selectedMicrositeToChangeStatus}
          handleStatusChange={handleStatusChange}
          handleCloseModal={handleCloseEditModal}
          getStatusColor={getStatusColor}
        />
     )}
    </div>

    </>
  );
};
export default MicrositeSolicitude;