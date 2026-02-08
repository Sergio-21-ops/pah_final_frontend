import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie"
import {jwtDecode} from "jwt-decode"

export const AuthContext = createContext();
export const AuthContextProvider = ({children}) =>{
    
    const [usuario,setUsuario] = useState(null)
    const auth = Cookies.get('jwToken') || null ;
    
    useEffect(()=>{
        if (auth) {
             const decoded = jwtDecode(auth)
                     console.log("Token decodificado:", decoded);

               setUsuario({
                    nombre:decoded.nombre,
                     id:decoded._id,
                      nombre_usuario:decoded.nombre_usuario,
                       rol: decoded.rol
                })
        }
    },[auth])
    
        const cerrarSesion = () => {
            setUsuario(null)
            Cookies.remove('jwToken')
        }
    
    


        return(
            <AuthContext.Provider value={{usuario,setUsuario,auth,cerrarSesion}}>
                {children}
            </AuthContext.Provider>
        )
}
