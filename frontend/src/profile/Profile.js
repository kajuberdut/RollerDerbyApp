import React, { useState, useEffect, useContext } from "react";
import FastApi from "../Api";
import { useParams} from "react-router-dom";
// import skateImg from "../public/logo512.png"
// import defaultImg from "./images/skater_02"



// ! are you going to make a distinction betweeen everyone elses profile and the users profile... and the answer is probably yes... so you may want to have a /profile and a /users/derbyName

import UserContext from "../multiUse/UserContext";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';


/**  
 * User detail form
 */

function Profile() {

   /** Get url handle and set jobs and is loading in state*/
    // console.log("company:", company)
    const username = useParams(); 
    const [isLoading, setIsLoading] = useState(true);
    // const [user, setUser]= useState("");
    const { user } = useContext(UserContext);
    // console.log("user in profile.js:", user)

    let rs = []; 

    if (user.ruleset.WFTDA) {
      rs.push("WFTDA ");
    }
    if (user.ruleset.USARS) {
      rs.push("USARS ");
    }
    if (user.ruleset.bankedTrack) {
      rs.push("Banked Track ")
    }
    if (user.ruleset.shortTrack) {
      rs.push("Short Track ")
    }
    let rulesets = rs.join(", ")

    let pos = []; 

    if (user.position.jammer) {
      pos.push("Jammer ");
    }
    if (user.position.blocker) {
      pos.push("Blocker ");
    }
    if (user.position.pivot) {
      pos.push("Pivot ")
    }

    let positions = pos.join(", ")
    
    console.log("user.image in profile.js", user.image)
    // console.log(require('./images/skater_02.svg'))

    /** Render cards */
    // ! will need to rework this

    return (
      // <div className="PROFILE" style={{backgroundColor: 'red', boxShadow: '100px 100px 100px black'}} >
      // <div className="PROFILE" style={{backgroundColor: 'red', border: '100px solid black'}} >
      // <div className="PROFILE" style={{backgroundColor: 'red'}} >
      <div className="PROFILE" style={{backgroundColor: 'white', padding: '100px'}} >

        <MDBContainer>
          <MDBRow className="justify-content-center align-items-center h-100"> 
            <MDBCol lg="9" xl="10">
              <MDBCard style={{minWidth: '300px', marginTop: '50px', boxShadow: '0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)'}}>
                <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '300px'}}>

                  <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '250px' }}>    

                  <MDBCardImage src="/skater_02.svg"
                      alt="Skater placeholder image" className="mt-4 mb-2 img-thumbnail" fluid style={{ width: '250px', height: '330px', zIndex: '1', backgroundColor: '#d1d2d4', border: '4px solid white', boxShadow: '0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)'}} /> 
                  </div>
                  <a href="/setup">
                    <button type="button" className="btn btn-outline-dark"  data-mdb-ripple-color="dark"
                      style={{zIndex: 1, height: '40px', backgroundColor: '#d1d2d4', position: 'absolute', right: '20px', marginTop: '10px', fontSize: '15px'}}>
                      Edit
                    </button>
                  </a>
                  <div className="ms-3" style={{ marginTop: '200px'}}>
                    <MDBTypography tag="h4">{user.username} #{user.primaryNumber}</MDBTypography>
                    <MDBCardText>{user.location.city}, {user.location.state}</MDBCardText>
                    {/* <div style={{paddingLeft: '500px', paddingBottom: '20px'}}>
                    <MDBCardText tag="h4" >{user.level}</MDBCardText>
                    </div> */}
                  </div>
                </div>
                <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                  <div className="d-flex justify-content-end text-center py-1" style={{marginTop: '2px'}}>
                    <div>
                      <MDBCardText className="mb-1 h5" style={{marginRight: '30px'}}>{user.level}</MDBCardText>
                      <MDBCardText className="small text-muted mb-0"style={{marginRight: '30px'}}>level</MDBCardText>
                    </div>
                    <div>
                      <MDBCardText className="mb-1 h6">{positions}</MDBCardText>
                      <MDBCardText className="small text-muted mb-0" style={{marginRight: '30px', marginTop: '7px'}}>positions</MDBCardText>
                    </div>
                    <div className="px-3">
                      <MDBCardText className="mb-1 h6" style={{marginLeft: '30px'}}>{rulesets}</MDBCardText>
                      <MDBCardText className="small text-muted mb-0" style={{marginLeght: '30px', marginTop: '7px'}}>known rulesets</MDBCardText>
                    </div>
                  </div>
                </div>
                <MDBCardBody className="text-black p-4">
                  <div className="mb-5">
                    <p className="lead fw-normal mb-1">About</p>
                    <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                      <MDBCardText className="font-italic mb-1">{user.about}</MDBCardText>
                    </div>
                  </div>
                  <div className="mb-5">
                    <p className="lead fw-normal mb-1">Associated Leagues</p>
                    <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                      <MDBCardText className="font-italic mb-1">{user.associatedLeagues}</MDBCardText>
                    </div>
                  </div>
                  <div className="mb-5">
                    <p className="lead fw-normal mb-1">You can find me on facebook: {user.facebookName}</p>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    )

}

export default Profile 