import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import UseLocalStorage from "../hooks/local-storage";

const Proctected = () => {
  const [role, setRole] = UseLocalStorage("role", null);
  return role ? <Outlet /> : <Navigate to={"/login"} />;
};

export default Proctected;
