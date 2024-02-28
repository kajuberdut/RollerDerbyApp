import React, { useState, useEffect, useContext } from "react";
import FastApi from "../../../frontend/src/Api";
import { useParams} from "react-router-dom";
// import skateImg from "../public/logo512.png"
// import defaultImg from "./images/skater_02"
import Loading from "../../../frontend/src/multiUse/loading/Loading";

// todo YOU NEED TO FIND A WAY TO GET THE USER ID OF THE USERDETAILS PAGE AND PASS IT TO THE MESSAGES SO THAT YOU CAN CREATE A ROOM FOR A CHAT 

// ! are you going to make a distinction betweeen everyone elses profile and the users profile... and the answer is probably yes... so you may want to have a /profile and a /users/derbyName

import UserContext from "../multiUse/UserContext";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';
import { Button } from "reactstrap";


/**  
 * User detail form
 */

function UserDetails({ handleMessages }) {


   /** Get url handle and set jobs and is loading in state*/
    // console.log("company:", company)
    const username = useParams(); 
    const [isLoading, setIsLoading] = useState(true);
    const [derbyUser, setDerbyUser] = useState("");
    const [userId, setUserId] = useState("");
    const [rulesets, setRulesets] = useState("");
    const [positions, setPositions] = useState("");
    const [location, setLocation] = useState("");
    const { user } = useContext(UserContext);
    // const params = useParams();
    // const derbyName = params.d;
    // console.log("user in profile.js:", user)

    // let pos = []; 

    // if (user.position.jammer) {
    //   pos.push("Jammer ");
    // }
    // if (user.position.blocker) {
    //   pos.push("Blocker ");
    // }
    // if (user.position.pivot) {
    //   pos.push("Pivot ")
    // }

    // let positions = pos.join(", ")
    
    // console.log("user.image in profile.js", user.image)
    // console.log("!!! username in userDetails.js !!!!", username)
    
    // console.log(require('./images/skater_02.svg'))

    async function getUser() {
 

      try {
        let indUser = await FastApi.getUser(username.username);
        // console.log("indUser!!!!!!!!!:", indUser)
        setUserId(indUser.userId)
        let rs = [];
        if(indUser.ruleset){
          for(const rule in indUser.ruleset) {
            
          let rulesets = await FastApi.getRuleset(indUser.ruleset[rule].rulesetId)
         
          if (rulesets.name === "WFTDA") {
            rs.push("WFTDA");
          }
          if (rulesets.name === "USARS") {
            rs.push("USARS");
          }
          if (rulesets.name === "banked track") {
            rs.push("Banked Track");
          }
          if (rulesets.name === "short track") {
            rs.push("Short Track");
          }
          let knownRulesets = rs.join(", ")
          setRulesets(knownRulesets)
        }
        }

        if(indUser.position){
          let ps = [];
          for(const pos of indUser.position) {
            let positions = await FastApi.getPosition(pos.positionId)

            if (positions.position === "jammer") {
              ps.push("Jammer");
            }
            if (positions.position === "pivot") {
              ps.push("Pivot");
            }
            if (positions.position === "blocker") {
              ps.push("Blocker");
            }
          
            let playedPositions = ps.join(", ")

            setPositions(playedPositions)
          }
      }

        if(indUser.locationId){
          let location = await FastApi.getLocation(indUser.locationId)
          setLocation(location)
          // console.log("!!!!! location !!!!!", location)
        }
        setDerbyUser(indUser); 

        setIsLoading(false)
        return indUser
      } catch (errors) {
        console.error("Get Users failed", errors);
        return { success: false, errors };
      }
    }

       /** Reloading indUser when it changes request for jobs */

       useEffect(() => {
        getUser();
    }, []);

        /** Display isLoading if API call is has not returned */

        if (isLoading) {
          return (
              <Loading />
          )
        }


        // console.log("******* derbyUser.primaryNumber:", derbyUser.primaryNumber)
    // ! will need to rework this

    return (
      // <div><h1>user profile details</h1></div>
      
      // <div className="PROFILE" style={{backgroundColor: 'red', boxShadow: '100px 100px 100px black'}} >
      // <div className="PROFILE" style={{backgroundColor: 'red', border: '100px solid black'}} >
      // <div className="PROFILE" style={{backgroundColor: 'red'}} >
      <div className="PROFILE" style={{backgroundColor: 'white', padding: '100px'}} >

        <MDBContainer>
          <MDBRow className="justify-content-center align-items-center h-100"> 
            <MDBCol lg="9" xl="10">
              <MDBCard style={{minWidth: '450px', minHeight: '700px', marginTop: '50px', boxShadow: '0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)'}}>
                <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '300px'}}>
                  <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '250px' }}>    

                  <MDBCardImage src="/skater_02.svg"
                      alt="Skater placeholder image" className="mt-4 mb-2 img-thumbnail" fluid style={{ width: '250px', height: '330px', zIndex: '1', backgroundColor: '#d1d2d4', border: '4px solid white', boxShadow: '0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)'}} /> 
                  </div>

                  <div className="ms-3" style={{ marginTop: '200px'}}>
                    <MDBTypography tag="h4">{derbyUser.username} #{derbyUser.primaryNumber}</MDBTypography>
                    { location.city && location.state && <div>
                    <MDBCardText>{location.city}, {location.state}</MDBCardText>
                    </div>
                    }
                    {/* <a href="/messages"> */}
                      <button onClick={handleMessages} type="button" className="btn btn-outline-dark"  data-mdb-ripple-color="dark"
                        style={{ height: '40px', backgroundColor: '#d1d2d4', position: 'absolute', right: '20px', top: "250px", fontSize: '15px'}}>
                        Message
                      </button>
                    {/* </a> */}
                </div>

                  </div>
              
                <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                  <div className="d-flex justify-content-end text-center py-1" style={{marginTop: '2px'}}>
                    {derbyUser.level && <div>
                      <MDBCardText className="mb-1 h5" style={{marginRight: '30px'}}>{derbyUser.level}</MDBCardText>
                      <MDBCardText className="small text-muted mb-0"style={{marginRight: '30px'}}>level</MDBCardText>
                    </div>
                    }
                    { positions && <div>
                      <MDBCardText className="mb-1 h6">{positions}</MDBCardText>
                      <MDBCardText className="small text-muted mb-0" style={{marginRight: '30px', marginTop: '7px'}}>positions</MDBCardText>
                    </div> 
                    }
                     {rulesets &&  <div className="px-3">
                    <MDBCardText className="mb-1 h6" style={{marginLeft: '30px'}}>{rulesets}</MDBCardText>
                      <MDBCardText className="small text-muted mb-0" style={{marginLeght: '30px', marginTop: '7px'}}>known rulesets</MDBCardText>
                    </div>
                    }
                  </div>
                </div>
                <MDBCardBody className="text-black p-4">
                { derbyUser.about && <div className="mb-5">
                    <p className="lead fw-normal mb-1">About</p>
                    <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                      <MDBCardText className="font-italic mb-1">{derbyUser.about}</MDBCardText>
                    </div>
                  </div>
                }
                  { derbyUser.associatedLeagues && <div className="mb-5">
                    <p className="lead fw-normal mb-1">Associated Leagues</p>
                    <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                      <MDBCardText className="font-italic mb-1">{derbyUser.associatedLeagues}</MDBCardText>
                    </div>
                  </div>
                  }
                 { derbyUser.facebookName && <div className="mb-5">
                    <p className="lead fw-normal mb-1">You can find me on facebook: {derbyUser.facebookName}</p>
                  </div>
                    }
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    )

}

export default UserDetails