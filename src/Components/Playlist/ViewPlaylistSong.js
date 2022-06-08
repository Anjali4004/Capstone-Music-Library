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
  let counter = 0;
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
    <div className="pl-song">
      <button
        className="btn btn-primary"
        type="submit"
        style={{ backgroundColor: "#13945c", color: "white" }}
        onClick={() => history.push(`/playlist/${id}/addSong`)}
      >
        Add New Song
      </button>
      <Card
        className="pl-card"
        style={{
          width: "90%",
          height: "auto",
          marginBottom: 0,
        }}
      >
        <Card.Body
          style={{
            display: "flex",
            fontWeight: "bold",
            fontFamily: "auto",
            fontSize: "25px",
          }}
        >
          <p style={{ width: "10%" }}>#</p>
          <div style={{ width: "40%" }}>
            <p>Songs</p>
          </div>
          <div style={{ width: "20%" }}>
            <p>Options</p>
          </div>
          <div>
            <p>Duration</p>
          </div>
        </Card.Body>
      </Card>
      <hr style={{ margin: 0 }} />
      {playlist?.map((id) =>
        songs
          ?.filter((s) => s.id === id)
          .map((u, key) => {
            counter = counter + 1;
            return (
              <Card
                className="pl-card"
                key={key}
                style={{
                  width: "90%",
                  height: "auto",
                }}
              >
                <Card.Body style={{ display: "flex" }}>
                  <p style={{ width: "10%", fontSize: "20px" }}>{counter}.</p>
                  <div style={{ width: "40%" }}>
                    <Card.Title
                      role="button"
                      className="pl-song-title"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        history.push(`/song/${u.id}`);
                      }}
                    >
                      <u> {u.title}</u>
                    </Card.Title>
                    <Card.Subtitle
                      style={{ margin: 0 }}
                      className="mb-2 text-muted"
                    >
                      {u.movie}
                    </Card.Subtitle>
                  </div>
                  <div style={{ width: "20%" }}>
                    <Card.Link href={`/player/${u.id}`} target="_blank">
                      <i
                        className="fa fa-youtube-play"
                        style={{ color: "red" }}
                      />
                    </Card.Link>

                    <Card.Link
                      style={{ color: "#c7453e" }}
                      onClick={() => {
                        window.confirm(
                          "Are You sure. You want to remove this song?"
                        ) && deleteSong(u.id);
                      }}
                    >
                      <i className="fa fa-trash" />
                    </Card.Link>
                  </div>
                  <p style={{ fontSize: "20px" }}>{u.length}</p>
                </Card.Body>
              </Card>
            );
          })
      )}
    </div>
  );
};

export default ViewPlaylistSong;
