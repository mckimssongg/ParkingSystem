import React from "react";
import { ContextGlobal } from "../../context/Context";

function ModalUsuarios() {
  const { setOpenModal, setOnChange, onChange, mostrarAlerta, role} =
    React.useContext(ContextGlobal);

  const [error, setError] = React.useState({
    state: false,
    message: "",
  });
  const [data, setData] = React.useState({
    username: "",
    email: "",
    role: "",
    password: "",
    password_confirmation: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };


  const sendData = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:8000/users/users/", {
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

  const [user, setUser] = React.useState([]);

  const users = async () => {
    const datauser = await fetch("http://localhost:8000/users/userlist");
    setUser(await datauser.json());
  };

  React.useEffect(() => {
    users();
  }, [onChange]);

  return (
    <div className=" form-bg bg-primary d-flex flex-column align-items-center  w-50 p-4">
      {!ver && (
        <form
          method="POST"
          onSubmit={sendData}
          className="form-horizontal d-flex flex-column "
          style={{ width: "80%", maxWidth: "600px" }}
        >
          <h3 className="title text-center m-3">Registro de usuario</h3>
          {error.state && (
            <div className="alert alert-danger text-center" role="alert">
              {error.message}
            </div>
          )}
          <div className="form-group m-2 ">
            <label>User Name*</label>
            <input
              className="form-control"
              type="text"
              name="username"
              onChange={handleChange}
            />
          </div>
          <div className="form-group m-2">
            <label>Email ID*</label>
            <input
              className="form-control"
              type="email"
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="form-group m-2">
            <label>Role*</label>
            <select
              className="form-control"
              name="role"
              onChange={handleChange}
            >
              <option value="">Select Role</option>
              {role.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group m-2">
            <label>Password*</label>
            <input
              className="form-control"
              type="password"
              name="password"
              onChange={handleChange}
            />
          </div>
          <div className="form-group m-2">
            <label>Confirm Password*</label>
            <input
              className="form-control"
              type="password"
              name="password_confirmation"
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
              Ver Listado
            </button>
            <button
              onClick={() => {
                setOpenModal(false);
              }}
              type="button"
              className=" m-3 w-50 btn btn-danger"
            >
              Salir
            </button>
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
                  username
                </th>
                <th scope="col" className="text-center">
                  role
                </th>
                <th scope="col" className="text-center">
                  email
                </th>
                <th scope="col" className="text-center">
                  acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {user.map((item) => (
                <tr key={item.id}>
                  <th scope="row" className=" text-white ">
                    {item.id}
                  </th>
                  <td className="text-center text-white ">{item.username}</td>
                  <td className="text-center text-white ">{item.role}</td>
                  <td className="text-center text-white ">{item.email}</td>
                  <td>
                    <button className="btn btn-info"> Editar </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-flex justify-content-center">
            <button
              className="btn btn-primary m-3 w-50 "
              type="button"
              onClick={() => {
                setVer(!ver);
              }}
            >
              registrar nuevo usuario
            </button>
            <button
              onClick={() => {
                setOpenModal(false);
              }}
              type="button"
              className=" m-3 w-50 btn btn-danger"
            >
              Salir
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ModalUsuarios;
