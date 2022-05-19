import React from "react";
import { AvisoHome } from "../Aviso";
import Loader from "../Loader";
function BoardActivos({ data }) {
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    if (data.length > 0) {
      setLoading(false);
    }
  });

  if (data.length === 0) {
    return <AvisoHome />;
  }
  if (loading) {
    return <Loader />;
  } else {
    return (
      <div className="table-responsive overflow-auto heigthTableStandar">
        <table className="table table-striped text-center">
          <thead className="sticky-top table-dark menorZindex">
            <tr>
              <th scope="col">id</th>
              <th scope="col">placa</th>
              <th scope="col">tipo de vehiculo</th>
              <th scope="col">descripcion</th>
              <th scope="col">tipo de residencia</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>{item.placa}</td>
                <td>{item.tipo_vehiculo}</td>
                <td>{item.descripcion}</td>
                <td>{item.tipo_residencia}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default BoardActivos;
