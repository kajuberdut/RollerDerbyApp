// import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import React, { useContext } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import "./NavBar.css";
import Star from "./Star"
import ChatIcon from "../chats/ChatIcon";
import UserContext from "../multiUse/UserContext";
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

  const { user } = useContext(UserContext);


    /** Render nav bar */

  return (
    <div> 
      <Navbar expand="md" className="NavBar-Top">
        {/* <NavLink exact to="/" className="navbar-brand">Yodlr
        </NavLink> */}
        {/* <Star href="/"></Star>
        <NavbarBrand href="/">React-Conteact</NavbarBrand> */}
      <div style={{ display: 'flex' }}>
        <Star />
        <NavbarBrand href="/">Conteact</NavbarBrand>
      </div>

        <Nav className="ml-auto" navbar>
          {user && <>
            <NavItem className="Navbar-Profile">
                {/* <NavLink to='/users/{user.derbyName}'>{ user.derbyName }</NavLink> */}
                <NavLink to='/profile'>{ user.username }</NavLink>
                {/* <NavLink to="/user/:{user.id}">{ user.derbyName }</NavLink> */}
            </NavItem>
            {/* <NavItem className="Navbar-Setup">
                <NavLink to="/setup">Setup</NavLink>
            </NavItem> */}
            <NavItem className="Navbar-Users">
                <NavLink to="/users">Users</NavLink>
            </NavItem>
            <NavItem className="Navbar-Bouts">
                <NavLink to="/bouts">Bouts</NavLink>
            </NavItem>
            <NavItem className="Navbar-Mixers">
                <NavLink to="/mixers">Mixers</NavLink>
            </NavItem>
            {/* <NavItem className="Navbar-Messages">
                <NavLink to="/chats"><div><ChatIcon/></div></NavLink>
            </NavItem> */}
            <NavItem className="Navbar-Logout">
                <NavLink to="/" onClick={logout}>Logout</NavLink>
            </NavItem>
            </> }
            { !user && <>
            <NavItem className="Navbar Signup">
                <NavLink to="/signup">Signup</NavLink>
            </NavItem>
            <NavItem className="Navbar Admin">
                <NavLink to="/login">Login</NavLink>
            </NavItem>
            </>}
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavBar;
