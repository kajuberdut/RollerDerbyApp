import React, { useState, useEffect } from "react";
import ChatComponent from "./ChatComponent";
import Loading from "../multiUse/loading/Loading"
import "./ChatList.css";
import { Card, CardBody, Button, CardHeader } from "reactstrap";

/** 
 * List Chats of logged in user
 */

const ChatList = ({ handleChatList, handleChat, getAllChats, chats }) => {

  /** Set is loading in state*/

  const [isLoading, setIsLoading] = useState(true);

  /** API get request for chats */

  async function getChats() {

    let chats = await getAllChats();
    console.log("chats in chatList!!!!", chats)

    setIsLoading(false); 
  }

 /** Reloading chats when it changes request for bouts */

  useEffect(() => {

      getChats();
  }, []);


/** Display loading if API call is has not returned */

  if (isLoading) {
    return (
        <Loading />
    )
  }

  /** Render the a card for each chat */

  const renderCards = () => {
    return (
      <div className="ChatList-RenderCards" style={{marginRight: '25px'}}>
          <ul>
              {chats.map(chat => (
      
                <ChatComponent handleChat={handleChat} chat={chat} key={"Chat-" + chat.chatId} />
              ))}
          </ul>
        </div>
      );
  }

/** Rendr chat list */

  return (
    <>

      <div className="ChatList">

        <Card className="ChatList"  style={{height: '85%', width: '350px', position: 'fixed', bottom: '0px', right: '95px', borderRadius: '20px'}}>
          <CardHeader style={{height: '40px'}}>
            <p style={{position: 'absolute', left: '10px', fontWeight: 'bold', fontSize: '18px'}}>Chats</p>
            <Button onClick={handleChatList} style={{ position: 'absolute', right: '4px', top: '0',  backgroundColor: 'transparent', color: 'black', border: 'none', fontSize: '18px'  }}>X</Button>
          </CardHeader>
          <CardBody>
            {renderCards()}         
          </CardBody>
        </Card>
      </div>
    </>
  );

}

export default ChatList;