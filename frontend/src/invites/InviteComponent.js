import React, { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../multiUse/UserContext";
import "./InviteComponent.css";
import FastApi from "../Api";
import Loading from "../multiUse/loading/Loading";
import {
    Card,
    CardBody,
    CardTitle,
    CardText,
    Button
  } from "reactstrap";
  // import {  MDBCardImage } from 'mdb-react-ui-kit';

  
  /**  
  * Card component for teams
  */

  function InviteComponent({ invite }) {

    /** Get user from context, set button, and disable in state, and determine if dealing with bout or mixer*/

    const [ sender, setSender ] = useState();
    const [ team, setTeam ] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem('user'));
    console.log("invite in inviteComponent", invite)
    
    async function getTeam() {

        try {
          let team = await FastApi.getGroup(invite.teamId);
          console.log("teamDet !!!!!!!!!!!!!!!  ", team)
          setTeam(team)
          setIsLoading(false)
        } catch (errors) {
          return { success: false, errors };
        }
    }

    async function getSender() {

    try {
        let user = await FastApi.getUserById(invite.senderId);
        console.log("user !!!!!!!!!!!!!!!  ", user)
        setSender(user)
        setIsLoading(false)
    } catch (errors) {
        return { success: false, errors };
    }
    }

    async function acceptInvite() {

        try {
            let data = {
                userId: user.userId,
                groupId: invite.teamId
            }

            let userGroup = await FastApi.addUserToGroup(data);

            console.log("userGroup !!!!!!!!!!!!!!!  ", userGroup)

            // console.log("try is running")
            // let inviteData = {
            //     status: "accepted"
            // }
            // console.log("data", data)

            // let invite = await FastApi.updateTeamInvite(invite.inviteId, inviteData);
            // console.log("invite !!!!!!!!!!!!!!!  ", invite)

        } catch (errors) {
            return { success: false, errors };
        }
    }


    async function changeStatusInvite() {
 
        try {
            let data = {
                status: "accepted"
            }

            let inviteStatus = await FastApi.updateTeamInvite(invite.inviteId, data);
            console.log("invite_status !!!!!!!!!!!!!!!  ", inviteStatus)

        } catch (errors) {
            return { success: false, errors };
        }
    }
    
    /** Reloads teams when changes request for teams */

    useEffect(() => {
        getTeam();
        getSender();
    }, []);

    /** Handle click of button  */

    async function handleClick(e) {
        e.preventDefault(); 
        acceptInvite(); 
        changeStatusInvite(); 
    }

     /** Render the card component */
      
      return (
      <div key={"InviteComponent-" + invite.inviteId } className="InviteComponent" style={{width: '77%', height: '90px', borderRadius: '5px'}}> 
       {/* <NavLink to={`/teams/${team.groupId}`} className="TeamComponent-Link" style={{color: '#555555', textDecoration: 'none'}}> */}
        <div style={{display: 'flex'}}> 
            <div>
                {team && team.name && <h6 style={{paddingTop: '10px', paddingLeft: '10px'}}>Join Team {team.name}</h6> }
                { sender && <p>Invited By: {sender.username}</p> }
            </div>  
            <div style={{paddingTop: '30px', paddingLeft: '10%'}}>
                <button onClick={handleClick} style={{height: '30px'}}>Accept</button>    
            </div>     
        </div>
        {/* </NavLink> */}
      </div>
    // <div>{team.name}</div>
        );
  }
  
  export default InviteComponent
