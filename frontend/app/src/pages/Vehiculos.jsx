import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ContextGlobal } from "../context/Context";
import TablaVehiculos from "../components/vehiculos/TablaVehiculos";
import { Modal } from "../modal/index";
import PutVehiculos from "../components/vehiculos//PutVehiculo";

import Search from "../components/Search";
function Vehiculos() {
  const navigate = useNavigate();
  const {
    searchValue,
    setSearchValue,
    vehiculosSearch,
    openModal,
  } = React.useContext(ContextGlobal);

  React.useEffect(() => {
    if (!localStorage.getItem("dataSesion")) {
      return navigate("/Login");
    }
  });

  return (
    <div className="container">
      <h3 className="text-center NotTitle">Registro de vehiculos</h3>
      <Search searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="d-flex justify-content-center">
        <Link to="/registros_vehiculos">
          <button className="btn btn-primary mb-4">Agregar vehiculo</button>
        </Link>
      </div>
      <TablaVehiculos data={vehiculosSearch} />
      {!!openModal && (
        <Modal>
          <PutVehiculos />
        </Modal>
      )}
    </div>
  );
}

export default Vehiculos;
