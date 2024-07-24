import {useState} from 'react';
import RichText from '@/Components/RichText';
import { useMicrositeInfo } from '@/Context/MicrositeInfoContext';
import { Eye, EyeSlash } from '@phosphor-icons/react';


export default function General() {
  const {micrositeInfo,setMicrositeInfo } = useMicrositeInfo();
  const[description, setDescription] = useState(micrositeInfo?.description || "");
  const [state, setState] = useState('Publico');

   const updateMicrositeDescription = () => {
      console.log('Descripción:', description);
      var newMicrositeInfo = micrositeInfo;
      newMicrositeInfo.description = description;
      setMicrositeInfo(newMicrositeInfo);
    };
  const onStateUpdated = (newState) => {
    var newMicrositeInfo = micrositeInfo;
    if(newState == "public")
      newMicrositeInfo.isPublish = 1;
    else {
      newMicrositeInfo.isPublish = 0;
    }
    setState(newState);
    setMicrositeInfo(newMicrositeInfo);

  }
  const getIsPublicCard = (isPublic) => {
    console.log(isPublic);
    return isPublic ? (
      <div className="flex items-center space-x-2 text-green-500">
        <Eye size={24} />
        <span>Es Público</span>
      </div>
    ) : (
      <div className="flex items-center space-x-2 text-red-500">
        <EyeSlash size={24} />
        <span>No es Público</span>
      </div>
    );
  };


   return (
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4 flex items-center">
        <label className="block text-gray-700 text-sm font-bold mr-4" htmlFor="estado">
          Estado actual:
        </label>
        {getIsPublicCard(micrositeInfo?.isPublish || 0)}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="estado-select">
         Seleccionar un nuevo estado: 
        </label>
        <select
          id="estado-select"
          value={state}
          onChange={(e) => onStateUpdated(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="public">Público</option>
          <option value="private">No Público</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descripcion">
          Descripción
        </label>
        <RichText onChange={setDescription} initialText={micrositeInfo?.description} />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={updateMicrositeDescription}
        >
          Actualizar descripción
        </button>
      </div>
    </form>
  );
}
