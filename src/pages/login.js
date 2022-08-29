import { Button, Card, TextField, Toolbar, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Form, Formik, ErrorMessage } from "formik";
import React from "react";
import * as yup from "yup";
import "./login.css";
import { useApi } from "../context/api-provider";
const Login = () => {
  const initialValues = {
    username: "user1",
    password: "pw123",
  };
  const { login } = useApi();
  const navigate = useNavigate();
  const validationSchema = yup.object({
    username: yup.string().required("* User Name is required"),
    password: yup.string().required("* Password is required"),
  });
  const handelSubmit = (values) => {
    // console.log("called");
    // console.log(values);
    // navigate("/search");
    login(values);
  };
  const handelChange = (field, setFieldValue) => (e) => {
    setFieldValue(field, e.target.value);
  };
  return (
    <div className="login">
      <Toolbar />
      <div className="login-form">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handelSubmit}
        >
          {({ setFieldValue }) => (
            <Form>
              <Typography
                variant="h5"
                className="mb-3 text-center  ms-auto text-light font-vn-medium"
              >
                Sign In
              </Typography>
              {/* <TextField
                fullWidth
                variant="outlined"
                defaultValue={"user1"}
                size="small"
                label="User Name"
                name="username"
                onChange={handelChange("username", setFieldValue)}
              /> */}
              <input
                defaultValue={"user1"}
                onChange={handelChange("username", setFieldValue)}
                name="username"
                type="text"
                className="form-control"
              />
              <ErrorMessage name="username">
                {(message) => <span className="text-danger">{message}</span>}
              </ErrorMessage>

              {/* <TextField
                fullWidth
                variant="outlined"
                size="small"
                className="mt-3"
                defaultValue={"pw123"}
                label="Password"
                name="password"
                onChange={handelChange("password", setFieldValue)}
              /> */}
              <input
                defaultValue={"pw123"}
                type="password"
                name="password"
                className="form-control mt-3"
                onChange={handelChange("password", setFieldValue)}
              />
              <ErrorMessage name="password">
                {(message) => {
                  return <span className="text-danger">{message}</span>;
                }}
              </ErrorMessage>
              <div className="forgot-password d-flex">
                <Link className="ms-auto link" to={"/login"}>
                  Forgot password
                </Link>
              </div>

              <div className="d-flex">
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  size="small"
                  sx={{ textTransform: "capitalize" }}
                  className="mt-4 mx-auto"
                >
                  Show me the monroney
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
