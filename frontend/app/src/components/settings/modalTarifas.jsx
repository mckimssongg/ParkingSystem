import React from "react";
import { ContextGlobal } from "../../context/Context";

function ModalTarifas() {
  const {
    setOpenModal4,
    setOnChange,
    onChange,
    mostrarAlerta,
    error,
    setError,
    tipos,
  } = React.useContext(ContextGlobal);

  const [data, setData] = React.useState({
    nombre: "",
    descripcion: "",
    tarifa: null,
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value.toLowerCase(),
    });
  };
  const [ver, setVer] = React.useState(false);

  const sendData = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:8000/vehiculos/tipos/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        if (!response.id) {
          setError({
            state: true,
            message: "Invalid Credentials",
          });
        } else {
          mostrarAlerta();
          setOnChange(!onChange);
          setOpenModal4(false);
          setError({
            state: false,
            message: "",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className=" form-bg bg-primary d-flex flex-column align-items-center w-50">
      {!ver && (
        <form
          method="POST"
          onSubmit={sendData}
          className="form-horizontal d-flex flex-column "
          style={{ width: "80%", maxWidth: "600px" }}
        >
          <h3 className="title text-center m-4">Registro de nuevas tarifas</h3>
          {error.state && (
            <div className="alert alert-danger text-center" role="alert">
              {error.message}
            </div>
          )}
          <div className="form-group m-2 ">
            <label>Nombre del nuevo tipo*</label>
            <input
              className="form-control"
              type="text"
              name="nombre"
              onChange={handleChange}
            />
          </div>
          <div className="form-group m-2">
            <label>Descripcion *</label>
            <input
              className="form-control"
              type="text"
              name="descripcion"
              onChange={handleChange}
            />
          </div>
          <div className="form-group m-2">
            <label>tarifa *</label>
            <input
              className="form-control"
              type="number"
              name="tarifa"
              step="any"
              onChange={handleChange}
            />
          </div>
          <div className="d-flex justify-content-center">
            <button className="btn btn-primary m-3 w-100 ">Registrar</button>
          </div>
        </form>
      )}
      {ver && (
        <div className="table-responsive">
          <table className="table table-striped  text-white m-3">
            <thead>
              <tr>
                <th scope="col" className="text-center">
                  id
                </th>
                <th scope="col" className="text-center">
                  nombre
                </th>
                <th scope="col" className="text-center">
                  descripcion
                </th>
                <th scope="col" className="text-center">
                  tarifa
                </th>
                <th scope="col" className="text-center">
                  acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {tipos.map((item) => (
                <tr key={item.id}>
                  <th scope="row" className=" text-white ">
                    {item.id}
                  </th>
                  <td className="text-center text-white ">{item.nombre}</td>
                  <td className="text-center text-white ">
                    {item.descripcion}
                  </td>
                  <td className="text-center text-white ">{item.tarifa}</td>
                  <td>
                    <button className="btn btn-info"> Editar </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="d-flex justify-content-center">
        <button className="btn btn-info m-3 w-50" onClick={() => setVer(!ver)}>
          {ver ? "Registrar nueva tarifa de residencia" : "Ver Lista"}
        </button>{" "}
        <button
          onClick={() => {
            setOpenModal4(false);
          }}
          type="button"
          className=" m-3 w-50 btn btn-danger"
        >
          Salir
        </button>
      </div>
    </div>
  );
}

export default ModalTarifas;
