import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "../App.css";

function SongDetail(props) {
  const song = useSelector((state) => state.songs);
  const history = useHistory();
  const id = props.match.params?.id;
  return (
    <div>
      {song
        .filter((value) => value.id === id)
        .map((data, key) => (
          <div key={key} className="Details">
            <img
              src={data.img_url}
              style={{ width: "400px", height: "500px", maxWidth: "50%" }}
            />
            <div className="songdetail">
              <h2>
                <b>{data.title}</b>
              </h2>
              <h4>
                {data.movie}, {data.year}
              </h4>

              <h4>
                Duration: <span>{data.length} minutes</span>
              </h4>
              <h4>
                <span>{data.singer}</span>
              </h4>
              <br />
              <br />
              <button
                className="btn "
                style={{ backgroundColor: "Red", color: "white" }}
                onClick={() => history.push(`/player/${data.id}`)}
              >
                Play Song
              </button>
              <button
                className="btn btn-info"
                style={{ marginLeft: "20px" }}
                onClick={() => history.push(`/playlist`)}
              >
                Add to Playlist
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}
export default SongDetail;
