import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Line, Bar } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
Chart.register(CategoryScale);
function Charts() {
  const playlist = useSelector((state) => state.playlist);
  const state = {
    labels: [],
    datasets: [
      {
        label: "View Playlist Detail",
        fill: false,
        lineTension: 0.25,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 1,
        font: 26,
        data: [],
      },
    ],
  };
  useEffect(() => {
    playlist.map((p) => {
      state.labels.push(p.name);
      state.datasets[0].data.push(p.songIDs?.length);
    });
  }, []);
  playlist.map((p) => {
    state.labels.push(p.name);
    state.datasets[0].data.push(p.songIDs?.length);
  });
  return (
    <div>
      <Bar
        data={state}
        options={{
          title: {
            display: true,
            text: "Playlists",
            fontSize: 15,
          },
          legend: {
            display: true,
            position: "right",
            width: "50%",
          },
        }}
      />
    </div>
  );
}
export default Charts;
