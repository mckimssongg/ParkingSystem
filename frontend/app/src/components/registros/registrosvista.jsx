import React from "react";
import Loader from "../Loader";
import ChangeState from "./ChangeState";
import { Aviso } from "../Aviso";
import { ContextGlobal } from "../../context/Context";

function RegistrosVista({ data }) {
  const [loading, setLoading] = React.useState(true);
  const { onChange, setOnChange } = React.useContext(ContextGlobal);

  const RegistosForm = async (item) => {
    const dataReg = await fetch(
      `http://127.0.0.1:8000/registros/registro_entrada_put/${item.id}/`,
      {
        method: "GET",
      }
    );
    const data = await dataReg.json();
    return data;
  };

  const putRegistro = async (item) => {
    const dataRegistro = await RegistosForm(item);
    dataRegistro["is_active"] = !dataRegistro["is_active"];
    dataRegistro["estado_de_salida"] = true;
    await fetch(
      `http://127.0.0.1:8000/registros/registro_entrada_put/${dataRegistro.id}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataRegistro),
      }
    ).catch((err) => {
      console.log(err);
    });
    setOnChange(!onChange);
  };

  React.useEffect(() => {
    if (data.length > 0) {
      setLoading(false);
    }
  });

  if (data.length === 0) {
    return <Aviso mensaje={"entrada"} />;
  }
  if (loading) {
    return <Loader />;
  } else {
    return (
      <div className="table-responsive overflow-auto heigthTableStandar">
        <table className="table table-striped text-center">
          <thead className="sticky-top table-dark menorZindex">
            <tr>
              <th className="">Id</th>
              <th>estado de salida</th>
              <th>fecha de entrada</th>
              <th>fecha de salida</th>
              <th className="px-4">Total</th>
              <th>Tipo de residencia</th>
              <th>estacionamiento</th>
              <th>tiempo estacionado</th>
              <th>placas del heviculo</th>
              <th>registrado por</th>
              <th>acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>
                  <ChangeState item={item} />
                </td>
                <td>{item.fecha_entrada}</td>
                <td>
                  {item.fecha_salida !== item.fecha_entrada &&
                    item.fecha_salida}
                  {item.fecha_salida == item.fecha_entrada && "sin salida"}
                </td>
                <td>
                  {item.importe_total > 0 && `Q ${item.importe_total}`}
                  {item.importe_total <= 0 && `Sin pago`}
                </td>
                <td>{item.tipo_residencia}</td>
                <td>{item.estacionamiento}</td>
                <td>
                  {item.tiempo_estacionado &&
                    item.tiempo_estacionado.toFixed(2)}{" "}
                  min
                </td>
                <td>{item.vehiculo}</td>
                <td>{item.a_cargo_de}</td>
                <td>
                  <button
                    className="btn btn-danger fs-6 m-2"
                    onClick={() => {
                      swal({
                        title: "Estas seguro?",
                        text: `Deseas eliminar el registro ${item.vehiculo}`,
                        buttons: true,
                      }).then((willDelete) => {
                        if (willDelete) {
                          putRegistro(item);
                          swal("Eliminado!", "El registro ha sido eliminado");
                        } else {
                          swal("Cancelado", "El registro no ha sido eliminado");
                        }
                      });
                    }}
                  >
                    Borrar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
export default RegistrosVista;
