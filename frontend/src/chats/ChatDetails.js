import React, { useState, useEffect, useRef } from "react";
import FastApi from "../Api";
import { Card, CardBody, CardTitle, Form, Input, Button, CardHeader, CardText, CardFooter } from "reactstrap";


  /**  
 * Chat Details
 */

function ChatDetails({handleChat, chatId }) {

  /** Set isLoading, rulsets, positions, insurances, city, state phoneNumber, and image in state*/

    const [messages, setMessages] = useState([]);
    const [userId, setUserId] = useState(null);
    const [username, setUsername] = useState();

    let INITIAL_STATE = { message: ""};
    const [formData, setFormData] = useState(INITIAL_STATE);
    let [socket, setSocket] = useState();
    const [messageToUser, setMessageToUser] = useState()
    const [chatParticipants, setChatParticipants] = useState([])
    const [chatParticipantIds, setChatParticipantIds] = useState([])
    const [groupName, setGroupName] = useState();

    const messagesEndRef = useRef(null);

    /** On mount, retrieve user from local storage and set user id in state*/

    useEffect(() => {

      const user = JSON.parse(localStorage.getItem('user'));
      console.log("user!!!! from localStroage in chatDetaisl", user)
      console.log("!!!!!!!!!!!!! user.userId in lcol stor", user.userId)
      //! issue with setUSer ???? maybe??? 
      setUserId(Number(user.userId))
      console.log("userD in chatDetails!!!!!:", userId)
      setUsername(user.username)
    }, []);

    useEffect(() => {

      console.log("userID in chatDetails!!!!!:", userId)

    }, [userId]);


    /** Scroll view to bottom of chat */

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

   /** On message change call scroll to bottom */

    useEffect(() => {
      scrollToBottom()
    }, [messages]);
   

    useEffect(() => {
      async function getChat() {

        /** Get chat partipants by username */

        try {

          let chatParticipants =  await FastApi.getChatParticipants(chatId);
          const filteredParticipants = chatParticipants.filter(
            (participant) => participant !== username
          );
          const formatParticipants = filteredParticipants.join(", ");
          setChatParticipants(formatParticipants);
          console.log("!!!!!!!!!! chatParticipant.length", chatParticipants.length)
          console.log("!!!!!!!!chatParticipant.length >= 3 ", chatParticipants.length !== 2)
          console.log("!!!!!!!!chatParticipant.length  3 ", chatParticipants.length >= 3)
        } catch (errors) {

          console.error("Get Other User failed", errors);
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

      getChat()
    }, [userId])



    useEffect(() => {
      async function getChatHistory() {
        try {
          let chatHistory =  await FastApi.getChatHistoryByChatId(chatId);
          console.log("chatHIstory!!!!", chatHistory)
          setMessages(chatHistory)

          console.log("chatHistory!!!:", chatHistory)

        } catch (errors) {
          console.error("Get chatHistory failed", errors);
          return { success: false, errors };
        }
      }
      getChatHistory()
    }, [messageToUser])



   /** Reloading socket when userId changes */
  //  * look at this again. I dont think you need to do that with userId

    useEffect(() => {

      if (!socket || socket.readyState !== WebSocket.OPEN) {
        
        socket = new WebSocket(`ws://localhost:8000/ws/${userId}`);

        socket.addEventListener("message", event => {
          console.log("event.data:", event.data)
          let eventData = JSON.parse(event.data);
          setMessages((prevMessages) => [...prevMessages, eventData ]);
        });
  
        setSocket(socket);
      }
      else {
        console.log("unable to connect to socket???")
      }
      // Cleanup function to close the socket when the component unmounts
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
            "participantIds": [messageToUser, Number(userId)],
            "senderId": userId, 
            "senderUsername": username,
            "message": formData.message,
            "dateTime": dateTime,
            "type": "user", 
            "groupId": 0
            // "groupId": Number(messageToUser)
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
      <Card className="Messages"  style={{height: '500px', width: '350px', position: 'fixed', bottom: '0px', right: '480px', borderRadius: '20px'}}>
          <CardHeader style={{height: '40px'}}>
            <p style={{position: 'absolute', left: '10px', fontWeight: 'bold', fontSize: '18px'}}>{chatParticipants}</p>
            <Button onClick={handleChat} style={{ position: 'absolute', right: '4px', top: '0',  backgroundColor: 'transparent', color: 'black', border: 'none', fontSize: '18px'  }}>X</Button>
          </CardHeader>
          <CardBody>
              <CardTitle tag="h5">
                {groupName}
              </CardTitle>
              <div style={{ overflowY: 'auto', height: 300 }}> 
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