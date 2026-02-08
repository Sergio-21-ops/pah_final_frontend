import React, { useContext } from 'react'
import { AuthContext } from '../contexto/AuthContexto'
import { Navigate, Outlet } from 'react-router-dom';

const RutasProtegidas = () => {
     const {auth} = useContext(AuthContext)
        let authenticated = {'token': auth};

  return (
           authenticated.token ? <Outlet/> : <Navigate to="/login"/>
   
  )
}

export default RutasProtegidas