import './App.css';
import React, { useState, useEffect, Fragment } from 'react';
import { BrowserRouter } from "react-router-dom";
import NavBar from "./navBar/NavBar";
import AllRoutes from "./routes/Routes";
import Loading from "./multiUse/loading/Loading";
import UserContext from "./multiUse/UserContext";
// import { UserContext } from "./multiUse/UserContext";
import FastApi from "./Api";
import useLocalStorage from "./hooks/localStorage";
// import jwt from "jsonwebtoken";

export const TOKEN_STORAGE_ID = "api-token";

function App() {

  // const [user, setUser] = useState(null);
  // const [user, setUser] = useState();
  const [user, setUser] = useState({derbyName: "happyJack", email: "happyJack@gmail.com", facebookName: "Happy Jack fb", about: "I am a derby player that has been bouting since 2019. Blah blah blah blah", primaryNumber: 12, level: "B", location: {city: "Denver", state: "CO"}, associatedLeagues: "Rocky Mountain Roller Derby", ruleset: {WFTDA: true, USARS: true, bankedTrack: false, shortTrack: false}, position: {jammer: true, pivot: true, blocker: false}});

  // const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  // const [isLoading, setIsLoading] = useState(true);
  // const [isLoading, setIsLoading] = useState(false);


  // try {
  //   let token = await JoblyApi.apply(username, id);
  //   setToken(token);
  //   return { success: true };
  // } catch (errors) {
  //   console.error("applied to job failed", errors);
  //   return { success: false, errors };
  // }
// }

  // if (isLoading) {
  //   return (
  //       <Loading />
  //   )
  // }

  // useEffect(function loadUser() {

  //   async function getUser() {
  //       // if (token) {

  //         // try {
  //         //   let { username } = jwt.decode(token);
  //         //   FastApi.token = token;
  //         //   let user = await FastApi.getUser(username);
  //         //   setUser(user);
  //         // } catch (err) {
  //         //   console.error("App loadUserInfo: problem loading", err);
  //         //   setUser(null);
  //         // }
  //       // }
  //       setIsLoading(false);
  //       console.log("setinfoloaded true")
  //     }
  //     getUser();
  //   }, [token]);

    async function signup(userData) {
      try {
      let token = await FastApi.signup(userData); 
      // setToken(token);
      return { success: true};
      } catch (err) {
        console.log("signup failed", err);
        return {success: false, err};
      }
    }

    async function updateUser(derby_name, data) {
      console.log("is this the error update")
      try {
        let token = await FastApi.updateUser(derby_name, data);
        // setToken(token);
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

  return (
    
    <div className="App">
      <BrowserRouter>
      <UserContext.Provider value={{user, setUser}}>
        <Fragment>
          <NavBar />
          <main>
            {/* <Routes login={login} signup={signup} update={update} apply={apply} /> */}
            <AllRoutes signup={signup} update={updateUser} getBouts={getBouts} getMixers={getMixers} getUsers={getUsers}/>
          </main>
        </Fragment>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
  }

export default App;
