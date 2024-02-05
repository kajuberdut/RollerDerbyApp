import React, { useState, useEffect } from "react";
import FastApi from "../Api";
import UserComponent from "./UserComponent";
import "./UserList.css"
import Loading from "../multiUse/loading/Loading"
import SearchComponentUsers from "../multiUse/searchComponent/SearchComponentUsers";
import { Card, CardBody, CardTitle } from "reactstrap";

/**
 * Display users page
 */

function UserList() {

    /** Set Users and is loading in state*/

    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));

  /** API get request for users */

  async function getUsers() {

    try {
      let users = await FastApi.getUsers();
      console.log("users in userlist !!!!!!!!!!!!!!!  ", users)
      setUsers(users)
      setIsLoading(false)
    } catch (errors) {
      return { success: false, errors };
    }
  }

   /** Reloads users when changes request for users */

    useEffect(() => {
        getUsers();
        console.log("users!!!!!!!", users)
    }, []);


  /** Display loading if API call is has not returned */

    if (isLoading) {
      return (
          <Loading />
      )
    }

  /** Render the cards for users*/

    const renderCards = () => {
      return (
        <div className="UserList-RenderCards">
                {users.map(indUser => (
                  indUser.username !== user.username ? (
                  <UserComponent indUser={indUser} key={"User-" + indUser.userId} />
                  ) : null 
                ))}
          </div>
        );
    }
  
  /** Render search bar and cards */

    return (
      <>
      <div style={{marginTop: '80px', minWidth: '400px'}}>
          <SearchComponentUsers getUsers={getUsers} setUsers={setUsers}/>
      </div>
      <Card className="UserList" style={{minWidth: '400px'}}>
        <CardBody>
        <CardTitle><h1>Users</h1></CardTitle>
        {users && <div> {renderCards()} </div> }
        {!users && <div>Sorry, no users were located.</div>}
        </CardBody>
      </Card>
      </>
    );

}

export default UserList;