import React, { useContext, useState, useEffect } from "react";
import FastApi from "../Api";
import CardComponent from "../multiUse/cardComponent/CardComponent";
// import SearchBar from "../repeated/searchBar/SearchBar";
import Loading from "../multiUse/loading/Loading"
import "./ChatList.css";
// import SearchBar from "../multiUse/searchBar/SearchBarEvents";
// import DatePick from "../multiUse/datePicker/DatePicker";
// import SearchComponent from "../multiUse/searchComponent/SearchComponent";

/** 
 * List Messages that that are active ??? 
 */

const ChatList = () => {

  /** render form */

  const [isLoading, setIsLoading] = useState(false);
  const [chats, setChats] = useState([]);

  const user = JSON.parse(localStorage.getItem('user'));
  console.log("user in MessageList.js", user)
  console.log("user.userId in MessageList.js", user.userId)
  console.log("user['userId'] in MessageList.js", user["user_id"])

/** API get request for bouts */

  async function getAllChats(title) {
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

/** Render the cards for jobs */

  // const renderCards = () => {
  //   return (
  //     <div className="BoutList-RenderCards">
  //         <ul>
  //             {messages.map(message => (
  //               <MessageComponent message={message} key={"Message-" + message.messageId} />
  //             ))}
  //         </ul>
  //       </div>
  //     );
  // }

/** Render search bar and cards */

  return (
    <>

    {/* <SearchComponent setBouts={setBouts}/> */}
    <div className="ChatList">

      {/* <SearchBar getBouts={getBouts}/> */}
      <h1>Chats</h1>
      {/* {!chats && <h2>You have no messages.</h2>} */}
      {/* {chats} */}

      <ul>
               {chats.map(chat => (
                <li>name: {chat.name} id: {chat.chatId}</li>
                // <li>{chat.chatId}</li>
               ))}
       </ul>
      {/* <a href="/bouts/add">
        <button className="Bout-Button">
          Create Bout
        </button>
      </a> */}
      {/* {renderCards()} */}
    </div>
    </>
  );

}

export default ChatList;