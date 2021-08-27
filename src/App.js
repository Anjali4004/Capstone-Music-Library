import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import NavBar from "./Components/Navbar";
import About from "./Components/About";
import Songs from "./Components/Songs";
import Player from "./Components/Player";
import Login from "./Components/Login";
import Register from "./Components/Register";
import AddSong from "./Components/AddSong";
import { loadUserAsync, loadSongsAsync } from "./reducers/songReducer";
import "./App.css";

export default function App() {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  function setId(id) {
    setUser(id);
  }
  useEffect(() => {
    dispatch(loadUserAsync());
    dispatch(loadSongsAsync());
  }, []);
  return (
    <Router>
      <div>
        <NavBar id={user} />

        <Switch>
          <Route exact path="/" component={Songs} />
          <Route path="/songs" component={Songs} />
          <Route
            path="/loggedIn/:id"
            render={(props) => <Songs {...props} handleCallBack={setId} />}
          />
          <Route path="/player/:id" component={Player} />
          <Route path="/About" component={About} />
          <Route path="/About" component={About} />
          <Route path="/Login" component={Login} />
          <Route path="/Register" component={Register} />
          <Route path="/AddSong" component={AddSong} />
        </Switch>
      </div>
    </Router>
  );
}
