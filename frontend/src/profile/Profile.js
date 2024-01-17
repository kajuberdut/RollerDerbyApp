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

// ! issue I am not storing all th data in the user information so Its not being updated all the way

function Profile() {

   /** Get url handle and set jobs and is loading in state*/
    const username = useParams(); 
    const [isLoading, setIsLoading] = useState(true);
    // const { user } = useContext(UserContext);
    // const [user, setUser] = useState(); 
    const [rulesets, setRulesets] = useState();
    const [positions, setPositions] = useState();
    const [location, setLocation] = useState();
    const [insurances, setInsurances] = useState();
    const [city, setCity] = useState();
    const [state, setState] = useState();
    const [phoneNumber, setPhoneNumber] = useState();

    // retrieve user from localStorage so that page can be refreshed 
    const user = JSON.parse(localStorage.getItem('user'));
    console.log("user in profile.js", user)

    
    
    useEffect(() => {
      function fetchData() {
          // Fetch ruleset data
          if (user.ruleset) {
            getUserRulesets()
          }
          // Fetch position data
          if (user.position) {
            getUserPosition()
          }
          // Fetch location data
          if (user.locationId) {
            // console.log("user.location_id is running")
            getUserLocation()
          }
          if (user.insurance) {
            getUserInsurance()
          }

          if(user.phoneNumber){
            console.log("IF STATEMENT IS RUNNING")
            formatPhoneNumber()
          }
        }
  
      fetchData();
    }, []); 

  async function getUserRulesets() {
    let rsArr = []
    for(let rs of user.ruleset) {
      let ruleset = await FastApi.getRuleset(rs.rulesetId);
      rsArr.push(ruleset.name)
    }
    let userRulesets = rsArr.join(", ")
    setRulesets(userRulesets)
  }

  async function getUserPosition() {
    let posArr = []
    for(let pos of user.position) {
      let position = await FastApi.getPosition(pos.positionId);
      posArr.push(position.position)
    }
    let userPositions = posArr.join(", ")
    setPositions(userPositions)
  }

  async function getUserInsurance() {
    let insArr = []
    for(let ins of user.insurance) {
      let insurance = await FastApi.getInsurance(ins.insuranceId);
      insArr.push(insurance.type + ":")
      insArr.push(ins.insuranceNumber)
    }
    if(insArr.length > 2){
      insArr[1] += ","
    }    
    let userInsurances = insArr.join(" ")
    setInsurances(userInsurances)
  }


  async function getUserLocation() {
    let userLocation = await FastApi.getLocation(user.locationId);
    setCity(userLocation.city)
    setState(userLocation.state)
  }

  async function formatPhoneNumber() {
    let formPhoneNum = user.phoneNumber.slice(0, 3) + '-' + user.phoneNumber.slice(3, 6) + '-' + user.phoneNumber.slice(6);
    setPhoneNumber(formPhoneNum)
  }

    /** Render cards */
    // ! will need to rework this

    return (
      <div className="PROFILE" style={{backgroundColor: 'transparent', padding: '100px'}} >

        <MDBContainer>
          <MDBRow className="justify-content-center align-items-center h-100"> 
            <MDBCol lg="9" xl="10">
              <MDBCard style={{minWidth: '300px', minHeight: '700px', marginTop: '50px', boxShadow: '0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)'}}>
                <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '300px'}}>

                  <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '250px' }}>    

                  <MDBCardImage src="/skater_02.svg"
                      alt="Skater placeholder image" className="mt-4 mb-2 img-thumbnail" fluid style={{ width: '250px', height: '330px', zIndex: '1', backgroundColor: '#d1d2d4', border: '4px solid white', boxShadow: '0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)'}} /> 
                  </div>
                  <a href="/setup/profile">
                    <button type="button" className="btn btn-outline-dark"  data-mdb-ripple-color="dark"
                      style={{zIndex: 1, height: '40px', backgroundColor: '#d1d2d4', position: 'absolute', right: '20px', marginTop: '10px', fontSize: '15px'}}>
                      Edit
                    </button>
                  </a>
                  <div className="ms-3" style={{ marginTop: '200px'}}>
                    <MDBTypography tag="h4">{user.username} #{user.primaryNumber}</MDBTypography>
                    {/* {user.first_name && user.last_name && <MDBCardText>{user.first_name} {user.last_name}</MDBCardText>} */}
                    {user.locationId && city && state && <MDBCardText>{city}, {state}</MDBCardText>}
                  </div>
                </div>
                <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                  <div className="d-flex justify-content-end text-center py-1" style={{marginTop: '2px'}}>
                    { user.level && <div>
                      <MDBCardText className="mb-1 h5" style={{marginRight: '30px'}}>{user.level}</MDBCardText>
                      <MDBCardText className="small text-muted mb-0"style={{marginRight: '30px'}}>level</MDBCardText>
                    </div>
                    }
                    { user.position && <div>
                      <MDBCardText className="mb-1 h6">{positions}</MDBCardText>
                      <MDBCardText className="small text-muted mb-0" style={{marginRight: '30px', marginTop: '7px'}}>positions</MDBCardText>
                    </div>
                    }
                    { user.ruleset &&
                    <div className="px-3">
                      <MDBCardText className="mb-1 h6" style={{marginLeft: '30px'}}>{rulesets}</MDBCardText>
                      <MDBCardText className="small text-muted mb-0" style={{marginLeght: '30px', marginTop: '7px'}}>known rulesets</MDBCardText>
                    </div>
                    }
                  </div>
                </div>
                <MDBCardBody className="text-black p-4">

                { user.about && <div className="mb-5">
                    <p className="lead fw-normal mb-1">About</p>
                    <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                      <MDBCardText className="font-italic mb-1">{user.about}</MDBCardText>
                    </div>
                  </div>
                  }
                  { user.associatedLeagues && <div className="mb-5">
                    <p className="lead fw-normal mb-1">Associated Leagues</p>
                    <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                      <MDBCardText className="font-italic mb-1">{user.associatedLeagues}</MDBCardText>
                    </div>
                  </div>
                  }
                  { user.facebookName && <div className="mb-5">
                    <p className="lead fw-normal mb-1">You can find me on facebook: {user.facebookName}</p>
                  </div>
                  }
                </MDBCardBody>


                <MDBContainer style={{paddingBottom: '100px'}}>
                          <MDBRow className="justify-content-center align-items-center h-100"> 
                            <MDBCol lg="9" xl="10">
                              <MDBCard style={{minWidth: '300px', minHeight: '700px', marginTop: '50px', boxShadow: '0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)'}}>
                                <div>
                                  <h2>Private Information </h2>
                                  <h3>Will be shared with team admin only.</h3>
                                  <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '250px' }}>    
                                      <a href="/setup/private">
                                          <button type="button" className="btn btn-outline-dark"  data-mdb-ripple-color="dark"
                                            style={{zIndex: 1, height: '35px', backgroundColor: '#d1d2d4', position: 'absolute', top: '10px', right: '20px', marginTop: '10px', fontSize: '15px'}}>
                                            Edit
                                          </button>
                                      </a>
                                  </div>
                                </div>

                                <div className="p-2 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                                    <div className="d-flex justify-content-end text-center py-1" style= {{marginTop: '2px'}}>
                                    </div>
                                </div>

                                <div className="ms-3 d-flex" style={{ marginTop: '0px'}}>
                                    <div className="m-0 text-start" style={{fontSize: '24px', fontFamily: 'initial', fontWeight: 'bold'}}>Name:
                                    </div>
                                    {user.firstName && user.lastName && <MDBCardText style={{marginLeft: '150px', marginTop: '5px'}} tag="h4">{user.firstName} {user.lastName}</MDBCardText>}
                                    </div>

                                <div className="p-2 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                                    <div className="d-flex justify-content-end text-center py-1" style={{marginTop: '2px'}}>
                                    </div>
                                </div>

                                <div className="ms-3 d-flex" style={{ marginTop: '0px'}}>
                                    <div className="m-0 text-start" style={{fontSize: '24px', fontFamily: 'initial', fontWeight: 'bold'}}>Email:
                                    </div>
                                    <MDBCardText style={{marginLeft: '146px', marginTop: '5px'}} tag="h4">{user.email} </MDBCardText>
                                </div>

                                <div className="p-2 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                                    <div className="d-flex justify-content-end text-center py-1" style={{marginTop: '2px'}}>
                                    </div>
                                </div>

                                
                                <div className="ms-3 d-flex" style={{ marginTop: '0px'}}>
                                    <div className="m-0 text-start" style={{fontSize: '24px', fontFamily: 'initial', fontWeight: 'bold'}}>Phone #:
                                    </div>
                                    {user.phoneNumber && <MDBTypography style={{marginLeft: '126px', marginTop: '5px'}} tag="h4">{phoneNumber}</MDBTypography>}
                                </div>

                                <div className="p-2 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                                    <div className="d-flex justify-content-end text-center py-1" style={{marginTop: '2px'}}>
                                    </div>
                                </div>

                                <div className="ms-3 d-flex" style={{ marginTop: '0px'}}>
                                    <div className="m-0 text-start" style={{fontSize: '24px', fontFamily: 'initial', fontWeight: 'bold'}}>Insurances:
                                    </div>

                                    { insurances &&
                                          <MDBTypography style={{marginLeft: '100px', marginTop: '5px'}} tag="h4">{insurances}</MDBTypography>
                                    }
                                </div>

                                <div className="p-2 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                                    <div className="d-flex justify-content-end text-center py-1" style={{marginTop: '2px'}}>
                                    </div>
                                </div>

                                <div className="ms-3 d-flex" style={{ marginTop: '0px'}}>
                                    <div className="m-0 text-start" style={{fontSize: '24px', fontFamily: 'initial', fontWeight: 'bold'}}>Additional Info:
                                    </div>

                                    {user.additionalInfo && 
                                        <MDBTypography style={{marginLeft: '56px', marginTop: '5px'}} tag="h4">{user.additionalInfo}</MDBTypography>
                                    }
                                </div>

                                <div className="p-2 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                                    <div className="d-flex justify-content-end text-center py-1" style={{marginTop: '2px'}}>
                                    </div>
                                </div>

                                <div className="ms-3 d-flex" style={{ marginTop: '0px'}}>
                                    <div className="m-0 text-start" style={{fontSize: '24px', fontFamily: 'initial', fontWeight: 'bold'}}>Secondary #:
                                    </div>

                                    {user.secondaryNumber != null && 
                                        <MDBTypography style={{marginLeft: '90px', marginTop: '5px'}} tag="h4">{user.secondaryNumber}</MDBTypography>
                                    }
                                </div>

                                <div className="p-2 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                                    <div className="d-flex justify-content-end text-center py-1" style={{marginTop: '2px'}}>
                                    </div>
                                </div>
                    
                              </MDBCard>
                            </MDBCol>
                          </MDBRow>
                        </MDBContainer>


              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>


      </div>
    )

}

export default Profile 