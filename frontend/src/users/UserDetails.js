import React, { useState, useEffect } from "react";
import JoblyApi from "../Api";
import { useParams} from "react-router-dom";
import CardComponent from "../repeated/cardComponents/CardComponent";
import Loading from "../repeated/loading/Loading";

/**  
 * User detail form
 */

function UserDetail() {

   /** Get url handle and set jobs and is loading in state*/
    // console.log("company:", company)
    const id = useParams(); 
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser]= useState("");

    //   /** API get request for a user */

    async function getUser() {
      let user = await FastApi.getUser(id);
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
      <div className="CompanyDetail">
        { company && <h3>{company.name}</h3> } 
        { company && <h4>{company.description}</h4>}
        {renderCards()}
      </div>
    );
  

}

export default CompanyDetail