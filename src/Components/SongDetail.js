import React from "react";
import { useSelector } from "react-redux";
import "../App.css";

function SongDetail(props) {
  const song = useSelector((state) => state.songs);

  const id = props.match.params?.id;
  return (
    <div>
      {song
        .filter((value) => value.id === id)
        .map((data, key) => (
          <div key={key} className="songdetail">
            <h2 style={{ color: "#006600", textAlign: "center" }}>
              <u>Song Detail</u>
            </h2>

            <h3>
              Title: <span>{data.title}</span>
            </h3>
            <h3>
              Movie: <span>{data.movie}</span>
            </h3>
            <h3>
              Year: <span>{data.year}</span>
            </h3>
            <h3>
              Length: <span>{data.length}</span>
            </h3>
            <h3>
              Singer Name: <span>{data.singer}</span>
            </h3>
          </div>
        ))}
    </div>
  );
}
export default SongDetail;
