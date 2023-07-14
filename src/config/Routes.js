import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "../pages/auth/Signup";
import Signin from "../pages/auth/Signin";
import MyContacts from "../pages/protected/MyContacts";
import Layout from "../components/layouts/Layout";
import AuthLayout from "../components/layouts/AuthLayout";
import MyProfile from "../pages/protected/MyProfile";
import EditProfile from "../pages/protected/EditProfile";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="signup" element={<Signup />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Signin />} />
        </Route>

        <Route element={<Layout />}>
          <Route path="my-contacts" element={<MyContacts />} />
        </Route>
        <Route element={<Layout />}>
          <Route path="my-Profile" element={<MyProfile />} />
        </Route>
        <Route element={<Layout />}>
          <Route path="edit-profile" element={<EditProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
