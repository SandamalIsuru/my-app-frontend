import React from "react";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Signup from "../pages/auth/Signup";
import Signin from "../pages/auth/Signin";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
