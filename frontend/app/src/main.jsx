import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ContextGlobalProvider } from "./context/Context";
import "./css/bootstrap.min.css";
import "./css/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextGlobalProvider>
      <App />
    </ContextGlobalProvider>
  </React.StrictMode>
);
