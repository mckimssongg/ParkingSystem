import React from "react";
import { ContextGlobal } from "../../context/Context";
import { Link } from "react-router-dom";

function ChangeState({ item }) {
  const { onChange, setOnChange, mostrarAlerta, setOnPrint } =
    React.useContext(ContextGlobal);

  const [dataPut, setDataPut] = React.useState({
    estado_de_salida: true,
    estacionamiento: 0,
    vehiculo: 0,
    a_cargo_de: 0,
    cuenta_por_cobrar: null,
  });

  const RegistosForm = async () => {
    await fetch(`http://127.0.0.1:8000/registros/registro_entrada_put/${item.id}/`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        setDataPut({
          estado_de_salida: !res.estado_de_salida,
          estacionamiento: res.estacionamiento,
          vehiculo: res.vehiculo,
          a_cargo_de: res.a_cargo_de,
          cuenta_por_cobrar: res.cuenta_por_cobrar,
        });
        return res;
      })
  };

  const putRegistro = async () => {
    await fetch(
      `http://127.0.0.1:8000/registros/registro_entrada_put/${item.id}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataPut),
      }
    ).catch((err) => {
      console.log(err);
    });
    RegistosForm();
    mostrarAlerta();
    setOnChange(!onChange);
  };

  React.useEffect(() => {
    RegistosForm();
  }, []);
  return (
    <React.Fragment>
      {dataPut.estado_de_salida && (
        <button
          className="btn btn-block"
          onClick={() => {
            swal({
              title: "Estas seguro?",
              text: `Estas por darle salida a ${item.vehiculo}`,
              buttons: true,
            }).then((willDelete) => {
              if (willDelete) {
                swal("Hecho!", "El vehiculo ha sido dado de salida");
                putRegistro();
                // onSubmit();
              } else {
                swal("Cancelado", "El vehiculo no ha sido dado de salida");
              }
            });
          }}
        >
          <p className=" badge btn btn-warning fs-6 m-2">Ocupado</p>
        </button>
      )}
      {!dataPut.estado_de_salida &&
        (item.tipo_residencia !== "residente" ? (
          <Link to={`/pagos/${item.id}/`}>
            <button
              className="badge btn btn-info fs-6 m-2"
              onClick={() => {
                setOnPrint(item);
              }}
            >
              Ir a imprimir
            </button>
          </Link>
        ) : (
          <span className="badge btn btn-success fs-6 m-2">success</span>
        ))}
    </React.Fragment>
  );
}

export default ChangeState;
