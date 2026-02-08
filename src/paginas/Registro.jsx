import axios from "axios";
import React, { useState } from "react";
import FormInput from '../Componentes/FormInput'


import { useNavigate } from "react-router-dom";

const Registro = () => {

  const navigate = useNavigate()

  const [userData, setUserData] = useState({
    nombre: "",
    apellido: "",
    nombre_usuario: "",
    email: "",
    password: ""
  })

  const inputs = [
    {
       id: 1,
          name: "nombre",
          type: "text",
          placeholder: "Nombre",
          errorMessage: "Debe tener entre 2 y 30 caracteres.",
          label: "Nombre",
          pattern: "^.{2,30}$",
          required: true,
    },
     {
      id: 2,
      name: 'apellido',
      type: 'text',
      placeholder: 'Apellido del artista',
      errorMessage: 'Debe tener entre 2 y 30 caracteres.',
      label: 'Apellido',
      pattern: '^.{2,30}$',
      required: true
    },
   {
      id: 3,
      name: 'nombre_usuario',
      type: 'text',
      placeholder: 'Nombre de usuario',
      errorMessage: 'Debe tener entre 2 y 30 caracteres.',
      label: 'Nombre de usuario',
      pattern: '^.{2,30}$',
      required: true
    },
    {
      id: 4,
      name: 'email',
      type: 'email',
      placeholder: 'Email',
      errorMessage: 'Debe ser un email valido',
      label: 'Email',
      required: true
    },
    {
      id: 5,
      name: 'password',
      type: 'password',
      placeholder: 'Contraseña',
      errorMessage: 'Debe tener al menos 4 caracteres',
      label: 'Password',
      pattern: '^.{4,}$',
      required: true
    }
]



const handleOnChange = (e) =>{
    setUserData({...userData,[e.target.name]:e.target.value})
}




  const [error, setError] = useState("");

  const handleRegistro = async (e) =>{

    e.preventDefault()
    await axios.post(`http://localhost:3000/usuarios`, userData)
    .then((res)=>{

      navigate ('/login')
      console.log (res)

    })

    .catch((error) => {
      console.log (error)
      setError(error.response.data.messagge)
      }
    )
  }
  return (
    <div>
      <h1>Registro</h1>
      <form onSubmit={handleRegistro}>
 {inputs.map((input) => (
          <FormInput
            key={input.id}
            value={userData[input.name]}
            onChange={handleOnChange}
            {...input}
          />
        ))}
        <button className="enviar" type="submit">Registro</button>
        {
          error &&  <p>{error}</p>
        }
       
      </form>
    </div>
  );
};

export default Registro;
