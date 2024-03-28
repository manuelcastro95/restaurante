import { useState } from 'react';
import Select from 'react-select'


const SelectBusqueda = ({ options,optionSeleccionado,obtenerProductoSeleccionado,placeholder }) => {
  

  return (
    <Select
      options={options}
      value={optionSeleccionado}
      onChange={obtenerProductoSeleccionado}
      placeholder={placeholder}
    />
  );
}



export default SelectBusqueda;