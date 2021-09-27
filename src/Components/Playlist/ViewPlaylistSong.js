import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const ViewPlaylistSong = (props) => {
  const [playlist, setPlaylist] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const id = Number(props.match.params?.id);
  console.log(id);
  const playlists = useSelector((state) => state.playlist);
  const songs = useSelector((state) => state.songs);
  useEffect(() => {
    playlists
      ?.filter((s) => s.id === id)
      .map((val) => setPlaylist(val.songIDs));
  }, [playlists]);

  return (
    <div>
      <button
        className="btn btn-primary"
        type="submit"
        onClick={() => history.push(`/playlist/${id}/addSong`)}
      >
        Add Song
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
                      <i className="fa fa-toggle-right" />
                    </Card.Link>

                    <Card.Link style={{ color: "#c7453e" }} href="#">
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
