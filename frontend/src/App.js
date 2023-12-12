import './App.css';
import React, { useState, useEffect, Fragment } from 'react';
import { BrowserRouter } from "react-router-dom";
import Nav from "./navBar/NavBar";
import AllRoutes from "./routes/Routes";
import Loading from "./multiUse/loading/Loading";
import UserContext from "./multiUse/UserContext";
import FastApi from "./Api";
import useLocalStorage from "./hooks/localStorage";
// import jwt from "jsonwebtoken";

export const TOKEN_STORAGE_ID = "api-token";

function App() {

  const [user, setUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [isLoading, setIsLoading] = useState(true);
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

  useEffect(function loadUser() {

    async function getUser() {
        if (token) {

          // try {
          //   let { username } = jwt.decode(token);
          //   FastApi.token = token;
          //   let user = await FastApi.getUser(username);
          //   setUser(user);
          // } catch (err) {
          //   console.error("App loadUserInfo: problem loading", err);
          //   setUser(null);
          // }
        }
        setIsLoading(false);
        console.log("setinfoloaded true")
      }
      getUser();
    }, [token]);

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

    async function update(username, data) {
      try {
        let token = await FastApi.updateUser(username, data);
        // setToken(token);
        return { success: true };
      } catch (errors) {
        console.error("update failed", errors);
        return { success: false, errors };
      }
    }

  return (
    
    <div className="App">
      <BrowserRouter>
        <Fragment>
          <Nav />
          <main>
            {/* <Routes login={login} signup={signup} update={update} apply={apply} /> */}
            <AllRoutes signup={signup} update={update}/>
          </main>
        </Fragment>
      </BrowserRouter>
    </div>
  );
  }

export default App;
