import React from "react";
import { useFormik } from "formik";
import { Prompt } from "react-router";
import * as Yup from "yup";
import { addSongAsync } from "../reducers/songReducer";
import { useDispatch } from "react-redux";

const AddSong = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      movie: "",
      title: "",
      year: "",
      singer: "",
      length: "",
      web_url: "",
      img_url:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/red-heart-with-headphones-on-blue-background-royalty-free-image-1610663546.?crop=0.668xw:1.00xh;0.332xw,0&resize=640:*",
    },
    validationSchema: Yup.object({
      movie: Yup.string().required("Movie Name is Required"),
      title: Yup.string().required("Title is Required"),
      year: Yup.string().required("Year is Required"),
      singer: Yup.string().required("Singer is Required"),
      length: Yup.string().required("length is Required"),
      web_url: Yup.string().required("Youtube link is Required"),
      img_url: Yup.string().required("Image URL is Required"),
    }),
    onSubmit: (values, actions) => {
      let Song = {
        movie: values.movie,
        title: values.title,
        year: values.year,
        singer: values.singer,
        length: values.length,
        web_url: values.web_url,
        img_url: values.img_url,
      };
      dispatch(addSongAsync(Song));

      actions.resetForm({
        values: {
          movie: "",
          title: "",
          year: "",
          length: "",
          singer: "",
          web_url: "",
          img_url: "",
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
        <label htmlFor="year">Year</label>
        <input id="year" type="text" {...formik.getFieldProps("year")} />
        {formik.touched.year && formik.errors.year ? (
          <div className="error">{formik.errors.year}</div>
        ) : (
          <br />
        )}

        <br />
        <label htmlFor="web_url">YouTube Link</label>
        <input id="web_url" type="text" {...formik.getFieldProps("web_url")} />
        {formik.touched.web_url && formik.errors.web_url ? (
          <div className="error">{formik.errors.web_url}</div>
        ) : (
          <br />
        )}

        <br />
        <label htmlFor="img_url">Image URL</label>
        <input id="img_url" type="text" {...formik.getFieldProps("img_url")} />
        {formik.touched.img_url && formik.errors.img_url ? (
          <div className="error">{formik.errors.img_url}</div>
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
