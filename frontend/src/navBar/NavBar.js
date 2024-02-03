import { NavLink } from "react-router-dom";
import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import "./NavBar.css";
import Star from "./Star"
import { Navbar, NavbarBrand, Nav, NavItem } from "reactstrap";

/**
 * Display nav bar page
 *
 */

function NavBar({logout}) {

  /** Get user from local storage*/

  const user = JSON.parse(localStorage.getItem('user'));

    /** Render nav bar */

  return (
    <div> 
      <Navbar expand="md" className="NavBar-Top">

      <div style={{ display: 'flex' }}>
        <Star />
        <NavbarBrand href="/">Block Party</NavbarBrand>
      </div>

        <Nav className="ml-auto" navbar>
          {user && <>
            <NavItem className="Navbar-Profile">
                <NavLink to='/profile' style={{whiteSpace: 'nowrap'}}>{ user.username }</NavLink>
            </NavItem>
            <NavItem className="Navbar-Teams">
                <NavLink to="/teams">Teams</NavLink>
            </NavItem>
            <NavItem className="Navbar-Users">
                <NavLink to="/users">Users</NavLink>
            </NavItem>
            <NavItem className="Navbar-Bouts">
                <NavLink to="/events/bouts">Bouts</NavLink>
            </NavItem>
            <NavItem className="Navbar-Mixers">
                <NavLink to="/events/mixers">Mixers</NavLink>
            </NavItem>
            <NavItem className="Navbar-Logout">
                <NavLink to="/" onClick={logout}>Logout</NavLink>
            </NavItem>
            </> }
            { !user && <>
            <NavItem className="Navbar-Signup">
                <NavLink to="/signup">Signup</NavLink>
            </NavItem>
            <NavItem className="Navbar-Admin">
                <NavLink to="/login">Login</NavLink>
            </NavItem>
            <NavItem className="Navbar-About">
                <NavLink to="/about">About</NavLink>
            </NavItem>
            </>}
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavBar;
