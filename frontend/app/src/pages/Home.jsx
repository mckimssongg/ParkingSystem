import React from "react";
import { useNavigate } from "react-router-dom";
import { BsFillHouseFill } from "react-icons/bs";
import BoardActivos from "../components/home/BoardActivos";
import { ContextGlobal } from "../context/Context";
import Search from "../components/Search";
import '../css/global.css'

function Home() {
  const navigate = useNavigate();
  const { searchValue, setSearchValue, vehiculosActivosSearch } =
    React.useContext(ContextGlobal);
  React.useEffect(() => {
    if (!localStorage.getItem("dataSesion")) {
      return navigate("/Login");
    }
  });

  return (
    <React.Fragment>
      <div className=" NotTitle d-flex justify-content-center ">
        <h2 className="m-2">
          <BsFillHouseFill />
        </h2>
        <h1 className="m-2">Home</h1>
      </div>
      <Search searchValue={searchValue} setSearchValue={setSearchValue} />
      <BoardActivos data={vehiculosActivosSearch} />
    </React.Fragment>
  );
}
export default Home;
