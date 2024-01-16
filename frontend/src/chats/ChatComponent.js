import React, { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
// import UserContext from "../UserContext";
// import FastApi from "../../Api";
// import "./ChatComponent.css";
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
  function ChatComponent({handleChat, chat}) {

    console.log("chat in card component !!!!!!!!!!!!!!!!!!!!", chat)

    /** Get user from context, set button, and disable in state, and determine if dealing with bout or mixer*/
    let key = chat.chatId;
    // ! The chat id is how we want to render these chats 
  
    // const { user } = useContext(UserContext); 


     /** Render the card component */
      
      return (
          <section key={"ChatComponent-" + key}>
            <Card className="ChatComponent" onClick={() => handleChat(key)}> 
            {/* <Card className="ChatComponent" onClick={handleChat}>  */}
            {/* <Card className="ChatComponent">  */}
              <CardBody>
                  {/* <NavLink exact to={`/chat/${key}`} className="CompanyCard-Link" style={{color: '#555555', }}> */}
                <CardTitle className="text-center CardComponent-Title">
                  <h3>{chat.name}</h3>
                </CardTitle>

                  {/* </NavLink> */}
              </CardBody>
            </Card>
         </section>
        );
  }
  
  export default ChatComponent
