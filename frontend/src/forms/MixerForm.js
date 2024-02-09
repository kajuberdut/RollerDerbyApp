import React, { useState } from "react";
import FastApi from "../Api";
import { useNavigate } from "react-router-dom";
import "./MixerForm.css"
import { Card, CardBody, CardTitle, Form, FormGroup, Label, Input, Button } from "reactstrap";


/** 
 * Displayform for creating a mixer.
 */

const MixerForm = () => {

  const navigate = useNavigate();

  /** Sets initial state of form   */

  let INITIAL_STATE = { date: "", time: "", timeZone: "Mountain Time (MT): America/Denver (Denver, Phoenix, Salt Lake City)", theme: "", description: "", level: "All Levels", coEd: "False", ruleset: "WFTDA", floorType: "", jerseyColors: "", signupLink: ""};

  let INITIAL_STATE_ADDRESS = { streetAddress: "", city: "", state: "", zipCode: "" };

  /** Sets formData in initial state */

  const [formDataMixer, setFormDataMixer] = useState(INITIAL_STATE);
  const [formDataAddress, setFormDataAddress] = useState(INITIAL_STATE_ADDRESS);
  
  /** Handle Submit by either creating user, updating profile, or returning an error message */

  const handleSubmit = async evt => {
    evt.preventDefault();   

    setFormDataAddress(INITIAL_STATE_ADDRESS)
    setFormDataMixer(INITIAL_STATE);
   
    formDataMixer.addressId = 0

    const formData = {mixer: formDataMixer, address: formDataAddress}
    try {
      let result = await FastApi.addMixer(formData);
      if(result) {
        navigate('/events/mixers')
      }
    } catch(errors) {
      return { success: false, errors };
    }

   }

  /** Update local state with current state of input element */

  const handleChange = evt => {
    console.log('handleChange is running')

    const { name, value }= evt.target;

    if(name === "date" || name === "time" || name === "timeZone" || name === "theme" || name === "description" || name === "level" || name === "coEd" || name === "ruleset" || name === "floorType" || name === "jerseyColors" || name === "signupLink") {
      setFormDataMixer(fData => ({
        ...fData,
        [name]: value,
        
      }));
      }

    if(name === "streetAddress" || name === "city" || name === "state" || name === "zipCode") {
      setFormDataAddress(fData => ({
        ...fData,
        [name]: value,
        
      }));
    }
  };

  /** render mixer form */

  return (
    <section className="col-md-4 MixerForm" style={{marginTop: "150px"}}>
        <Card style={{minWidth: '400px'}}>
            <CardTitle className="MixerForm-CardTitle">
            <h1>Create a Mixer</h1>
            </CardTitle>
            <CardBody>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                       
                    <Label htmlFor="date">Date: </Label>
                      <Input
                          type="date"
                          id="date"
                          name="date"
                          value={formDataMixer.date}
                          onChange={handleChange}
                          required
                      />

                       <Label htmlFor="time">Time: </Label>

                       <Input
                           type="time"
                           id="time"
                           name="time"
                           value={formDataMixer.time}
                           onChange={handleChange}
                           placeholder="Time"
                           required
                       />

                        <Label htmlFor="timeZone">Time Zone: </Label>

                        <Input
                            type="select"
                            name="timeZone"
                            className="form-control"
                            value={formDataMixer.timeZone}
                            onChange={handleChange}
                            placeholder="Time Zone"
                            id="timeZone"
                            required
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

                      <Label htmlFor="streetAddress">Street Address: </Label>
                       
                       <Input
                           type="text"
                           id="streetAddress"
                           name="streetAddress"
                           value={formDataAddress.streetAddress}
                           onChange={handleChange}
                           placeholder="Street Address"
                           required
                           maxLength={40}
                       />

                    <Label htmlFor="city">City: </Label>
                       
                       <Input
                           type="text"
                           id="city"
                           name="city"
                           value={formDataAddress.city}
                           onChange={handleChange}
                           placeholder="City"
                           required
                           maxLength={28}
                       />

                      <Label htmlFor="state">State: </Label>

                      <Input
                        type="select"
                        placeholder="State"
                        onChange={handleChange}
                        id="state" 
                        name="state"
                        // className='SearchBarInput'
                        value={formDataAddress.state}
                        maxLength={2}
                        >
                        <option value="">State</option>
                        <option value="AL">AL</option>
                        <option value="AK">AK</option>
                        <option value="AZ">AZ</option>
                        <option value="AR">AR</option>
                        <option value="CA">CA</option>
                        <option value="CO">CO</option>
                        <option value="CT">CT</option>
                        <option value="DE">DE</option>
                        <option value="DC">DC</option>
                        <option value="FL">FL</option>
                        <option value="GA">GA</option>
                        <option value="HI">HI</option>
                        <option value="ID">ID</option>
                        <option value="IL">IL</option>
                        <option value="IN">IN</option>
                        <option value="IA">IA</option>
                        <option value="KS">KS</option>
                        <option value="KY">KY</option>
                        <option value="LA">LA</option>
                        <option value="ME">ME</option>
                        <option value="MD">MD</option>
                        <option value="MA">MA</option>
                        <option value="MI">MI</option>
                        <option value="MN">MN</option>
                        <option value="MS">MS</option>
                        <option value="MO">MO</option>
                        <option value="MT">MT</option>
                        <option value="NE">NE</option>
                        <option value="NV">NV</option>
                        <option value="NH">NH</option>
                        <option value="NJ">NJ</option>
                        <option value="NM">NM</option>
                        <option value="NY">NY</option>
                        <option value="NC">NC</option>
                        <option value="ND">ND</option>
                        <option value="OH">OH</option>
                        <option value="OK">OK</option>
                        <option value="OR">OR</option>
                        <option value="PA">PA</option>
                        <option value="RI">RI</option>
                        <option value="SC">SC</option>
                        <option value="SD">SD</option>
                        <option value="TN">TN</option>
                        <option value="TX">TX</option>
                        <option value="UT">UT</option>
                        <option value="VT">VT</option>
                        <option value="VA">VA</option>
                        <option value="WA">WA</option>
                        <option value="WV">WV</option>
                        <option value="WI">WI</option>
                        <option value="WY">WY</option>
                        </Input>

                      <Label htmlFor="zipCode">Zip Code: </Label>
                       
                       <Input
                           type="number"
                           id="zipCode"
                           name="zipCode"
                           value={formDataAddress.zipCode}
                           onChange={handleChange}
                           placeholder="Zip Code"
                           required
                           maxLength={5}
                       />      
              
                  

                        <Label htmlFor="theme">Theme: </Label>
                       
                        <Input
                            type="text"
                            id="theme"
                            name="theme"
                            value={formDataMixer.theme}
                            onChange={handleChange}
                            placeholder="Theme or Title"
                            required
                            maxLength={50}
                        />

                        <Label htmlFor="about">Description: </Label>
                        <Input
                            type="textarea"
                            name="description"
                            className="form-control"
                            value={formDataMixer.description}
                            onChange={handleChange}
                            placeholder="Additional information"
                            id="description"
                            maxLength={300}
                        />

                        <Label htmlFor="level">Level: </Label>
                        <Input
                            type="select"
                            name="level"
                            className="form-control"
                            value={formDataMixer.level}
                            onChange={handleChange}
                            placeholder="level"
                            id="level"
                            required

                            >
                              <option
                              value={"All Levels"}
                              >
                                All Levels
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
           
                        <Label htmlFor="level">Is the mixer co-ed? </Label>
                        <Input
                            type="select"
                            name="coEd"
                            className="coEd"
                            onChange={handleChange}
                            placeholder="coEd"
                            id="coEd"
                            required
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
                            value={formDataMixer.ruleset}
                            onChange={handleChange}
                            placeholder="Ruleset"
                            id="ruleset"
                            required
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

                        <Label htmlFor="floorType">Type of Floor: </Label>
                       
                          <Input
                              type="text"
                              id="floorType"
                              name="floorType"
                              value={formDataMixer.floorType}
                              onChange={handleChange}
                              placeholder="Floor Type"
                              maxLength={50}
                          />

                      <Label htmlFor="jerseyColors">Jersey Colors: </Label>
                       
                       <Input
                           type="text"
                           id="jerseyColors"
                           name="jerseyColors"
                           value={formDataMixer.jerseyColors}
                           onChange={handleChange}
                           placeholder="Both Teams Jersey Colors"
                           required
                           maxLength={40}
                       />

                        <Label htmlFor="opposingTeam">Signup Link: </Label>
                        <Input
                            type="text"
                            name="signupLink"
                            className="form-control"
                            value={formDataMixer.signupLink}
                            onChange={handleChange}
                            placeholder="Signup Link"
                            id="signupLink"
                            maxLength={40}
  
                        />

                    </FormGroup>
                  <Button >Add Mixer</Button>
                </Form>
            </CardBody>
        </Card>
    </section> 
  );
};

export default MixerForm;
