import React from "react";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";

function Login(props) {
  const users = useSelector((state) => state.users);
  let auth = false;
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: (values) => {
      let x = {
        email: values.email,
        password: values.password,
      };

      users
        .filter(
          (user) => user.email === x.email && user.password === x.password
        )
        .map((user) => {
          return (
            <>
              {(auth = true)}
              {localStorage.setItem("email", x.email)}
              {history.push(`/loggedIn/${user.id}`)}
            </>
          );
        });

      auth === false && alert("UserName or password is incorrect...");
    },
  });
  return (
    <div className="form">
      <h2>
        <b>Login</b>
      </h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="wrap-input">
          <input
            id="Useremail"
            type="email"
            placeholder="Email"
            {...formik.getFieldProps("email")}
          />
          <i className="fa fa-envelope" />
          <br />
          <br />
          <br />
        </div>
        <div className="wrap-input">
          <input
            id="Userpwd"
            type="password"
            placeholder="Password"
            {...formik.getFieldProps("password")}
          />
          <i className="fa fa-lock" />
          <br />
          <br />
          <br />
        </div>
        <button className="login" type="submit">
          <h3>LOGIN</h3>
        </button>
        <br />
      </form>
    </div>
  );
}
export default Login;
