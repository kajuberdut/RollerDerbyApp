import React, { useState, useEffect } from "react";
import FastApi from "../Api";
import { useParams} from "react-router-dom";
// import CardComponent from "../multiUse/cardComponent/CardComponent";
import Loading from "../multiUse/loading/Loading";
import "./BoutDetails.css"

import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';

/**  
 * Bout detail form
 */

function BoutDetail() {

   /** Get url handle and set jobs and is loading in state*/

    const eventId = useParams(); 
    const [bout, setBout ] = useState([]);
    const [address, setAddress ] = useState([]);
    const [isLoading, setIsLoading] = useState(true);



  //   /** API get request for a specific bout */ 

    async function getBout() {
      let bout = await FastApi.getBout(eventId.id);
      let address = await FastApi.getAddress(bout.addressId)
      console.log("address:", address)
      setBout(bout);
      setAddress(address)
      setIsLoading(false)
    }
   

    /** Reloading company jobs when it changes request for company jobs */
   
    useEffect(() => {
      // getCompanyJobs();
      getBout();
    }, []);

    /** Display isLoading if API call is has not returned */

    if (isLoading) {
      return (
          <Loading />
      )
    }

    // ! going to have to adjust this 

    return (

      // <section key={"BoutDetail" + event_id}>
      <section>


<div className="BoutDetails" style={{marginRight: '35%', marginTop: '150px'}} >
<MDBContainer>
          <MDBRow className="justify-content-center align-items-center h-100"> 
            <MDBCol lg="9" xl="10">
              <MDBCard style={{minWidth: '300px', marginTop: '50px', boxShadow: '0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)'}}>
                <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px'}}>

                  <div className="ms-3" style={{display: 'flex'}}>
                    <MDBCardText tag="h1" style={{ marginTop: '50px'}}>{bout.theme}</MDBCardText>
                    <MDBCardText tag="h4" style={{position: 'absolute'}}>{bout.date}</MDBCardText>
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
                      <MDBCardText className="mb-1 h5" style={{marginRight: '30px'}}>{bout.level}</MDBCardText>
                      <MDBCardText className="small text-muted mb-0"style={{marginRight: '30px'}}>level</MDBCardText>
                    </div>
  
                    <div className="px-3">
                      <MDBCardText className="mb-1 h6" style={{marginLeft: '30px'}}>{bout.ruleset}</MDBCardText>
                      <MDBCardText className="small text-muted mb-0" style={{marginLeft: '30px', marginTop: '7px'}}>ruleset</MDBCardText>
                    </div>
                   { bout.coEd && <div className="px-3">
                      <MDBCardText className="mb-1 h6" style={{marginLeft: '30px'}}>Yes</MDBCardText>
                      <MDBCardText className="small text-muted mb-0" style={{marginLeft: '30px', marginTop: '7px'}}>co-ed</MDBCardText>
                    </div>
                    }       
                     { !bout.co_ed && <div className="px-3">
                      <MDBCardText className="mb-1 h6" style={{marginLeft: '30px'}}>No</MDBCardText>
                      <MDBCardText className="small text-muted mb-0" style={{marginLeft: '30px', marginTop: '7px'}}>co-ed</MDBCardText>
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