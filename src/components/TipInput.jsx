import React from 'react'

function TipInput({label, value}){
return (
    <div className='mb-3 row align-items-center'>
        <label className='col-sm-4 col-form-label'>{label}</label>
        <div className='col-sm-8'>
          <input 
          type="text"
          className='form-control'
          value={value}
          readOnly
          />
        </div>
    </div>
)
}

export default TipInput