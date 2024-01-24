import React, { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import FastApi from "../../Api";
import "./CardComponent.css";
import Loading from "../loading/Loading"
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

  /**  
  * Card component for bouts and mixers. 
  */

  function CardComponent({mixer, bout}) {

  /** Set address and is loading in state */ 
    const [address, setAddress ] = useState([]); 
    const [isLoading, setIsLoading] = useState(true);

    let info = bout !== undefined ? bout : mixer;
    console.log("info:", info)
    let type = bout !== undefined ? "bouts" : "mixers";
    console.log("*****************************************")
    console.log("type", type)

    let key = info.eventId
    
  /** API get request for a specific address */ 

    async function getAddress() {
   
      let address = await FastApi.getAddress(info.addressId)
      console.log("address:", address)
      setAddress(address)
      setIsLoading(false)
    }
    
  /** If bout or mixer changes call get address again */ 

    useEffect(() => {
      getAddress();
    }, [bout, mixer]);


      /** Display loading if API call is has not returned */

    if (isLoading) {
      return (
          <Loading />
      )
    }   
  
     /** Render the card component */
      
      return (
          <section key={"CardComponent-" + key}>
            <Card className="CardComponent"> 
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
