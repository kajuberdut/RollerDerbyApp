import React, { useState, useEffect, useRef } from "react";
import FastApi from "../Api";
import { Card, CardBody, Form, Input, Button, CardHeader, CardTitle,  CardFooter } from "reactstrap";

  /**  
 * Chat Details
 */

function ChatDetails({handleMessages, handleChat, chatId }) {

  /** Set isLoading, rulsets, positions, insurances, city, state phoneNumber, and image in state*/

    const [messages, setMessages] = useState([]);
    const [userId, setUserId] = useState();
    const [username, setUsername] = useState();
    let INITIAL_STATE = { message: ""};
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [otherUserId, setOtherUserId] = useState()
    const [chatParticipants, setChatParticipants] = useState([])
    const [chatParticipantIds, setChatParticipantIds] = useState([])
    const [groupName, setGroupName] = useState();

    const messagesEndRef = useRef(null);



    /** On mount, retrieve user from local storage and set user id in state*/

    useEffect(() => {

      const user = JSON.parse(localStorage.getItem('user'));
      setUserId(user.userId)
      console.log("userId in chatDetails!!!!!:", userId)
      setUsername(user.username)

      if(handleMessages) {
        console.log("handleMessages is running ")
        const pathname = window.location.pathname;
        let formOtherUserId = Number(pathname.split('/')[2]);
        setOtherUserId(formOtherUserId)

      }
      
    }, []);

    /** Scroll view to bottom of chat */

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

   /** On message change call scroll to bottom */

    useEffect(() => {
      scrollToBottom()
    }, [messages]);


    if(chatId) {
      console.log("if chat is running ")
      getChat();
    }
 
      async function getChat() {

        /** Get chat partipants by username */

        try {

          let chatParticipants =  await FastApi.getChatParticipants(chatId);
          const filteredParticipants = chatParticipants.filter(
            (participant) => participant !== username
          );
          const formatParticipants = filteredParticipants.join(", ");
          setChatParticipants(formatParticipants);

        } catch (errors) {

          console.error("Get chat particiapant failed", errors);
          return { success: false, errors };
        }

         /** Get chat group name by chat id */

        try {

          let groupName = await FastApi.getGroupNameByChatId(chatId);
          console.log("groupName:", groupName)
          setGroupName(groupName);
        } catch (errors) {

          console.error("Get group name failed", errors);
          return { success: false, errors };
        }

        /** Get chat partipant ids by chat id for socket messages  */

          try {
            
            let chatParticipantIds =  await FastApi.getChatParticipantIds(chatId);
            setChatParticipantIds(chatParticipantIds)
          } catch (errors) {

            console.error("Get chatParticipantIds failed", errors);
            return { success: false, errors };
          }
      }



    useEffect(() => {
      async function getChatHistory() {
        
        try {
          let chatHistory;
          if(chatId) {
            chatHistory =  await FastApi.getChatHistoryByChatId(chatId);
          } else {           
            chatHistory =  await FastApi.getChatHistory([otherUserId, userId]);

          }
            setMessages(chatHistory)

        } catch (errors) {
          console.error("Get chatHistory failed", errors);
          return { success: false, errors };
        }
      }
      getChatHistory()
    }, [otherUserId])

  // ! this  is handling sockets in chatDetails

  function handleIncomingMessages(event) {
    console.log("Socket message received in Api.js :", event.data);
    try {
      const eventData = JSON.parse(event.data);
      console.log("!!!! event.data in chat Details!!!", event.data);
      setMessages((prevMessages) => [...prevMessages, eventData]);
    } catch (error) {
      console.error("Error parsing socket message:", error);
    }
  }

  useEffect(() => {

      /** Connect to websocket  */
      FastApi.connectSocket(userId); 

      /** Listen for responses from websocket with event handler  */
      FastApi.socket.addEventListener("message", handleIncomingMessages);

      /** Remove event event listener on unmount  */
      return () => {
        FastApi.socket.removeEventListener("message", handleIncomingMessages);
      }

  }, [userId]);


    const handleSubmit = async evt => {
        evt.preventDefault();   
        console.log("hitting handle submit")
        let dateTime = (new Date().toLocaleString());
        let messageData;

        if(chatId !== 0) {
          messageData = {
            "messageId": 0,
            "chatId": chatId,
            "senderId": userId, 
            "senderUsername": username,
            "participantIds": chatParticipantIds,
            "message": formData.message,
            "dateTime": dateTime
          }
        } 
     
        if(chatId == 0) {
          messageData = {
            "messageId": 0,
            "chatId": chatId,
            "participantIds": [otherUserId, userId],
            "senderId": userId, 
            "senderUsername": username,
            "message": formData.message,
            "dateTime": dateTime,
            // "type": "user", 
            "groupId": 0
          }
        }

          FastApi.sendMessage(messageData)

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
      <Card className="Messages"  style={{height: '500px', width: '350px', position: 'fixed', bottom: '0px', right: '480px', borderRadius: '20px'}}>
          <CardHeader style={{height: '40px'}}>
            <p style={{position: 'absolute', left: '10px', fontWeight: 'bold', fontSize: '18px'}}>{chatParticipants}</p>
            <Button onClick={handleChat} style={{ position: 'absolute', right: '4px', top: '0',  backgroundColor: 'transparent', color: 'black', border: 'none', fontSize: '18px'  }}>X</Button>
          </CardHeader>
          <CardBody>
              <CardTitle tag="h5">
                {groupName}
              </CardTitle>
              <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 300 }}> 
                        {messages.map((message) => (
                      
                      <div key={'history' + message.messageId}>
                          
                        {/* {chatParticipants.length !== 2 && (
                          <div style={{textAlign: 'left'}}>
                          <div style={{ display: 'inline-block', paddingLeft: message.userId == userId ? '80px' : '0px', fontSize: 'smaller', fontStyle: 'italic' }}>
                            {message.senderUsername}
                          </div>
                          </div>
                        )} */}
                        
                        <p style={{textAlign: 'left'}}>
                          <span style={{ display: 'inline-block', paddingLeft: message.userId == userId ? '80px' : '0px', fontSize: 'smaller', fontStyle: 'italic' }}>
                            {message.senderUsername}
                          </span>
                        </p>
                        
                      
                        <p style={{ backgroundColor: message.userId == userId ? 'lightgray' : 'lightblue', borderRadius: '10px', margin: '5px', padding: '5px', width: '210px', marginLeft: message.userId == userId ? '80px' : '0px', textAlign: 'left' }}>

                          {message.message} 
                          <br />
                    

                          <span ref={messagesEndRef}></span>

                        </p>
                      </div>
                    

                ))}
              </div>     
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
                  <Button onClick={handleSubmit} style={{width: '63px', height: '36px'}}>
                      Send
                  </Button>
               </Form>
          </CardFooter>
      </Card>        
    )
};
  
export default ChatDetails;