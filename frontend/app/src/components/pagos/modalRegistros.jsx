import React from "react";
import { AvisoSinRegistros } from "../Aviso";
import { ContextGlobal } from "../../context/Context";

function ModalRegistros() {
  const { infoPago } = React.useContext(ContextGlobal);
  if (infoPago.length === 0) {
    return (
      <div className="w-100 d-flex justify-content-center ">
        <AvisoSinRegistros />
      </div>
    );
  }
  return (
    <div className="table-responsive  bg-primary p-4">
      <h4 className="text-center">Registros de :{infoPago[0].vehiculo}</h4>
      <table className="table table-striped text-white text-center">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">fecha de salida</th>
            <th scope="col">importe total</th>
            <th scope="col">tiempo estacionado</th>
            <th scope="col">accioness</th>
          </tr>
        </thead>
        <tbody>
          {infoPago.map((item) => (
            <tr key={item.id}>
              <th scope="row" className="text-center text-white ">
                {item.id}
              </th>
              <td className="text-center text-white ">
                {item.fecha_salida !== item.fecha_entrada && item.fecha_salida}
                {item.fecha_salida == item.fecha_entrada && "sin salida"}
              </td>
              <td className="text-center text-white ">Q{item.importe_total}</td>
              <td className="text-center text-white ">
                {item.tiempo_estacionado && item.tiempo_estacionado.toFixed(2)}{" "}
                min
              </td>
              <td className="text-center text-white ">
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    console.log("eliminar");
                  }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ModalRegistros;
