import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loadSongsAsync, deleteSongAsync } from "../reducers/songReducer";
import { useHistory } from "react-router-dom";

function Songs(props) {
  const [toggle, setToggle] = useState(false);
  const [dltSong, setDltSong] = useState(false);
  const songs = useSelector((state) => state.songs);
  const [stateSong, setSongState] = useState([]);
  const dispatch = useDispatch();
  const login = localStorage.getItem("email");
  const history = useHistory();
  const id = Number(props.match?.params.id);

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

  const deleteSongByIds = () => {
    stateSong.forEach((d) => {
      if (d.select) {
        dispatch(deleteSongAsync(d.id));
        dispatch(loadSongsAsync());
      }
    });
    dispatch(loadSongsAsync());
  };

  const deleteSong = (itemId) => {
    dispatch(deleteSongAsync(itemId));
    dispatch(loadSongsAsync());
  };

  return (
    <div className="song_container">
      {login ? (
        toggle ? (
          <Button
            className="dlt_btn"
            variant="danger"
            onClick={() => {
              setToggle(!toggle);
              setDltSong(!dltSong);
              deleteSongByIds();
            }}
          >
            Delete
          </Button>
        ) : (
          <Button
            className="dlt_btn"
            variant="danger"
            onClick={() => {
              setToggle(!toggle);
              getSongs();
            }}
          >
            Delete Multiple Songs
          </Button>
        )
      ) : null}
      {login ? (
        <Button className="add_btn" variant="primary" href="/AddSong">
          Add New Song
        </Button>
      ) : null}

      <div className="songs">
        {id ? props?.handleCallBack(id) : null}
        {songs?.map((song, index) => (
          <Card key={index}>
            <div className="img_icon_wrap">
              <Card.Img
                variant="top"
                src={song.img_url}
                className="song_image"
              />
              <Card.Link href={`/player/${song.id}`} target="_blank">
                <i
                  className="fa fa-music"
                  data-toggle="tooltip"
                  title="View Song"
                ></i>
              </Card.Link>
              {toggle ? (
                <div>
                  <input
                    className="checked"
                    type="checkbox"
                    // checked={checkedState[index]}
                    onChange={(e) => {
                      let value = e.target.checked;
                      setSongState(
                        stateSong.map((d) => {
                          if (d.id === song.id) d.select = value;
                          return d;
                        })
                      );
                    }}
                  />
                </div>
              ) : (
                <Card.Link
                  href="#"
                  onClick={() => {
                    window.confirm("Are you sure you want to Delete ? ") &&
                      deleteSong(song.id);
                  }}
                >
                  <i
                    className="fa fa-times-circle"
                    style={{ color: "red" }}
                    data-toggle="tooltip"
                    title="Delete Song"
                  ></i>
                </Card.Link>
              )}
              <Card.Link
                onClick={() => history.push(`/EditSong/id/${song.id}`)}
              >
                <i
                  className="fa fa-edit"
                  style={{ color: "blue" }}
                  data-toggle="tooltip"
                  title="Edit Song"
                ></i>
              </Card.Link>
            </div>
            <Card.Body>
              <Card.Title
                role="button"
                tabIndex="-1"
                id={`title${song.id} `}
                className="song-title"
                style={{ cursor: "pointer", color: "blue" }}
                onClick={() => {
                  history.push(`/song/${song.id}`);
                }}
              >
                <u> {song.title}</u>
              </Card.Title>
              <Card.Text className="song-title">{song.movie}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}
export default Songs;
