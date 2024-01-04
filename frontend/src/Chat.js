import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import {
    Card,
    CardBody,
    CardTitle,
    Form,
    FormGroup,
    Label, 
    Input,
    Button,
  } from "reactstrap";

  
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!! yours is below !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');
    // const [userId, setUserId] = useState(Date.now());
    const [userId, setUserId] = useState(2);
    let INITIAL_STATE = { message: ""};
  /** Sets formData in initial state */
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [isConnected, setIsConnected] = useState(false);
    const [socket, setSocket] = useState();
    


    
    // console.log("before web socket in chat.js")
    // const socket = new WebSocket(`ws://localhost:8000/ws/${userId}`);
    // console.log("socket: ", socket)

    useEffect(() => {
      console.log("before web socket in chat.js")
      const socket = new WebSocket(`ws://localhost:8000/ws/${userId}`);
      console.log("socket: ", socket)
      // Add event listeners for socket events (e.g., onmessage, onopen, onclose)
      setIsConnected(true)

      setSocket(socket)
      // Cleanup function to close the socket when the component unmounts
      return () => socket.close();
  }, []);
  

    const handleSubmit = async evt => {
        evt.preventDefault();   
        console.log("formData in handle Submit chat.js:", formData)
        // ! this is breaking the app but doesnt start sending requests and get infinite 404 requests until it is 
        // const socket = io('http://localhost:8000', {path: `/ws/${userId}`});
        
        socket.send(formData.message)
        console.log("No error?")
        }

    const handleChange = evt => {
        console.log('handleChange is running')
    
        const { name, value }= evt.target;
    
        setFormData(fData => ({
          ...fData,
          [name]: value,
          
        }));
        console.log("formData in chat.js:", formData)
      };
  
    return (
        <div className="" style={{marginTop: "150px"}}>
            <h2>status: {isConnected ? 'connected' : 'disconnected'}</h2>
            <div style={{height: '500px', overflowY: 'scroll', border: 'solid black 2px', padding: '10px', marginTop: '15px', display: 'flex', flexDirection: 'column'}}>
                <Form onSubmit={handleSubmit}>
                <Label htmlFor="message">Message: </Label>
                       
                       <Input
                           type="textarea"
                           id="message"
                           name="message"
                           value={formData.message}
                           onChange={handleChange}
                           placeholder="Type a message.."
                       />
                       <Button>Send</Button>
                </Form>
      
              </div>
            </div>
              
    )
};
  
export default Chat;



// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!! yours is above !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        
        //  <head>
        //          <title>Websocket Demo</title>
        //             <!-- Bootstrap CSS -->
        //      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        
        //      </head>
        //      <body>
        //      <div class="container mt-3">
        //          <h1>FastAPI WebSocket Chat</h1>
        //         <h2>Your ID: <span id="ws-id"></span></h2>
        //          <form action="" onsubmit="sendMessage(event)">
        //              <input type="text" class="form-control" id="messageText" autocomplete="off"/>
        //              <button class="btn btn-outline-primary mt-2">Send</button>
        //          </form>
        //          <ul id='messages' class="mt-5">
        //         </ul>
                
        //      </div>
            
        //          <script>
        //              var client_id = Date.now()
        //              document.querySelector("#ws-id").textContent = client_id;
        //              var ws = new WebSocket(`ws://localhost:8000/ws/${client_id}`);
        //              ws.onmessage = function(event) {
        //                  var messages = document.getElementById('messages')
        //                  var message = document.createElement('li')
        //                  var content = document.createTextNode(event.data)
        //                  message.appendChild(content)
        //                  messages.appendChild(message)
        //              };
        //              function sendMessage(event) {
        //                  var input = document.getElementById("messageText")
        //                  ws.send(input.value)
        //                  input.value = ''
        //                  event.preventDefault()
        //              }
        //          </script>
        //      </body>
      

  


//   useEffect(() => {
//     console.log("useEffect is running")
//     // Handle connection events
//     socket.on('connect', () => {
//       setIsConnected(true);
//       console.log('Socket connected');

//       // Emit events to test functionality
//       socket.emit('join');
//       socket.emit('socket');
//     });

//     // Cleanup function to disconnect socket when component unmounts
//     return () => {
//       socket.disconnect();
//     };
//   }, [socket]);


// **************************************************************
// const Chat = () => {
//        const [userId, setUserId] = useState(2);

//         console.log("before web socket in chat.js")
//         const socket = new WebSocket(`ws://localhost:8000/ws/${userId}`);
//         console.log("socket: ", socket)
    
//         useEffect(() => {
//             socket.onopen = function (event) {
//                 console.log("WebSocket connected");
//             };
    
//             socket.onmessage = function (event) {
//                 console.log("Received message:", event.data);
//             };
    
//             socket.onclose = function (event) {
//                 console.log("WebSocket closed");
//             };
    
//             return () => {
//                 socket.close();
//             };
//         }, [socket]);
    
//         function sendEvent() {
//             const eventData = "Event data";
//             socket.send(eventData);
//             console.log("Sent event:", eventData);
//         }
    
//         return (
//             <div>
//                 <h1>WebSocket Example</h1>
//                 <button onClick={sendEvent}>Send Event</button>
//             </div>
//         );
//     };
    
//   export default Chat;




