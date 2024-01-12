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
import Messages from './chats/Messages';
// import jwt from "jsonwebtoken";
// import * as jwt_decode from 'jwt-decode';
// import jwt_decode from 'jwt-decode'
// import jwt_decode, { JwtPayload } from 'jwt-decode'
import { jwtDecode } from "jwt-decode"
import ChatIcon from "./chats/ChatIcon"
import { Link } from 'react-router-dom';

export const TOKEN_STORAGE_ID = "api-token";

function App() {

  const [user, setUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  // const [isLoading, setIsLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { default: jwt_decode } = require("jwt-decode");
  const [displayMessages, setDisplayMessages] = useState(false)


  // useEffect(() => {
  //   // get user from local storage  
  //   const storedUser = localStorage.getItem('user');
  //   console.log("storedUser *** ", storedUser)
    
  //   // if there is user in local starage set user in state 
  //   if (storedUser) {
  //     setUser(JSON.parse(storedUser));
  //   }

  //   // if there is a token we are going to get the user 
  //   if (token) {
  //     getUser();
  //   }
  // }, [token, getUser]);

  // async function getUser() {
  //   try {
  //     const { sub } = jwtDecode(token);
  //     FastApi.token = token;
  //     const user = await FastApi.getUserById(sub);
  //     setUser(user);
  //     // useLocalStorage.setItem('user', JSON.stringify(user));
  //   } catch (err) {
  //     console.error("App loadUserInfo: problem loading", err);
  //     setUser(null);
  //   }
  // }

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem('user'));
  
  //   if (user) {
  //     setUser(user);
  //   }
  // }, []);


  useEffect(function loadUser() {
    console.debug("App useEffect loadUserInfo", "token=", token);
    /** If token changes then API get request for user using user_id after decoding token if value of token changes rerun. */

    async function getUser() {
        if (token) {

          try {
            let { sub } = jwtDecode(token);
 
            // storing the token in static token in FastApi 
            FastApi.token = token;
            let user = await FastApi.getUserById(sub);
            // !note that local storage is not what you imported this is a built in function!
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
      getUser();
    }, [token]);

    async function signup(userData) {
      try {
      let token = await FastApi.signup(userData); 
    
      return { success: true};
      } catch (err) {
        console.log("signup failed", err);
        return {success: false, err};
      }
    }

    async function login(userData) {
      console.log("userDat!!!", userData)
      try {
      let token = await FastApi.login(userData); 
      console.log("!!!!! token from signup!!!", token)
      setToken(token);
      console.log("token /setTokn:", token)
      return { success: true};
      } catch (err) {
        console.log("login failed", err);
        return {success: false, err};
      }
    }

    /** Logout - clear token and user */

    function logout() {
      setToken(null);
      setUser(null);
      setDisplayMessages(false);
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

    async function getUsers() {

      try {
        let users = await FastApi.getUsers();
        // return { success: true };
        return users
      } catch (errors) {
        console.error("Get Users failed", errors);
        return { success: false, errors };
      }
    }

    async function getBouts() {

      try {
        let bouts = await FastApi.getBouts();
        // return { success: true };
        return bouts
      } catch (errors) {
        console.error("Get Bouts failed", errors);
        return { success: false, errors };
      }
    }

    async function getMixers() {

      try {
        let mixers = await FastApi.getMixers();
        // return { success: true };
        return mixers
      } catch (errors) {
        console.error("Get Bouts failed", errors);
        return { success: false, errors };
      }
    }

    function handleMessages(userId) {
      console.log("!!!!!!!!!!!!!!!!! handleMessages is being clicked!!!!!!!!!!!!!")
      console.log("userId in App.js", userId)
      displayMessages ? setDisplayMessages(false) : setDisplayMessages(true)
    }

     /** Display isLoading if API call is has not returned */

  if (isLoading) {
    return (
        <Loading />
    )
  }


  return (
    <>
    <div className="track-out">  </div>
    <div className="track-in">  </div>
    <div className="App">
   
      <BrowserRouter>
      <UserContext.Provider value={{user, setUser}}>
        <Fragment>
          <NavBar logout={logout}/>
          <main>
            <AllRoutes handleMessages={handleMessages} signup={signup} login={login} update={updateUser} getBouts={getBouts} getMixers={getMixers} getUsers={getUsers}/>
          { user && displayMessages &&  <Messages handleMessages={handleMessages} /> }
          </main>
          {user && <Link to={`/chats/${user.userId}`}>
            <ChatIcon className="ChatIcon"/>
          </Link>
          }
        </Fragment>
        </UserContext.Provider>
      </BrowserRouter>
      </div>
      </>
    
  );
  }

export default App;


// async function getUser() {
//   console.log("token:", token)
//   console.log("**** GETUSER IS RUNNING !!!")
//     if (token) {

//       try {
//         let { sub } = jwtDecode(token);
//         console.log("sub:", sub)
//         // storing the token in static token in FastApi 
//         FastApi.token = token;
//         let user = await FastApi.getUserById(sub);
//         console.log("!!!! user in app.js !!!!", user)
//         setUser(user);
//       } catch (err) {
//         console.error("App loadUserInfo: problem loading", err);
//         setUser(null);
//       }
//     }
//     setIsLoading(false);
//     console.log("setinfoloaded true")
//   }
//   getUser();
// }, [token]);