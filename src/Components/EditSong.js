import React, { useState } from "react";
import { useFormik } from "formik";
import { Prompt } from "react-router";
import * as Yup from "yup";
import { loadSongsAsync, UpdateSongAsync } from "../reducers/songReducer";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "../App.css";

const UpdateSong = (props) => {
  let song;
  const dispatch = useDispatch();
  const history = useHistory();
  const id = Number(props?.match.params.id);
  const songs = useSelector((state) => state.songs);
  songs?.filter((s) => s.id === id).map((val) => (song = val));
  var songId = song?.id;
  console.log(songId);
  const formik = useFormik({
    initialValues: {
      movie: song?.movie,
      title: song?.title,
      year: song?.year,
      singer: song?.singer,
      length: song?.length,
      web_url: song?.web_url,
    },
    validationSchema: Yup.object({
      movie: Yup.string().required("Movie Name is Required"),
      title: Yup.string().required("Title is Required"),
      year: Yup.string().required("Year is Required"),
      singer: Yup.string().required("Singer is Required"),
      length: Yup.string().required("length is Required"),
      web_url: Yup.string().required("Youtube link is Required"),
    }),
    onSubmit: (values) => {
      let Song = {
        id: song?.id,
        movie: values.movie,
        title: values.title,
        year: values.year,
        singer: values.singer,
        length: values.length,
        web_url: values.web_url,
        img_url: song?.img_url,
      };
      dispatch(UpdateSongAsync(Song));
      dispatch(loadSongsAsync());
      history.push("/");
    },
  });
  return (
    <div className="form">
      <h3>Add Song</h3>
      <form onSubmit={formik.handleSubmit}>
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
        <button className="addButton" type="submit">
          Update
        </button>
        <br />
      </form>
    </div>
  );
};

export default UpdateSong;
