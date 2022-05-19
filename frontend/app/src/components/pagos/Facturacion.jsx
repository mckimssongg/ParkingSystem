import React from "react";

const Fac = React.forwardRef(({ onPrint }, ref) => {
  return (
    <React.Fragment>
      <div className="container p-4" ref={ref}>
        <div className="row border border-primary">
          <div className="col-12 border border-primary">
            <h1 className="text-center">Recibo de pago : 00{onPrint.id}</h1>
          </div>
        </div>
        <div className="row border border-primary">
          <div className="col-4 border border-primary">
            <h3>Vehiculo</h3>
          </div>
          <div className="col-4 border border-primary">
            <h3>Fecha de pago</h3>
          </div>
          <div className="col-4 border border-primary">
            <h3>Tiempo estacionado</h3>
          </div>
        </div>
        <div className="row border border-primary">
          <div className="col-4 border border-primary">
            <h4>{onPrint.vehiculo}</h4>
          </div>
          <div className="col-4 border border-primary">
            <h4>{onPrint.fecha_salida}</h4>
          </div>
          <div className="col-4 border border-primary">
            <h4>
              {onPrint.tiempo_estacionado &&
                onPrint.tiempo_estacionado.toFixed(2)}{" "}
              min
            </h4>
          </div>
        </div>
        <div className="row border border-primary">
            <div className="col-12 border border-primary">
              <h3 className="text-center">Total : Q {onPrint.importe_total}</h3>
            </div>
          </div>
      </div>
    </React.Fragment>
  );
});

export default Fac;
