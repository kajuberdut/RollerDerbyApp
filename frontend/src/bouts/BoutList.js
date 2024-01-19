import React, { useState, useEffect } from "react";
import FastApi from "../Api";
import CardComponent from "../multiUse/cardComponent/CardComponent";
import Loading from "../multiUse/loading/Loading"
import "./BoutList.css";
import SearchComponent from "../multiUse/searchComponent/SearchComponent";

/**
 * Display bouts list page
 */

function BoutList() {

    /** Set Bouts and is loading in state*/

    const [isLoading, setIsLoading] = useState(false);
    const [bouts, setBouts] = useState([]);

  /** API get request for bouts */

  async function getAllBouts() {

    try {
      let bouts = await FastApi.getBouts();
      setBouts(bouts)
      // return { success: true };
      return bouts
    } catch (errors) {
      console.error("Get Bouts failed", errors);
      return { success: false, errors };
    }
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
        <div className="BoutList">
        <SearchComponent setBouts={setBouts}/>
          <h1>Bouts</h1>
          <a href="/bouts/add">
            <button className="BoutList-Button">
              Create Bout
            </button>
          </a>
          {renderCards()}
        </div>
    );

}

export default BoutList;