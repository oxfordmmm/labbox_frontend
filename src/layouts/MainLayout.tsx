import { useAuth0 } from "@auth0/auth0-react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import bgimg from "../assets/images/testtubes.png";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";

import "react-toastify/dist/ReactToastify.css";

function MainLayout() {
  const backgroudStyle = {
    backgroundImage: `url(${bgimg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    width: "100vw",
    height: "100vh",
  };

  const { isLoading, error } = useAuth0();

  return (
    <div style={backgroudStyle}>
      <Navbar />
      {error && <div>Oops... {error.message}</div>}
      {isLoading ? <Loading /> : <Outlet />}
      <ToastContainer />
    </div>
  );
}

export default MainLayout;
