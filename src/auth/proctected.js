import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import UseLocalStorage from "../hooks/local-storage";

const Proctected = () => {
  const location = useLocation();
  const [role, setRole] = UseLocalStorage("user", null);
  useEffect(() => {
    console.log(location);
  }, [window.location.pathname]);
  return role ? (
    <Outlet />
  ) : (
    <Navigate state={{ from: location }} replace to={"/login"} />
  );
};

export default Proctected;
