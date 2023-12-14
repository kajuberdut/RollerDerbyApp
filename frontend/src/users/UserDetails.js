import React, { useState, useEffect, useContext } from "react";
import FastApi from "../Api";
import { useParams} from "react-router-dom";

// ! are you going to make a distinction betweeen everyone elses profile and the users profile... and the answer is probably yes... so you may want to have a /profile and a /users/derbyName
// import CardComponent from "../multiUse/cardComponent/CardComponent";
import Loading from "../multiUse/loading/Loading";
import UserContext from "../multiUse/UserContext";


/**  
 * User detail form
 */

function UserDetail() {

   /** Get url handle and set jobs and is loading in state*/
    // console.log("company:", company)
    const derbyName = useParams(); 
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser]= useState("");
    // const { user } = useContext(UserContext);

    //   /** API get request for a user */

    async function getUser() {
      let user = await FastApi.getUser(derbyName);
      setUser(user);
      setIsLoading(false);
    }

    /** Reloading company jobs when it changes request for company jobs */
   
    useEffect(() => {
      getUser();
    }, []);

    /** Display isLoading if API call is has not returned */

    if (isLoading) {
      return (
          <Loading />
      )
    }

    // /** Return the cards for users */

    // const renderCards = () => {
    //   return (
    //     <div className="CompanyDetail-JobList">
    //         <ul>
    //              {jobs.map(job => (
    //               <CardComponent job={job} apply={apply} key={"Company-Detail-" + job.id} />
    //             ))}
    //         </ul>
    //       </div>
    //     );
    // }

    /** Render cards */
    // ! will need to rework this

    return (
      <div className="UserDetails">
        {/* { company && <h3>{company.name}</h3> } 
        { company && <h4>{company.description}</h4>} */}
        {/* {renderCards()} */}
      </div>
    );
  

}

export default UserDetail