import React, { useState, useEffect } from "react";
import FastApi from "../Api";
// import CardComponent from "../multiUse/cardComponent/CardComponent";
// import SearchBar from "../repeated/searchBar/SearchBar";
import Loading from "../multiUse/loading/Loading"

/**
 * Display users page
 */

function UserList() {

    /** Set Users and is loading in state*/

    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState([]);

  /** API get request for users */

    async function getUsers(title) {
      try{
        let users = await FastApi.getUsers(title);
        setUsers(users);
      } catch (errors) {
      console.log("signup failed", errors);
      return {success: false, errors};
    }
     setIsLoading(false); 
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
        <div className="JobList">
            {/* <ul>
                {users.map(user => (
                  <CardComponent user={user} key={"User-" + user.id} />
                ))}
            </ul> */}
            <h1>This is rendinering cards</h1>
          </div>
        );
    }
  
  /** Render search bar and cards */

    return (
      <div className="UserList">
        {/* <SearchBar getUsers={getUsers}/> */}
        {renderCards()}
      </div>
    );

}

export default UserList;