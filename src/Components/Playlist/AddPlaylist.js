import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addPlaylistAsync } from "../../reducers/playlistReducer";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const AddPlaylist = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is Required"),
    }),
    onSubmit: (values) => {
      let playlist = {
        name: values.name,
      };
      dispatch(addPlaylistAsync(playlist));
      props.handleCallBack(false);
    },
  });
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Name</label>
        <input id="name" type="text" {...formik.getFieldProps("name")} />
        {formik.touched.name && formik.errors.name ? (
          <div className="error">{formik.errors.name}</div>
        ) : (
          <br />
        )}

        <br />
        <button className="btn btn-success addButton" type="submit">
          Add Playlist
        </button>
        <br />
      </form>
    </div>
  );
};

export default AddPlaylist;
