import { Button, Card, TextField, Toolbar, Typography } from "@mui/material";

import { Form, Formik, ErrorMessage } from "formik";
import React from "react";
import * as yup from "yup";
const Login = () => {
  const initialValues = {
    username: "user1",
    password: "pw123",
  };
  const validationSchema = yup.object({
    username: yup.string().required("* User Name is required"),
    password: yup.string().required("* Password is required"),
  });
  const handelSubmit = (values) => {
    console.log("called");
    console.log(values);
  };
  const handelChange = (field, setFieldValue) => (e) => {
    setFieldValue(field, e.target.value);
  };
  return (
    <div>
      <Toolbar />

      <Card sx={{ maxWidth: 434, mx: "auto", mt: 8, p: 2 }}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handelSubmit}
        >
          {({ setFieldValue }) => (
            <Form>
              <Typography
                variant="h5"
                letterSpacing={"8px"}
                className="mb-3 text-center  ms-auto"
              >
                Login
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                defaultValue={"user1"}
                size="small"
                label="User Name"
                name="username"
                onChange={handelChange("username", setFieldValue)}
              />
              <ErrorMessage name="username">
                {(message) => <span className="text-danger">{message}</span>}
              </ErrorMessage>

              <TextField
                fullWidth
                variant="outlined"
                size="small"
                className="mt-3"
                defaultValue={"pw123"}
                label="Password"
                name="password"
                onChange={handelChange("password", setFieldValue)}
              />
              <ErrorMessage name="password">
                {(message) => {
                  return <span className="text-danger">{message}</span>;
                }}
              </ErrorMessage>
              <div>
                <Button
                  variant="contained"
                  color="success"
                  type="submit"
                  className="mt-4"
                >
                  Login
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default Login;
