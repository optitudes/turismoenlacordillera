import { useEffect, useState,useRef } from 'react';
import {Head } from '@inertiajs/react';
import httpClient from "@/Utils/httpClient";
import { MagnifyingGlass } from '@phosphor-icons/react';
import { Link } from '@inertiajs/react';

export default function Search() {
    const [microsites, setMicrosites] = useState([]);
    const searchInput = useRef("");


    
    
    useEffect(()=>{
      updateMicrosites();
    },[]);

    const updateMicrosites =  (newFilter) => {
      try {
        httpClient.get("microsites/search"+((newFilter != null && newFilter != "TODOS")?"/"+newFilter+"/":"/"))
            .then(response => {setMicrosites(response.data.payload)})
            .catch(error => console.log(error));

        //setMicrosites(response.data.payload);
      } catch (error) {
        console.error(error);
      }
    }
    // Función para convertir string de fecha a objeto Date
    const parseDate = (str) => {
        return new Date(str);
    };

    // Función para convertir string de fecha a objeto Date
    const parseDateString = (str) => {
        return new Date(str).toLocaleDateString();
    };
    // Función para filtrar y ordenar los blogs
    const sortMicrosites = (sortOption) => {
      console.log(microsites);
      /*
      var filteredMicrosites=microsites;
        // Ordenar por fecha
        if (sortOption === 'fecha') {
            filteredMicrosites.sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime());
        }
        setMicrosites(filteredMicrosites);
        */
    };

    return (
        <div className="container-internal-pages">
           <Head title="Micrositios" />
          <div className="mb-8 flex flex-col md:flex-row justify-between w-full border-b border-black-500">

          <div className="mb-8 w-full">
            <label className="block text-gray-700 text-sm font-bold mb-2 text-white" htmlFor="search-input">
              Buscar por una palabra (ejm: natuvida)
            </label>
            <div className="relative flex items-center">
              <input
                className="w-full p-3 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 "
                type="text"
                id="search-input"
                ref={searchInput}
                placeholder="Pon aquí una palabra para buscar"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    updateMicrosites(e.target.value)
                  }
                }}
              />
              <MagnifyingGlass
                size={32}
                className="absolute right-3 text-gray-500 cursor-pointer"
                onClick={()=>{updateMicrosites(searchInput.current.value)}}
              />
            </div>
          </div>
            <div className="flex justify-end items-center md:px-9 w-full md:w-auto md:mr-8">
              <select
                onChange={(e) => sortMicrosites(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Ordenar por</option>
                <option value="fecha">Fecha</option>
              </select>
            </div>
          </div>
          <div className="flex flex-wrap mx-4 md:mx-8">
            
            <div className="w-full md:w-3/4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {microsites && microsites.map((microsite, index) => (
                  <div key={index}
                      className="bg-white rounded-lg shadow-lg p-6 cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:bg-gray-100"
                      onClick={() => console.log('Hola mundo')}
                    >
                    <Link href={route('viewMicrosite',{name:microsite.micrositeName})}>
                      <img className="w-full h-48 sm:h-48 md:h-60 lg:h-72 object-cover rounded-lg mb-4" src={microsite.smallImageUrl} alt={`Blog ${microsite.name}`} />
                      <h3 className="text-xl font-semibold mb-2">{microsite.name}</h3>
                      <p className="text-gray-600 mb-4">Emprended@r: {microsite.entrepreneurName} {microsite.entrepreneurLastNames}</p>
                      <div className="text-gray-500 text-sm mb-2">Creado en : {parseDateString(microsite.date)}</div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
      
}