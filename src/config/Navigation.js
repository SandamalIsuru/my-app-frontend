import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";

export const SIDEBAR_NAVIGATIONS = [
  {
    title: "My Contacts",
    path: "/my-contacts",
    icon: <AiIcons.AiFillContacts />,
    cName: "nav-text",
  },
  {
    title: "My Profile",
    path: "/my-profile",
    icon: <AiIcons.AiFillProfile />,
    cName: "nav-text",
  },
  {
    title: "Edit Profile",
    path: "/my-profile",
    icon: <FaIcons.FaEdit />,
    cName: "nav-text",
    action: "edit",
  },
  {
    title: "Logout",
    path: "/login",
    icon: <FaIcons.FaSignOutAlt />,
    cName: "nav-text",
  },
];
