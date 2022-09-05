import React from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useApi } from "../context/api-provider";

const Gaurd = ({ children }) => {
  const { role } = useApi();

  if (role?.role !== "ADMIN") {
    return <Navigate to={"/unauthorised"} />;
  }
  return <div>{children}</div>;
};

export default Gaurd;
