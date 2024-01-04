import React, { useContext, useState } from "react";
import io from "socket.io-client"
// import FastApi from "../Api";
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// import UserContext from "../multiUse/UserContext";
// import Select from 'react-select';
import { useNavigate } from "react-router-dom";
import { socket } from "./socket";


/** 
 * Form for creating a user or updating a logged in user.
 */

const Message = () => {

  /** render form */

  return (
    <div className="" style={{marginTop: "150px"}}>
     This is my random message in Message.js
    </div>
  
);
};

export default Message;