import './App.css';
import React, { useState, useEffect, Fragment } from 'react';
import { BrowserRouter } from "react-router-dom";
import NavBar from "./navBar/NavBar";
import AllRoutes from "./routes/Routes";
import Loading from "./multiUse/loading/Loading";
// import UserContext from "./multiUse/UserContext";
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

        FastApi.token = token;
        let user = await FastApi.getUserById(sub);
    
        if(!user) {
          logout();
        }
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);

      } catch (err) {
        setUser(null);
      }
    }
    setIsLoading(false);
  }


  useEffect(function loadUser() {
    // console.debug("App useEffect loadUserInfo", "token=", token);
    /** If token changes then API get request for user using user_id after decoding token if value of token changes rerun. */
      getUser();
    }, [token]);

    async function signup(userData) {
      try {
      let token = await FastApi.signup(userData); 

      return { success: true};
      } catch (err) {

        return {success: false, err};
      }
    }

    async function login(userData) {

      console.log("userDat!!!", userData)
      try {
        let token = await FastApi.login(userData); 
        
        setToken(token);
    
        return { success: true};
      } catch (err) {
    
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
      try {
        let user = await FastApi.updateUser(user_id, data);
        localStorage.setItem('user', JSON.stringify(user));
        return { success: true };
      } catch (errors) {
        console.error("update failed", errors);
        return { success: false, errors };
      }
    }

    /** Get all chats allows me to update chat list when user adds a chat immediately */

    async function getAllChats() {
      try {
        let chats = await FastApi.getChats(user.userId);
        setChats(chats);
        return chats;
      } catch (errors) {
        return { success: false, errors };
      }
    }
    
    /** Handle messages display */

    function handleMessages() {
      displayMessages ? setDisplayMessages(false) : setDisplayMessages(true);
      if(displayChatList) {
        getAllChats();
      }
    }

    /** Handle chat display */

    function handleChat(chatId) {
      setChatId(chatId)
      displayChats ? setDisplayChats(false) : setDisplayChats(true)
    }

    /** Handle chat list display */

    function handleChatList() {
      displayChatList ? setDisplayChatList(false) : setDisplayChatList(true)
    }

    /** Display isLoading if API call is has not returned */

    if (isLoading) {
      return (
          <Loading />
      )
    }

  return (
    <>

  <div className="track-out"  style={{
      maxHeight: isAboutVis ? '0px' : '',
      maxWidth: isAboutVis ? '0px' : ''
    }}>  </div>

    <div className={isAboutVis ? '' : 'track-in'}>   </div>
    <div className="App">
   
      <BrowserRouter>
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
      </BrowserRouter>
      </div>
      </>
  );
  }

export default App;
