import React from "react";
import { useNavigate } from "react-router-dom";
import FormVehiculos from "../components/vehiculos/formVehiculos";

function Rregistro_Vehiculos() {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!localStorage.getItem("dataSesion")) {
      return navigate("/Login");
    }
  });

  return (
    <div className="container ">
      <h3 className="text-center ">Registro de vehiculos</h3>
      <FormVehiculos />
    </div>
  );
}

export default Rregistro_Vehiculos;
