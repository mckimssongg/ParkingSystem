import React from "react";
import "./css/Navbar.css";
import { RiLogoutBoxLine } from "react-icons/ri";
import {
  AiFillHome,
  AiFillCar,
  AiOutlineMenuUnfold,
  AiOutlineMenuFold,
  AiFillSetting,
} from "react-icons/ai";
import { BsClipboardCheck, BsClipboardData } from "react-icons/bs";
// import logo from "../assets/img/logo.png";
import { Link } from "react-router-dom";
const SidebarData = [
  {
    title: "Home",
    path: "/",
    cName: "nav-text",
    icon: <AiFillHome />,
  },
  {
    title: "Registros de vehiculos",
    path: "/vehiculos",
    cName: "nav-text",
    icon: <AiFillCar />,
  },
  {
    title: "Registros de entradas",
    path: "/registros_entradas",
    cName: "nav-text",
    icon: <BsClipboardCheck />,
  },
  {
    title: "Registros de pagos",
    path: "/pagos",
    cName: "nav-text",
    icon: <BsClipboardData />,
  },
];

const OpAdmin = [
  {
    title: "Configuraciones",
    path: "/settings",
    cName: "nav-text",
    icon: <AiFillSetting />,
  },
];

function Navbar() {
  const [sidebar, setSidebar] = React.useState(false);
  const role = () => {
    if (JSON.parse(localStorage.getItem("dataSesion"))) {
      if (
        JSON.parse(localStorage.getItem("dataSesion")).user.role === "admin"
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  // borrar la sesion
  const handleLogout = () => {
    localStorage.removeItem("dataSesion");
    window.location.reload();
  };


  const rute = (path) => {
    if (path === "/") {
      return "Home";
    } else if (path === "/vehiculos" || path === "/registros_vehiculos") {
      return "Registros de vehiculos";
    } else if (
      path === "/registros_entradas" ||
      path === "/registros_entradas/form"
    ) {
      return "Registros de entradas";
    } else if (path === "/pagos") {
      return "Registros de pagos";
    } else if (path === "/settings") {
      return "Configuraciones";
    } else {
      return null;
    }
  };

  const showSidebar = () => setSidebar(!sidebar);
  return (
    <React.Fragment>
      <div className="navbar">
        <Link to="#" className="menu-bars">
          <div onClick={showSidebar}>
            <AiOutlineMenuUnfold />
            {rute(window.location.pathname) === null ? (
              ""
            ) : (
              <span className="YesBadge badge bg-info fs-6 ">
                {rute(window.location.pathname)}
              </span>
            )}
          </div>
        </Link>
        <div className="logo ">
          {/* <Link to="/">
            <img src={logo} alt="logo" />
          </Link> */}
        </div>
        <div className="me-2">
          {JSON.parse(localStorage.getItem("dataSesion")) && (
            <span className="badge bg-success fs-6">
              {JSON.parse(localStorage.getItem("dataSesion")).user.username}
            </span>
          )}
          <button
            onClick={handleLogout}
            className="btn btn-lg btn-outline-light"
          >
            <RiLogoutBoxLine />
            Logout
          </button>
        </div>
      </div>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars">
              <AiOutlineMenuFold />
            </Link>
          </li>
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
          {role() &&
            OpAdmin.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
        </ul>
      </nav>
    </React.Fragment>
  );
}

export default Navbar;
