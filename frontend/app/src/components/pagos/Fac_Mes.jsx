import React from "react";

const Fac_Mes_Plantilla = React.forwardRef(({ onPrint }, ref) => {
  return (
    <React.Fragment>
      <div className="container p-4" ref={ref}>
        <div className="row border border-primary ">
          <div className="col-12 border border-primary">
            <h1 className="text-center">Recibo de pago de mes </h1>
          </div>
        </div>
        <div className="row border border-primary">
          <div className="col-6 border border-primary">
            <h3>Vehiculo</h3>
          </div>

          <div className="col-6 border border-primary">
            <h3 className="">Total</h3>
          </div>
        </div>
        <div className="row border border-primary">
          <div className="col-6 border border-primary">
            <h4>{onPrint.vehiculo.placa}</h4>
          </div>
          <div className="col-6 border border-primary">
            <h4>Q{onPrint.importe.toFixed(2)}</h4>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
});

export default Fac_Mes_Plantilla;
