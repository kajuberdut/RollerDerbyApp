import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import FastApi from "../Api";


// import io from "socket.io-client";
import {
    Card,
    CardBody,
    CardTitle,
    Form,
    Input,
    Button,
    CardHeader, 
    CardText, 
    CardFooter
  } from "reactstrap";

const ChatDetails = ({handleChat, chatId }) => {
    const [messages, setMessages] = useState([]);
    const [userId, setUserId] = useState(2);
    let INITIAL_STATE = { message: ""};
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [isConnected, setIsConnected] = useState(false);
    const [otherUser, setOtherUser] = useState({})
    let [socket, setSocket] = useState();
    // const [chatId, setChatId] = useState(0);
    const [messageToUser, setMessageToUser] = useState()
    const user = JSON.parse(localStorage.getItem('user'));
    const [chat, setChat] = useState()
    const [chatParticipants, setChatParticipants] = useState([])


    // useEffect(() => {
    //   setMessageToUser(Number(pathname.split('/')[2]))
    // })

    console.log("chatId in CHatDetails **********", chatId)

    useEffect(() => {

      async function getChat() {

        try {
          let chatParticipants =  await FastApi.getChatParticipants(chatId);
          const filteredParticipants = chatParticipants.filter(
            (participant) => participant !== user.username
          );
          const formatParticipants = filteredParticipants.join(", ");
          setChatParticipants(formatParticipants);
        } catch (errors) {
          console.error("Get Other User failed", errors);
          return { success: false, errors };
        }
      }

      getChat()
    }, [userId])

    useEffect(() => {

      async function getChatHistory() {

        try {
          
          let chatHistory =  await FastApi.getChatHistoryByChatId(chatId);

          setMessages(chatHistory)
        } catch (errors) {
          console.error("Get chatHistory failed", errors);
          return { success: false, errors };
        }
      }

      getChatHistory()
  
    }, [messageToUser])

   /** Reloading jobs when it changes request for jobs */

    useEffect(() => {
      console.log("before web socket in chat.js")
      
      // const socket = new WebSocket(`ws://localhost:8000/ws/${userId}`);
      if (!socket || socket.readyState !== WebSocket.OPEN) {
        console.log("IF STATEMENT IS RUNNING")
        
        socket = new WebSocket(`ws://localhost:8000/ws/${user.userId}`);

        setIsConnected(true)


        // Listen for messages
        socket.addEventListener("message", event => {

        let eventData = JSON.parse(event.data)

        setMessages((prevMessages) => [...prevMessages, eventData ]);

        });
  
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

        let jsonData = JSON.stringify(messageData); 
        socket.send(jsonData)

        setFormData(INITIAL_STATE)
        
        }
 

    const handleChange = evt => {
        console.log('handleChange is running')
    
        const { name, value }= evt.target;
    
        setFormData(fData => ({
          ...fData,
          [name]: value,
          
        }));

      };
  
    return (
        <div>
        <Card className="Messages"  style={{height: '500px', width: '350px', position: 'fixed', bottom: '0px', right: '480px', borderRadius: '20px'}}>
          <CardHeader style={{height: '40px'}}>
            <p style={{position: 'absolute', left: '10px', fontWeight: 'bold', fontSize: '18px'}}>{chatParticipants}</p>
            <Button onClick={handleChat} style={{ position: 'absolute', right: '4px', top: '0',  backgroundColor: 'transparent', color: 'black', border: 'none', fontSize: '18px'  }}>X</Button>
          </CardHeader>
          <CardBody>
            <CardTitle tag="h5">
              Special Title Treatment
            </CardTitle>
            {/* <CardText ref={cardTextRef} style={{ overflowY: 'auto', height: 300 }}>  */}
            <CardText style={{ overflowY: 'auto', height: 300 }}> 
                      {messages.map((message) => (

                      <div style={{ backgroundColor: message.userId == user.userId ? 'lightgray' : 'lightblue', borderRadius: '10px', margin: '5px', padding: '5px', width: '210px', marginLeft: message.userId == user.userId ? '80px' : '0px', textAlign: 'left' }}>
 
                      {message.message}
                      <br />
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
        </div>
              
    )
};
  
export default ChatDetails;