import React, { useState, useEffect } from "react";
import FastApi from "../Api";
import UserComponent from "./UserComponent";
import "./UserList.css"
// import SearchBar from "../repeated/searchBar/SearchBar";
import Loading from "../multiUse/loading/Loading"
import {
  Card,
  CardBody,
  CardTitle
} from "reactstrap";
import SearchBarUsers from "../multiUse/searchBar/SearchBarUsers";
import SearchComponentUsers from "../multiUse/searchComponent/SearchComponentUsers";


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
      console.error("Get Users failed", errors);
      return { success: false, errors };
    }
  }

   /** Reloading jobs when it changes request for jobs */

    useEffect(() => {
        getUsers();
    }, []);


  /** Display loading if API call is has not returned */

    if (isLoading) {
      return (
          <Loading />
      )
    }

  /** Render the cards for jobs */

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
      <SearchComponentUsers getUsers={getUsers} setUsers={setUsers}/>
      <Card className="UserList">
        <CardBody>
        <CardTitle><h1>Users</h1></CardTitle>
        {renderCards()}
        </CardBody>
      </Card>
      </>
    );

}

export default UserList;