import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import {discosValidacion} from "../../../backend/validacion/validacion.js"

import FormInput from './FormInput'

 
import './Modal.scss';

const Modal = ({ disco, bandas, onClose, onDiscoGuardado }) => {
       const [values, setValues] = useState({
              nombre:'',
              ano:'',
              genero:'',
              banda:'',
          })

const [imagen, setImagen] = useState(null);

const [imagenPr, setImagenPr] = useState(null);

console.log(imagen)
          
const inputs = [
    {
          id: 1,
          name: "nombre",
          type: "text",
          placeholder: "Nombre del disco",
          errorMessage: "El nombre debe tener entre 3 y 50 caracteres.",
          label: "Nombre",
          pattern: "^.{3,50}$",
          required: true,
    },
    {
          id: 2,
          name: "ano",
          type: "number",
          placeholder: "Año",
          errorMessage: "El año debe estar entre 1900 y 2025.",
          label: "Año",
          pattern: "^(19|20)\\d{2}$",
          required: true,
        },
        {
          id: 3,
          name: "genero",
          type: "text",
          placeholder: "Género",
          errorMessage: "Género debe tener entre 3 y 30 caracteres.",
          label: "Género",
          pattern: "^.{3,30}$",
          required: true,
        }
]

 

const handleOnChange = (e) =>{
    setValues({...values,[e.target.name]:e.target.value})
}


  useEffect(()=>{
  if(disco){


    setValues({

      nombre:disco.nombre,
      ano: disco.ano,
      genero: disco.genero,
      banda:disco.banda?._id
    })

    setImagenPr(
      disco.imagenUrl ? `http://localhost:3000${disco.imagenUrl}` : null
    );
  }
},[disco])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       const nuevoDisco = {
                   nombre: values.nombre,
                   ano:Number(values.ano),
                   genero: values.genero,
                   banda: values.banda,
                   imagen 
                }

      if (disco) {
        await axios.put(`http://localhost:3000/discos/${disco._id}`,nuevoDisco,{
                    headers : {'Content-Type' : 'multipart/form-data'}}

        )
      }else{
        await axios.post("http://localhost:3000/discos",nuevoDisco,
                   {
                    headers : {'Content-Type' : 'multipart/form-data'}}

        )
      }
      

      onDiscoGuardado()
      onClose()

    } catch (err) {
      console.error('Error guardando disco:', err.message);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{disco ? 'Actualizar disco' : 'Agregar nuevo disco'}</h2>
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



          <label>Banda</label>
            <p> <strong>Si tu banda no esta en el menu debes cargarla previamente en la vista bandas</strong> </p>

          <select className='select_banda' name="banda" value={values.banda} onChange={handleOnChange} required>
            <option className='option_banda' value="">Selecciona una banda</option>
            {bandas.map((banda) => (
              <option key={banda._id} value={banda._id}>{banda.nombre}</option>
            ))}
          </select>


          <label>Imagen</label>
<input type="file" accept='imagen/*' onChange={(e) => setImagen(e.target.files[0])}  />

{

imagen && <img src={URL.createObjectURL(imagen)}/>

}

{!imagen && imagenPr &&  (
  <img src={imagenPr} style={{ width: "150px" }} />
) }

          <button type="submit">{disco ? 'Actualizar disco' : 'Agregar disco'}</button>

               </form>
      </div>
    </div>
  );
};

export default Modal;