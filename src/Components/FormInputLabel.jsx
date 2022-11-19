import React from 'react'
import './Form.css'

function FormInputLabel({text, dataType, icon, placeholder, value, onInput, onKeyUp, readOnly= false}) {
  return (
    <div className='input-group mb-3'>
        <span className='input-group-text'> {text} {icon} </span>
        <input type={dataType} className='form-control' 
        placeholder={placeholder} value={value} 
        onInput={onInput} onKeyUp={onKeyUp}
        readOnly={readOnly} />
    </div>
  )
}

export default FormInputLabel