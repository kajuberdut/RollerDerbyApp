import React, { useState, useEffect } from "react";
import FastApi from "../Api";
import CardComponent from "../multiUse/cardComponent/CardComponent";
import SearchComponent from "../multiUse/searchComponent/SearchComponent";
import Loading from "../multiUse/loading/Loading"
import "./MixerList.css";

/**
 * Display bouts page
 */

function MixerList({getMixers}) {

    /** Set Bouts and is loading in state*/

    const [isLoading, setIsLoading] = useState(false);
    const [mixers, setMixers] = useState([]);

  /** API get request for bouts */

    async function getAllMixers(title) {
      console.log("getAllBouts is running in BoutList.js")
      let mixers = await getMixers();
      console.log("mixers in MixerList.js", mixers)
    //   try{
    //     let bouts = await JoblyApi.getJobs(title);
    //     setBouts(bouts);
    //   } catch (errors) {
    //   console.log("signup failed", errors);
    //   return {success: false, errors};
    // }
      setMixers(mixers);
      // setIsLoading(false); 
    }

   /** Reloading jobs when it changes request for jobs */

    useEffect(() => {
        getAllMixers();
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
        <div className="MixerList-RenderCards">
            <ul>
                {mixers.map(mixer => (
                  <CardComponent mixer={mixer} key={"Mixer-" + mixer.eventId} />
                ))}
            </ul>
          </div>
        );
    }
  
  /** Render search bar and cards */

    return (
      <div className="MixerList">
        <SearchComponent setMixers={setMixers}/>
        <h1>Mixers</h1>
        <a href="/mixers/add">
          {/* <button type="button" className="btn btn-outline-dark"  data-mdb-ripple-color="dark"
            style={{zIndex: 1, height: '40px', backgroundColor: '#d1d2d4', position: 'absolute', right: '20px', marginTop: '10px', fontSize: '15px'}}> */}
          <button className="MixerList-Button">
            Create Mixer
          </button>
        </a>
        {renderCards()}
      </div>
    );

}

export default MixerList;