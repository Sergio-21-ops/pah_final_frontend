import React, { useState, useEffect,useContext  } from 'react'
import axios from 'axios'
import useDebounce from '../hooks/useDebounce'
import Modal from '../Componentes/Modal'
import { AuthContext } from "../contexto/AuthContexto";


const Discos = () => {

        const [discos, setDiscos] = useState([])
        const [discoDetalle, setDiscodetalle] = useState(null)

const { usuario } = useContext(AuthContext);

          const [cargando, setcargando] = useState(true)
            const [error, setError] = useState(null)


         const [mostrarModal, setMostrarModal] = useState(false)
         const [discoActual, setDiscoActual] = useState(null)



        const [bandas, setBandas] = useState([])

      
        const [buscar, setBuscar] = useState("")
        const [sugerencias, setSugerencias] = useState([])
        const debouncedDisco = useDebounce(buscar,1000)
        
    

     
        const [orden, setOrden] = useState('');





         const handleEditarDisco = (disco) =>{
            setDiscoActual(disco)
         setMostrarModal(true)
             }

        const handleBorrarDisco = async (id) =>{
  if(window.confirm('Seguro de querer borrarlo?')){
    try{
await axios.delete(`/discos/${id}`)
      fetchDiscos()
    } catch(err){
        console.error(err)
    }
  }
 }


        const handleDiscoGuardado = () => {
        fetchDiscos()
         setMostrarModal(false)
        }




       const fetchDiscos = async () => {
  setcargando(true)
  setError(null)

  try {
    const res = await axios.get(`/discos`, { params: { orden } })
    setDiscos(res.data)
  } catch (err) {
    console.error(err)
    setError(err)
  } finally {
    setcargando(false)
  }
}


         const fetchDetalleDisco = async (id) =>{
                try{
                  const res =  await axios.get(`/discos/${id}`)
                 setDiscodetalle(res.data)
            } catch(err){
                console.error("error al obtener detalle",err)
            }
            }      

        
            useEffect(()=>{
                fetchDiscos()
            },[orden])



             const fetchBandas = async () =>{
  try {
    const res = await axios.get(`/bandas`)
    setBandas(res.data)
  } catch(err){
    console.error(err)
  }
}
                    
              useEffect(()=>{
                    fetchBandas()
              },[])
            




           


            
            const handleSearch = async (searchTerm) => {
                 try{
                      const res =  await axios.get(`/discos/buscar`, {
  params: { nombre: searchTerm }
})
                     setDiscos(res.data)
                     setSugerencias([])
                } catch(err){
                    console.error(err)
                }
            }

            useEffect(()=>{
                    if (debouncedDisco) {
                        fetchSugerencias(debouncedDisco)
                    }else{
                        setSugerencias([])
                    }
            },[debouncedDisco])


    const fetchSugerencias = async (searchTerm) =>{
    try{
          const res =  await axios.get(`/discos/buscar`, { params:{ nombre:searchTerm } })
         setSugerencias(res.data)
    } catch(err){
        console.error(err)
    }
    }


const handleSearchChange = async (e) => {

    const value = e.target.value;
    setBuscar(value)

}


if (cargando) return <p>Cargando...</p>
if (error) return <p>Error:{error}</p>
  return (
    <div>
        <h1>Discos</h1>
        
{

usuario && (
 
 <>
  <button onClick={() => { setDiscoActual(null); setMostrarModal(true) }}>
    Agregar disco
  </button>
  {
        mostrarModal &&(
          <Modal
          disco={discoActual}
          bandas={bandas}
          onClose={()=>setMostrarModal(false)}
          onDiscoGuardado={handleDiscoGuardado}
          />
        )
      }

 </> 

)}
       

      


      {discoDetalle && (
  <div className="modal">
    <div className="modal-content">
    <h2>Detalle del Disco</h2>

    <p><strong>Nombre:</strong> {discoDetalle.nombre}</p>
    <p><strong>Año:</strong> {discoDetalle.ano}</p>
    <p><strong>Género:</strong> {discoDetalle.genero}</p>
    <p><strong>Banda:</strong> {discoDetalle.banda?.nombre} </p>
<img 
  src={`${import.meta.env.VITE_API_URL}${discoDetalle.imagenUrl}`} 
  alt={discoDetalle.nombre} 
/>
    <button onClick={() => setDiscodetalle(null)}>Cerrar detalle</button>
  </div>
  </div>
)}

<h2>Buscar discos</h2>

<form onSubmit={(e)=>{e.preventDefault();handleSearch(buscar)}} >
<input type="text" placeholder='buscar por nombre' value={buscar} onChange={handleSearchChange} />
 <button type="submit" >Buscar</button>
{

    sugerencias.length > 0 && (
        <ul className='autocomplete sugerencias'> 
                {
                    sugerencias.map((sugerencia) => (
                                <li key={sugerencia._id}>{sugerencia.nombre}</li>
                            ))
                }
        </ul>
    )
}
</form>


<h2>Filtrar discos</h2>

<div className='div_filtros'>
  


<select className=' select_orden' value={orden} onChange={(e)=>setOrden(e.target.value) }  >

  <option value="" disabled selected>Ordenar por</option>
<option value="asc">Ascendente</option>
<option value="desc">Descendente</option>

</select>

</div>



<div className='container'>
 {
                discos.map(disco => (
                    <div className='card' key={disco._id}>

                     <h3 className='titulo_disco'>
                      {disco.nombre} ({disco.ano})
                     </h3>

                    <div>  
 <button className="botones-disco" onClick={() => fetchDetalleDisco(disco._id)}>Ver detalle</button> 
 
{usuario && (
 <>

<button className="botones-disco" onClick={ ()=>handleEditarDisco(disco) }>Editar</button>
 <button className="botones-disco"  onClick={ ()=>handleBorrarDisco(disco._id) }>Borrar</button>

</>
)}
                    </div>
                 

                    </div>
                ))
            }



</div>









    </div>
  )
}


export default Discos




