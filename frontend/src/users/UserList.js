import React, { useState, useEffect } from "react";
import FastApi from "../Api";
import UserComponent from "./UserComponent";
import "./UserList.css"
// import SearchBar from "../repeated/searchBar/SearchBar";
import Loading from "../multiUse/loading/Loading"
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button
} from "reactstrap";

/**
 * Display users page
 */

function UserList({getUsers}) {

    /** Set Users and is loading in state*/

    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState([]);

  /** API get request for users */

    async function getAllUsers() {

      let users = await getUsers();
      console.log("users in UserList.js:", users)
    //   try{
    //     let users = await FastApi.getUsers(title);
    //     console.log("users", users)
    //     setUsers(users);
    //   } catch (err) {
    //   console.log("Getting users failed in userList.js", err);
    //   return {success: false, err};
    // }
     setUsers(users)
     setIsLoading(false); 
    }

   /** Reloading jobs when it changes request for jobs */

    useEffect(() => {
        getAllUsers();
    }, []);


  /** Display loading if API call is has not returned */

    // if (isLoading) {
    //   return (
    //       <Loading />
    //   )
    // }

  /** Render the cards for jobs */

    const renderCards = () => {
      return (
        <CardText className="UserList-RenderCards">
            <ul>
                {users.map(indUser => (
                  <UserComponent indUser={indUser} key={"User-" + indUser.userId} />
                ))}
            </ul>
          </CardText>
        );
    }
  
  /** Render search bar and cards */

    return (
      <Card className="UserList">
        <CardBody>
        {/* <SearchBar getUsers={getUsers}/> */}
        <CardTitle><h1>Users</h1></CardTitle>
        {renderCards()}
        </CardBody>
      </Card>
    );

}

export default UserList;