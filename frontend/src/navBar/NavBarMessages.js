// import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import React, { useContext } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import "./NavBarMessages.css";
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

function NavBarMessages() {

   /** Get user from context*/

  const { user } = useContext(UserContext);


    /** Render nav bar */

  return (
    // <div>TESTING</div>
    <div> 
      <Navbar expand="md" className="NavBarMessages-Top">
        {/* <NavLink exact to="/" className="navbar-brand">Yodlr
        </NavLink> */}
        {/* <Star href="/"></Star>
        <NavbarBrand href="/">React-Conteact</NavbarBrand> */}
      <div style={{ display: 'flex' }}>
        <NavbarBrand href="/">Conteact</NavbarBrand>
      </div>

        <Nav className="ml-auto" navbar>
        <div>LLALALALAL</div>
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavBarMessages;


// {user && <>
//     <NavItem className="Navbar-Profile">
//         {/* <NavLink to='/users/{user.derbyName}'>{ user.derbyName }</NavLink> */}
//         <NavLink to='/profile'>{ user.username }</NavLink>
//         {/* <NavLink to="/user/:{user.id}">{ user.derbyName }</NavLink> */}
//     </NavItem>
//     {/* <NavItem className="Navbar-Setup">
//         <NavLink to="/setup">Setup</NavLink>
//     </NavItem> */}
//     <NavItem className="Navbar-Users">
//         <NavLink to="/users">Users</NavLink>
//     </NavItem>
//     <NavItem className="Navbar-Bouts">
//         <NavLink to="/bouts">Bouts</NavLink>
//     </NavItem>
//     <NavItem className="Navbar-Mixers">
//         <NavLink to="/mixers">Mixers</NavLink>
//     </NavItem>
//     </> }
