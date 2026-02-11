import React , { useState, useEffect }from 'react';
import axios from 'axios'
//import useDebounce from '../hooks/useDebounce'
import FormInput from '../Componentes/FormInput'




const Artistas = () => {
 
 const [artistas, setArtistas] = useState([])

const [values, setValues] = useState({
        nombre:'',
        apellido:'',
        mini_biografia:'',
        edad:'',
        instrumentos:''
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
      name: 'edad',
      type: 'number',
      placeholder: 'Edad',
      errorMessage: 'Edad válida entre 1 y 120',
      label: 'Edad',
      pattern: '^(1[0-1][0-9]|[1-9][0-9]?)$',
      required: true
    },
    {
      id: 4,
      name: 'mini_biografia',
      type: 'text',
      placeholder: 'Mini biografía',
      errorMessage: 'Debe tener entre 10 y 300 caracteres.',
      label: 'Mini Biografía',
      pattern: '^.{10,300}$',
      required: true
    },
    {
      id: 5,
      name: 'instrumentos',
      type: 'text',
      placeholder: 'Instrumentos (separados por coma)',
      errorMessage: 'Debe escribir al menos un instrumento.',
      label: 'Instrumentos',
      pattern: '^.+$',
      required: true
    }
]

const handleOnChange = (e) =>{
    setValues({...values,[e.target.name]:e.target.value})
}


 /*
 const [nombreArtista, setNombreArtista] = useState("")
 const [apellidoArtista, setApellidoArtista] = useState("")
 const [mini_biografia, setMiniBiografia] = useState("")
  const [edad, setEdad] = useState("")
   const [instrumentos, setInstrumentos] = useState("")
 const [buscar, setBuscar] = useState("")
 const [sugerencias, setSugerencias] = useState([])
 const debouncedSearch = useDebounce(buscar,1000)
*/        




  const fetchArtistas = async () =>{
                try{
                  const res =  await axios.get(`${import.meta.env.VITE_API_URL}/artistas`",)
                 setArtistas(res.data)
            } catch(err){
                console.error(err)
            }
  } 
        
  useEffect(()=>{
        fetchArtistas()
  },[])


  const handleSubmit = async (e) =>{
                e.preventDefault();
            
                const nuevoArtista = {
                   nombre: values.nombre,
                   apellido: values.apellido,
                   mini_biografia: values.mini_biografia,
                   edad:Number(values.edad),
                  instrumentos: values.instrumentos.split(',').map(i => i.trim()),
                }
        
                try{
                  console.log("Payload enviado:", nuevoArtista);

                        await axios.post(`${import.meta.env.VITE_API_URL}/artista`,nuevoArtista)
                        fetchArtistas()
                        
                  setValues({
      nombre: '',
      apellido: '',
      mini_biografia: '',
      edad: '',
      instrumentos: ''
    });   
            
                } catch(err){
                    console.error(err)
                }
    }


    /*



      const handleSearch = async (searchTerm) => {
                 try{
                      const res =  await axios.get("http://localhost:3000/discos/buscar",{
                        params:{nombre:searchTerm}
                      })
                     setDiscos(res.data)
                     setSugerencias([])
                } catch(err){
                    console.error(err)
                }
            }

            useEffect(()=>{
                    if (debouncedSearch) {
                        fetchSugerencias(debouncedSearch)
                    }else{
                        setSugerencias([])
                    }
            },[debouncedSearch])


            const fetchSugerencias = async (searchTerm) =>{
    try{
          const res =  await axios.get("http://localhost:3000/discos/buscar",{
            params:{nombre:searchTerm}
          });
         setSugerencias(res.data)
    } catch(err){
        console.error(err)
    }
    }


const handleSearchChange = async (e) => {

    const value = e.target.value;
    setBuscar(value)

} 


*/



  return (
    <div>
             <h1>Artistas</h1>

 <ul>
            {
                artistas.map(artista => (
                    <li  key={artista._id}>{artista.nombre} {artista.apellido}</li>
                ))
            }
        </ul>

         <h2>Agregar artista</h2>

        <form onSubmit={handleSubmit}>

        {inputs.map((input) => (
          <FormInput
            key={input.id}
            value={values[input.name]}
            onChange={handleOnChange}
            {...input}
          />
        ))}
 
        <button className="enviar"  type="submit" >Agregar artista</button>

       </form>


       

    </div>
  )
}

export default Artistas 
