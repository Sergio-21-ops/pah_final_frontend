import axios from "axios";
import React, { useContext, useState } from "react";
import Cookies from "js-cookie"
import { AuthContext } from "../contexto/AuthContexto";
import { useNavigate } from "react-router-dom";
import FormInput from '../Componentes/FormInput'

const Login = () => {

    const navigate = useNavigate()
  
  const [userData, setUserData] = useState({
    email: "",
    password: ""
  })

    const inputs = [
      {
      id: 1,
      name: 'email',
      type: 'email',
      placeholder: 'Email',
      errorMessage: 'Debe ser un email valido',
      label: 'Email',
      required: true
    },
    {
      id: 2,
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

  const {setUsuario} = useContext(AuthContext)


  const handleLogin = async (e) =>{
   
    //    console.log("Datos del login:", userData);
    
    e.preventDefault()
    
   await axios.post(`${import.meta.env.VITE_API_URL}//usuarios/ingresar`, userData)
    .then((res)=>{
      
      Cookies.set('jwToken',res.data.jwToken,{expires:3})
      setUsuario(res.data.usuario)
      navigate("/")


    })

    .catch((error) => {
  console.error(error);
  const msg = error.response?.data?.message || "Error en la petición";
  setError(msg);
});

  }

  return (
    <div>
      <h1>Login</h1>
            <form onSubmit={handleLogin}>
 {inputs.map((input) => (
          <FormInput
            key={input.id}
            value={userData[input.name]}
            onChange={handleOnChange}
            {...input}
          />
        ))}
        <button className="enviar"  type="submit">Iniciar sesion</button>
        {
          error &&  <p>{error}</p>
        }
       
      </form>
    </div>
  );
};

export default Login;


