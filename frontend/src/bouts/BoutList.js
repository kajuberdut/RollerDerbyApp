import React, { useState, useEffect } from "react";
import FastApi from "../Api";
import CardComponent from "../multiUse/cardComponent/CardComponent";
// import SearchBar from "../repeated/searchBar/SearchBar";
import Loading from "../multiUse/loading/Loading"
import "./BoutList.css";
import SearchBar from "../multiUse/searchBar/SearchBarEvents";
import DatePick from "../multiUse/datePicker/DatePicker";
import SearchComponent from "../multiUse/searchComponent/SearchComponent";

/**
 * Display bouts list page
 */

function BoutList({getBouts}) {

    /** Set Bouts and is loading in state*/

    const [isLoading, setIsLoading] = useState(false);
    const [bouts, setBouts] = useState([]);

  /** API get request for bouts */

    async function getAllBouts(title) {
      console.log("getAllBouts is running in BoutList.js")
      let bouts = await getBouts();

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

   /** Reloading bouts when it changes request for bouts */

    useEffect(() => {
        getAllBouts();
    }, []);


  /** Display loading if API call is has not returned */

    if (isLoading) {
      return (
          <Loading />
      )
    }

  /** Render the a card for each bout */

    const renderCards = () => {
      return (
        <div className="BoutList-RenderCards">
            <ul>
                {bouts.map(bout => (
                  <CardComponent bout={bout} key={"Bout-" + bout.boutId} />
                ))}
            </ul>
          </div>
        );
    }
  
  /** Render search bar and cards */

    return (
      <>
        <SearchComponent setBouts={setBouts}/>
        <div className="BoutList">
          <h1>Bouts</h1>
          <a href="/bouts/add">
            <button className="BoutList-Button">
              Create Bout
            </button>
          </a>
          {renderCards()}
        </div>
      </>
    );

}

export default BoutList;