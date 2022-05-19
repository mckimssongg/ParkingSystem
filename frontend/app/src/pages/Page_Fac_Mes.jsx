import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Fac_Mes_Plantilla from "../components/pagos/Fac_Mes";
import ReactToPrint from "react-to-print";
import { ContextGlobal } from "../context/Context";

function Page_Fac_Mes() {
  const navigate = useNavigate();
  const componetRef2 = React.useRef();
  const { onPrintMes } = React.useContext(ContextGlobal);

  React.useEffect(() => {
    if (onPrintMes.id === null) {
      return navigate("/pagos");
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
          content={() => componetRef2.current}
        />
        
        <Fac_Mes_Plantilla ref={componetRef2} onPrint={onPrintMes} />
        <Link to="/pagos" className="btn btn-info fs-6 mt-4">
          Volver
        </Link>
      </div>
    </React.Fragment>
  );
}

export default Page_Fac_Mes;
