import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import {
  deletePlaylistAsync,
  loadPlaylistAsync,
} from "../../reducers/playlistReducer";
import AddPlaylist from "./AddPlaylist";
import { useHistory } from "react-router-dom";

function ViewPlaylist() {
  const [showModal, setShow] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(loadPlaylistAsync());
  }, [dispatch, showModal]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const setModal = (val) => setShow(val);
  const deletePlaylist = (itemId) => {
    dispatch(deletePlaylistAsync(itemId));
    dispatch(loadPlaylistAsync());
  };

  let playlist = useSelector((state) => state.playlist);
  return (
    <div>
      <div
        className="cp-playlist"
        style={{ cursor: "pointer" }}
        onClick={handleShow}
      >
        <i className="fa fa-plus" />
        <h3>Create Playlist</h3>
      </div>
      <Modal animation={false} show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Playlist</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddPlaylist handleCallBack={setModal} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="btn btn-danger"
            onClick={handleClose}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {playlist.map((pl, key) => {
        return (
          <div key={key} className="pl-description">
            <div>
              <h3 className="pl-name">{pl.name}</h3>
              {pl.songIDs?.length > 0 ? `${pl.songIDs.length} songs` : `0 song`}
            </div>
            <div className="pl-btn">
              <button
                type="button"
                className="btn btn-success"
                onClick={() => history.push(`/playlist/${pl.id}/viewSong`)}
              >
                View
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() =>
                  window.confirm("Do you want to delete this Playlist ?") &&
                  deletePlaylist(pl.id)
                }
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default ViewPlaylist;
