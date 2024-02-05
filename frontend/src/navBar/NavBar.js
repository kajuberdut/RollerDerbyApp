import { NavLink } from "react-router-dom";
import React, { useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import "./NavBar.css";
import Star from "./Star"
import { Navbar, NavbarBrand, Nav, NavItem, NavbarToggler, Collapse } from "reactstrap";

/**
 * Display nav bar page
 *
 */

function NavBar({logout}) {

  /** Get user from local storage*/

  const user = JSON.parse(localStorage.getItem('user'));

  
  const [isOpen, setIsOpen] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
        setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function to remove the event listener on unmount
    return () => window.removeEventListener('resize', handleResize);
}, []);

const toggle = () => setIsOpen(!isOpen);

    /** Render nav bar */

  return (


    <div> 
      <Navbar expand="md" className="NavBar-Top">
      {/* <Navbar className="NavBar-Top" sticky="top"> */}

      <div style={{ display: 'flex' }}>
       <Star/>
        <NavbarBrand href="/">Block Party</NavbarBrand>
      </div>

      {width < 768 ? (
          <div style={{paddingRight: '40px'}}>
          <NavbarToggler onClick={toggle} />
          <Collapse style={{width: '100px'}} isOpen={isOpen} navbar>
             {user && <>
            <Nav className="ml-auto" navbar>
              <NavItem className="Navbar-Profile" style={{paddingTop: '14px'}}>
                  <NavLink to='/profile' style={{whiteSpace: 'nowrap'}}>{ user.username }</NavLink>
              </NavItem>
              <NavItem className="Navbar-Teams" >
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
              </Nav>
              </> }
              { !user && <>
              <Nav className="ml-auto" navbar>
              <NavItem className="Navbar-Signup" style={{paddingTop: '14px'}}>
                  <NavLink to="/signup">Signup</NavLink>
              </NavItem>
              <NavItem className="Navbar-Admin">
                  <NavLink to="/login">Login</NavLink>
              </NavItem>
              <NavItem className="Navbar-About">
                  <NavLink to="/about">About</NavLink>
              </NavItem>
            </Nav>
            </>}
          </Collapse>
          </div>
       
        ) : (
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
        )
      }

       
      </Navbar>
    </div>
  );
}

export default NavBar;
