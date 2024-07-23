import {useState} from 'react';
import RichText from '@/Components/RichText';


export default function General() {
  const[description, setDescription] = useState('');
  const [state, setState] = useState('Publico');

   const updateMicrositeBasicInfo = () => {
    console.log('Estado:', state);
    console.log('Descripción:', description);
    // Aquí puedes agregar la lógica para guardar los datos
  };


   return (
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="estado">
        Estado
      </label>
      <select
        id="estado"
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      >
        <option value="Publico">Publico</option>
        <option value="No Publico">No Publico</option>
      </select>
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descripcion">
        Descripción
      </label>
      <RichText onChange={setDescription} />
    </div>
    <div className="flex items-center justify-between">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        onClick={updateMicrositeBasicInfo}
      >
       Actualizar descripción 
      </button>
    </div>
  </form>
  );
}
