import React from "react";
import { Outlet } from "react-router-dom";
import Logo from "./Logo";
import Navbar from "./Navbar/Navbar";
import backgroundImage from "../../assets/images/background.jpeg";

const Layout = () => {
  return (
    <div
      className="flex flex-row h-screen w-screen overflow-hidden text-textPrimary"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute text-xl h-10 w-32 border-2 border-hoverBackground ml-8 mt-3">
        <Logo />
      </div>
      <Navbar />
      <div className="mt-28 mx-8 mb-8 w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
