// import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import "./NavBar.css";
// import UserContext from "../repeated/UserContext";
import { 
  Navbar, 
  NavbarBrand,
  Nav, 
  NavItem,
} from "reactstrap";

/**
 * Display nav bar
 *
 */

function NavBar({logout}) {

   /** Get user from context*/

//   const { user } = useContext(UserContext);

    /** Render nav bar */

  return (
    <div> 
      <Navbar expand="md">
        {/* <NavLink exact to="/" className="navbar-brand">Yodlr
        </NavLink> */}
        <NavbarBrand href="/">React-Conteact</NavbarBrand>
        <Nav className="ml-auto" navbar>
            <NavItem className="Navbar Signup">
                <NavLink to="/signup">Signup</NavLink>
            </NavItem>
            <NavItem className="Navbar Admin">
                <NavLink to="/login">Login</NavLink>
            </NavItem>
            <NavItem className="Navbar Setup">
                <NavLink to="/setup">Setup</NavLink>
            </NavItem>
            <NavItem className="Navbar Logout">
                <NavLink to="/" OnClick={logout}>Logout</NavLink>
            </NavItem>
            <NavItem className="Navbar Logout">
                <NavLink to="/events">Bouts</NavLink>
            </NavItem>
            <NavItem className="Navbar MyProfile">
                <NavLink to="/user/:id">My Profile</NavLink>
                {/* <NavLink to="/user/:{user.id}">{ user.derbyName }</NavLink> */}
            </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavBar;
