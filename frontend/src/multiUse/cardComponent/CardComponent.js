import React, { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../UserContext";
import "./CardComponent.css";
import {
    Card,
    CardBody,
    CardTitle,
    CardText,
    Button
  } from "reactstrap";

  

  
  /**  
  * Card component for bouts, mixers, events and users. 
  */

  // function CardComponent({mixer, bout, event, user}) {
  function CardComponent({mixer, bout, event}) {

    /** Get user from context, set button, and disable in state, and determine if dealing with bout or mixer*/

    // const [ button, setButton ] = useState("Apply");
    // const [ disable, setDisable ] = useState(false);
    let info = bout !== undefined ? bout : mixer;
    let type = bout !== undefined ? "bouts" : "mixers";
    console.log("info:", info)
    // let key = bout !== undefined ? bout.eventId : mixer.eventId;
    let key = info.eventId

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
          <section key={"Card-Component-" + key}>
            <Card className="CardComponent"> 
              <CardBody>
                  <NavLink exact to={`/${type}/${info.eventId}`} className="CompanyCard-Link">
                <CardTitle className="text-center CardComponent-Title">
                  <h3>{info.theme}</h3>
                </CardTitle>
                  </NavLink>
                 <CardTitle> 
                 <h4>{info.date}</h4>
                 <h4>{info.time}</h4>
                 </CardTitle>
                <CardText className="CardComponent-Text">
                  {info.description}
                </CardText>
                {/* <CardText className="CardComponent-Text">
                {info. && `equity: ${info.equity} `}
                </CardText>
                <CardText className="CardComponent-Text">
                {info.salary && `salary: ${info.salary}`}
                </CardText> */}
                  {/* {job && <Button className={`CardComponent-Button`}onClick={handleClick} disabled={disable}>{button}</Button>} */}
              </CardBody>
            </Card>
         </section>
        );
  }
  
  export default CardComponent
