import React from "react";
import { NavLink } from "react-router-dom";
import "./UserComponent.css";
import { useParams } from "react-router-dom";
import FastApi from "../Api";

  /**  
  * Card component for users
  */

  function UserComponent({indUser, getPendingInvites}) {

    const pathname = window.location.pathname;
    const teamId = useParams(); 

    /** Retrieve user from local storage*/
  
    const user = JSON.parse(localStorage.getItem('user'));
    
    /** API get request for teams */

    async function sendInvite() {

      try {
        let data = {
          inviteId: 0,
          teamId: teamId.id,
          senderId: user.userId, 
          recipientId: indUser.userId,
          status: 'pending'
        }

        await FastApi.addTeamInvite(data);
        
      } catch (errors) {

        return { success: false, errors };
      }
    }

    /** Handle click of button  */

    async function handleClick(e) {
      e.preventDefault(); 
      sendInvite(); 
      getPendingInvites(); 
    }

     /** Render the card component */
      
      return (
      <div key={"UserComponent-" + indUser.userId } className="UserComponent" style={{width: '77%', height: 'auto', minHeight: '90px', borderRadius: '5px', overflow: 'hidden'}}> 
       <NavLink to={`/users/${indUser.userId}`} className="UserComponent-Link" style={{color: '#555555', textDecoration: 'none'}}>
        <div style={{ display: 'flex'}}>
            <div style={{paddingTop: '8px', paddingLeft: '20px', paddingRight: '20px'}} >
              {/* { indUser.image && <img src={indUser.image}
                alt="Skater placeholder image" className="img-thumbnail" style={{ width: '60px', borderRadius: '50%', backgroundColor: '#d1d2d4', border: '2px solid black', padding: '0px'}}/> 
              } */}
            </div>           
            <h4 style={{paddingTop: '30px'}}>{indUser.username}</h4>
            {pathname !== "/users" && <div style={{paddingLeft: '60%', paddingTop: '7%',position: 'absolute'}}> <button onClick={handleClick} style={{borderRadius: '5px', height: '33px', top: '10px', right: '20px' }}>Invite</button> </div>}
        </div>
        </NavLink>
      </div>
        );
  }
  
  export default UserComponent
