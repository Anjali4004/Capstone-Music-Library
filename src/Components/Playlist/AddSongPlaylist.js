import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  loadPlaylistAsync,
  UpdatePlaylistAsync,
} from "../../reducers/playlistReducer";

const AddSongPlaylist = (props) => {
  const [stateSong, setSongState] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [plName, setPlName] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const id = Number(props.match.params?.id);
  const playlists = useSelector((state) => state.playlist);
  const songs = useSelector((state) => state.songs);
  useEffect(() => {
    getSongs();
    playlists
      ?.filter((s) => s.id === id)
      .map((val) => {
        setPlName(val.name);
        setPlaylist(val.songIDs);
      });
  }, [playlists]);

  const getSongs = () => {
    setSongState(
      songs.map((d) => {
        return {
          select: false,
          id: d.id,
        };
      })
    );
  };

  const AddSongToPlaylist = () => {
    let songIDs = [];

    stateSong.forEach((d) => {
      if (d.select) {
        songIDs.push(d.id);
      }
    });
    let newPlaylist = {
      id: id,
      name: plName,
      songIDs: playlist.concat(songIDs),
    };
    dispatch(UpdatePlaylistAsync(newPlaylist));
    dispatch(loadPlaylistAsync());
    history.goBack();
  };

  return (
    <div>
      <button
        className="btn btn-primary"
        type="submit"
        onClick={() => AddSongToPlaylist()}
      >
        Update Playlist
      </button>

      {songs
        ?.filter((s) => playlist.includes(s.id) === false)
        .map((u, key) => (
          <Card
            key={key}
            style={{
              width: "90%",
              height: "auto",
            }}
          >
            <Card.Body style={{ display: "flex" }}>
              <div>
                <input
                  className="pl-checked"
                  type="checkbox"
                  // checked={checkedState[index]}
                  onChange={(e) => {
                    let value = e.target.checked;
                    setSongState(
                      stateSong.map((d) => {
                        if (d.id === u.id) d.select = value;
                        return d;
                      })
                    );
                  }}
                />
              </div>
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
                    style={{ color: "#085427" }}
                    className="fa fa-toggle-right"
                  />
                </Card.Link>
              </div>
            </Card.Body>
          </Card>
        ))}
    </div>
  );
};

export default AddSongPlaylist;
