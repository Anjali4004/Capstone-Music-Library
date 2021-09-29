import React, { useState } from "react";
import {
  Nav,
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Container,
} from "react-bootstrap";
import { useSelector } from "react-redux";

function NavBar(props) {
  const [input, setInput] = useState("");
  const user = useSelector((state) => state.users);
  const login = localStorage.getItem("email");
  const handleChange = (e) => {
    props.setInput(e.target.value);
    setInput(e.target.value);
  };
  return (
    <Navbar collapseOnSelect expand="lg" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand href="/" data-toggle="tooltip" title="Go to Home Page">
          <i
            className="fa fa-soundcloud"
            style={{ fontSize: "50px", color: "white" }}
          ></i>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav ">
          <Nav className="mr-auto container1 topBotomBordersOut ">
            <Nav.Link href="/songs">Musics</Nav.Link>
            <Nav.Link href="/About">About</Nav.Link>
            <Nav.Link href="/playlist">Playlist</Nav.Link>
            {/* <Nav.Link href="/playlist">Contact</Nav.Link> */}
            {login === null ? (
              <Nav.Link href="/Register">Register</Nav.Link>
            ) : null}
            {login === null ? <Nav.Link href="/Login">Login</Nav.Link> : null}
          </Nav>
          <Nav className="justify-content-end">
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search Songs, Artist"
                className="mr-2"
                aria-label="Search"
                input={input}
                onChange={handleChange}
              />
            </Form>
            {user
              ?.filter((data) => data.email === login)
              .map((val, key) => (
                <NavDropdown
                  key={key}
                  title={val.firstName}
                  id="collasible-nav-dropdown"
                >
                  <NavDropdown.Item href={`/profile/${val.id}`}>
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    href="/"
                    onClick={() => {
                      localStorage.removeItem("email");
                    }}
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default NavBar;
