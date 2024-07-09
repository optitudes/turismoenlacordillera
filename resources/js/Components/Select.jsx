import React, { useState } from 'react';

export default function Select({ options, onSelect }) {
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    onSelect(value);
  };

  return (
    <select 
      id="select" 
      value={selectedOption} 
      onChange={handleChange} 
      className='border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full'
    >
      <option value="" disabled>Seleccione...</option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  );
}


