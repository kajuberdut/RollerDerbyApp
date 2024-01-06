import React, { useContext, useState, useEffect } from "react";
import io from "socket.io-client"

// import FastApi from "../Api";
// import { useHistory } from "react-router-dom/cjss/react-router-dom.min";
// import UserContext from "../multiUse/UserContext";
// import Select from 'react-select';
import { useNavigate } from "react-router-dom";
import Message from "./Message";



// ! path is what is throwing an error
// ! maybe I am wrong and that is not what is throwing the error 
// require('dotenv').config();
// const socket = io(process.env.REACT_APP_API_URL, { path: process.env.REACT_APP_SOCKET_PATH });
// const socket = io('http://localhost:8000', { path: '/sockets'});

// const socket = io('http://localhost:8000', { path: '/socket.io' })
// ? stopping here got a different error when I floppped the path.... to no way to handle requests debug more tomorrow. 
// const socket = io('http://localhost:8000/socket.io');


// const socket = io(process.env.REACT_APP_API_URL, { "path": false });
// const socket = io(process.env.REACT_APP_API_URL);
// ! come back to  this it has an error on the backend but need to adjust on frontend 
// https://github.com/pyropy/fastapi-socketio/issues/12

/** 
 * Form for creating a user or updating a logged in user.
 */

const Chat = () => {
    console.log("chat is running!!!!")
    // const [isConnected, setIsConnected] = useState(socket.connect)
    const [isConnected, setIsConnected] = useState(false)


    // const socket = io('http://localhost:8000', { path: '/socket.io' });
    const socket = io('http://localhost:8000/socket.io');

  useEffect(() => {
    // Handle connection events
    socket.on('connect', () => {
      setIsConnected(true);
      console.log('Socket connected');

      // Emit events to test functionality
      socket.emit('join');
      socket.emit('socket');
    });

    // Cleanup function to disconnect socket when component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  /** render form */

  return (
    <div className="" style={{marginTop: "150px"}}>
        <h2>status: {isConnected ? 'connected' : 'disconnected'}</h2>
        <div style={{height: '500px', overflowY: 'scroll', border: 'solid black 2px', padding: '10px', marginTop: '15px', display: 'flex', flexDirection: 'column'}}>
            <Message />
        </div>
    </div>
  
);
};

export default Chat;
