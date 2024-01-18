import React, { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../multiUse/UserContext";
import "./UserComponent.css";
import {
    Card,
    CardBody,
    CardTitle,
    CardText,
    Button
  } from "reactstrap";
  // import {  MDBCardImage } from 'mdb-react-ui-kit';
  

  
  /**  
  * Card component for users
  */

  // function CardComponent({mixer, bout, event, user}) {
  function UserComponent({indUser}) {
    console.log("*******************indUser:", indUser)

    /** Get user from context, set button, and disable in state, and determine if dealing with bout or mixer*/

    // const [ button, setButton ] = useState("Apply");
    // const [ disable, setDisable ] = useState(false);
    // let info = bout !== undefined ? bout : mixer;
    // let type = bout !== undefined ? "bouts" : "mixers";
    // console.log("info:", info)
    // let key = bout !== undefined ? bout.eventId : mixer.eventId;
    // let key = info.eventId

    // let id = "Card-Component-";
    // let key = id + keyInfo;
  
    const { user } = useContext(UserContext);  
    
    // let timeObj = new Time(info.time)
    // let hours = timeObj.getHours()
    // console.log("hours:", hours)
    
    // let userTime = 

    
    /** Reloading jobs when it changes request for users applications */

    // useEffect(() => {

    //   if(job) {
    //     const isApplied = user.applications.includes(job.id);
    //     setButton(isApplied ? "Applied" : "Apply");
    //     setDisable(isApplied);
    //   }
    // }, [user.applications]);


    /** Handle click of button  */

    // async function handleClick(e) {
    //   e.preventDefault(); 

    //   let result = await apply(user.username, job.id); 

    //   if(result.success) {
    //     setButton("Applied");
    //     setDisable(true);
    //     user.applications.push(job.id);
    //   } 

    // }

     /** Render the card component */
      
      return (
      <div key={"UserComponent-" + indUser.userId } className="UserComponent" style={{width: ' 350px', height: '90px', borderRadius: '5px'}}> 
       <NavLink exact to={`/users/${indUser.userId}`}                  className="UserComponent-Link" style={{color: '#555555', textDecoration: 'none'}}>
        <div style={{ display: 'flex'}}>
            <div style={{paddingTop: '8px', paddingLeft: '20px', paddingRight: '20px'}} >
            { indUser.image && <img src={indUser.image}
              alt="Skater placeholder image" className="img-thumbnail" style={{ width: '60px', borderRadius: '50%', backgroundColor: '#d1d2d4', border: '2px solid black', padding: '0px'}}/> 
            }
            </div>           
            <h4 style={{paddingTop: '30px'}}>{indUser.username}</h4>
        </div>
        </NavLink>
      </div>
        );
  }
  
  export default UserComponent
