import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages
import Login from "./pages/Login";
import Home from "./pages/Home";
import Vehiculos from "./pages/Vehiculos";
import Registros_Entradas from "./pages/Registros_Entradas";
import RegistrosForm_Entradas from "./pages/RegistrosForm_Entradas";
import Pagos from "./pages/Pagos";
import Layout from "./layouts/Layout";
import Rregistro_Vehiculos from "./pages/Registro_Vehiculos";
import Page_Fac from "./pages/Page_Fac";
import Settings from "./pages/Settings";
import Page_Fac_Mes from "./pages/Page_Fac_Mes";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/vehiculos" element={<Vehiculos />} />
          <Route
            exact
            path="/registros_vehiculos"
            element={<Rregistro_Vehiculos />}
          />
          <Route
            exact
            path="/registros_entradas"
            element={<Registros_Entradas />}
          />
          <Route
            path="/registros_entradas/form"
            element={<RegistrosForm_Entradas />}
          />
          <Route exact path="/pagos" element={<Pagos />} />
          <Route exact path="/pagos/mes/:id" element={<Page_Fac_Mes />} />
          <Route exact path="/pagos/:id/" element={<Page_Fac />} />
          <Route exact path="/settings" element={<Settings />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
