import {Routes, Route, Link} from "react-router-dom";
import BannerHome from "../containers/client/Banner/BannerHome";
import Header from "../containers/client/Header/Header";

function Client() {
  return (
    <div className="client">
      <Header/>
      <BannerHome/>
      <Routes>

      </Routes>
    </div>
  );
}

export default Client;
