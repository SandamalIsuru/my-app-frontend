import React from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Signup from "../pages/auth/Signup";
import Signin from "../pages/auth/Signin";
import MyContacts from "../pages/protected/MyContacts";
import Layout from "../components/layouts/Layout";
import AuthLayout from "../components/layouts/AuthLayout";
import MyProfile from "../pages/protected/MyProfile";
import { getUserAuthAttributeFromLocalStorage } from "../utils/UserUtill";
import { USER_AUTH_ATTRIBUTES } from "./Constants";

const ProtectedRoute = ({ children }) => {
  const accessToken = getUserAuthAttributeFromLocalStorage(
    USER_AUTH_ATTRIBUTES.ACCESS_TOKEN
  );
  let location = useLocation();

  if (!accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

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
          <Route
            path="my-contacts"
            element={
              <ProtectedRoute>
                <MyContacts />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route element={<Layout />}>
          <Route
            path="my-Profile"
            element={
              <ProtectedRoute>
                <MyProfile />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route element={<Layout />}>
          <Route
            path="my-profile/:edit"
            element={
              <ProtectedRoute>
                <MyProfile />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
