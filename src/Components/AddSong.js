import React from "react";
import { useFormik } from "formik";
import { Prompt } from "react-router";
import * as Yup from "yup";
import { addSongAsync } from "../reducers/songReducer";
import { useDispatch } from "react-redux";
import "../App.css";

const AddSong = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      movie: "",
      title: "",
      length: "",
      singer: "",
    },
    validationSchema: Yup.object({
      movie: Yup.string().required("Movie Name is Required"),
      title: Yup.string().required("Title is Required"),
      length: Yup.string().required("Song length is Required"),
      singer: Yup.string().required("Singer Name is Required"),
    }),
    onSubmit: (values, actions) => {
      let Song = {
        movie: values.movie,
        title: values.title,
        length: values.length,
        singer: values.singer,
      };
      dispatch(addSongAsync(Song));
      actions.resetForm({
        values: {
          movie: "",
          title: "",
          length: "",
          singer: "",
        },
      });
    },
  });
  return (
    <div className="form">
      <h3>Add Song</h3>
      <form onSubmit={formik.handleSubmit}>
        <Prompt
          when={
            formik.values.movie !== "" ||
            formik.values.title !== "" ||
            formik.values.length !== "" ||
            formik.values.singer !== ""
          }
          message="Are you sure to exit without saving?"
        />
        <label htmlFor="movie">Movie</label>
        <input id="movie" type="text" {...formik.getFieldProps("movie")} />
        {formik.touched.movie && formik.errors.movie ? (
          <div className="error">{formik.errors.movie}</div>
        ) : (
          <br />
        )}

        <br />
        <label htmlFor="title">Title</label>
        <input id="title" type="text" {...formik.getFieldProps("title")} />
        {formik.touched.title && formik.errors.title ? (
          <div className="error">{formik.errors.title}</div>
        ) : (
          <br />
        )}

        <br />
        <label htmlFor="length">Length</label>
        <input id="length" type="text" {...formik.getFieldProps("length")} />
        {formik.touched.length && formik.errors.length ? (
          <div className="error">{formik.errors.length}</div>
        ) : (
          <br />
        )}

        <br />
        <label htmlFor="singer">Singer</label>
        <input id="singer" type="text" {...formik.getFieldProps("singer")} />
        {formik.touched.singer && formik.errors.singer ? (
          <div className="error">{formik.errors.singer}</div>
        ) : (
          <br />
        )}

        <br />
        <button className="addButton" type="submit">
          Submit
        </button>
        <br />
      </form>
    </div>
  );
};

export default AddSong;
