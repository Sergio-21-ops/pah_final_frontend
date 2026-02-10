import React, { useContext } from 'react';
import { Route, Routes,Link } from 'react-router-dom'
import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000";

import './App.css'

import Home from './paginas/Home';
import Artistas from './paginas/Artistas';
import Bandas from './paginas/Bandas';
import Discos from './paginas/Discos';
import Registro from './paginas/Registro';
import Login from './paginas/Login';
import { AuthContext } from './contexto/AuthContexto';
import RutasProtegidas from './utils/RutasProtegidas';

function App() {

  const {usuario ,cerrarSesion} = useContext(AuthContext)
  return (
    <>

      

      

      <nav className='navegacionUsuario'>

        <Link to="/" className='navBar'>Home</Link>
          <Link to="/discos"className='navBar' >Discos</Link>
        <Link to="/artistas" className='navBar'>Artistas</Link>
        <Link to="/bandas" className='navBar'>Bandas</Link>
      
         

        <div>
          {usuario?.nombre ? (
      <>
      <div className='login'>
      <h3>Mi cuenta : <br /> {usuario.nombre}</h3> 
      <button>  <Link onClick={()=> cerrarSesion()} to="/login">Cerrar sesion</Link> </button>
      </div>
      </>
       ) : (
       <>
       <Link to="/registro" className='navBar'>Registrarse</Link>
        <Link to="/login" className='navBar'>Iniciar sesión</Link>
       </>
    )}
</div> 

         </nav>
    
      
 
     
      
 
      
        
      <div>
        <Routes>
           <Route path="/" element={<Home />} />
         
         
          <Route path="/artistas" element={<Artistas />} />
          <Route path="/bandas" element={<Bandas />} />
          <Route path="/discos" element={<Discos />} />
         

          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      

      <div>
       
      </div>
    </>
  );
}
console.log("API DESDE VERCEL 👉", import.meta.env.VITE_API_URL);

export default App;
