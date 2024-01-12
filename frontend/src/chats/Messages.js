import React, { useState, useEffect, useLocation } from "react";
import { useParams } from "react-router-dom";
import FastApi from "../Api";


// import io from "socket.io-client";
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
// import NavBarMessages from "../navBar/NavBarMessages";
// import { faCropSimple, faSliders } from "@fortawesome/free-solid-svg-icons";

const Messages = ({handleMessages}) => {
    const [messages, setMessages] = useState([]);
    // const [message, setCurrentMessage] = useState('');
    // const [userId, setUserId] = useState(Date.now());
    const [userId, setUserId] = useState(2);
    let INITIAL_STATE = { message: ""};
  /** Sets formData in initial state */
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [isConnected, setIsConnected] = useState(false);
    const [otherUser, setOtherUser] = useState({})
    let [socket, setSocket] = useState();
    const [chatId, setChatId] = useState(0);
    const [messageToUser, setMessageToUser] = useState()

    const user = JSON.parse(localStorage.getItem('user'));
    // console.log("user in messages.js", user)
    // const location = useLocation();
    // console.log(" **** use location in messages *****:", location)
    const pathname = window.location.pathname
    console.log("***************pathname in Messages.js ******************", pathname)
  
    // console.log("pathname:", pathname)

    useEffect(() => {
      setMessageToUser(Number(pathname.split('/')[2]))
    })
    // let messageToUser = Number(pathname.split('/')[2])



    useEffect(() => {

      async function getOtherUser() {

        try {
          let otherUser =  await FastApi.getOtherUser(messageToUser);
          // console.log("otherUser", otherUser)
          setOtherUser(otherUser);
        } catch (errors) {
          console.error("Get Other User failed", errors);
          return { success: false, errors };
        }
      }

      getOtherUser()
  
    }, [messageToUser])

    useEffect(() => {

      async function getChatHistory() {

        try {
          
          let chatHistory =  await FastApi.getChatHistory([messageToUser, user.userId]);
          console.log("chatHistory in messages.py:", chatHistory)
          // console.log("otherUser", otherUser)
          // setOtherUser(otherUser);
          setMessages(chatHistory)
        } catch (errors) {
          console.error("Get Other User failed", errors);
          return { success: false, errors };
        }
      }

      getChatHistory()
  
    }, [messageToUser])



    // pathname.split("/")[-1]
    // console.log("messageToUser:", messageToUser)

    // const params = useParams()
    // console.log("params &&&&&:", params)
    // const { username } = useParams(); 
    // console.log("!!!!!!!!! username !!!!!!!!!!", username)
    
    // console.log("before web socket in chat.js")
    // const socket = new WebSocket(`ws://localhost:8000/ws/${userId}`);
    // console.log("socket: ", socket)

    
   /** Reloading jobs when it changes request for jobs */

    useEffect(() => {
      console.log("before web socket in chat.js")
      
      // const socket = new WebSocket(`ws://localhost:8000/ws/${userId}`);
      if (!socket || socket.readyState !== WebSocket.OPEN) {
        console.log("IF STATEMENT IS RUNNING")
        
        socket = new WebSocket(`ws://localhost:8000/ws/${user.userId}`);

        setIsConnected(true)
        console.log("isConnected:", isConnected)

        console.log("!!!! socket.readState:", socket.readyState)

        // Listen for messages
        socket.addEventListener("message", event => {
          console.log("event in addeventListener:", event)
          console.log("Message from server ", event.data)
          console.log("JSON.parse(event.data)", JSON.parse(event.data))
          let eventData = JSON.parse(event.data)

          // setMessages((prevMessages) => [...prevMessages, { message: event.data }]);
          setMessages((prevMessages) => [...prevMessages, eventData ]);
          console.log("messages:", messages)
          // const eventDataUserId = event.data.split(": ")
          // const otherUserId = eventDataUserId[1].trim()
         
          // setMessages([...messages, { message: event.data }])
        
          // console.log("~~~~~~~~~~~~~~~messages~~~~~~~~~~~~~~~~~~:", messages)
          
          // setMessages([...event.data, { message: formData.message}])
        });

        // socket.onmessage.then(event => {
        //   console.log("Message from server:", event.data);
        // });
  
        setSocket(socket)
        console.log("socket in useEffect:", socket)
      }
      else {
        console.log("is socket and if statement is not running")
      }
      // Cleanup function to close the socket when the component unmounts
      return () => socket.close();
  }, [userId]);


    const handleSubmit = async evt => {
        evt.preventDefault();   
        console.log("formData in handle Submit chat.js:", formData)
        // ! this is breaking the app but doesnt start sending requests and get infinite 404 requests until it is 
        // const socket = io('http://localhost:8000', {path: `/ws/${userId}`});
        // console.log("event in Messages:", evt)
        // console.log("Message sent!")
        // console.log("messageToUser in Messages.js", messageToUser)
        // console.log(" typeof messageToUser in Messages.js", typeof messageToUser)
        // console.log(" typeof int(messageToUser) in Messages.js", typeof Number(messageToUser))
        let dateTime = (new Date().toLocaleString()); 
        console.log("%%%%% dateTime %%%%%:", dateTime)
   

        let messageData;

        if(chatId !== 0) {
          console.log("chatId is not 0 !!!!!!!!!!!!!!!!!!!!")
          messageData = {
            "messageId": 0,
            "chatId": chatId,
            "senderId": user.userId, 
            "participantIds": [messageToUser, Number(user.userId)],
            "message": formData.message,
            "dateTime": dateTime
          }
  
          console.log(" !!!! 1 MESSAGE IN MESSAGES 1 !!!! :", messageData)
  
        } 
     
        if(chatId == 0) {

          console.log("chatId is 0 if statement is running")
          messageData = {
            "messageId": 0,
            "chatId": chatId,
            "participantIds": [messageToUser, Number(user.userId)],
            "senderId": user.userId, 
            "message": formData.message,
            "dateTime": dateTime,
            "type": "user", 
            "groupId": Number(messageToUser)
          }
        }

        console.log(" !!!! 1 MESSAGE IN MESSAGES 1 !!!! :", messageData)
        let jsonData = JSON.stringify(messageData); 
        // console.log(" !!!! 2 MESSAGE IN MESSAGES 2 !!!! :", messageData)

        // socket.send(formData.message)
        // socket.send(messageData)
        socket.send(jsonData)
        // setMessages([...messages, { message: formData.message}])
        setFormData(INITIAL_STATE)
        
        }
    console.log("messages:", messages)
    {messages.map((message) => (
      console.log("message in messages.map:", message),
      console.log("message.message in messages.map:", message.message),
      console.log("message.user_id in messages.map:", message.user_id),
      console.log("user.userId", user.userId)
    ))}

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
        <Card className="Messages"  style={{height: '500px', width: '350px', position: 'fixed', bottom: '0px', right: '95px', borderRadius: '20px'}}>
          <CardHeader style={{height: '40px'}}>
            <p style={{position: 'absolute', left: '10px', fontWeight: 'bold', fontSize: '18px'}}>{otherUser.username}</p>
            <Button onClick={handleMessages} style={{ position: 'absolute', right: '4px', top: '0',  backgroundColor: 'transparent', color: 'black', border: 'none', fontSize: '18px'  }}>X</Button>
          </CardHeader>
          <CardBody>
            <CardTitle tag="h5">
              Special Title Treatment
            </CardTitle>
            <CardText style={{ overflowY: 'auto', height: 300 }}> 
                      {messages.map((message) => (
                  // <div key={message.timestamp}>
                      <div style={{ backgroundColor: message.userId == user.userId ? 'lightgray' : 'lightblue', borderRadius: '10px', margin: '5px', padding: '5px', width: '210px', marginLeft: message.userId == user.userId ? '80px' : '0px', textAlign: 'left' }}>
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