import React, { useContext, useState } from "react";
import FastApi from "../Api";
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import UserContext from "../multiUse/UserContext";
// import Select from 'react-select';
import { useNavigate } from "react-router-dom";
import "./BoutForm.css"
import {
    Card,
    CardBody,
    CardTitle,
    Form,
    FormGroup,
    Label, 
    Input,
    Button,
  } from "reactstrap";
  import PropTypes from 'prop-types';

/** 
 * Form for creating a user or updating a logged in user.
 */

const BoutForm = () => {

  /** Set user, history and initial state and set valid, invalid, and error message in state */

const { user, setUser } = useContext(UserContext);

//   const history = useHistory();
//   const [ valid, setValid ] = useState(false);
//   const [ invalid, setInvalid ] = useState(false);
//   const [errorMessage, setErrorMessage] = useState([]);
const [dropdownOpen, setDropdownOpen] = useState(false);
// const [file, setFile] = useState<File | undefined>();
// const [preview, setPreview] = useState<string | undefined>();
const navigate = useNavigate();

// let user = "SockHer Blue"  

  /** 
   * Sets Initial State of Form
  */

if(!user) {
  navigate('/')
}

let INITIAL_STATE = { date: "", time: "", timeZone: "Mountain Time (MT): America/Denver (Denver, Phoenix, Salt Lake City)", theme: "", description: "", level: "All levels", coEd: "False", ruleset: "WFTDA", opposingTeam: "", team: ""};

  /** Sets formData in initial state */
  const [formData, setFormData] = useState(INITIAL_STATE);
  

  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!formData:", formData)
  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!formData.timeZone:", formData.timeZone)
  /** Handle Submit by either creating user, updating profile, or returning an error message */

  const handleSubmit = async evt => {
    evt.preventDefault();   
    console.log("FormData in SetupProfileForm.js", formData)
    setFormData(INITIAL_STATE);
   
    // async function createBout() {

        // try {
      
        //   // return { success: true };
        // //   return bout
        // } catch (errors) {
        //   console.error("Get Bouts failed", errors);
        //   return { success: false, errors };
        // }
 
    // console.log("update!!!!!:", update)
    // let result = await update(formData);

    //   setValid(true)
    let result = await FastApi.addBout(formData);
    if(result) {
      navigate('/bouts')

    } else {
      // let message = result.errors[0]
      let message = result
      // setErrorMessage(message)
      // setInvalid(true)
    }
   }

  /** Update local state with current state of input element */

  const handleChange = evt => {
    console.log('handleChange is running')

    const { name, value }= evt.target;

    setFormData(fData => ({
      ...fData,
      [name]: value,
      
    }));
    console.log("formData in BoutForm:", formData)
  };

  /** toggle dropdown */

// const toggle = () => setDropdownOpen((prevState) => !prevState);

  /** render form */

  return (
    <section className="col-md-4 BoutForm" style={{marginTop: "150px"}}>
        <Card>
            <CardTitle className="BoutForm-CardTitle">
            {/* { !user && ( <h1>Create a Profile</h1> )}
            { user && (<h1>{user.username}'s Profile</h1>)} */}
            <h1>Create a Bout</h1>
            </CardTitle>
            <CardBody>
                {/* <Form> */}
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                       
                    <Label htmlFor="date">Date: </Label>
                      <Input
                          type="date"
                          id="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          // valid={valid}
                          // invalid={invalid}
                      />

                       <Label htmlFor="time">Time: </Label>

                       <Input
                           type="time"
                           id="time"
                           name="time"
                           value={formData.time}
                           onChange={handleChange}
                           placeholder="Time"
                           required
                           // valid={valid}
                           // invalid={invalid}
                       />

                        <Label htmlFor="timeZone">Time Zone: </Label>

                        <Input
                            type="select"
                            name="timeZone"
                            className="form-control"
                            value={formData.timeZone}
                            onChange={handleChange}
                            placeholder="Time Zone"
                            id="timeZone"
  
                            // invalid={invalid}
                            >
                              <option
                              value={"Mountain Time (MT): America/Denver (Denver, Phoenix, Salt Lake City)"}
                              >
                              Mountain Time (MT): America/Denver (Denver, Phoenix, Salt Lake City)
                              </option>
                              <option
                              value={"Eastern Time (ET): America/New_York (New York City, Miami, Atlanta)"}
                              >
                              Eastern Time (ET): America/New_York (New York City, Miami, Atlanta)
                              </option>
                              <option
                              value={"Central Time (CT): America/Chicago (Chicago, Houston, New Orleans)"}
                              >
                              Central Time (CT): America/Chicago (Chicago, Houston, New Orleans)
                              </option>
                              <option
                              value={"Pacific Time (PT): America/Los_Angeles (Los Angeles, San Francisco, Seattle)"}
                              >
                              Pacific Time (PT): America/Los_Angeles (Los Angeles, San Francisco, Seattle)
                              </option>
                              <option
                              value={"Alaska Time (AKST): America/Anchorage (Anchorage)"}
                              >
                              Alaska Time (AKST): America/Anchorage (Anchorage)
                              </option>
                              <option
                              value={"Hawaii Time (HST): Pacific/Honolulu (Honolulu)"}
                              >
                              Hawaii Time (HST): Pacific/Honolulu (Honolulu)
                              </option>

              
                        </Input>

                        {/* <Select
                            name="timeZone"
                            className="form-control"
                            value={formData.timeZone}
                            onChange={(selectedOption) => setFormData({ ...formData, timeZone: selectedOption.value })}
                            id="timeZone"
  
                            options={[
                              { value: "America/Denver", label: "Mountain Time (MT): America/Denver (Denver, Phoenix, Salt Lake City)" },
                              { value: "America/Denver", label: "Mountain Time (MT): America/Denver (Denver, Phoenix, Salt Lake City)" },
                              { value: "America/New_York", label: "Eastern Time (ET): America/New_York (New York City, Miami, Atlanta)" },
                            ]}
                            >
                              </Select> */}
                              {/* <option>
                              Mountain Time (MT): America/Denver (Denver, Phoenix, Salt Lake City)
                              </option>
                              <option>
                              Eastern Time (ET): America/New_York (New York City, Miami, Atlanta)
                              </option>
                              <option>
                              Central Time (CT): America/Chicago (Chicago, Houston, New Orleans)
                              </option>
                              <option>
                              Pacific Time (PT): America/Los_Angeles (Los Angeles, San Francisco, Seattle)
                              </option>
                              <option>
                              Alaska Time (AKST): America/Anchorage (Anchorage)
                              </option>
                              <option>
                              Hawaii Time (HST): Pacific/Honolulu (Honolulu)
                              </option> */}

              
                  

                        <Label htmlFor="firstName">Theme: </Label>
                       
                        <Input
                            type="text"
                            id="theme"
                            name="theme"
                            value={formData.theme}
                            onChange={handleChange}
                            placeholder="Theme"
                            // valid={valid}
                            // invalid={invalid}
                        />

                        <Label htmlFor="about">Description: </Label>
                        <Input
                            type="textarea"
                            name="description"
                            className="form-control"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Additional information"
                            id="description"
  
                            // invalid={invalid}
                        />

                        <Label htmlFor="level">Level: </Label>
                        <Input
                            type="select"
                            name="level"
                            className="form-control"
                            value={formData.level}
                            onChange={handleChange}
                            placeholder="level"
                            id="level"
  
                            // invalid={invalid}
                            >
                              <option
                              value={"All levels"}
                              >
                                All levels
                              </option>
                              <option
                              value={"C"}
                              >
                                C
                              </option>
                              <option
                              value={"B/C"}
                              >
                                B/C
                              </option>
                              <option
                              value={"B"}
                              >
                                B
                              </option>
                              <option
                              value={"A/B"}
                              >
                                A/B
                              </option>
                              <option
                              value={"A"}
                              >
                                A
                              </option>
                              <option
                              value={"AA/A"}
                              >
                                AA/A
                              </option>
                              <option
                              value={"AA"}
                              >
                                AA
                              </option>
                            {/* </Col> */}
                            </Input>
           
                        <Label htmlFor="level">Is the bout co-ed? </Label>
                        <Input
                            type="select"
                            name="coEd"
                            className="coEd"
                            // value={formData.coEd}
                            onChange={handleChange}
                            placeholder="coEd"
                            id="coEd"
  
                            // invalid={invalid}
                            >
                              <option
                              value={"False"}
                              >
                                No
                              </option>
                              <option
                              value={"True"}
                              >
                                Yes
                              </option>
                            </Input>

                        <Label htmlFor="ruleset">Ruleset: </Label>
                        <Input
                            type="select"
                            name="ruleset"
                            className="form-control"
                            value={formData.ruleset}
                            onChange={handleChange}
                            placeholder="Ruleset"
                            id="ruleset"
  
                            // invalid={invalid}
                            >
                              <option
                              value={"WFTDA"}
                              >
                                WFTDA
                              </option>
                              <option
                              value={"USARS"}
                              >
                                USARS
                              </option>
                              <option
                              value={"Banked Track"}
                              >
                                Banked Track
                              </option>
                              <option
                              value={"Short Track"}
                              >
                                Short Track
                              </option>
                        </Input>

                        <Label htmlFor="opposingTeam">Opposing Team: </Label>
                        <Input
                            type="text"
                            name="opposingTeam"
                            className="form-control"
                            value={formData.opposingTeam}
                            onChange={handleChange}
                            placeholder="Opposing Team"
                            id="OpposingTeam"
  
                            // invalid={invalid}
                        />

                        <Label htmlFor="team">Team: </Label>
                        <Input
                            type="text"
                            name="team"
                            className="form-control"
                            value={formData.team}
                            onChange={handleChange}
                            placeholder="team"
                            id="team"
  
                            // invalid={invalid}
                        />

                        {/* <Label htmlFor="secInsNum">Secondary Insurance Number: </Label>
                        <Input
                            type="text"
                            name="secInsNum"
                            className="form-control"
                            value={formData.secInsNum}
                            onChange={handleChange}
                            placeholder="Secondary Insurance Number"
                            id="secInsNum"
  
                            // invalid={invalid}
                            // note will have to restrict this to numbers only
                        />

                        <Label htmlFor="assocLeagues">Associated Leagues: </Label>
                        <Input
                            type="text"
                            name="assocLeagues"
                            className="form-control"
                            value={formData.assocLeagues}
                            onChange={handleChange}
                            placeholder="Associated Leagues"
                            id="assocLeagues"
  
                            // invalid={invalid}
                            // note will have to restrict this to numbers only
                        /> */}

                        {/* <Label htmlFor="rulesets">Played Rulesets: </Label>
                        <Input
                            type="select"
                            name="rulesets"
                            className="form-control"
                            value={formData.rulesets}
                            onChange={handleChange}
                            placeholder="Played Rulesets"
                            id="rulesets"
                            multiple
  
                            // invalid={invalid}
                            // note will have to restrict this to numbers only
                            
                        >     
                        <option>
                        WFTDA
                      </option>
                      <option>
                        USARS
                      </option>
                      <option>
                        Banked Track 
                      </option>
                      <option>
                        Short Track 
                      </option>
                        </Input> */}


                        {/* todod need to add this in */}
                        {/* Played Rulesets
                        <Label htmlFor="playedRulesets">Played Rulesets: </Label>
                        <Input
                            type="radio"
                            name="WFTDA"
                            className="form-control"
                            // value={formData.primaryNumber}
                            // onChange={handleChange}
                            id="WFTDA"
  
                            // invalid={invalid}
                            // note will have to restrict this to numbers only
                        /> */}
                      
                            
                        {/* <FormFeedback valid>Profile updated successfully!</FormFeedback>
                        <FormFeedback tooltip>{errorMessage} </FormFeedback> */}

                    </FormGroup>

                    {/* { user && <Button >Save Changes</Button> }
                    { !user && <Button >Create Profile</Button> } */}
                    <Button >Add Bout</Button>
                </Form>
            </CardBody>
        </Card>
    </section>
  
);
};

export default BoutForm;
