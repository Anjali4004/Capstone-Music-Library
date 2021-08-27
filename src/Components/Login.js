import React from "react";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";

function Login() {
  const users = useSelector((state) => state.users);

  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Email is Required"),
      password: Yup.string().required("Password is Required"),
    }),
    onSubmit: (values) => {
      let x = {
        email: values.email,
        password: values.password,
      };
      localStorage.setItem("email", x.email);
      users
        .filter(
          (user) => user.email === x.email && user.password === x.password
        )
        .map((user) => history.push(`/loggedIn/${user.id}`));
    },
  });
  return (
    <div className="form">
      <h3>Login</h3>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">UserName</label>
        <input id="email" type="email" {...formik.getFieldProps("email")} />
        {formik.touched.email && formik.errors.email ? (
          <div className="error">{formik.errors.email}</div>
        ) : (
          <br />
        )}

        <br />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          {...formik.getFieldProps("password")}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="error">{formik.errors.password}</div>
        ) : (
          <br />
        )}

        <br />
        <button className="login" type="submit">
          Login
        </button>
        <br />
      </form>
    </div>
  );
}
export default Login;
