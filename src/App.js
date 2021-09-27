import React, { useEffect, useState, Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "./Components/Navbar";
import About from "./Components/About";
import Songs from "./Components/Songs";
import Login from "./Components/Login";
import Register from "./Components/Register";
import AddSong from "./Components/AddSong";
import UpdateSong from "./Components/EditSong";
import AddSongPlaylist from "./Components/Playlist/AddSongPlaylist";
import ViewPlaylistSong from "./Components/Playlist/ViewPlaylistSong";
import { loadUserAsync, loadSongsAsync } from "./reducers/songReducer";
import "./App.css";
import "./playlist.css";
import { loadPlaylistAsync } from "./reducers/playlistReducer";
const SongDetail = lazy(() => import("./Components/SongDetail"));
const ViewPlaylist = lazy(() => import("./Components/Playlist/viewPlaylist"));
const Player = lazy(() => import("./Components/Player"));

export default function App() {
  const [user, setUser] = useState(null);
  const [inp, setInp] = useState("");
  const dispatch = useDispatch();
  const login = localStorage.getItem("email");
  function setId(id) {
    setUser(id);
  }
  function searchInput(input) {
    setInp(input);
  }
  useEffect(() => {
    dispatch(loadUserAsync());
    dispatch(loadSongsAsync());
    dispatch(loadPlaylistAsync());
  }, [dispatch]);

  return (
    <Router>
      <div>
        <NavBar id={user} setInput={searchInput} />

        <Switch>
          <Route exact path="/" render={() => <Songs input={inp} />} />
          <Route path="/songs" render={() => <Songs input={inp} />} />
          <Route
            path="/loggedIn/:id"
            render={(props) => (
              <Songs {...props} handleCallBack={setId} input={inp} />
            )}
          />
          <Route
            path="/player/:id"
            render={(props) => (
              <Suspense fallback={<h1>Loading...</h1>}>
                <Player {...props} />
              </Suspense>
            )}
          />

          <Route path="/About" component={About} />
          <Route path="/About" component={About} />
          <Route path="/Login" component={Login} />
          <Route path="/Register" component={Register} />
          <Route
            path="/playlist/:id/addSong"
            render={(props) => <AddSongPlaylist {...props} />}
          />
          <Route
            path="/playlist/:id/viewSong"
            render={(props) => <ViewPlaylistSong {...props} />}
          />
          <Route
            path="/playlist"
            render={() => (
              <Suspense fallback={<h1>Loading...</h1>}>
                <ViewPlaylist />
              </Suspense>
            )}
          />
          {login ? (
            <>
              <Route path="/AddSong" component={AddSong} />

              <Route path="/EditSong/id/:id" component={UpdateSong} />
              <Route
                path="/song/:id"
                render={(props) => (
                  <Suspense fallback={<h1>Loading...</h1>}>
                    <SongDetail {...props} />
                  </Suspense>
                )}
              />
            </>
          ) : (
            <Redirect to="/Login" />
          )}
        </Switch>
      </div>
    </Router>
  );
}
