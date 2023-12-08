import React, { useState, useEffect } from "react";
import FastApi from "../Api";
import CardComponent from "../multiUse/CardComponent";
// import SearchBar from "../repeated/searchBar/SearchBar";
import Loading from "../multiUse/loading/Loading"

/**
 * Display bouts page
 */

function BoutList() {

    /** Set Bouts and is loading in state*/

    const [isLoading, setIsLoading] = useState(true);
    const [bouts, setBouts] = useState([]);

  /** API get request for bouts */

    async function getBouts(title) {
      try{
        let bouts = await JoblyApi.getJobs(title);
        setBouts(bouts);
      } catch (errors) {
      console.log("signup failed", errors);
      return {success: false, errors};
    }
     setIsLoading(false); 
    }

   /** Reloading jobs when it changes request for jobs */

    useEffect(() => {
        getBouts();
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
            <ul>
                {bouts.map(bout => (
                  <CardComponent bout={bout} key={"Bout-" + bout.id} />
                ))}
            </ul>
          </div>
        );
    }
  
  /** Render search bar and cards */

    return (
      <div className="JobList">
        <SearchBar getBouts={getBouts}/>
        {renderCards()}
      </div>
    );

}

export default BoutList;