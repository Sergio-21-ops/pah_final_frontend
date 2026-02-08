import React, { useState } from 'react'
import './FormInput.css'

const FormInput = (props ) => {

    

const {label,errorMessage,onChange, ...otrasProps} = props; 

    const [focused, setFocused] = useState(false) ;

const handleFocus = () =>{
    setFocused(true);
}

  return (
       <div className='formInput'>
<label>{label}</label>
<input 
{...otrasProps}
 onChange={onChange} 
onBlur={handleFocus} 
focused= {focused.toString()}/>

<span className="error-message">{errorMessage}</span>

    </div>
  )
}

export default FormInput