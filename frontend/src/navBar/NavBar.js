import { NavLink } from "react-router-dom";
import React, { useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import "./NavBar.css";
import Star from "./Star"
import { Navbar, NavbarBrand, Nav, NavItem, NavbarToggler, Collapse } from "reactstrap";
import { Link } from 'react-router-dom';




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
            
            <div className="NavBar-Container">

                { (width < 768) ? (
                    <>
                        { user && (   
                            <div> 
                                <Navbar className="NavBar-Top">
                                    <div className="Navbar-Logo" style={{paddingLeft: '5px', paddingRight: '0px', display: 'flex', position: 'fixed', left: '0px' }}>
                                        <div style={{position: 'absolute', top: '4px'}}>
                                            <Star/>
                                        </div>
                                        <div href="/" style={{paddingLeft: '75px', paddingTop: '20px', fontSize: '20px'}} className="me-auto">
                                            <b>Block Party</b>
                                        </div>
                                    </div>
                                    <NavbarToggler onClick={toggle} className="me-2" stlye={{marginTop: '20px'}} 
                                    />
                                    <Collapse style={{display: 'flex-end'}} isOpen={isOpen} navbar>
                                        <Nav className="" navbar>
                                            <NavItem className="Navbar-Profile" style={{}}>
                                                <NavLink to='/profile' style={{whiteSpace: 'nowrap'}}>Profile</NavLink>
                                            </NavItem>
                                            <NavItem className="Navbar-Teams">
                                                <NavLink to="/teams">
                                                    Teams
                                                </NavLink>
                                            </NavItem>
                                            <NavItem className="Navbar-Users">
                                                <NavLink to="/users">
                                                    Users
                                                </NavLink>
                                            </NavItem>
                                            <NavItem className="Navbar-Bouts">
                                                <NavLink to="/events/bouts">
                                                    Bouts
                                                </NavLink>
                                            </NavItem>
                                            <NavItem className="Navbar-Mixers">
                                                <NavLink to="/events/mixers">
                                                    Mixers
                                                </NavLink>
                                            </NavItem>
                                            <NavItem className="Navbar-Logout">
                                                <NavLink to="/" onClick={logout}>
                                                    Logout
                                                </NavLink>
                                            </NavItem>  
                                        </Nav> 
                                    </Collapse>
                                </Navbar>
                            </div>) 
                        } 


                        { !user && (
                            <div> 
                                <Navbar className="NavBar-Top">
                                <div className="Navbar-Logo" style={{paddingLeft: '5px', paddingRight: '0px', display: 'flex', position: 'fixed', left: '0px' }}>
                                <div style={{position: 'absolute', top: '4px'}}>
                                <Star/>
                                </div>
                                <div href="/" style={{paddingLeft: '75px', paddingTop: '20px', fontSize: '20px'}} className="me-auto"><b>Block Party</b></div>
                                </div>
                                <NavbarToggler onClick={toggle} className="me-2" stlye={{marginTop: '20px'}} />
                                    <Collapse style={{display: 'flex-end'}} isOpen={isOpen} navbar>
                                        <Nav navbar>
                                            <NavItem className="Navbar-Signup">
                                                <NavLink to="/signup">Signup</NavLink>
                                            </NavItem>
                                            <NavItem className="Navbar-Admin">
                                                <NavLink to="/login">Login</NavLink>
                                            </NavItem>
                                            <NavItem className="Navbar-About">
                                                <NavLink to="/about">About</NavLink>
                                            </NavItem>
                                        </Nav>
                                    </Collapse>
                                </Navbar> 
                            </div>)  
                        }
                    </>
                )

                :   ( 
                        <>
                            { user && (
                                    <div className="New-Navbar" style={{display: "flex", justifyContent: "space-between"}} >

                                        <div style={{display: "flex"}}>
                                            <div style={{marginLeft: '10px', marginTop: '5px'}}>
                                                <Star/>
                                            </div>
                                            <Link to="/" style={{marginLeft: '4px', fontSize: '20px', marginTop: '20px', color: 'black', textDecoration: "none", whiteSpace: 'nowrap'  }}><b>Block Party</b></Link> 
                                        </div>
                                        
                                        <div className="New-Navbar-Body" style={{maxWidth: '80%', justifyContent: "space-between", paddingTop: "25px"}} >

                                            <NavLink to='/profile' className="NavLink" style={{whiteSpace: 'nowrap'}}>{ user.username }</NavLink>
                                            <NavLink to="/teams" className="NavLink" >Teams</NavLink>
                                            <NavLink to="/users" className="NavLink" >Users</NavLink>
                                            <NavLink to="/events/bouts" className="NavLink" >Bouts</NavLink>
                                            <NavLink to="/events/mixers" className="NavLink" >Mixers</NavLink>
                                            <NavLink to="/" className="NavLink"  onClick={logout}>Logout</NavLink>
                                        
                                        </div>

                                    </div>
                                ) 
                            } 

                            { !user && ( 
                            
                                <div className="New-Navbar" style={{display: "flex", justifyContent: "space-between"}} >

                                    <div style={{display: "flex"}}>
                                        <div style={{marginLeft: '10px', marginTop: '5px'}}>
                                            <Star/>
                                        </div>
                                        <Link to="/" style={{marginLeft: '4px', fontSize: '20px', marginTop: '20px', color: 'black', textDecoration: 'none' }}><b>Block Party</b></Link>   
                                    </div>
                                    
                                    <div className="New-Navbar-Body" style={{maxWidth: '60%', justifyContent: "space-between", paddingTop: "25px"}} >
                                        <NavLink className="NavLink" to="/signup">
                                            Signup
                                        </NavLink>
                                        <NavLink className="NavLink"  to="/login">
                                            Login
                                        </NavLink>
                                        <NavLink className="NavLink"  to="/about">
                                            About
                                        </NavLink>           
                                        </div>
                                    </div>
                                )  

                            }
                            
                        </>
                    )
                };

            </div>
   
        );
}

export default NavBar;
