import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Logo from "../common/Logo";
import { AppContext } from "../../appContexts";
import PopupWrapper from "../common/PopupWrapper";
import { AuthBackground } from "../../assets/images";
import classNames from "classnames";

const AuthLayout = () => {
  const { popup } = useContext(AppContext);

  return (
    <div
      className="flex flex-col h-screen w-screen overflow-hidden text-textPrimary"
      style={{ backgroundImage: `url(${AuthBackground})` }}
    >
      <div className="absolute text-xl h-10 w-32 border-2 border-hoverBackground ml-6 mt-3 ">
        <Logo />
      </div>
      <div className="h-1/5 md:h-1/4 w-full"></div>
      <div className={classNames("h-4/5 md:h-1/4 w-full")}>
        <Outlet />
      </div>
      {popup && <PopupWrapper content={<>{popup}</>} />}
    </div>
  );
};

export default AuthLayout;
