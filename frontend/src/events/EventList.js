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

  console.log("event:", event)

  async function getAllEvents() {

      if(event.type === 'bouts') {
        try {
          let events =  await FastApi.getBouts();
          setEvents(events)
          setIsLoading(false)
          // return { success: true };
          return events
        } catch (errors) {
          console.error("Get Bouts failed", errors);
          return { success: false, errors };
        }
      } else {

          try {
            let events =  await FastApi.getMixers();
            setEvents(events)
            setIsLoading(false)
            // return { success: true };
            return events
          } catch (errors) {
            console.error("Get Bouts failed", errors);
            return { success: false, errors };
          }
      }


  }

   /** Reloading events when it changes request for events */

    useEffect(() => {
        getAllEvents();
    }, [event]);


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
          {/* <div style={{fontSize: '40px'}}>fake redering to find error</div> */}
            { event.type == "bouts" && <ul>
                {events.map(event => (
                  <CardComponent bout={event} key={"Event-" + event.eventId} />
                ))}
            </ul>
            }
            { event.type == "mixers" && <ul>
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
        <div className="EventList">
          { event.type == "bouts" && <SearchComponent setBouts={setEvents}/> }
          { event.type == "mixers" && <SearchComponent setMixers={setEvents}/> }
          { event.type == "bouts" && <h1>Bouts</h1> }
          { event.type == "mixers" && <h1>Mixers</h1> }
          { event.type == "bouts" && <a href="/events/bouts/add">
            <button className="EventList-Button">
              Create Bout
            </button>
          </a>
          }
          { event.type == "mixers" && <a href="/events/mixers/add">
            <button className="EventList-Button">
              Create Mixer
            </button>
          </a>
          }
          {renderCards()}
        </div>
    );

}

export default EventList;