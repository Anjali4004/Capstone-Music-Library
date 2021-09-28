import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  UpdatePlaylistAsync,
  loadPlaylistAsync,
} from "../../reducers/playlistReducer";

const ViewPlaylistSong = (props) => {
  const [playlist, setPlaylist] = useState([]);
  const [plName, setPlName] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const id = Number(props.match.params?.id);
  const playlists = useSelector((state) => state.playlist);
  const songs = useSelector((state) => state.songs);
  useEffect(() => {
    playlists
      ?.filter((s) => s.id === id)
      .map((val) => {
        setPlName(val.name);
        setPlaylist(val.songIDs);
      });
  }, [playlists, id]);

  const deleteSong = (songId) => {
    let songIDs = [];
    songIDs = playlist.filter((id) => id !== songId);

    let newPlaylist = {
      id: id,
      name: plName,
      songIDs: songIDs,
    };
    dispatch(UpdatePlaylistAsync(newPlaylist));
    dispatch(loadPlaylistAsync());
  };
  return (
    <div>
      <button
        className="btn btn-primary"
        type="submit"
        style={{ backgroundColor: "#13945c", color: "white" }}
        onClick={() => history.push(`/playlist/${id}/addSong`)}
      >
        Add New Song
      </button>

      {playlist?.map((id) =>
        songs
          ?.filter((s) => s.id === id)
          .map((u, key) => {
            return (
              <Card
                key={key}
                style={{
                  width: "90%",
                  height: "auto",
                }}
              >
                <Card.Body style={{ display: "flex" }}>
                  <div style={{ width: "50%" }}>
                    <Card.Title
                      role="button"
                      className="song-title"
                      style={{ cursor: "pointer", color: "blue" }}
                      onClick={() => {
                        history.push(`/song/${u.id}`);
                      }}
                    >
                      <u> {u.title}</u>
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {u.movie}
                    </Card.Subtitle>
                  </div>
                  <div>
                    <Card.Link href={`${u.web_url}`} target="_blank">
                      <i
                        className="fa fa-toggle-right"
                        style={{ color: "#085427" }}
                      />
                    </Card.Link>

                    <Card.Link
                      style={{ color: "#c7453e" }}
                      onClick={() => {
                        window.confirm(
                          "Are You sure. You want to remove this song"
                        ) && deleteSong(u.id);
                      }}
                    >
                      <i className="fa fa-trash" />
                    </Card.Link>
                  </div>
                </Card.Body>
              </Card>
            );
          })
      )}
    </div>
  );
};

export default ViewPlaylistSong;
