import './App.css';
import React, { useState, useEffect, Fragment } from 'react';
import { BrowserRouter } from "react-router-dom";
import NavBar from "./navBar/NavBar";
import AllRoutes from "./routes/Routes";
import Loading from "./multiUse/loading/Loading";
import UserContext from "./multiUse/UserContext";
// import { UserContext } from "./multiUse/UserContext";
import FastApi from "./Api";
import useLocalStorage from "./hooks/useLocalStorage";
// ! this will probably need to be moved 
// import jwt from "jsonwebtoken";
// import * as jwt_decode from 'jwt-decode';
// import jwt_decode from 'jwt-decode'
// import jwt_decode, { JwtPayload } from 'jwt-decode'
import { jwtDecode } from "jwt-decode"
import ChatIcon from "./chats/ChatIcon"
import ChatList from './chats/ChatList';
import { Link } from 'react-router-dom';
import Chat from './chats/Chat';

export const TOKEN_STORAGE_ID = "api-token";

function App() {

  const [user, setUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [isLoading, setIsLoading] = useState(false);
  const { default: jwt_decode } = require("jwt-decode");
  const [displayMessages, setDisplayMessages] = useState(false);
  const [displayChatList, setDisplayChatList] = useState(false);
  const [displayChats, setDisplayChats] = useState(false);
  const [chatId, setChatId] = useState();
  const [chats, setChats] = useState([]);
  const [isLoginVis, setIsLoginVis] = useState(false);
  const [isSignupVis, setIsSignupVis] = useState(false);
  const [isHomeVis, setIsHomeVis] = useState(false);
  const [isAboutVis, setIsAboutVis] = useState(false);

  useEffect(() => {
    // todo insure it is scrolled to top
    console.log("is login vis?", isLoginVis)
    console.log("isAboutVis?", isAboutVis)
    console.log("isSignupVis?", isSignupVis)
    console.log("isHomeVis?", isHomeVis)
    if(isLoginVis || isSignupVis || isHomeVis ) {
    
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";

    };
  }, [isLoginVis, isHomeVis, isSignupVis]);

  async function getUser() {

    if (token) {
      try {
        let { sub } = jwtDecode(token);

        // storing the token in static token in FastApi 
        FastApi.token = token;
        let user = await FastApi.getUserById(sub);
        // !note that local storage is not what you imported this is a built in function!
        if(!user) {
          logout();
        }
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);

      } catch (err) {
        console.error("App loadUserInfo: problem loading", err);
        setUser(null);
      }
    }
    setIsLoading(false);
    console.log("setinfoloaded true")
  }


  useEffect(function loadUser() {
    // console.debug("App useEffect loadUserInfo", "token=", token);
    /** If token changes then API get request for user using user_id after decoding token if value of token changes rerun. */
      getUser();
    }, [token]);

    async function signup(userData) {
      try {
      let token = await FastApi.signup(userData); 
      console.log("token:", token)
    
      return { success: true};
      } catch (err) {
        console.log("signup failed", err);
        // setDisplayErr(err)
        return {success: false, err};
      }
    }

    async function login(userData) {

      console.log("userDat!!!", userData)
      try {
      let token = await FastApi.login(userData); 
      console.log("!!!!! token from signup!!!", token)
      setToken(token);
      console.log("token /setToken:", token)
      return { success: true};
      } catch (err) {
        console.log("login failed", err);
        return {success: false, err};
      }
    }

    /** Logout - clear token and user */

    function logout() {
      setDisplayMessages(false);
      setDisplayChatList(false);
      setDisplayChats(false);
      setUser(null);
      setToken(null);
      localStorage.setItem('user', null);

    }

    async function updateUser(user_id, data) {
      console.log("is this the error update")
      try {
        let user = await FastApi.updateUser(user_id, data);
        // setToken(token);
        // ! note I think you want to set the new user in storage but not 100% on this
        localStorage.setItem('user', JSON.stringify(user));
        return { success: true };
      } catch (errors) {
        console.error("update failed", errors);
        return { success: false, errors };
      }
    }

    /** Get all chats allows me to update chat list when user adds a chat immediately */

    async function getAllChats() {
      console.log("is this the error update")
      try {
        let chats = await FastApi.getChats(user.userId);
        setChats(chats);
        return chats;
      } catch (errors) {
        console.error("get all chats failed", errors);
        return { success: false, errors };
      }
    }

    function handleMessages(userId) {
      console.log("!!!!!!!!!!!!!!!!! handleMessages is being clicked!!!!!!!!!!!!!")
      console.log("userId in App.js", userId)
      displayMessages ? setDisplayMessages(false) : setDisplayMessages(true);
      if(displayChatList) {
        getAllChats();
      }
    }

    function handleChat(chatId) {
      console.log("!!!!!!!!!!!!!!!!! handleChat is being clicked!!!!!!!!!!!!!")
      console.log("chatId in App.js", chatId)
      setChatId(chatId)
      displayChats ? setDisplayChats(false) : setDisplayChats(true)
    }


    function handleChatList() {
      console.log("!!!!!!!!!!!!!!!!! handleChatList is being clicked!!!!!!!!!!!!!")
      displayChatList ? setDisplayChatList(false) : setDisplayChatList(true)
    }

     /** Display isLoading if API call is has not returned */

  if (isLoading) {
    return (
        <Loading />
    )
  }

// ! check overflow hiddne on body. You did something weird 
  return (
    <>

  <div className="track-out"  style={{
      maxHeight: isAboutVis ? '0px' : '',
      overflowX: isAboutVis ? 'hidden' : ''
    }}>  </div>

    <div className={isAboutVis ? '' : 'track-in'}>   </div>
    <div className="App">
   
      <BrowserRouter>
      <UserContext.Provider value={{user, setUser}}>
        <Fragment>
          <NavBar logout={logout}/>
          <main>
            <AllRoutes setIsAboutVis={setIsAboutVis} getUser={getUser} handleMessages={handleMessages} signup={signup} login={login} update={updateUser} getAllChats={getAllChats} chats={chats} setChats={setChats} displayChatList={displayChatList} setIsLoginVis={setIsLoginVis} setIsSignupVis={setIsSignupVis} setIsHomeVis={setIsHomeVis} />
  
            { user && displayMessages &&  <Chat handleMessages={handleMessages} /> }
          </main>
          {user && 
            <div onClick={handleChatList}><ChatIcon className="ChatIcon"/></div>
          }
          {user && displayChatList && <ChatList handleChatList={handleChatList} handleChat={handleChat} getAllChats={getAllChats} chats={chats} setChats={setChats}/> }

          {user && displayChats && <Chat handleChat={handleChat} chatId={chatId} /> }
        </Fragment>
        </UserContext.Provider>
      </BrowserRouter>
      </div>
      </>
  );
  }

export default App;
