import React from "react";
import { Link, useNavigate } from "react-router-dom";
import RegistrosVista from "../components/registros/RegistrosVista";
import Search from "../components/Search";
import { ContextGlobal } from "../context/Context";

function Registros_Entradas() {
  const { searchValue, setSearchValue, registros_entradaSearch } =
    React.useContext(ContextGlobal);

  const navigate = useNavigate();
  React.useEffect(() => {
    if (!localStorage.getItem("dataSesion")) {
      return navigate("/Login");
    }
  }, []);

  return (
    <div>
      <h3 className="text-center NotTitle">Registro de entradas</h3>
      <Search searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="d-flex justify-content-center">
        <Link to="/registros_entradas/form">
          <button className="btn btn-primary mb-4"> Nuevo registro </button>
        </Link>
      </div>
      <RegistrosVista data={registros_entradaSearch} />
    </div>
  );
}

export default Registros_Entradas;
