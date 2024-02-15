import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import FastApi from "../../Api";
import "./CardComponent.css";
import Loading from "../loading/Loading"
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

  /**  
  * Display ard component for bouts and mixers. 
  */

  function CardComponent({mixer, bout}) {

    /** Set address and is loading in state */ 

    const [address, setAddress ] = useState([]); 
    const [isLoading, setIsLoading] = useState(true);

    let info = bout !== undefined ? bout : mixer;
    let type = bout !== undefined ? "bouts" : "mixers";

    let key = info.eventId
    
    /** API get request for a specific address */ 

    async function getAddress() {
      
      try {
        let address = await FastApi.getAddress(info.addressId)
        setAddress(address);
        setIsLoading(false);
      } catch(errors) {
        return { success: false, errors };
      }
    }
    
    /** Reloads address when changes request for bout or mixer */

    useEffect(() => {
      getAddress();
    }, [bout, mixer]);


    /** Display empty component if API call is has not returned */

    if (isLoading) {
      return (
          <></>
      )
    }   
  
     /** Render the card component */
      
      return (
          <section key={"CardComponent-" + key}>
            <Card className="CardComponent" style={{minWidth: '400px', width: '50%'}}> 
              <CardBody>
                <NavLink to={`/events/${type}/${key}`} className="CardComponent-Link" style={{color: '#555555', textDecoration: 'none'}}>
                  <CardTitle className="text-center CardComponent-Title">
                    <h3>{info.theme}</h3>
                  </CardTitle>
                  <CardTitle> 
                  <h5>{address.city}, {address.state}</h5>
                  </CardTitle>
                  <CardText className="CardComponent-Text">
                  {info.date}
                  </CardText>
                  <CardText className="CardComponent-Text">
                    {info.description}
                  </CardText>
                </NavLink>
              </CardBody>
            </Card>
         </section>
      );
  }
  
  export default CardComponent
