import React, { useState, useEffect } from "react";
import FastApi from "../Api";
import { useParams} from "react-router-dom";
import CardComponent from "../multiUse/cardComponent/CardComponent";
import Loading from "../multiUse/loading/Loading";

/**  
 * Bout detail form
 */

function BoutDetail() {

   /** Get url handle and set jobs and is loading in state*/
    // console.log("company:", company)
    const handle = useParams(); 
    const [bout, setBout ] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    // const [company, setCompany]= useState("");

    // //   /** API get request for a company's jobs */

    // async function getCompanyJobs() {
    //   let jobs = await JoblyApi.companyJobs(handle.name);
    //   setJobs(jobs);
    //   setIsLoading(false);
    // }

  //   /** API get request for a specific bout */ 

    async function getBout() {
      let bout = await FastApi.getBout(id);
      setBout(bout);
    }

    /** Reloading company jobs when it changes request for company jobs */
   
    // useEffect(() => {
    //   getCompanyJobs();
    //   getCompany();
    // }, []);

    /** Display isLoading if API call is has not returned */

    if (isLoading) {
      return (
          <Loading />
      )
    }

    // /** Return the cards for company jobs */

    // const renderCards = () => {
    //   return (
    //     <div className="CompanyDetail-JobList">
    //         <ul>
    //              {bouts.map(bout => (
    //               <CardComponent bout={bout} key={"Bout-Detail-" + bout.id} />
    //             ))}
    //         </ul>
    //       </div>
    //     );
    // }

    /** Render cards */
    // ! going to have to adjust this 

    return (
      <div className="BoutDetail">
        { company && <h3>{company.name}</h3> } 
        { company && <h4>{company.description}</h4>}
        {renderCards()}
      </div>
    );
  

}

export default BoutDetail