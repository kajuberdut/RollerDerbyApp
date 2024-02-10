import React, { useState, useEffect } from "react";
import "./InviteComponent.css";
import FastApi from "../Api";
import Loading from "../multiUse/loading/Loading";
  
/**  
 * Display invite component
 */

function InviteComponent({ invite, getInvites, getTeams }) {

    /** Sets sender, team and is loading in state */

    const [ sender, setSender ] = useState();
    const [ team, setTeam ] = useState();
    const [isLoading, setIsLoading] = useState(true);

    /** Retrieve user from local storage*/

    const user = JSON.parse(localStorage.getItem('user'));

    /** API get request for team */

    async function getTeam() {

        try {

          let team = await FastApi.getGroup(invite.teamId);
          setTeam(team);
        } catch (errors) {

          return { success: false, errors };
        }
    }

    /** API get request for sender*/

    async function getSender() {

        try {
            let user = await FastApi.getUserById(invite.senderId);
            setSender(user);
        } catch (errors) {

            return { success: false, errors };
        }
    }

    /** API post request for user group */

    async function acceptInvite() {

        try {

            let data = {
                userId: user.userId,
                groupId: invite.teamId
            }

            await FastApi.addUserToGroup(data);
        } catch (errors) {

            return { success: false, errors };
        }
    }

    /** API put request for team invite*/

    async function changeStatusInvite() {
 
        try {

            let data = {
                status: "accepted"
            }

            await FastApi.updateTeamInvite(invite.inviteId, data);
        } catch (errors) {

            return { success: false, errors };
        }
    }
    
    /** Reloads teams when changes request for teams */

    useEffect(() => {
        getTeam();
        getSender();
        setIsLoading(false);
    }, []);

    
    /** Display loading if API call is has not returned */

    if (isLoading) {
        return (
            <Loading />
        )
    }

    /** Handle click of button  */

    async function handleClick(e) {
        e.preventDefault(); 
        acceptInvite(); 
        changeStatusInvite(); 
        getInvites();
        getTeams();
    }

    /** Render the invite component */
      
    return (
      <div key={"InviteComponent-" + invite.inviteId } className="InviteComponent" style={{width: '77%', minHeight: '90px', height: 'auto', borderRadius: '5px'}}> 
        <div style={{justifyContent: 'flex-end'}}> 
            <div>
                {team && team.name && <h6 style={{paddingTop: '10px', paddingLeft: '10px', paddingRight: '10px'}}>Join Team {team.name}</h6> }
                { sender && <p>Invited By: {sender.username}</p> }
            </div>  
            <div style={{paddingRight: '10px', paddingLeft: '170px', paddingBottom: '10px', margintop: '30px'}}>
                <button onClick={handleClick} style={{height: '30px', borderRadius: '4px'}}>Accept
                </button>    
            </div>     
        </div>
      </div>

    );
}
  
export default InviteComponent
