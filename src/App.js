import React, { useEffect, useState, Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import NavBar from "./Components/Navbar";
import About from "./Components/About";
import Songs from "./Components/Songs";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Charts from "./Components/Charts";
import AddSong from "./Components/AddSong";
import UpdateSong from "./Components/EditSong";
import AddSongPlaylist from "./Components/Playlist/AddSongPlaylist";
import ViewPlaylistSong from "./Components/Playlist/ViewPlaylistSong";
import { loadUserAsync, loadSongsAsync } from "./reducers/songReducer";

import { loadPlaylistAsync } from "./reducers/playlistReducer";
import UserProfile from "./Components/UserProfile";
import "./App.css";
import "./playlist.css";
import "./Animation.css";
const SongDetail = lazy(() => import("./Components/SongDetail"));
const ViewPlaylist = lazy(() => import("./Components/Playlist/viewPlaylist"));
const Player = lazy(() => import("./Components/Player"));

function App(props) {
  const [user, setUser] = useState(null);
  const [inp, setInp] = useState("");
  const login = localStorage.getItem("email");
  function setId(id) {
    setUser(id);
  }
  function searchInput(input) {
    setInp(input);
  }
  useEffect(() => {
    props.loadUserAsync();
    props.loadSongsAsync();
    props.loadPlaylistAsync();
  }, []);

  return (
    <Router>
      <div>
        <NavBar id={user} setInput={searchInput} />

        <Switch>
          <Route exact path="/" render={() => <Songs input={inp} />} />
          <Route exact path="/songs" render={() => <Songs input={inp} />} />
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
          <Route path="/Login" component={Login} />
          <Route path="/Register" component={Register} />
          <Route path="/Charts" component={Charts} />
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
              <Route
                path="/profile/:id"
                render={(props) => <UserProfile {...props} />}
              />
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
const mapDispatchToProps = (dispatch) => ({
  loadUserAsync: () => dispatch(loadUserAsync()),
  loadSongsAsync: () => dispatch(loadSongsAsync()),
  loadPlaylistAsync: () => dispatch(loadPlaylistAsync()),
});
export default connect(null, mapDispatchToProps)(App);
