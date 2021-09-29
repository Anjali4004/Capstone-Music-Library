import React from "react";
import { useFormik } from "formik";
// import { Prompt } from "react-router";
import * as Yup from "yup";
import { addUserAsync } from "../reducers/songReducer";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      location: "",
      mobile: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Email is Required"),
      firstName: Yup.string().required("FirstName is Required"),
      lastName: Yup.string().required("Last Name is Required"),
      password: Yup.string().required("Password is Required"),
      location: Yup.string().required("Location is Required"),
      mobile: Yup.string().required("Mobile is Required"),
    }),
    onSubmit: (values, actions) => {
      let user = {
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        password: values.password,
        location: values.location,
        mobile: values.mobile,
      };
      dispatch(addUserAsync(user));
      history.push("/songs");
    },
  });
  return (
    <div className="form">
      <h2>
        <b>Registration</b>
      </h2>
      <br />

      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" {...formik.getFieldProps("email")} />
        {formik.touched.email && formik.errors.email ? (
          <div className="error">{formik.errors.email}</div>
        ) : (
          <br />
        )}

        <br />
        <label htmlFor="firstName">FirstName</label>
        <input
          id="firstName"
          type="text"
          {...formik.getFieldProps("firstName")}
        />
        {formik.touched.firstName && formik.errors.firstName ? (
          <div className="error">{formik.errors.firstName}</div>
        ) : (
          <br />
        )}

        <br />
        <label htmlFor="lastName">LastName</label>
        <input
          id="lastName"
          type="text"
          {...formik.getFieldProps("lastName")}
        />
        {formik.touched.lastName && formik.errors.lastName ? (
          <div className="error">{formik.errors.lastName}</div>
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
        <label htmlFor="location">Location</label>
        <input
          id="location"
          type="text"
          {...formik.getFieldProps("location")}
        />
        {formik.touched.location && formik.errors.location ? (
          <div className="error">{formik.errors.location}</div>
        ) : (
          <br />
        )}
        <br />
        <label htmlFor="mobile">Mobile</label>
        <input id="mobile" type="number" {...formik.getFieldProps("mobile")} />
        {formik.touched.mobile && formik.errors.mobile ? (
          <div className="error">{formik.errors.mobile}</div>
        ) : (
          <br />
        )}

        <br />
        <button className="register" type="submit">
          <h4>REGISTER</h4>
        </button>
        <br />
      </form>
    </div>
  );
};

export default Register;
