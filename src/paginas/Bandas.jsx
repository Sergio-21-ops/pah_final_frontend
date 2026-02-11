import React , { useState, useEffect,useContext }from 'react';
import axios from 'axios'
import FormInput from '../Componentes/FormInput'
import { AuthContext } from "../contexto/AuthContexto";
import ModalBanda from '../Componentes/ModalBanda'



const Bandas = () => {
 
 const [bandas, setBandas] = useState([])
      const [bandaDetalle, setBandadetalle] = useState(null)

const { usuario } = useContext(AuthContext);
const [mostrarModal, setMostrarModal] = useState(false)
         const [bandaActual, setBandaActual] = useState(null)


const [values, setValues] = useState({
        nombre:'',
        ano_fundacion:'',
        biografia:''
    })

const inputs = [
    {
       id: 1,
          name: "nombre",
          type: "text",
          placeholder: "Nombre de la banda",
          errorMessage: "Debe tener ente 3 y 50 caracteres",
          label: "Nombre",
          pattern: "^.{3,50}$",
          required: true,
    },
    {
          id: 2,
          name: "ano_fundacion",
          type: "number",
          placeholder: "Año de fundacion",
          errorMessage: "Debe ser un año válido (1900 a 2025)",
          label: "Año de fundacion",
          pattern: "^(19|20)\\d{2}$",
          required: true,
        },
        {
          id: 3,
    name: 'biografia',
    type: 'text',
    placeholder: 'Biografía',
    label: 'Biografía',
    errorMessage: 'Debe tener entre 10 y 500 caracteres',
    pattern: '^.{10,500}$',
    required: true
    }
    
]

const handleOnChange = (e) =>{
    setValues({...values,[e.target.name]:e.target.value})
}
  const fetchBandas = async () =>{
                try{
                  const res =  await axios.get(`${import.meta.env.VITE_API_URL}/bandas`,)
                 setBandas(res.data)
            } catch(err){
                console.error(err)
            }
  } 
        

   const fetchDetalleBanda = async (id) =>{
                try{
                  const res =  await axios.get(`${import.meta.env.VITE_API_URL}/bandas/${id}`)
                 setBandadetalle(res.data)
            } catch(err){
                console.error("error al obtener detalle",err)
            }
            }     

  useEffect(()=>{
        fetchBandas()
  },[])


  const handleSubmit = async (e) =>{
                e.preventDefault();
            
                const nuevaBanda = {
                   nombre: values.nombre,
                   ano_fundacion:Number(values.ano_fundacion),
                   biografia: values.biografia,
                }
        
                try{
await axios.post(`${import.meta.env.VITE_API_URL}/bandas`, nuevaBanda)
                        
                        
                        fetchBandas()
            
                } catch(err){
                    console.error(err)
                }
    }
    const handleEditarBanda = (banda) =>{
            setBandaActual(banda)
         setMostrarModal(true)
             }
 const handleBorrarBanda = async (id) =>{
  if(window.confirm('Seguro de querer borrarlo?')){
    try{
         await axios.delete(`${import.meta.env.VITE_API_URL}/bandas/${id}`)
      fetchBandas()
    } catch(err){
        console.error(err)
    }
  }
 }
 const handleBandaGuardada = () => {
        fetchBandas()
         setMostrarModal(false)
        }


  return (
    <div>
             <h1>Bandas</h1>
        
{

usuario && (
 
 <>
  <button onClick={() => { setBandaActual(null); setMostrarModal(true) }}>
    Agregar banda
  </button>
  {
        mostrarModal &&(
          <ModalBanda
          banda={bandaActual}
          onClose={()=>setMostrarModal(false)}
          onBandaGuardada={handleBandaGuardada}
          />
        )
      }



         <h2>Agregar bandas</h2>

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
 
        <button className="enviar"  type="submit" >Agregar banda</button>

       </form>
 </> 

)}

       <div className='container'>
            {
                bandas.map(banda => (
                    <div className='card' key={banda._id}>

                    <h3 className='titulo_disco' key={banda._id}>{banda.nombre} ({banda.ano_fundacion})</h3>
                    
                    <button className="botones-disco" onClick={() => fetchDetalleBanda(banda._id)}>Ver detalle</button>
 

{usuario && (
 <>

<button className="botones-disco" onClick={ ()=>handleEditarBanda(banda) }>Editar</button>
 <button className="botones-disco"  onClick={ ()=>handleBorrarBanda(banda._id) }>Borrar</button>

</>
)}
                     </div>
                ))
            }
                              
            {bandaDetalle && (
  <div className="modal">
    <div className="modal-content">
    <h2>Detalle del Disco</h2>

    <p><strong>Nombre:</strong> {bandaDetalle.nombre}</p>
    <p><strong>Año:</strong> {bandaDetalle.ano_fundacion}</p>
    <p><strong>Género:</strong> {bandaDetalle.biografia}</p>

    <button onClick={() => setBandadetalle(null)}>Cerrar detalle</button>
  </div>
  </div>
)}
       </div>

    </div>
  )
}


export default Bandas

