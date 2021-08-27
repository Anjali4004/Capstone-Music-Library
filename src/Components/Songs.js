import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loadSongsAsync, deleteSongAsync } from "../reducers/songReducer";
// import { useHistory } from "react-router-dom";

function Songs(props) {
  const [toggle, setToggle] = useState(false);
  const [dltSong, setDltSong] = useState(false);
  const songs = useSelector((state) => state.songs);
  const [stateCustomer, setCustomerState] = useState([]);
  const dispatch = useDispatch();
  // const history = useHistory();
  const id = Number(props.match?.params.id);

  const getSongs = () => {
    setCustomerState(
      songs.map((d) => {
        return {
          select: false,
          id: d.id,
        };
      })
    );
  };

  const deleteCustomerByIds = () => {
    stateCustomer.forEach((d) => {
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
      {toggle ? (
        <Button
          className="dlt_btn"
          variant="danger"
          onClick={() => {
            setToggle(!toggle);
            setDltSong(!dltSong);
            deleteCustomerByIds();
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
      )}
      <Button className="add_btn" variant="primary" href="/AddSong">
        Add New Song
      </Button>

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
                      setCustomerState(
                        stateCustomer.map((d) => {
                          if (d.id === song.id) d.select = value;
                          return d;
                        })
                      );
                    }}
                  />
                </div>
              ) : (
                <Card.Link href="#" onClick={() => deleteSong(song.id)}>
                  <i
                    className="fa fa-times-circle"
                    style={{ color: "red" }}
                    data-toggle="tooltip"
                    title="Delete Song"
                  ></i>
                </Card.Link>
              )}
              <Card.Link href="#">
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
                tabIndex="-1"
                id={`title${song.id} `}
                className="song-title"
              >
                {song.title}
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
