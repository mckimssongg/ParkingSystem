import React from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "../modal/index";
import { ContextGlobal } from "../context/Context";
import Estacionamiento from "../assets/img/estacionamiento.png";
import roles from "../assets/img/roles.png";
import usuarios from "../assets/img/verificar.png";
import tarifas from "../assets/img/tarifa.png";
import ModalUsuarios from "../components/settings/modalUsuarios";
import ModalRoles from "../components/settings/modalRoles";
import ModalParqueos from "../components/settings/modalParqueos";
import ModalTarifas from "../components/settings/modalTarifas";
function Settings() {
  const navigate = useNavigate();

  const {
    openModal,
    setOpenModal,

    openModal2,
    setOpenModal2,

    openModal3,
    setOpenModal3,

    openModal4,
    setOpenModal4,
  } = React.useContext(ContextGlobal);

  React.useEffect(() => {
    if (!localStorage.getItem("dataSesion")) {
      return navigate("/Login");
    } else {
      if (
        JSON.parse(localStorage.getItem("dataSesion")).user.role !== "admin"
      ) {
        return navigate("/");
      }
    }
  }, []);

  return (
    <div className="container">
      <h3 className="text-center mt-5 NotTitle">Configuración</h3>
      <div className="row text-center justify-content-evenly align-items-center  mt-5">
        <div className="col col-lg-2  HoverStandar p-4">
          Registrar usuarios
          <img
            src={usuarios}
            className="img-fluid"
            onClick={() => {
              setOpenModal((prevState) => !prevState);
            }}
          />
          {!!openModal && (
            <Modal>
              <ModalUsuarios />
            </Modal>
          )}
        </div>
        <div className="col col-lg-2   HoverStandar  p-4">
          Administrar Roles
          <img
            src={roles}
            className="img-fluid"
            onClick={() => {
              setOpenModal2((prevState) => !prevState);
            }}
          />
          {!!openModal2 && (
            <Modal>
              <ModalRoles />
            </Modal>
          )}
        </div>
        <div className="col  col-lg-2  HoverStandar p-4">
          Administrar Estacionamientos y areas
          <img
            src={Estacionamiento}
            className="img-fluid"
            onClick={() => {
              setOpenModal3((prevState) => !prevState);
            }}
          />
          {!!openModal3 && (
            <Modal>
              <ModalParqueos />
            </Modal>
          )}
        </div>
        <div className="col col-lg-2   HoverStandar  p-4">
          Tarifas de residencias
          <img
            src={tarifas}
            className="img-fluid"
            onClick={() => {
              setOpenModal4((prevState) => !prevState);
            }}
          />
          {!!openModal4 && (
            <Modal>
              <ModalTarifas />
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
}

export default Settings;
