import React from "react";

import { useLocation, useNavigate } from "react-router-dom";
import "./error.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";
const Err = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const handelClick = () => {
    console.log(window.history.previous);
    navigate(-1);
  };
  return (
    <div className="error d-flex align-items-center justify-content-center">
      <div className="error-blob "></div>
      {/* {pathname === "/unauthorised" ? (
        <div className="unauthorised">
          <h4>Access Denied</h4>
          <p>You are not authorised to access this page </p>
          <Button>Back to login</Button>
        </div> */}

      <div className="error-card shadow-sm">
        {pathname === "/unauthorised" ? (
          <div className="unauthorised d-flex flex-column align-items-center">
            <h4>Access Denied</h4>
            <p>You are not authorised to access this page </p>
            <Button
              onClick={() => {
                navigate("/login");
              }}
              variant="contained"
            >
              Back to login
            </Button>
          </div>
        ) : (
          <>
            <div className="error-card__header text-center">
              <h2>404 </h2>
              <h6>Page Not Found</h6>
            </div>
            <div className="error-card__body text-center">
              <p>
                The page you are looking for is not found or may have been
                removed or renamed
              </p>
            </div>
            <div className="actions">
              <Button onClick={handelClick} variant="contained">
                <ArrowBackIcon />
                <span className="ms-2"> Go Back</span>
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Err;
