import React, { useState, useEffect } from "react";
import "./TeamComponent.css";
import FastApi from "../Api";
import Loading from "../multiUse/loading/Loading";
import { useParams } from "react-router-dom";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBTypography } from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";
// import './TeamDetails.css'

// todo: ENSURE THIS ROUTE IS UNACCESSIBLE UNLESS THE USER IS A TEAM ADMIN
  
  /**  
  * Card component for team participant 
  */

  function TeamParticipant() {

    /** Get user from context, set button, and disable in state, and determine if dealing with bout or mixer*/

    const [team, setTeam] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [participant, setParticipant] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));
    const teamParams = useParams(); 
    const navigate = useNavigate();
    const [insurances, setInsurances] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [rulesets, setRulesets] = useState("");
    const [positions, setPositions] = useState("");
  
    
    async function getTeam() {

        try {
            console.log("teamParams!!!!!!!", teamParams.groupId) 
            console.log("teamParams!!!!!!! typeof", typeof teamParams.groupId)
              let teamDet = await FastApi.getGroup(Number(teamParams.groupId));
            // let teamDet = await FastApi.getGroup(1);
            console.log("team!!!!!!!", team)
            if(teamDet.admin !== user.userId) {
                navigate('/')
          }
            setTeam(teamDet)
            // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
            // console.log("teamParams.participant", teamParams.participant)
            getParticipant();

        } catch (errors) {
            return { success: false, errors };
        }
      }

    async function getParticipant() {

        try {
            
            let user = await FastApi.getUser(teamParams.participant);
            setParticipant(user)
            setIsLoading(false)
        } catch (errors) {

            return { success: false, errors };
        }
    }

    
    /** Reloads teams when changes request for teams */

    useEffect(() => {
        getTeam();
    }, []);



    useEffect(() => {
        function fetchData() {
          
            if (participant.insurance) {
                getUserInsurance()
            }
  
            if(participant.phoneNumber){
                formatPhoneNumber()
            }

            if(participant.position) {
                getPosition();
            }

            if(participant.ruleset) {
                getRuleset();
            }
          }
    
        fetchData();
      }, [participant]); 

      /** Fetch user insurance from api  */
    // todo update this so it renders when you edit the profile page
    async function getUserInsurance() {
        let insArr = []
        for(let ins of participant.insurance) {
            let insurance = await FastApi.getInsurance(ins.insuranceId);
            insArr.push(insurance.type + ":")
            insArr.push(ins.insuranceNumber)
        }
        if(insArr.length > 2){
            insArr[1] += ","
        }    
        let userInsurances = insArr.join(" ")
        setInsurances(userInsurances)
    }

      /** Format phone number  */
    // todo update this so it renders when you edit the profile page
  async function formatPhoneNumber() {
    let formPhoneNum = participant.phoneNumber.slice(0, 3) + '-' + participant.phoneNumber.slice(3, 6) + '-' + participant.phoneNumber.slice(6);
    setPhoneNumber(formPhoneNum)
  }

    async function getPosition() {

        try {
            let ps = [];
            for(const pos of participant.position) {
            let positions = await FastApi.getPosition(pos.positionId)

            if (positions.position === "jammer") {
                ps.push("Jammer");
            }
            if (positions.position === "pivot") {
                ps.push("Pivot");
            }
            if (positions.position === "blocker") {
                ps.push("Blocker");
            }
            
            let playedPositions = ps.join(", ");

            setPositions(playedPositions);

            }
        } catch (errors) {
            return { success: false, errors };
        }
    }

    async function getRuleset() {

        try {

            let rs = [];

              for(const rule in participant.ruleset) {
                
              let rulesets = await FastApi.getRuleset(participant.ruleset[rule].rulesetId)
             
              if (rulesets.name === "WFTDA") {
                rs.push("WFTDA");
              }
              if (rulesets.name === "USARS") {
                rs.push("USARS");
              }
              if (rulesets.name === "banked track") {
                rs.push("Banked Track");
              }
              if (rulesets.name === "short track") {
                rs.push("Short Track");
              }
              let knownRulesets = rs.join(", ")
              setRulesets(knownRulesets)
            }
            
            
        } catch (errors) {
            return { success: false, errors };
        }
    }


    /** Display isLoading if API call is has not returned */

    if (isLoading) {
        return (
            <Loading />
        )
      }


     /** Render the Team Details component */
      
        return (
            <div className="TeamParticipant" style={{backgroundColor: 'transparent', padding: '10%', paddingTop: '120px', display: 'flex'}} >
      
                      <MDBContainer style={{paddingBottom: '100px', minWidth: '400px', maxWidth: '1000px', padding: '0px', margin: '0px'}}>
                                <MDBRow style={{padding: '0px', margin: '0px'}}> 
                                  <MDBCol>
                                    <MDBCard style={{minWidth: '400px', minHeight: '700px', marginTop: '50px', boxShadow: '0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)'}}>
                                      <div style={{padding: '20px'}}>
                                        <h2>{teamParams.participant}</h2>
                                      </div>
      
                                      <div className="p-2 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                                          <div className="d-flex justify-content-end text-center py-1" style= {{marginTop: '2px'}}>
                                          </div>
                                      </div>
      
                                      <div className="ms-3 d-flex" style={{ marginTop: '0px'}}>
                                          <div className="m-0 text-start" style={{fontSize: '24px', fontFamily: 'initial', fontWeight: 'bold', width: '30%', minWidth: '130px'}}>Legal Name:
                                          </div>
                                          {participant.firstName && participant.lastName && <MDBCardText style={{marginTop: '5px', width: '50%', textAlign: 'left'}} tag="h4">{participant.firstName} {participant.lastName}</MDBCardText>}
                                          </div>
      
                                      <div className="p-2 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                                          <div className="d-flex justify-content-end text-center py-1" style={{marginTop: '2px'}}>
                                          </div>
                                      </div>
      
                                      <div className="ms-3 d-flex" style={{ marginTop: '0px', }}>
                                            <div className="m-0 text-start" style={{fontSize: '24px', fontFamily: 'initial', fontWeight: 'bold', width: '30%', minWidth: '130px'}}>
                                                Email:
                                            </div>
                                            <MDBCardText style={{marginTop: '5px', overflow: 'hidden', marginRight: '10px', width: '50%'}} tag="h4">
                                                {participant.email} 
                                            </MDBCardText>
                                      </div>
      
                                      <div className="p-2 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                                          <div className="d-flex justify-content-end text-center py-1" style={{marginTop: '2px'}}>
                                          </div>
                                      </div>
                                      
                                      <div className="ms-3 d-flex" style={{ marginTop: '0px'}}>
                                          <div className="m-0 text-start" style={{fontSize: '24px', fontFamily: 'initial', fontWeight: 'bold', width: '30%', minWidth: '130px'}}>Phone #:
                                          </div>
                                          {participant.phoneNumber && <MDBTypography style={{ marginTop: '5px', width: '50%', textAlign: 'left'}} tag="h4">{phoneNumber}</MDBTypography>}
                                      </div>
      
                                      <div className="p-2 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                                          <div className="d-flex justify-content-end text-center py-1" style={{marginTop: '2px'}}>
                                          </div>
                                      </div>
      
                                      <div className="ms-3 d-flex" style={{ marginTop: '0px'}}>
                                          <div className="m-0 text-start" style={{fontSize: '24px', fontFamily: 'initial', fontWeight: 'bold', width: '30%', minWidth: '130px'}}>Insurances:
                                          </div>
      
                                          { insurances &&
                                                <MDBTypography style={{marginTop: '5px', width: '50%', textAlign: 'left'}} tag="h4">{insurances}</MDBTypography>
                                          }
                                      </div>
      
                                      <div className="p-2 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                                          <div className="d-flex justify-content-end text-center py-1" style={{marginTop: '2px'}}>
                                          </div>
                                      </div>

                                      <div className="ms-3 d-flex" style={{ marginTop: '0px'}}>
                                          <div className="m-0 text-start" style={{fontSize: '24px', fontFamily: 'initial', fontWeight: 'bold', width: '30%', minWidth: '130px'}}>Primary #:
                                          </div>
      
                                          {participant.primaryNumber != null && 
                                              <MDBTypography style={{marginTop: '5px', width: '50%', textAlign: 'left'}} tag="h4">{participant.primaryNumber}</MDBTypography>
                                          }
                                      </div>
      
                                      <div className="p-2 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                                          <div className="d-flex justify-content-end text-center py-1" style={{marginTop: '2px'}}>
                                          </div>
                                      </div>
      
                                      <div className="ms-3 d-flex" style={{ marginTop: '0px'}}>
                                          <div className="m-0 text-start" style={{fontSize: '24px', fontFamily: 'initial', fontWeight: 'bold', width: '30%', minWidth: '130px'}}>Secondary #:
                                          </div>
      
                                          {participant.secondaryNumber != null && 
                                              <MDBTypography style={{marginTop: '5px', width: '50%', textAlign: 'left'}} tag="h4">{participant.secondaryNumber}</MDBTypography>
                                          }
                                      </div>
      
                                      <div className="p-2 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                                          <div className="d-flex justify-content-end text-center py-1" style={{marginTop: '2px'}}>
                                          </div>
                                      </div>
      
                                      <div className="ms-3 d-flex" style={{ marginTop: '0px'}}>
                                          <div className="m-0 text-start" style={{fontSize: '24px', fontFamily: 'initial', fontWeight: 'bold', width: '30%', minWidth: '130px'}}>Additional Info:
                                          </div>
      
                                          {participant.additionalInfo && 
                                              <MDBTypography style={{marginTop: '5px', width: '50%', textAlign: 'left'}} tag="h4">{participant.additionalInfo}</MDBTypography>
                                          }
                                      </div>
      
                                      <div className="p-2 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                                          <div className="d-flex justify-content-end text-center py-1" style={{marginTop: '2px'}}>
                                          </div>
                                      </div>

                                      <div className="ms-3 d-flex" style={{ marginTop: '0px'}}>
                                          <div className="m-0 text-start" style={{fontSize: '24px', fontFamily: 'initial', fontWeight: 'bold', width: '30%', minWidth: '130px'}}>Facebook Name:
                                          </div>
      
                                          {participant.facebookName && 
                                              <MDBTypography style={{marginTop: '5px', width: '50%', textAlign: 'left'}} tag="h4">{participant.facebookName}</MDBTypography>
                                          }
                                      </div>
      
                                      <div className="p-2 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                                          <div className="d-flex justify-content-end text-center py-1" style={{marginTop: '2px'}}>
                                          </div>
                                      </div>

                                      <div className="ms-3 d-flex" style={{ marginTop: '0px'}}>
                                          <div className="m-0 text-start" style={{fontSize: '24px', fontFamily: 'initial', fontWeight: 'bold', width: '30%', minWidth: '130px'}}>Positions:
                                          </div>
      
                                          {positions && 
                                              <MDBTypography style={{ marginTop: '5px', width: '50%', textAlign: 'left'}} tag="h4">{positions}</MDBTypography>
                                          }
                                      </div>
      
                                      <div className="p-2 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                                          <div className="d-flex justify-content-end text-center py-1" style={{marginTop: '2px'}}>
                                          </div>
                                      </div>

                                      <div className="ms-3 d-flex" style={{ marginTop: '0px'}}>
                                          <div className="m-0 text-start" style={{fontSize: '24px', fontFamily: 'initial', fontWeight: 'bold', width: '30%', minWidth: '130px'}}>Rulesets:
                                          </div>
      
                                          {rulesets && 
                                              <MDBTypography style={{marginTop: '5px', width: '50%', textAlign: 'left'}} tag="h4">{rulesets}</MDBTypography>
                                          }
                                      </div>
      
                                      <div className="p-2 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                                          <div className="d-flex justify-content-end text-center py-1" style={{marginTop: '2px'}}>
                                          </div>
                                      </div>

                                  
                          
                                    </MDBCard>
                                  </MDBCol>
                                </MDBRow>
                              </MDBContainer>
      
            </div>
          )
  }
  
  export default TeamParticipant
