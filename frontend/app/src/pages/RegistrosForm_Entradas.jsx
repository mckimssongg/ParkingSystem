import React from 'react'
import RegistrosForm from './../components/registros/registrosForm.jsx'
import { useNavigate } from 'react-router-dom'

function RegistrosForm_Entradas() {
  
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!localStorage.getItem("dataSesion")) {
      return navigate("/Login");
    }
  });
  return (
    <div className='d-flex align-items-center flex-column'>
        <h3 className="text-center">Registro de Entradas</h3>
        <RegistrosForm />
    </div>
  )
}

export default RegistrosForm_Entradas