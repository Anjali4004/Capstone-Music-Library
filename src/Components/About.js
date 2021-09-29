import React from "react";
import { useHistory } from "react-router-dom";
import img1 from "../images/img1.jpg";
import img2 from "../images/img2.png";
import img3 from "../images/img3.jpg";
import { v4 as uuidv4 } from "uuid";

function About() {
  const history = useHistory();
  return (
    <div style={{ margin: "20px" }}>
      {console.log(uuidv4())}
      <div
        id="carouselExampleIndicators"
        class="carousel slide"
        data-ride="carousel"
        style={{ height: "400px" }}
      >
        <ol class="carousel-indicators">
          <li
            data-target="#carouselExampleIndicators"
            data-slide-to="0"
            class="active"
          ></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img class="d-block w-100" src={img1} alt="First slide" />
            <div class="carousel-caption d-none d-md-block">
              <h2>Music App</h2>
              <h5>
                Music is a form of art that uses sound organised in time. Music
                is also a form of entertainment that puts sounds together in a
                way that people like, find interesting or dance to. Most music
                includes people singing with their voices or playing musical
                instruments, such as the piano, guitar, drums or violin.
              </h5>
            </div>
          </div>
          <div class="carousel-item">
            <img class="d-block w-100" src={img2} alt="Second slide" />
            <div class="carousel-caption d-none d-md-block">
              <button
                className="btn btn-primary"
                onClick={() => history.push("/playlist")}
              >
                Create Playlist
              </button>

              <p>
                Adding playlists to your Library allows you to easily find and
                view them later. If you own a playlist, you can publicly add it
                to your Library so that your ..
              </p>
            </div>
          </div>
          <div class="carousel-item">
            <img class="d-block w-100" src={img3} alt="Third slide" />
            <div class="carousel-caption d-none d-md-block">
              <h2>Music is to the soul what words are to the mind</h2>
              <button
                className="btn btn-success"
                onClick={() => history.push("/")}
              >
                View Songs
              </button>
            </div>
          </div>
        </div>
        <a
          class="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a
          class="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
      <div className="aboutArea">
        <h1>ABOUT US</h1>
        <p>
          The best music app to listen a song. It is customized, user
          interactive and well designed system. You can create playlist easily.
          Add, Edit and Delete a song from a specified key is easy.
        </p>
      </div>
    </div>
  );
}
export default About;
