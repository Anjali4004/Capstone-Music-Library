import React, { useEffect, useState } from "react";
import { Card, Button, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loadSongsAsync, deleteSongAsync } from "../reducers/songReducer";
import { useHistory } from "react-router-dom";

function Songs(props) {
  let filtered;
  const [toggle, setToggle] = useState(false);
  const [songListDefault, setSongListDefault] = useState([]);
  const [songList, setSongList] = useState([]);
  const songs = useSelector((state) => state.songs);
  const [stateSong, setSongState] = useState([]);
  const dispatch = useDispatch();
  const login = localStorage.getItem("email");
  const history = useHistory();
  const id = Number(props.match?.params.id);
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href="#"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}

      <span
        className="threedots"
        style={{ color: "black" }}
        data-toggle="tooltip"
        title="View Options"
      />
    </a>
  ));
  useEffect(() => {
    props.input === "" ? (
      <>
        {setSongListDefault(songs)}
        {setSongList(songs)}
      </>
    ) : (
      <>
        {
          (filtered = songListDefault.filter((song) => {
            return (
              song.title.toLowerCase().includes(props.input.toLowerCase()) ||
              song.movie.toLowerCase().includes(props.input.toLowerCase())
            );
          }))
        }

        {setSongList(filtered)}
      </>
    );
  }, [songs, props.input]);

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
              window.confirm("Are you sure you want to Delete ? ") &&
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
        <Button className="add_btn" href="/AddSong">
          Add New Song
        </Button>
      ) : null}

      <div className="songs">
        {id ? props?.handleCallBack(id) : null}
        {songList?.map((song, index) => (
          <Card key={index}>
            <div className="img_icon_wrap">
              <Card.Img
                variant="top"
                src={song.img_url}
                className="song_image"
              />

              <Card.Link
                className="webLink"
                href={`/player/${song.id}`}
                target="_blank"
              >
                <i
                  className="fa fa-toggle-right"
                  data-toggle="tooltip"
                  title="View Song"
                ></i>
              </Card.Link>

              {toggle ? (
                <div>
                  <input
                    className="checked"
                    type="checkbox"
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
                <Dropdown className="dd_song">
                  <Dropdown.Toggle as={CustomToggle} />
                  {login ? (
                    <Dropdown.Menu size="sm" title="">
                      <Dropdown.Item
                        onClick={() => history.push(`/EditSong/id/${song.id}`)}
                      >
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          window.confirm(
                            "Are you sure you want to Delete ? "
                          ) && deleteSong(song.id);
                        }}
                      >
                        Delete
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => history.push(`/playlist`)}>
                        Add To playlist
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  ) : (
                    <Dropdown.Menu size="sm" title="">
                      <Dropdown.Item onClick={() => history.push(`/Playlist`)}>
                        Add To playlist
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  )}
                </Dropdown>
              )}
            </div>

            <Card.Body>
              <Card.Title
                data-toggle="tooltip"
                title={song.title}
                id={`title${song.id} `}
                className="song-title"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  history.push(`/song/${song.id}`);
                }}
              >
                <u> {song.title}</u>
              </Card.Title>

              <Card.Text className="song-movie">{song.movie}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}
export default Songs;
