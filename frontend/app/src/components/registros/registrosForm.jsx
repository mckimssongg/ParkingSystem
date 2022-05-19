import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ContextGlobal } from "../../context/Context";

function RegistrosForm() {
  const {
    handleSubmit,
    handleChangeEntrada,
    estacionamiento,
    vehiculos,
    formEntrada,
    error,
  } = React.useContext(ContextGlobal);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!localStorage.getItem("dataSesion")) {
      return navigate("/Login");
    }
  }, []);

  return (
    <div className="w-50">
      {error.state && (
        <div className="alert alert-danger text-center" role="alert">
          {error.message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="">
        <div className="form-group">
          <label>Estacionamiento</label>
          <select
            className="form-control"
            name="estacionamiento"
            onChange={handleChangeEntrada}
            value={formEntrada.estacionamiento}
          >
            <option selected="selected" value="">
              Seleccione un Estacionamiento
            </option>
            {estacionamiento.map((estacionamiento) => (
              <option key={estacionamiento.id} value={estacionamiento.id}>
                {estacionamiento.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Vehiculo</label>
          <div className=" d-flex justify-content-center">
            <select
              className="form-control"
              name="vehiculo"
              onChange={handleChangeEntrada}
              value={formEntrada.vehiculo}
            >
              <option selected="selected" value="">
                Seleccione un Vehiculo
              </option>
              {vehiculos.map((vehiculo) => (
                <option key={vehiculo.id} value={vehiculo.id}>
                  {vehiculo.placa}
                </option>
              ))}
            </select>

            <Link to="/registros_vehiculos">
              <button className="btn btn-primary m-2">
                Añadir otro vehiculo
              </button>
            </Link>
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-4 w-100">
          Registrar
        </button>
        <Link to="/registros_entradas">
          <button type="button" className="btn btn-primary mt-4 w-100">
            Regresar a registros
          </button>
        </Link>
      </form>
    </div>
  );
}

export default RegistrosForm;
