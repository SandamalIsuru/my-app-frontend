import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Logo from "../common/Logo";
import Navbar from "../common/Navbar/Navbar";
import { AppContext } from "../../appContexts";
import PopupWrapper from "../common/PopupWrapper";
import Toast from "../common/Toast";
import { MainBackground } from "../../assets/images";

const Layout = () => {
  const { popup } = useContext(AppContext);

  return (
    <div
      className="flex flex-row relative text-textPrimary min-h-screen"
      style={{
        backgroundImage: `url(${MainBackground})`,
      }}
    >
      <div className="absolute text-xl h-10 w-32 border-2 border-hoverBackground ml-6 mt-3">
        <Logo />
      </div>
      <Navbar />
      <div className="mt-28 mx-8 mb-8 w-full h-auto">
        <Outlet />
      </div>
      <Toast />
      {popup && <PopupWrapper content={<>{popup}</>} />}
    </div>
  );
};

export default Layout;
