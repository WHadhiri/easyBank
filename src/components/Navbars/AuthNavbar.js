import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  NavbarBrand,
  Navbar,
  Container,
} from "reactstrap";

class AuthNavbar extends React.Component {
  render() {
    return (
      <>
        <Navbar
          className="navbar-top navbar-horizontal navbar-dark "
          expand="md"
        >
          <Container className="justify-content-center">
            <NavbarBrand to="/" tag={Link}>
              <img alt="..." src={require("assets/img/brand/logo.png")} />
            </NavbarBrand>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default AuthNavbar;
