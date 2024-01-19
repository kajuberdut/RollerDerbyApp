import React, { useState, useEffect, useRef } from "react";
import FastApi from "../Api";
import { Card,CardBody, CardTitle, Form, Input, Button, CardHeader, CardText,   CardFooter } from "reactstrap";

function Messages({handleMessages }) {

    const [messages, setMessages] = useState([]);
    const [userId, setUserId] = useState();
    let INITIAL_STATE = { message: ""};
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [otherUser, setOtherUser] = useState({});
    let [socket, setSocket] = useState();
    const [chatId, setChatId] = useState(0);
    const [messageToUser, setMessageToUser] = useState();


    const cardTextRef = useRef(null);
    const pathname = window.location.pathname;

    const messagesEndRef = useRef(null);

    /** On mount, retrieve user from local storage and set user id in state*/

    useEffect(() => {
      const user = JSON.parse(localStorage.getItem('user'));
      setUserId(user.userId);
    }, []);


    /** Scroll view to bottom of chat */

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    /** On message change call scroll to bottom */

    useEffect(() => {
      scrollToBottom()
    }, [messages]);


    useEffect(() => {
      setMessageToUser(Number(pathname.split('/')[2]))
    })

    useEffect(() => {
      async function getOtherUser() {
        try {
          let otherUser =  await FastApi.getOtherUser(messageToUser);
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
          let chatHistory =  await FastApi.getChatHistory([messageToUser, userId]);
          if(chatHistory){
            setMessages(chatHistory);
          }
        } catch (errors) {
          console.error("Get Other User failed", errors);
          return { success: false, errors };
        }
      }
      getChatHistory()
    }, [messageToUser])
    
   /** Reloading socket when user id changes but I dont think  */

    useEffect(() => {
      console.log("before web socket in chat.js")
      
      if (!socket || socket.readyState !== WebSocket.OPEN) {
        
        socket = new WebSocket(`ws://localhost:8000/ws/${userId}`);

        socket.addEventListener("message", event => {
          let eventData = JSON.parse(event.data)
          setMessages((prevMessages) => [...prevMessages, eventData ]);
        });

        setSocket(socket)
      }
      else {
        console.log("is socket and if statement is not running")
      }
        return () => socket.close();

    }, [userId]);

    const handleSubmit = async evt => {
        evt.preventDefault();   

        let dateTime = (new Date().toLocaleString()); 

        let messageData;

        if(chatId !== 0) {
            messageData = {
              "messageId": 0,
              "chatId": chatId,
              "senderId": userId, 
              "participantIds": [messageToUser, Number(userId)],
              "message": formData.message,
              "dateTime": dateTime
            }
        } 
     
        if(chatId == 0) {
            messageData = {
              "messageId": 0,
              "chatId": chatId,
              "participantIds": [messageToUser, Number(userId)],
              "senderId": userId, 
              "message": formData.message,
              "dateTime": dateTime,
              "type": "user", 
              "groupId": Number(messageToUser)
            }
        }

        let jsonData = JSON.stringify(messageData); 

          socket.send(jsonData)
          setFormData(INITIAL_STATE)     
        }

    const handleChange = evt => {
  
        const { name, value }= evt.target;
    
        setFormData(fData => ({
          ...fData,
          [name]: value,
          
        }));
      };
  
    return (
        <Card className="Messages"  style={{height: '500px', width: '350px', position: 'fixed', bottom: '0px', right: '95px', borderRadius: '20px'}}>
          <CardHeader style={{height: '40px'}}>
            <p style={{position: 'absolute', left: '10px', fontWeight: 'bold', fontSize: '18px'}}>{otherUser.username}</p>
            <Button onClick={handleMessages} style={{ position: 'absolute', right: '4px', top: '0',  backgroundColor: 'transparent', color: 'black', border: 'none', fontSize: '18px'  }}>X</Button>
          </CardHeader>
          <CardBody>
            <CardTitle tag="h5">
              Special Title Treatment
            </CardTitle>
            <CardText ref={cardTextRef} style={{ overflowY: 'auto', height: 300 }}> 
                      {messages.map((message) => (
                      <div style={{ backgroundColor: message.userId == userId ? 'lightgray' : 'lightblue', borderRadius: '10px', margin: '5px', padding: '5px', width: '210px', marginLeft: message.userId == userId ? '80px' : '0px', textAlign: 'left' }}>
                      {message.message}
                      <br />
                      <div ref={messagesEndRef}></div>
                  </div>
              ))}
            </CardText>       
          </CardBody>
          <CardFooter>
              <Form style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '50px'}}>
                  <Input
                    type="textarea"
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Type a message.."
                    style={{ width: '240px', height: '40px', resize: 'none', bottom: '7px'}}
                  />
                  <Button onClick={handleSubmit} style={{width: '63px', height: '36px'}}>Send</Button>
              </Form>
          </CardFooter>
        </Card>              
    )
};
  
export default Messages;