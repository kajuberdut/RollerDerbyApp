import React, { useState, useEffect } from "react";
import FastApi from "../Api";
import { useParams } from "react-router-dom";
import Loading from "../multiUse/loading/Loading";
import "./MixerDetails.css"
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody } from 'mdb-react-ui-kit';

/**  
 * Display mixer detail page
 */

function MixerDetail({ getAllChats }) {

   /** Get eventId from url, set mixer, address and is loading in state*/

    const eventId = useParams(); 
    const [mixer, setMixer ] = useState([]);
    const [address, setAddress ] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [connected, setConnected] = useState(null)
    const [error, setError] = useState(null)

    /** Retrieve user from local storage*/

    const user = JSON.parse(localStorage.getItem('user'));

    /** API get request for a specific mixer */ 

    async function getMixer() {

      try {

        let mixer = await FastApi.getMixer(eventId.id);
        let address = await FastApi.getAddress(mixer.addressId)
        setMixer(mixer);
        setAddress(address);
        setIsLoading(false);
      } catch(errors) {

        return { success: false, errors };
      }
    }
   
    /** Reloading mixers when it changes request for mixers */
   
    useEffect(() => {
      getMixer();
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

      let data = {userId: `${user.userId}`, groupId: `${mixer.groupId}`}

      try {     
        let result = await FastApi.addUserToGroup(data); 

        if(result) {
          getAllChats();
        }

        setConnected("Connected. Check your chats.")
        return { success: true};

      } catch(errors) {
        setError("Unable to connect to chat.")
        return {success: false, description: "Unable to connect to chat."};
      }
    }

    return (

    <section>
        <div className="MixerDetails" style={{marginRight: '35%', marginTop: '150px', minWidth: '400px', marginLeft: '10%'}} >
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

                  <div className="ms-3" style={{display: 'flex', overflow: 'hidden'}}>
                    <MDBCardText tag="h1" style={{ marginTop: '50px'}}>{mixer.theme}</MDBCardText>
                    <MDBCardText tag="h4" style={{position: 'absolute'}}>{mixer.date}</MDBCardText>
                  </div>
                </div>
                <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
         
                  <div className="d-flex justify-content-beginning text-center py-1" style={{marginTop: '2px'}}>
             
                  <div className="d-flex flex-column text-center py-1">
                    <MDBCardText>{address.streetAddress}</MDBCardText>
                    <MDBCardText style={{ position: 'absolute', top: '16rem' }}>{address.city}, {address.state} {address.zipCode}</MDBCardText>
                  </div>
                  </div>
                    <div className="d-flex justify-content-end text-center py-1" style={{marginTop: '2px'}}>
                    <div>
                      <MDBCardText className="mb-1 h5" style={{marginRight: '30px'}}>{mixer.level}</MDBCardText>
                      <MDBCardText className="small text-muted mb-0"style={{marginRight: '30px'}}>level</MDBCardText>
                    </div>
  
                    <div className="px-3">
                      <MDBCardText className="mb-1 h6" style={{marginLeft: '30px'}}>{mixer.ruleset}</MDBCardText>
                      <MDBCardText className="small text-muted mb-0" style={{marginLeft: '30px', marginTop: '7px'}}>ruleset</MDBCardText>
                    </div>
                   { mixer.coEd && <div className="px-3">
                      <MDBCardText className="mb-1 h6" style={{marginLeft: '30px'}}>Yes</MDBCardText>
                      <MDBCardText className="small text-muted mb-0" style={{marginLeft: '30px', marginTop: '7px'}}>open</MDBCardText>
                    </div>
                    }       
                     { !mixer.coEd && <div className="px-3">
                      <MDBCardText className="mb-1 h6" style={{marginLeft: '30px'}}>No</MDBCardText>
                      <MDBCardText className="small text-muted mb-0" style={{marginLeft: '30px', marginTop: '7px'}}>open</MDBCardText>
                    </div>
                    }   
                  </div>
                </div>
                <MDBCardBody className="text-black p-4">
                <div className="mb-5">
                    <p className="lead fw-normal mb-1">Time</p>
                    <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                      <MDBCardText className="font-italic mb-1">{mixer.time}</MDBCardText>
                      <MDBCardText className="font-italic mb-1">{mixer.timeZone}</MDBCardText>
                    </div>
                  </div>
                  <div className="mb-5">
                    <p className="lead fw-normal mb-1">Signup Here</p>
                    <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                      <MDBCardText className="font-italic mb-1">{mixer.signupLink}</MDBCardText>
                    </div>
                  </div>
                  <div className="mb-5">
                    <p className="lead fw-normal mb-1">Floor Type</p>
                    <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                      <MDBCardText className="font-italic mb-1">{mixer.floorType}</MDBCardText>
                    </div>
                  </div>
                  <div className="mb-5">
                    <p className="lead fw-normal mb-1">Description</p>
                    <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                      <MDBCardText className="font-italic mb-1">{mixer.description}</MDBCardText>
                    </div>
                  </div>
                  <div className="mb-5">
                    <p className="lead fw-normal mb-1">Jersey Colors</p>
                    <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                      <MDBCardText className="font-italic mb-1">{mixer.jerseyColors}</MDBCardText>
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

export default MixerDetail