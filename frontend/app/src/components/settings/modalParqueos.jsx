import React from "react";
import { ContextGlobal } from "../../context/Context";

function ModalParqueos() {
  const {
    setOpenModal3,
    setOnChange,
    onChange,
    mostrarAlerta,
    error,
    setError,
  } = React.useContext(ContextGlobal);

  const [data, setData] = React.useState({});
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const [data2, setData2] = React.useState({});
  const handleChange2 = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const sendDataA = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:8000/estacionamiento/estacionamientos/", {
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
          setError({
            state: false,
            message: "account created!!!! ",
          });
        }
      });
  };

  const sendDataB = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:8000/estacionamiento/areas/", {
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
          setError({
            state: false,
            message: "account created!!!! ",
          });
        }
      });
  };

  const [ver, setVer] = React.useState(false);

  const [areas, setAreas] = React.useState([]);
  const [estacionamientos, setEstacionamiento] = React.useState([]);

  const estacionamiento = async () => {
    const data = await fetch(
      "http://localhost:8000/estacionamiento/estacionamientos/"
    );
    setEstacionamiento(await data.json());
  };

  const area = async () => {
    const data = await fetch(
      "http://localhost:8000/estacionamiento/areas/"
    );
    setAreas(await data.json());
  };

  React.useEffect(() => {
    estacionamiento();
    area();
  }, [onChange]);

  return (
    <div className=" form-bg bg-primary d-flex flex-column align-items-center  w-50 p-4">
      {!ver && (
        <React.Fragment>
          <form
            method="POST"
            onSubmit={sendDataA}
            className="form-horizontal d-flex flex-column "
            style={{ width: "80%", maxWidth: "600px" }}
          >
            <h3 className="title text-center m-3">Registro de plantas</h3>
            {error.state && (
              <div className="alert alert-danger text-center" role="alert">
                {error.message}
              </div>
            )}
            <div className="form-group m-2 ">
              <label>Nombre de la planta de estacionamiento*</label>
              <input
                className="form-control"
                type="text"
                name="nombre"
                onChange={handleChange}
              />
            </div>
            <div className="d-flex justify-content-center">
              <button className="btn btn-primary m-3 w-50 ">Registrar</button>
              <button
                className="btn btn-info m-3 w-50 "
                type="button"
                onClick={() => {
                  setVer(!ver);
                }}
              >
                Ver Areas
              </button>
              <button
                onClick={() => {
                  setOpenModal3(false);
                }}
                type="button"
                className=" m-3 w-50 btn btn-danger"
              >
                Salir
              </button>
            </div>
          </form>
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
                    estado
                  </th>
                  <th scope="col" className="text-center">
                    total de areas
                  </th>
                  <th scope="col" className="text-center">
                    acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {estacionamientos.map((item) => (
                  <tr key={item.id}>
                    <th scope="row" className=" text-white ">
                      {item.id}
                    </th>
                    <td className="text-center text-white ">{item.nombre}</td>
                    <td className="text-center text-white ">
                      {item.estado && <p>Activo</p>}
                      {!item.estado && <p>False</p>}
                    </td>
                    <td className="text-center text-white ">
                      {item.areas.length}
                    </td>
                    <td>
                      <button className="btn btn-info"> Editar </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </React.Fragment>
      )}
      {ver && (
        <React.Fragment>
          <form
            method="POST"
            onSubmit={sendDataB}
            className="form-horizontal d-flex flex-column "
            style={{ width: "80%", maxWidth: "600px" }}
          >
            <h3 className="title text-center m-3">Registro de Areas</h3>
            {error.state && (
              <div className="alert alert-danger text-center" role="alert">
                {error.message}
              </div>
            )}
            <div className="form-group m-2 ">
              <label>Nombre del area*</label>
              <input
                className="form-control"
                type="text"
                name="nombre"
                onChange={handleChange}
              />
            </div>
            <div className="form-group m-2 ">
              <label>Nombre del estacionamiento*</label>
              <select
                className="form-control"
                name="estacionamiento"
                onChange={handleChange}
              >
                <option value="">Seleccione un estacionamiento</option>
                {estacionamientos.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="d-flex justify-content-center">
              <button className="btn btn-primary m-3 w-50 ">Registrar</button>
              <button
                className="btn btn-info m-3 w-50 "
                type="button"
                onClick={() => {
                  setVer(!ver);
                }}
              >
                Ver Plantas
              </button>
              <button
                onClick={() => {
                  setOpenModal3(false);
                }}
                type="button"
                className=" m-3 w-50 btn btn-danger"
              >
                Salir
              </button>
            </div>
          </form>
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
                    estado
                  </th>
                  <th scope="col" className="text-center">
                    Planta de estacionamiento
                  </th>
                  <th scope="col" className="text-center">
                    acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {areas.map((item) => (
                  <tr key={item.id}>
                    <th scope="row" className=" text-white ">
                      {item.id}
                    </th>
                    <td className="text-center text-white ">{item.nombre}</td>
                    <td className="text-center text-white ">
                      {item.estado && <p>Activo</p>}
                      {!item.estado && <p>False</p>}
                    </td>
                    <td className="text-center text-white ">
                      {item.estacionamiento}
                    </td>
                    <td>
                      <button className="btn btn-info"> Editar </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

export default ModalParqueos;
