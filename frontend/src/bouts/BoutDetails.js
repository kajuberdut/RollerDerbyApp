import React, { useState, useEffect } from "react";
import FastApi from "../Api";
import { useParams} from "react-router-dom";
import Loading from "../multiUse/loading/Loading";
import "./BoutDetails.css"

import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody } from 'mdb-react-ui-kit';

/**  
 * Display bout detail page
 */

function BoutDetail({getAllChats}) {

   /** Get set bouts, addresses and is loading in state*/

    const eventId = useParams(); 
    const [bout, setBout ] = useState([]);
    const [address, setAddress ] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [connected, setConnected] = useState(null)
    const [error, setError] = useState(null)
    

    /** API get request for a specific bout using id  */ 

    async function getBout() {
      let bout = await FastApi.getBout(eventId.id);
      let address = await FastApi.getAddress(bout.addressId)

      setBout(bout);
      setAddress(address)
      setIsLoading(false)
    }
   

    /** Reload bout when it changes request for bout */
   
    useEffect(() => {
      getBout();
    }, []);

    /** Display isLoading if API call is has not returned */

    if (isLoading) {
      return (
          <Loading />
      )
    }

    /** Handle click of button  */

    async function handleClick(e) {
      e.preventDefault(); 

      //   /** Retrieve user from local storage  */ 
      const user = JSON.parse(localStorage.getItem('user'));

      let data = {userId: `${user.userId}`, groupId: `${bout.groupId}`}

      try {
        let result = await FastApi.addUserToGroup(data); 
          if(result) {
            getAllChats();
          }

        setConnected("Connected. Check your chats.")
        return { success: true};
        } catch (err) {
          setError("Unable to connect to chat.")
          return {success: false, description: "Unable to connect to chat."};
        }
    } 

    /** render bout details page */

    return (

      <section key={"BoutDetail" + bout.event_id}>
        <div className="BoutDetails" style={{marginRight: '35%', marginTop: '150px', minWidth: '400px', marginLeft: '10%'}} >
          <MDBContainer>
            <MDBRow className="justify-content-center align-items-center h-100"> 
              <MDBCol lg="9" xl="10">
                <MDBCard style={{minWidth: '300px', marginTop: '50px', boxShadow: '0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)'}}>
                  <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px'}}>
           
                    <button type="button" className="btn btn-outline-dark" onClick={handleClick} data-mdb-ripple-color="dark"
                      style={{zIndex: 1, height: '40px', backgroundColor: '#d1d2d4', position: 'absolute', right: '20px', marginTop: '10px', fontSize: '15px'}}>
                      Join Chat
                    </button>

                    {(error || connected) && (
                      <div style={{ color: error ? 'red' : 'green',fontSize: '14px', position: 'absolute',right: '10px', top: '40px', marginTop: '10px'}}
                      >
                        {error || connected}
                      </div>
                    )}

                    <div className="ms-3" style={{display: 'flex'}}>
                      <MDBCardText tag="h1" style={{ marginTop: '50px'}}>{bout.theme}</MDBCardText>
                      <MDBCardText tag="h4" style={{position: 'absolute'}}>{bout.date}</MDBCardText>
                    </div>
                  </div>
                  <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
         
                    <div className="d-flex justify-content-beginning text-center py-1" style={{marginTop: '2px', fontSize: '20px' }}>
             
                    <div className="d-flex flex-column text-center py-1">
                      <MDBCardText>{address.streetAddress}</MDBCardText>
                      <MDBCardText style={{ position: 'absolute', top: '16rem', fontSize: '20px' }}>{address.city}, {address.state} {address.zipCode}</MDBCardText>
                    </div>
                  </div>
                    <div className="d-flex justify-content-end text-center py-1" style={{marginTop: '2px'}}>
                    <div>
                      <MDBCardText className="mb-1 h5" style={{marginRight: '30px', fontSize: '18px' }}>{bout.level}</MDBCardText>
                      <MDBCardText className="small text-muted mb-0"style={{marginRight: '30px', fontSize: '16px' }}>level</MDBCardText>
                    </div>
  
                    <div className="px-3">
                      <MDBCardText className="mb-1 h6" style={{marginLeft: '30px', fontSize: '18px' }}>{bout.ruleset}</MDBCardText>
                      <MDBCardText className="small text-muted mb-0" style={{marginLeft: '30px', marginTop: '7px', fontSize: '16px' }}>ruleset</MDBCardText>
                    </div>
                   { bout.coEd && <div className="px-3">
                      <MDBCardText className="mb-1 h6" style={{marginLeft: '30px', fontSize: '18px' }}>Yes</MDBCardText>
                      <MDBCardText className="small text-muted mb-0" style={{marginLeft: '30px', marginTop: '7px', fontSize: '16px' }}>co-ed</MDBCardText>
                    </div>
                    }       
                    
                  </div>
                </div>
                <MDBCardBody className="text-black p-4">
                <div className="mb-5">
                    <p className="lead fw-normal mb-1">Time</p>
                    <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                      <MDBCardText className="font-italic mb-1">{bout.time}</MDBCardText>
                      <MDBCardText className="font-italic mb-1">{bout.timeZone}</MDBCardText>
                    </div>
                  </div>
                  <div className="mb-5">
                    <p className="lead fw-normal mb-1">Details</p>
                    <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                      <MDBCardText className="font-italic mb-1">{bout.team} vs. {bout.opposingTeam}</MDBCardText>
                      <MDBCardText className="font-italic mb-1">{bout.jerseyColors}</MDBCardText>
                    </div>
                  </div>
                  <div className="mb-5">
                    <p className="lead fw-normal mb-1">Floor Type</p>
                    <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                      <MDBCardText className="font-italic mb-1">{bout.floorType}</MDBCardText>
                    </div>
                  </div>
                  <div className="mb-5">
                    <p className="lead fw-normal mb-1">Description</p>
                    <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                      <MDBCardText className="font-italic mb-1">{bout.description}</MDBCardText>
                    </div>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
   </section>
    );
  

}

export default BoutDetail