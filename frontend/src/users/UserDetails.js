import React, { useState, useEffect } from "react";
import FastApi from "../Api";
import { useParams} from "react-router-dom";
import Loading from "../multiUse/loading/Loading";

// ! are you going to make a distinction betweeen everyone elses profile and the users profile... and the answer is probably yes... so you may want to have a /profile and a /users/derbyName


import { MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography } from 'mdb-react-ui-kit';

/**  
 * Display user detail page
 */

function UserDetails({ handleMessages, displayChatList }) {


   /** Get params set is loading, derby user, user id, rulesets, positions, location image, in state*/
   
    const params = useParams(); 
    const [isLoading, setIsLoading] = useState(true);
    const [derbyUser, setDerbyUser] = useState("");
    const [userId, setUserId] = useState("");
    const [rulesets, setRulesets] = useState("");
    const [positions, setPositions] = useState("");
    const [location, setLocation] = useState("");
    const [image, setImage] = useState("");

    /** API get request for user and all details */

    async function getUser() {

      try {

        let indUser = await FastApi.getOtherUser(params.userId);
        setUserId(indUser.userId)

        let imageData = await FastApi.getImage(params.userId);
 
        if(imageData.image) {
          setImage(imageData.image)
        }
      
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

        }
        setDerbyUser(indUser); 

        setIsLoading(false)
        return indUser
      } catch (errors) {

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

    return (
  
      <div className="UserDetails" style={{backgroundColor: 'transparent', padding: '100px', marginRight: displayChatList ? '400px' : '0px'}} >

        <MDBContainer style={{padding: '0px', margin: '0px' }}>
          <MDBRow style={{padding: '0px', margin: '0px'}}> 
              <MDBCard style={{minWidth: '612px', maxWidth: '1100px', minHeight: '700px', marginTop: '50px', boxShadow: '0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)'}}>
                <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '300px', marginTop: '15px'}}>

                  <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '250px' }}> 
                  {image && <MDBCardImage src={image}
                      alt="Skater placeholder image" className="mt-4 mb-2 img-thumbnail" fluid style={{ width: '250px', height: '330px', position: 'relative', backgroundColor: '#d1d2d4', border: '4px solid white', boxShadow: '0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)'}} /> 
                  } 
                  {!image && <MDBCardImage src="/skater_02.svg"
                      alt="Skater placeholder image" className="mt-4 mb-2 img-thumbnail" fluid style={{ width: '250px', height: '330px', position: 'relative', backgroundColor: '#d1d2d4', border: '4px solid white', boxShadow: '0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)'}} /> 
                  }
                  </div>

                  <div className="ms-3" style={{ marginTop: '200px'}}>
                    <MDBTypography tag="h4">{derbyUser.username} #{derbyUser.primaryNumber}</MDBTypography>
                    { location.city && location.state && <div>
                    <MDBCardText>{location.city}, {location.state}</MDBCardText>
                    </div>
                    }
                      <button onClick={handleMessages} type="button" className="btn btn-outline-dark"  data-mdb-ripple-color="dark"
                        style={{ height: '40px', backgroundColor: '#d1d2d4', position: 'absolute', right: '30px', top: "250px", fontSize: '15px'}}>
                        Message
                      </button>
                </div>

                  </div>
              
                <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                  <div className="d-flex justify-content-end text-center py-1" style={{marginTop: '2px'}}>
                    <div style={{ marginLeft: '600px'}}>
                      {derbyUser.level && <div>
                        <MDBCardText className="mb-1 h5" style={{marginRight: '30px'}}>{derbyUser.level}</MDBCardText>
                        <MDBCardText className="small text-muted mb-0"style={{marginRight: '30px'}}>level</MDBCardText>
                      </div>
                      }
                    </div>
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
          </MDBRow>
        </MDBContainer>
      </div>
    )

}

export default UserDetails