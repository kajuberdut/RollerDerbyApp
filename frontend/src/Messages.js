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
    CardHeader, 
    CardText, 
    CardFooter
  } from "reactstrap";
import NavBarMessages from "./navBar/NavBarMessages";

  
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!! yours is below !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const Messages = ({handleMessages}) => {
    const [messages, setMessages] = useState([]);
    // const [message, setCurrentMessage] = useState('');
    // const [userId, setUserId] = useState(Date.now());
    const [userId, setUserId] = useState(2);
    let INITIAL_STATE = { message: ""};
  /** Sets formData in initial state */
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [isConnected, setIsConnected] = useState(false);
    let [socket, setSocket] = useState();

    const user = JSON.parse(localStorage.getItem('user'));

    

    
    // console.log("before web socket in chat.js")
    // const socket = new WebSocket(`ws://localhost:8000/ws/${userId}`);
    // console.log("socket: ", socket)

    useEffect(() => {
      console.log("before web socket in chat.js")
      
      // const socket = new WebSocket(`ws://localhost:8000/ws/${userId}`);
      if (!socket || socket.readyState !== WebSocket.OPEN) {
        socket = new WebSocket(`ws://localhost:8000/ws/${user.userId}`);

        setIsConnected(true)

        // socket.addEventListener("open", event => {
        //   socket.send("Connection established")
        // });
  
        // Listen for messages
        socket.addEventListener("message", event => {
          console.log("Message from server ", event.data)
          console.log("event in addeventListener:", event)
          // setMessages([...messages, { message: event.data }])
          setMessages((prevMessages) => [...prevMessages, { message: event.data }]);
          console.log("messages:", messages)
          // setMessages([...event.data, { message: formData.message}])
        });
  
        setSocket(socket)
      }

      // console.log("socket: ", socket)
      // console.log("@@@@@@@@ socket.current @@@@@@@@@@:", socket.current)

      // Add event listeners for socket events (e.g., onmessage, onopen, onclose)
      // setIsConnected(true)

      // socket.addEventListener("open", event => {
      //   socket.send("Connection established")
      // });

      // // Listen for messages
      // socket.addEventListener("message", event => {
      //   console.log("Message from server ", event.data)
      // });

      // setSocket(socket)

      // socket.onmessage = async evt => {
      //   console.log("socket on message is running %%%%%%%%%%%%%%%")
        

      //   }

      // Cleanup function to close the socket when the component unmounts
      return () => socket.close();
  }, [userId]);

    // console.log("socket outside of function:", socket)

    // socket.onSubmit = function 

    // socket.onmessage = async evt => {
    //   console.log("socket on message is running %%%%%%%%%%%%%%%")
    //   }


  

    const handleSubmit = async evt => {
        evt.preventDefault();   
        console.log("formData in handle Submit chat.js:", formData)
        // ! this is breaking the app but doesnt start sending requests and get infinite 404 requests until it is 
        // const socket = io('http://localhost:8000', {path: `/ws/${userId}`});
        // console.log("event in Messages:", evt)
        // console.log("Message sent!")
        socket.send(formData.message)
        // setMessages([...messages, { message: formData.message}])
        setFormData(INITIAL_STATE)
        
        }

    const handleChange = evt => {
        console.log('handleChange is running')
    
        const { name, value }= evt.target;
    
        setFormData(fData => ({
          ...fData,
          [name]: value,
          
        }));
        // console.log("formData in chat.js:", formData)
      };
  
    return (
        <div>
        <Card className="Messages"  style={{height: '500px', width: '350px', position: 'fixed', bottom: '0px', right: '30px', borderRadius: '20px'}}>
          <CardHeader>
            Header
            <Button onClick={handleMessages} style={{ position: 'absolute', right: '4px', top: '0',  backgroundColor: 'transparent', color: 'black', border: 'none', fontSize: '18px'  }}>X</Button>
          </CardHeader>
          <CardBody>
            <CardTitle tag="h5">
              Special Title Treatment
            </CardTitle>
            <CardText style={{ overflowY: 'auto', height: 300 }}> 
                      {messages.map((message) => (
                  // <div key={message.timestamp}>
                      <div style={{backgroundColor: 'lightgray', borderRadius: '10px', margin: '5px', padding: '5px'}}>
                      {/* Display sender or avatar if needed */}
                      {/* {message.sender}:  */}
                      {message.message}
                      <br />
                  </div>
              ))}
            </CardText>       
          </CardBody>
          <CardFooter>
            <Form style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '50px'}}>
          {/* <Form onClick={handleSubmit} style={{ display: 'flex', alignItems: 'center', height: '100px'}}> */}
            {/* dispaly the button so have to set the components next to eachother */}
           {/* <Label htmlFor="message">Message: </Label> */}
                  <Input
                    type="textarea"
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Type a message.."
                    style={{ width: '240px', height: '40px', resize: 'none', bottom: '7px'}}
                  />
                  {/* <Button type="submit">Send</Button> */}
                  <Button onClick={handleSubmit} style={{width: '63px', height: '36px'}}>Send</Button>
               </Form>
               {/* </div> */}
          </CardFooter>
        </Card>
        </div>
              
    )
};
  
export default Messages;
