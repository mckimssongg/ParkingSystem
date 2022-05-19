import React from "react";
const ContextGlobal = React.createContext();

import {
  getDataVehiculosActivos,
  getDataVehiculos,
  mostrarAlerta,
  getDataTipos,
  getDataRegistrosEntradas,
  getDataEstacionamiento,
  getDataVehiculosEntrada,
  GetCuentaPorPlaca,
  getPagos,
  getRole,
  user,
} from "../services/Api";

function ContextGlobalProvider(props) {
  const [data, setData] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [tipos, setTipos] = React.useState([]);
  const [onChange, setOnChange] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [openModal2, setOpenModal2] = React.useState(false);
  const [openModal3, setOpenModal3] = React.useState(false);
  const [openModal4, setOpenModal4] = React.useState(false);
  const [onPrint, setOnPrint] = React.useState({
    id: null,
    fecha_pago: "",
    importe_total: 0,
    registro_entrada: {},
  });
  const [onPrintMes, setOnPrintMes] = React.useState({
    id: null,
    fecha_pago: "",
    importe: 0,
    tiempo_estacionado: 0,
    vehiculo: {
      id: null,
      placa: "",
    },
  });
  const [actualizarVehiculo, setActualizarVehiculo] = React.useState({});
  const vehiculosSearch = [];
  if (searchValue !== "") {
    data.map((item) => {
      if (item.placa.toLowerCase().includes(searchValue.toLowerCase())) {
        vehiculosSearch.push(item);
      }
    });
  } else {
    vehiculosSearch.push(...data);
  }

  const [vehiculosActivos, setVehiculosActivos] = React.useState([]);
  const vehiculosActivosSearch = [];

  if (searchValue !== "") {
    vehiculosActivos.map((item) => {
      if (item.placa.toLowerCase().includes(searchValue.toLowerCase())) {
        vehiculosActivosSearch.push(item);
      }
    });
  } else {
    vehiculosActivosSearch.push(...vehiculosActivos);
  }

  const cambiarEstado = async (item) => {
    // cambiar estado de un vehiculo para borrarlo
    await fetch(`http://127.0.0.1:8000/vehiculos/vehiculos/${item.id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        placa: item.placa,
        tipo_vehiculo: item.tipo_vehiculo,
        descripcion: item.descripcion,
        estado: false,
        tipo_residencia: tipos.find(
          (tipo) => tipo.nombre === item.tipo_residencia
        ).id,
      }),
    }).then(() => {
      getDataVehiculos(setData);
      setOnChange(!onChange);
    });
  };

  // Formulario para registrar vehiculos ( estados )
  const [form, setForm] = React.useState({
    placa: "",
    tipo_vehiculo: "",
    descripcion: "",
    estado: true,
    tipo_residencia: null,
  });

  const [error, setError] = React.useState({
    state: false,
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const creatCuenta = async (data) => {
    const res = await fetch(`http://localhost:8000/registros/registro_pago/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        importe: 0,
        tiempo_estacionado: 0,
        fin_mes: false,
        is_active: true,
        vehiculo: data.id,
      }),
    });
    const response = await res.json();
  };
  
  const sendData = async (e) => {
    // enviar datos del formulario de registro de nuevo vehiculo
    e.preventDefault();
    const DATA = await fetch("http://127.0.0.1:8000/vehiculos/vehiculos/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const data = await DATA.json();
    if (
      typeof data.descripcion != "string" ||
      typeof data.placa != "string" ||
      typeof data.tipo_residencia != "string" ||
      typeof data.tipo_vehiculo != "string"
    ) {
      return setError({
        state: true,
        message: "Invalid Credentials",
      });
    } else {
      mostrarAlerta();
      if (data.tipo_residencia === "residente") {
        await creatCuenta(data);
      }
      setOnChange(!onChange);
      return setError({
        state: false,
        message: "",
      });
    }
  };

  // Registros de entradas y Formulario de entrada ( estados )
  const [dataEntradas, setDataEntrada] = React.useState([]);
  const registros_entradaSearch = [];
  if (searchValue !== "") {
    dataEntradas.map((item) => {
      if (item.vehiculo.toLowerCase().includes(searchValue.toLowerCase())) {
        registros_entradaSearch.push(item);
      }
    });
  } else {
    registros_entradaSearch.push(...dataEntradas);
  }

  // Formulario Registros de entradas ( estados )
  const [vehiculos, setVehiculos] = React.useState([]);
  const [estacionamiento, setEstacionamiento] = React.useState([]);

  const [User, setUser] = React.useState({
    // de momento no me acuerdo para que hice esto
    id: "",
    username: "",
    email: "",
    role: "",
  });

  const [cuentaId, setCuentaId] = React.useState(null);

  const [formEntrada, setFormEntrada] = React.useState({
    estado_de_salida: false,
    estacionamiento: null,
    vehiculo: null,
    a_cargo_de: null,
    cuenta_por_cobrar: null,
  });

  const handleChangeEntrada = async (e) => {
    setFormEntrada({
      ...formEntrada,
      [e.target.name]: e.target.value,
      a_cargo_de: User.id,
      cuenta_por_cobrar: cuentaId,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(
      "http://127.0.0.1:8000/registros/registro_entrada/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formEntrada),
      }
    );
    const response = await res.json();
    if (
      typeof response.estacionamiento != "string" ||
      typeof response.vehiculo != "string"
    ) {
      console.log(response);
      return setError({
        state: true,
        message: "Invalid Credentials",
      });
    } else {
      mostrarAlerta();
      setOnChange(!onChange);
      setError({
        state: false,
        message: "",
      });
    }
  };

  //Tabla de pagos

  const [pagos, setPagos] = React.useState([]);

  const pagosSearch = [];

  if (searchValue !== "") {
    pagos.map((item) => {
      if (
        item.vehiculo.placa.toLowerCase().includes(searchValue.toLowerCase())
      ) {
        pagosSearch.push(item);
      }
    });
  } else {
    pagosSearch.push(...pagos);
  }

  const [role, setRole] = React.useState([]);

  const [infoPago, setInfoPago] = React.useState([]);

  React.useEffect(() => {
    getDataVehiculosActivos(setVehiculosActivos);
    getPagos(setPagos);
    getDataVehiculosEntrada(setVehiculos);
    getDataEstacionamiento(setEstacionamiento);
    getDataRegistrosEntradas(setDataEntrada);
    getDataTipos(setTipos);

    GetCuentaPorPlaca(formEntrada.vehiculo, setCuentaId);
    getDataVehiculos(setData);
    user(setUser);
    getRole(setRole);
  }, [onChange, setOnChange, formEntrada]);

  return (
    <ContextGlobal.Provider
      value={{
        mostrarAlerta,
        searchValue,
        setSearchValue,
        vehiculosActivosSearch,
        vehiculosSearch,
        registros_entradaSearch,
        pagosSearch,
        setOnPrint,
        onPrint,
        onPrintMes,
        setOnPrintMes,
        infoPago,
        setInfoPago,
        openModal,
        setOpenModal,
        openModal2,
        setOpenModal2,
        openModal3,
        setOpenModal3,
        openModal4,
        setOpenModal4,
        onChange,
        setOnChange,
        error,
        setError,
        data,
        role,
        tipos,
        estacionamiento,
        vehiculos,
        form,
        sendData,
        handleChange,
        cambiarEstado,
        // Registros de entradas
        formEntrada,
        handleChangeEntrada,
        handleSubmit,
        // Update
        actualizarVehiculo,
        setActualizarVehiculo,
        creatCuenta,
      }}
    >
      {props.children}
    </ContextGlobal.Provider>
  );
}

export { ContextGlobal, ContextGlobalProvider };
