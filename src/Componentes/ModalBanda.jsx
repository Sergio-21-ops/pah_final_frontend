import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import {discosValidacion} from "../../../backend/validacion/validacion.js"

import FormInput from './FormInput'

 
import './Modal.scss';

const ModalBanda = ({ banda, onClose, onBandaGuardada }) => {
       const [values, setValues] = useState({
              nombre:'',
              ano_fundacion:'',
              biografia:'',
              
          })


const inputs = [
    {
          id: 1,
          name: "nombre",
          type: "text",
          placeholder: "Nombre de la banda",
          errorMessage: "La banda debe tener entre 3 y 50 caracteres.",
          label: "Nombre",
          pattern: "^.{3,50}$",
          required: true,
    },
    {
          id: 2,
          name: "ano_fundacion",
          type: "number",
          placeholder: "Año",
          errorMessage: "El año debe estar entre 1900 y 2025.",
          label: "Año",
          pattern: "^(19|20)\\d{2}$",
          required: true,
        },
        {
          id: 3,
          name: "biografia",
          type: "text",
          placeholder: "Biografia",
          errorMessage: "Biografia debe tener entre 3 y 30 caracteres.",
          label: "Biografia",
          pattern: "^.{3,30}$",
          required: true,
        }
]

 

const handleOnChange = (e) =>{
    setValues({...values,[e.target.name]:e.target.value})
}


  useEffect(()=>{
  if(banda){


    setValues({

      nombre:banda.nombre,
      ano_fundacion: banda.ano_fundacion,
      biografia: banda.biografia,
    })

  
  }
},[banda])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       const nuevaBanda = {
                   nombre: values.nombre,
                   ano_fundacion:Number(values.ano_fundacion),
                   biografia:values.biografia,
                }

      if (banda) {
        await axios.put(`http://localhost:3000/bandas/${banda._id}`,nuevaBanda)
      }else{
        await axios.post("http://localhost:3000/bandas",nuevaBanda)
      }
      

      onBandaGuardada()
      onClose()

    } catch (err) {
      console.error('Error guardando banda:', err.message);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{banda ? 'Actualizar disco' : 'Agregar nueva banda'}</h2>
          <form onSubmit={handleSubmit}>
        
        {
    inputs.map((input)=>(
        <FormInput 
        key={input.id} 
        value={values[input.name]} 
        onChange={handleOnChange} 
        {...input}
        />
    ))
}



          <button type="submit">{banda ? 'Actualizar banda' : 'Agregar banda'}</button>

               </form>
      </div>
    </div>
  );
};

export default ModalBanda;