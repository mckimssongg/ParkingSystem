import React from "react";

import ReactLoading from "react-loading";

const Loader = () => {
  return (
    <React.Fragment>
      <div className="d-flex justify-content-center">
        <br/>
        <ReactLoading
          type={"cubes"}
          color={"#000"}
          height={"20%"}
          width={"20%"}
        />
      </div>
    </React.Fragment>
  );
};

export default Loader;
