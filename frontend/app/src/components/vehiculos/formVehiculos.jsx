import React from "react";
import { BsFillCaretRightFill } from "react-icons/bs";
import { ContextGlobal } from "../../context/Context";
import { Link } from "react-router-dom";

function FormVehiculos() {
  const { error, form, sendData, handleChange, tipos } =
    React.useContext(ContextGlobal);

  
  return (
    <React.Fragment>
      <div className="d-flex justify-content-center">
        <div className="w-50">
          {error.state && (
            <div className="alert alert-danger text-center" role="alert">
              {error.message}
            </div>
          )}
          <form onSubmit={sendData}>
            <div className="form-group">
              <label>
                <BsFillCaretRightFill />
                Placa{" "}
              </label>
              <input
                type="text"
                className="form-control"
                id="placa"
                name="placa"
                onChange={handleChange}
                value={form.placa}
              />

              <label className="mt-4">
                <BsFillCaretRightFill />
                Tipo de Vehiculo
              </label>
              <input
                type="text"
                className="form-control"
                id="tipo_vehiculo"
                name="tipo_vehiculo"
                onChange={handleChange}
                value={form.tipo_vehiculo}
              />

              <label className="mt-4">
                <BsFillCaretRightFill />
                Descripcion
              </label>
              <input
                type="text"
                className="form-control"
                id="descripcion"
                name="descripcion"
                onChange={handleChange}
                value={form.descripcion}
              />

              <label className="mt-4">
                <BsFillCaretRightFill />
                Estado
              </label>
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

              <label className="mt-4">
                <BsFillCaretRightFill />
                Tipo de Residencia
              </label>
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

              <button type="submit" className="mt-4 btn  w-100 btn-primary">
                Registrar
              </button>

              <div className="d-flex justify-content-evenly ">
                <Link to="/vehiculos">
                  <button className="btn btn-info mt-4 ">Ver vehiculos</button>
                </Link>
                <Link to="/registros_entradas/form">
                  <button className="btn btn-primary mt-4 ">
                    Ir a regsitrar entrada de vehiculo
                  </button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}

export default FormVehiculos;
