import React, { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../multiUse/UserContext";
import "./TeamComponent.css";
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

  function TeamComponent({ team }) {

    /** Get user from context, set button, and disable in state, and determine if dealing with bout or mixer*/

    const [ teamDet, setTeamDet ] = useState();
    const [isLoading, setIsLoading] = useState(true);

  
    const { user } = useContext(UserContext);  
    

    
    async function getTeam() {

        try {
          let teamDet = await FastApi.getGroup(team.groupId);
          console.log("teamDet !!!!!!!!!!!!!!!  ", teamDet)
          setTeamDet(teamDet)
          setIsLoading(false)
        } catch (errors) {
          return { success: false, errors };
        }
      }
    
       /** Reloads teams when changes request for teams */
    
        useEffect(() => {
            getTeam();
        }, []);

     /** Render the card component */
      
      return (
      <div key={"TeamComponent-" + team.groupId } className="TeamComponent" style={{width: '77%', height: '90px', borderRadius: '5px', bakgroundColor: ''}}> 
       <NavLink to={`/teams/${team.groupId}`} className="TeamComponent-Link" style={{color: '#555555', textDecoration: 'none'}}>
        <div style={{ display: 'flex'}}>
            <div style={{paddingTop: '8px', paddingLeft: '20px', paddingRight: '20px'}} >
            <h4 style={{paddingTop: '30px'}}>{team.name}</h4>
            </div>           
        </div>
        </NavLink>
      </div>
    // <div>{team.name}</div>
        );
  }
  
  export default TeamComponent
