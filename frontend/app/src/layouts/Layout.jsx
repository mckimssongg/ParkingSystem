import React from "react";
import Navbar from "./Navbar";

function Layout(props) {
  return (
    <React.Fragment>
      <Navbar />
      <div className="container p-2">{props.children}</div>
    </React.Fragment>
  );
}

export default Layout;
