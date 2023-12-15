import React, { useState, useEffect } from "react";
import FastApi from "../Api";
import CardComponent from "../multiUse/cardComponent/CardComponent";
// import SearchBar from "../repeated/searchBar/SearchBar";
import Loading from "../multiUse/loading/Loading"
import "./BoutList.css";

/**
 * Display bouts page
 */

function BoutList({getBouts}) {

    /** Set Bouts and is loading in state*/

    const [isLoading, setIsLoading] = useState(false);
    const [bouts, setBouts] = useState([]);

  /** API get request for bouts */

    async function getAllBouts(title) {
      console.log("getAllBouts is running in BoutList.js")
      let bouts = await getBouts();
      console.log("bouts in BoutList.js", bouts)
    //   try{
    //     let bouts = await JoblyApi.getJobs(title);
    //     setBouts(bouts);
    //   } catch (errors) {
    //   console.log("signup failed", errors);
    //   return {success: false, errors};
    // }
      setBouts(bouts);
      // setIsLoading(false); 
    }

   /** Reloading jobs when it changes request for jobs */

    useEffect(() => {
        getAllBouts();
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
        <div className="BoutList-RenderCards">
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
      <div className="BoutList">
        {/* <SearchBar getBouts={getBouts}/> */}
        <h1>Bouts</h1>
        {renderCards()}
      </div>
    );

}

export default BoutList;