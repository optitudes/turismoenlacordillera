import React, { useState } from 'react';

export default function Theme() {
  const [selectedTheme, setSelectedTheme] = useState('theme1');
  
  const themes = [
    { id: 'theme1', name: 'Tema 1', image: 'https://img.freepik.com/foto-gratis/pareja-comiendo-plato-salmon-restaurante_23-2150461471.jpg' },
    { id: 'theme2', name: 'Tema 2', image: 'https://img.freepik.com/foto-gratis/pareja-comiendo-plato-salmon-restaurante_23-2150461466.jpg' },
  ];
  
  return (
    <div className="flex flex-col md:flex-row p-4 rounded-lg border border-aquadark h-full w-full">
      <div className="mb-4 md:mb-0 md:mr-4">
        <label htmlFor="theme-select" className="block mb-2">Seleccione un tema:</label>
        <select
          id="theme-select"
          className="block w-full p-2 border border-gray-300 rounded-md"
          value={selectedTheme}
          onChange={(e) => setSelectedTheme(e.target.value)}
        >
          {themes.map(theme => (
            <option key={theme.id} value={theme.id}>{theme.name}</option>
          ))}
        </select>
      </div>
      <div className="flex-1 flex justify-end">
        <div className="border border-gray-300 p-4 rounded-lg shadow-md max-w-sm">
          <h2 className="text-lg font-bold mb-4">Previsualización</h2>
          <img
            src={themes.find(theme => theme.id === selectedTheme).image}
            alt={`Previsualización de ${selectedTheme}`}
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
