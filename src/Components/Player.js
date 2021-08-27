import React from "react";
import { useSelector } from "react-redux";
import ReactPlayer from "react-player";

function Player(props) {
  const song = useSelector((state) => state.songs);

  const id = Number(props.match.params.id);
  return (
    <div>
      {song
        .filter((value) => value.id === id)
        .map((data, key) => (
          <div className="video_player">
            <ReactPlayer url={data.web_url} />
          </div>
        ))}
    </div>
  );
}

export default Player;
