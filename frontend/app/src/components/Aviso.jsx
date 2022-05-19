import React from 'react'


function AvisoSinRegistros({ mensaje }) {
  return (
    //   aun no tienes registros aviso
    <div className="alert alert-warning text-center w-50" role="alert">
        <h4 className="alert-heading">Aviso</h4>
        <p >
            No tienes registros 
        </p>
        <hr />
    </div>
  )
}

function Aviso({ mensaje }) {
  return (
    //   aun no tienes registros aviso
    <div className="alert alert-warning text-center" role="alert">
        <h4 className="alert-heading">Aviso</h4>
        <p >
            No tienes registros de {mensaje}
        </p>
        <hr />
        <p className="mb-0">
            Para agregar un {mensaje}, haz click en el boton de agregar
        </p>
    </div>
  )
}

function AvisoHome() {
  return (
    <div className="alert alert-warning text-center" role="alert">
        <h4 className="alert-heading">Aviso</h4>
        <p >
            No tienes registros de vehiculos en el estacionamiento
        </p>
    </div>
  )
}

export  {Aviso, AvisoHome, AvisoSinRegistros}