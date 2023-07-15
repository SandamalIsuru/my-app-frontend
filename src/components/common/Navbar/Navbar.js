import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { IconContext } from "react-icons";
import { SIDEBAR_NAVIGATIONS } from "../../../config/Navigation";
import { clearLocalStorage } from "../../../utils/UserUtill";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <div className="flex">
      <IconContext.Provider value={{ color: "undefined" }}>
        <div className="absolute right-8 top-8">
          <Link to="#" className="text-3xl">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="text-3xl ml-7">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SIDEBAR_NAVIGATIONS.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link
                    to={item.action ? `${item.path}/${item.action}` : item.path}
                    onClick={() => {
                      item.path === "/login" && clearLocalStorage();
                    }}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </div>
  );
}

export default Navbar;
