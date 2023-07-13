import React from "react";
import { Outlet } from "react-router-dom";
import Logo from "./Logo";
import Navbar from "./Navbar/Navbar";
import backgroundImage from "../../assets/images/background.jpeg";

const AuthLayout = () => {
  return (
    <div
      className="flex flex-row h-screen w-screen overflow-hidden text-textPrimary"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute text-xl h-10 w-32 border-2 border-hoverBackground ml-6 mt-3 ">
        <Logo />
      </div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
