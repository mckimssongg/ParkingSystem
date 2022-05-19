import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Fac from "../components/pagos/Facturacion";
import ReactToPrint from "react-to-print";
import { ContextGlobal } from "../context/Context";

function Pag_Fac() {
  const navigate = useNavigate();
  const componetRef = React.useRef();
  const { onPrint } = React.useContext(ContextGlobal);

  React.useEffect(() => {
    if (onPrint.id === null) {
      return navigate("/registros_entradas");
    }
    if (!localStorage.getItem("dataSesion")) {
      return navigate("/Login");
    }
  }, []);

  return (
    <React.Fragment>
      <div className="w-100 d-flex flex-column align-content-center">
        <ReactToPrint
          trigger={() =><button className="btn btn-info m-4">Imprimir ahora</button>}
          content={() => componetRef.current}
        />
        
        <Fac ref={componetRef} onPrint={onPrint} />
        <Link to="/registros_entradas" className="btn btn-info fs-6 mt-4">
          Volver
        </Link>
      </div>
    </React.Fragment>
  );
}

export default Pag_Fac;
