import React from "react";
import { ContextGlobal } from "../../context/Context";

function PutVehiculos() {
  const [error, setError] = React.useState({
    state: false,
    message: "",
  });
  const [form, setForm] = React.useState({
    placa: "",
    tipo_vehiculo: "",
    descripcion: "",
    estado: true,
    tipo_residencia: 0,
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const {
    tipos,
    setOpenModal,
    actualizarVehiculo,
    setOnChange,
    onChange,
    mostrarAlerta,
  } = React.useContext(ContextGlobal);

  const item = actualizarVehiculo;

  const sendData = async (e) => {
    e.preventDefault();
    await fetch(`http://127.0.0.1:8000/vehiculos/vehiculos/${item.id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((response) => response.json())
      .then((response) => {
        if (
          typeof response.descripcion == "object" ||
          typeof response.placa == "object" ||
          typeof response.tipo_residencia == "object" ||
          typeof response.tipo_vehiculo == "object"
        ) {
          return setError({
            state: true,
            message: "Invalid Credentials",
          });
        } else {
          mostrarAlerta();
          setOnChange(!onChange);
          setOpenModal(false);
          setError({
            state: false,
            message: "",
          });
        }
      });
  };

  return (
    <React.Fragment>
      <div className=" form-bg d-flex flex-column align-items-center bg-primary  w-50 p-4">
        <h3>Actualizar data del vehiculo: {actualizarVehiculo.placa}</h3>
        <div className="w-50">
          {error.state && (
            <div className="alert alert-danger" role="alert">
              {error.message}
            </div>
          )}
          <form onSubmit={sendData}>
            <div className="form-group">
              <label>Placa</label>
              <input
                type="text"
                className="form-control"
                id="placa"
                name="placa"
                onChange={handleChange}
                value={form.placa}
              />

              <label className="mt-4">Tipo de Vehiculo</label>
              <input
                type="text"
                className="form-control"
                id="tipo_vehiculo"
                name="tipo_vehiculo"
                onChange={handleChange}
                value={form.tipo_vehiculo}
              />

              <label className="mt-4">Descripcion</label>
              <input
                type="text"
                className="form-control"
                id="descripcion"
                name="descripcion"
                onChange={handleChange}
                value={form.descripcion}
              />

              <label className="mt-4">Estado</label>
              <select
                className="form-control"
                id="estado"
                name="estado"
                onChange={handleChange}
                value={form.estado}
              >
                <option value="">Seleccione una opcion</option>
                <option value={true}>Activo</option>
                <option value={false}>Inactivo</option>
              </select>

              <label className="mt-4">Tipo de Residencia</label>
              <select
                className="form-control"
                id="tipo_residencia"
                name="tipo_residencia"
                onChange={handleChange}
                value={form.tipo_residencia}
              >
                <option value="">Seleccione una opcion</option>
                {tipos.map((tipo) => (
                  <option key={tipo.id} value={tipo.id}>
                    {tipo.nombre}
                  </option>
                ))}
              </select>

              <div className="d-flex justify-content-evenly ">
                <button type="submit" className="m-3 btn  w-100 btn-success">
                  Actualizar
                </button>
                <button
                  onClick={() => {
                    setOpenModal(false);
                  }}
                  type="button"
                  className="m-3 btn  w-100 btn-danger"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}

export default PutVehiculos;
