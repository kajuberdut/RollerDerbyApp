import React, { useState, useEffect } from "react";
import "./TeamComponent.css";
import FastApi from "../Api";
import Loading from "../multiUse/loading/Loading";
import { NavLink, useParams} from "react-router-dom";
import SearchComponentUsers from "../multiUse/searchComponent/SearchComponentUsers";
import UserComponent from "../users/UserComponent";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody } from 'mdb-react-ui-kit';
import './TeamDetails.css'

// todo: make each participant a link to their private details. 
// todo: figure out a way to export those details in an excel page??? 
  
  /**  
  * Card component for teams
  */

  function TeamDetails() {

    /** Get group id from url, set team, is loading and users in state*/

    const [team, setTeam] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const groupId = useParams(); 
    const [users, setUsers] = useState([]);
    const [invites, setInvites] = useState([]);
    const [enable, setEnable] = useState(false);
    const [link, setLink] = useState();


    /** Retrieve user from local storage */

    const user = JSON.parse(localStorage.getItem('user'));


    /** API get request for team */
    
    async function getTeam() {

        try {
          let teamDet = await FastApi.getGroup(groupId.id);
          console.log("teamDet !!!!!!!!!!!!!!!!!!!!", teamDet)
          setTeam(teamDet);
          setIsLoading(false);
  
        } catch (errors) {
          return { success: false, errors };
        }
    }

    /** API get pending invites for team */
    
    async function getPendingInvites() {

        try {
          let inviteUsernames = [];
          let inviteDets = await FastApi.getPendingInvites(groupId.id);
      
          for(const invite of inviteDets) {

            let user = await FastApi.getUsernameById(invite.recipientId);
            inviteUsernames.push(user.username)
          }

          console.log("invitesUsernames!!!!!!!!", inviteUsernames)
          setInvites(inviteUsernames);
          console.log("invites!!!!!!!!", invites)

        } catch (errors) {
          return { success: false, errors };
        }
    }

    /** Reloads teams when changes request for teams and pending invites */

    useEffect(() => {
        getTeam();
        getPendingInvites();
    }, []);

    /** Display isLoading if API call is has not returned */

    if (isLoading) {
        return (
            <Loading />
        )
      }

    /** Handle click of button  */

    async function handleClick(username) {
      // e.preventDefault(); 

      try {
        let data = {
          groupId: groupId.id,
          username: username
        }
        await FastApi.removeUserFromGroup(data);
   
      } catch (errors) {
        return { success: false, errors };
      }

    }

    async function handleCreateExcel() {

      try {
    
        const res = await FastApi.getTeamForm(team.groupId, user.userId);
        console.log("res typeof", typeof res)
        console.log("*****************************************")
        console.log("res:", res)
        // const blob = await Blob(res);
        // const blob = new Blob([res], { type: 'text/plain' });
        // const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        // console.log("blob", blob)

        setEnable(true);
        setLink(res.url)

        // console.log("enable", enable)

        // downloadButton.download = 'team_form.xlsx'


          // Initiate download
          // const url = window.URL.createObjectURL(blob);
          // button.href = url;
          // button.download = 'team_form.xlsx';
          // button.click();
          // Revoke object URL after download
          // link.remove();
   
      } catch (errors) {
        return { success: false, errors };
      }

    }

    /** Render the cards for users*/

    const renderCards = () => {
      return (
        <div className="UserList-RenderCards">
                {users.map(indUser => (
                  indUser.username !== user.username ? (
                  <UserComponent style={{minWidth: '400px'}} getPendingInvites={getPendingInvites} indUser={indUser} key={"User-" + indUser.userId} />
                  ) : null 
                ))}
          </div>
        );
    }

     /** Render the Team Details component */
      
      return (

        <div className="TeamDetails" style={{backgroundColor: 'transparent', padding: '10%', paddingTop: '100px', display: 'flex'}} >
          
          <MDBContainer style={{paddingBottom: '100px', minWidth: '400px', padding: '0px', margin: '0px'}}>
                    <MDBRow style={{padding: '0px', margin: '0px'}}> 
                      <MDBCol>
                        <MDBCard style={{minWidth: '400px', minHeight: '700px', marginTop: '50px', boxShadow: '0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)'}}>
                          <div>
                            {team && <h2 style={{paddingTop: '60px'}}>{team.name}</h2> }
                            
                            { team && user.userId === team.admin &&  <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '250px' }}>    
                            {/* <a href="/setup/private"> */}
                         
                                      <button type="button" className="TeamDetails-Button" onClick={handleCreateExcel}
                                      style={{ height: '40px', position: 'absolute', right: '120px', top: "20px", fontSize: '15px', borderRadius: '4px'}}>
                                      Create Excel
                                    </button>

                                  <a href={link} download>
                                    <button type="button"  className="TeamDetails-Download-Button" h disabled={!enable}
                                      style={{ height: '40px', position: 'absolute', right: '20px', top: "20px", fontSize: '15px', borderRadius: '4px'}}>
                                      Download
                                    </button>
                                  </a>
                                {/* </a> */}
                              
                            </div>
                            }
                          </div>

                          <div className="p-2 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                              <div className="d-flex justify-content-end text-center py-1" style= {{marginTop: '2px'}}>
                              </div>
                          </div>

                          <div className="ms-0 text-start" style={{ marginTop: '0px'}}>
                              <div className="m-0 text-start" style={{fontSize: '24px', fontFamily: 'initial', fontWeight: 'bold', paddingLeft: '15px'}}>Participants:
                              </div>

                              { team && user.userId == team.admin && <MDBCardText style={{ marginTop: '40px', marginLeft: '150px' }} tag="h4">
                               {team.participants.map((participant) => (
                                    <div style={{display: 'flex', justifyContent: 'center'}}>
                                    <NavLink className="TeamDetails-NavLink" key={"TeamDetails-Participant " + participant}  to={`/teams/${team.groupId}/${participant}`}><p style={{paddingRight: '30px'}}>{participant}</p></NavLink>
                                    {user.username !== participant && <button onClick={() => handleClick(participant)} className="TeamDetails-Button" style={{width: '70px', fontSize: '14px', height: '30px', borderRadius: '4px', left: '5px'}}>Remove</button> }
                                    </div>
                                ))}
                              </MDBCardText>
                              }

                                { team && user.userId !== team.admin && <MDBCardText style={{ marginLeft: '150px', marginTop: '5px' }} tag="h4">
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

                          <div className="p-2 text-black" style={{ backgroundColor: '#f8f9fa', marginTop: '150px' }}>
                              <div className="d-flex justify-content-end text-center py-1" style={{marginTop: '2px'}}>
                              </div>
                          </div>
                          

                          { invites &&  <div className="m-0 text-start" style={{fontSize: '24px', fontFamily: 'initial', fontWeight: 'bold', paddingLeft: '15px' }}>Pending Invites:
                          </div>    
                          }
                              { invites && user.userId == team.admin && <MDBCardText style={{ marginLeft: '150px', marginTop: '5px' }} tag="h4">
                               {invites.map((invite) => (
                                    <div style={{display: 'flex', justifyContent: 'center'}}>
                                    <p key={"TeamDetails-Invites " + invite} style={{paddingRight: '30px'}}>{invite}</p>
                                  
                                    </div>
                                ))}
                              </MDBCardText>
                              }

                          <div className="p-2 text-black" style={{ backgroundColor: '#f8f9fa', marginTop: '150px' }}>
                              <div className="d-flex justify-content-end text-center py-1" style={{marginTop: '2px'}}>
                              </div>
                          </div>
              
                        </MDBCard>
                      </MDBCol>
                    </MDBRow>
                  </MDBContainer>

                  { team && user.userId == team.admin && <MDBContainer style={{paddingBottom: '100px', marginLeft: '5%'}}>
                    <MDBRow> 
                      <MDBCol>
                          <MDBCard style={{minWidth: '400px', maxWidth: '500px', minHeight: '700px', marginTop: '50px', boxShadow: '0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)'}}>
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
