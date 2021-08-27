import React from "react";
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
  const user = useSelector((state) => state.users);
  const login = localStorage.getItem("email");

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand href="/">
          <i
            className="fa fa-soundcloud"
            style={{ fontSize: "50px", color: "white" }}
          ></i>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav ">
          <Nav className="mr-auto ">
            <Nav.Link href="/songs">Musics</Nav.Link>
            <Nav.Link href="/About">About</Nav.Link>
            <Nav.Link href="/songs">Playlist</Nav.Link>
            {login === null ? (
              <Nav.Link href="/Register">Register</Nav.Link>
            ) : null}
            {login === null ? <Nav.Link href="/Login">Login</Nav.Link> : null}
          </Nav>
          <Nav className="justify-content-end">
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="mr-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
            {user
              ?.filter((data) => data.email === login)
              .map((val, key) => (
                <NavDropdown
                  key={key}
                  title={val.firstName}
                  id="collasible-nav-dropdown"
                >
                  <NavDropdown.Item href="#">Profile</NavDropdown.Item>
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
