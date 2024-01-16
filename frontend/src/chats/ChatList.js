import React, { useContext, useState, useEffect } from "react";
import FastApi from "../Api";
import ChatComponent from "./ChatComponent";
// import SearchBar from "../repeated/searchBar/SearchBar";
import Loading from "../multiUse/loading/Loading"
import "./ChatList.css";

import {
  Card,
  CardBody,
  Button,
  CardHeader, 
  CardFooter
} from "reactstrap";

/** 
 * List Chats of logged in user
 */

const ChatList = ({handleChatList, handleChat}) => {

  /** render form */

  const [isLoading, setIsLoading] = useState(false);
  const [chats, setChats] = useState([]);

  const user = JSON.parse(localStorage.getItem('user'));
  console.log("user in MessageList.js", user)
  console.log("user.userId in MessageList.js", user.userId)
  console.log("user['userId'] in MessageList.js", user["user_id"])

/** API get request for bouts */

  async function getAllChats() {
    console.log("getAllBouts is running in BoutList.js")
    let chats = await FastApi.getChats(user.userId);

  //   try{
  //     let bouts = await JoblyApi.getJobs(title);
  //     setBouts(bouts);
  //   } catch (errors) {
  //   console.log("signup failed", errors);
  //   return {success: false, errors};
  // }
    setChats(chats);
    // setIsLoading(false); 
  }

 /** Reloading bouts when it changes request for bouts */

  useEffect(() => {
      getAllChats();
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

/** Render search bar and cards */

  return (
    <>

    {/* <SearchComponent setBouts={setBouts}/> */}
    <div className="ChatList">

    <Card className="ChatList"  style={{height: '800px', width: '350px', position: 'fixed', bottom: '0px', right: '95px', borderRadius: '20px'}}>
          <CardHeader style={{height: '40px'}}>
            <p style={{position: 'absolute', left: '10px', fontWeight: 'bold', fontSize: '18px'}}>Chats</p>
            <Button onClick={handleChatList} style={{ position: 'absolute', right: '4px', top: '0',  backgroundColor: 'transparent', color: 'black', border: 'none', fontSize: '18px'  }}>X</Button>
          </CardHeader>
          <CardBody>
          {renderCards()}
             
          </CardBody>
          <CardFooter>
          </CardFooter>
        </Card>
        </div>
    </>
  );

}

export default ChatList;