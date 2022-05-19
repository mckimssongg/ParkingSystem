import React from "react";
import { useNavigate } from "react-router-dom";
import PagosVista from "../components/pagos/PagosVista";
import Search from "../components/Search";
import { ContextGlobal } from "../context/Context";
import ModalRegistros from "../components/pagos/modalRegistros";
import { Modal } from "../modal/index";

function Pagos() {
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!localStorage.getItem("dataSesion")) {
      return navigate("/Login");
    }
  }, []);

  const { searchValue, setSearchValue, pagosSearch, openModal, setOpenModal } =
    React.useContext(ContextGlobal);

  return (
    <div>
      <h3 className="text-center NotTitle">Registro de pagos</h3>
      <Search searchValue={searchValue} setSearchValue={setSearchValue} />
      <PagosVista dataPagos={pagosSearch} />
      {!!openModal && (
        <Modal>
          <div className="container d-flex flex-column align-items-center">
            <ModalRegistros />
            <button
              className="btn btn-danger fs-6 m-4 w-50"
              onClick={() => {
                setOpenModal(false);
              }}
            >
              Regresar
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Pagos;
