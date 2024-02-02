import React, { useState, useEffect } from "react";
import "./TeamComponent.css";
import FastApi from "../Api";
import Loading from "../multiUse/loading/Loading";
import { useParams} from "react-router-dom";
import SearchComponentUsers from "../multiUse/searchComponent/SearchComponentUsers";
import UserComponent from "../users/UserComponent";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody } from 'mdb-react-ui-kit';


// todo: make each participant a link to their private details. 
// todo: figure out a way to export those details in an excel page??? 
  
  /**  
  * Card component for teams
  */

  function TeamDetails() {

    /** Get user from context, set button, and disable in state, and determine if dealing with bout or mixer*/

    const [team, setTeam] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const groupId = useParams(); 
    const [users, setUsers] = useState([]);
  
    const user = JSON.parse(localStorage.getItem('user'));
    
    async function getTeam() {

        try {
          let teamDet = await FastApi.getGroup(groupId.id);
          console.log("teamDet !!!!!!!!!!!!!!!  ", teamDet)
          setTeam(teamDet)
          setIsLoading(false)
        } catch (errors) {
          return { success: false, errors };
        }
      }

    
    /** Reloads teams when changes request for teams */

    useEffect(() => {
        getTeam();
    }, []);

    /** Display isLoading if API call is has not returned */

    if (isLoading) {
        return (
            <Loading />
        )
      }

    /** Render the cards for users*/

    const renderCards = () => {
      return (
        <div className="UserList-RenderCards">
                {users.map(indUser => (
                  indUser.username !== user.username ? (
                  <UserComponent indUser={indUser} key={"User-" + indUser.userId} />
                  ) : null 
                ))}
          </div>
        );
    }

     /** Render the Team Details component */
      
      return (

        <div className="TeamDetails" style={{backgroundColor: 'transparent', padding: '100px', display: 'flex'}} >
          
          <MDBContainer style={{paddingBottom: '100px'}}>
                    <MDBRow className="justify-content-center align-items-center h-100"> 
                      <MDBCol lg="9" xl="10">
                        <MDBCard style={{minWidth: '300px', minHeight: '700px', marginTop: '50px', boxShadow: '0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)'}}>
                          <div>
                            {team && <h2>{team.name}</h2> }
                            
                            { team && user.userId === team.admin &&  <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '250px' }}>    
                            <a href="/setup/private">
                                    <button type="button" className="btn btn-outline-dark"  data-mdb-ripple-color="dark"
                                      style={{ height: '40px', backgroundColor: '#d1d2d4', position: 'absolute', right: '20px', top: "20px", fontSize: '15px'}}>
                                      Team Info
                                    </button>
                                </a>
                              
                            </div>
                            }
                          </div>

                          <div className="p-2 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                              <div className="d-flex justify-content-end text-center py-1" style= {{marginTop: '2px'}}>
                              </div>
                          </div>

                          <div className="ms-3 d-flex" style={{ marginTop: '0px'}}>
                              <div className="m-0 text-start" style={{fontSize: '24px', fontFamily: 'initial', fontWeight: 'bold'}}>Participants:
                              </div>
                              {/* <MDBCardText style={{marginLeft: '150px', marginTop: '5px'}} tag="h4">{participants} </MDBCardText> */}


                              {team && <MDBCardText style={{ marginLeft: '150px', marginTop: '5px' }} tag="h4">
                                {team.participants.map((participant) => (
                                    <p key={participant}>{participant}</p>
                                      
                                ))}
                              </MDBCardText>
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

                  { team && user.userId == team.admin && <MDBContainer style={{paddingBottom: '100px'}}>
                    <MDBRow className="justify-content-center align-items-center h-100"> 
                      <MDBCol lg="9" xl="10">
                          <MDBCard style={{minWidth: '300px', minHeight: '700px', marginTop: '50px', boxShadow: '0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)'}}>
                          <div>
                              <h2>Add Player</h2>
                              <SearchComponentUsers setUsers={setUsers}/>
                          </div>
                          <div className="p-2 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                              <div className="d-flex justify-content-end text-center py-1" style= {{marginTop: '2px'}}>
                              </div>
                          </div>
                          {users && <div> {renderCards()} </div> }
                                      
                          </MDBCard>
                      </MDBCol>
                    </MDBRow>
                  </MDBContainer>
                  }

          </div>
        );
  }
  
  export default TeamDetails
