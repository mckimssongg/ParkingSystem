import React from "react";
import Loader from "../Loader";
import { Aviso } from "../Aviso";
import { ContextGlobal } from "../../context/Context";
import { Link } from "react-router-dom";

function PagosVista({ dataPagos }) {
  const [loading, setLoading] = React.useState(true);

  const {
    setOnPrintMes,
    onChange,
    setOnChange,
    setOpenModal,
    setInfoPago,
    creatCuenta,
  } = React.useContext(ContextGlobal);

  const fin_mes = async (item) => {
    await fetch(`http://127.0.0.1:8000/registros/registro_pago/${item.id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        is_active: item.is_active,
        fin_mes: true,
        registro_entrada: item.registro_entrada,
        vehiculo: item.vehiculo.id,
      }),
    }).catch((err) => {
      console.log(err);
    });
    setOnChange(!onChange);
  };
  const put_is_activate = async (item) => {
    await fetch(`http://127.0.0.1:8000/registros/registro_pago/${item.id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        is_active: false,
        registro_entrada: item.registro_entrada,
        vehiculo: item.vehiculo.id,
      }),
    }).catch((err) => {
      console.log(err);
    });
    setOnChange(!onChange);
  };

  React.useEffect(() => {
    if (dataPagos.length > 0) {
      setLoading(false);
    }
  });

  if (dataPagos.length === 0) {
    return <Aviso mensaje={"pago"} />;
  }
  if (loading) {
    return <Loader />;
  } else {
    return (
      <div className="table-responsive overflow-auto heigthTableStandar">
        <table className="table table-striped text-center">
          <thead className="sticky-top table-dark menorZindex">
            <tr>
              <th scope="col">id</th>
              <th scope="col">Vehiculo</th>
              <th scope="col">Fecha</th>
              <th scope="col">Total</th>
              <th scope="col">Tiempo total estacionado</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {dataPagos.map((item) => (
              <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>{item.vehiculo.placa}</td>
                <td>{item.fecha_pago}</td>
                <td>Q{item.importe.toFixed(2)}</td>
                <td>
                  {item.tiempo_estacionado &&
                    item.tiempo_estacionado.toFixed(2)}{" "}
                  min
                </td>
                <td>
                  <div className="d-flex justify-content-center">
                    {item.fin_mes && (
                      <button
                        className="btn btn-danger fs-6 m-1"
                        onClick={() => {
                          swal({
                            title: "Estas seguro?",
                            text: `Deseas eliminar el pago ${item.vehiculo.placa}`,
                            buttons: true,
                          }).then((willDelete) => {
                            if (willDelete) {
                              put_is_activate(item);
                              swal("Eliminado!", "El pago ha sido eliminado");
                            } else {
                              swal("Cancelado", "El pago no ha sido eliminado");
                            }
                          });
                        }}
                      >
                        Borrar
                      </button>
                    )}
                    <button
                      className="btn btn-info fs-6 m-1"
                      onClick={async () => {
                        setInfoPago(item.registro_entrada);
                        setOpenModal((prevState) => !prevState);
                      }}
                    >
                      listado de registros
                    </button>
                    {!item.fin_mes && (
                      // <Link to={`/pagos/mes/${item.id}`}>
                        <button
                          className="btn btn-success fs-6 m-1"
                          onClick={() => {
                            fin_mes(item);
                            // setOnPrintMes(item);
                            creatCuenta(item.vehiculo);
                          }}
                        >
                          Inicio mes
                        </button>
                      // </Link>
                    )}
                    {item.fin_mes && (
                      <Link to={`/pagos/mes/${item.id}`}>
                        <button
                          className="btn btn-dark fs-6 m-1"
                          onClick={() => {
                            setOnPrintMes(item);
                          }}
                        >
                          imprimir
                        </button>
                      </Link>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default PagosVista;
