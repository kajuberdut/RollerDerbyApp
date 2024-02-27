import React, { useState, useEffect } from "react";
import FastApi from "../Api";
import CardComponent from "../multiUse/cardComponent/CardComponent";
import Loading from "../multiUse/loading/Loading"
import "./EventList.css";
import SearchComponent from "../multiUse/searchComponent/SearchComponent";
import { useParams} from "react-router-dom";

/**
 * Display event list page
 */

function EventList() {

    /** Set Events and is loading in state*/

    const [isLoading, setIsLoading] = useState(true);
    const [events, setEvents] = useState([]);
    const event = useParams(); 

  /** API get request for events */

  async function getAllEvents() {

      if(event.type === 'bouts') {

        try {

          let events =  await FastApi.getBouts();
          setEvents(events);
          setIsLoading(false);
 
        } catch (errors) {

          return { success: false, errors };
        }
      } else {

          try {

            let events =  await FastApi.getMixers();
            setEvents(events);
            setIsLoading(false);
  
          } catch (errors) {
            return { success: false, errors };
          }
      }


  }

   /** Reloading events when it changes request for events */

    useEffect(() => {
        getAllEvents();
    }, [event, getAllEvents]);


  /** Display loading if API call is has not returned */

    if (isLoading) {
      return (
          <Loading />
      )
    }

  /** Render the a card for each bout */

    const renderCards = () => {
      return (
        <div className="EventList-RenderCards">
            { event.type === "bouts" && <ul>
                {events.map(event => (
                  <CardComponent bout={event} key={"Event-" + event.eventId} />
                ))}
            </ul>
            }
            { event.type === "mixers" && <ul>
                {events.map(event => (
                  <CardComponent mixer={event} key={"Event-" + event.eventId} />
                ))}
            </ul>
            }
        </div>
        );
    }
  
  /** Render search bar and cards */

    return (   
        <div className="EventList" style={{paddingLeft: '8%', paddingTop: '0px', textAlign: 'center'}}>
          { event.type === "bouts" && <SearchComponent setBouts={setEvents}/> }
          { event.type === "mixers" && <SearchComponent setMixers={setEvents}/> }
          <div style={{display: 'flex', width: '50%'}}>
          { event.type === "bouts" && <h1 style={{paddingTop: '120px', paddingLeft: '50%' }}>Bouts</h1> }
          { event.type === "mixers" && <h1 style={{paddingTop: '120px', paddingLeft: '50%'}}>Mixers</h1> }
          { event.type === "bouts" && <a href="/events/bouts/add"> 
          <button className="EventList-Button" style={{marginTop: '120px', padding: '5px', paddingLeft: '7px', paddingRight: '7px'}}>
              Create
            </button>
          </a>
          }
          { event.type === "mixers" && <a href="/events/mixers/add"> 
            <button className="EventList-Button" style={{marginTop: '120px', padding: '3px', paddingLeft: '7px', paddingRight: '7px'}}>
              Create
            </button>
          </a>
          }
          
          </div>
          {renderCards()}
        </div>
    );

}

export default EventList;