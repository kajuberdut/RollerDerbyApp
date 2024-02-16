import React, { useContext, useState } from "react";
import FastApi from "../Api";
import { useNavigate } from "react-router-dom";
import "./BoutForm.css"
import { Card, CardBody, CardTitle, Form, FormGroup, Label, Input, Button } from "reactstrap";

/** 
 * Display form for creating a bout.
 */

const BoutForm = () => {

  /**  Sets Initial State of Form */

  let INITIAL_STATE_BOUT = { date: "", time: "", timeZone: "Mountain Time (MT): America/Denver (Denver, Phoenix, Salt Lake City)", theme: "", description: "", level: "All Levels", coEd: "False", ruleset: "WFTDA", floorType: "", jerseyColors: "", opposingTeam: "", team: ""};

  let INITIAL_STATE_ADDRESS = { streetAddress: "", city: "", state: "", zipCode: "" };

  /** Sets formData in state state */

  const [formDataBout, setFormDataBout] = useState(INITIAL_STATE_BOUT);
  const [formDataAddress, setFormDataAddress] = useState(INITIAL_STATE_ADDRESS);
  const navigate = useNavigate();
  
  /** Handle submit of form. */

  const handleSubmit = async evt => {
    evt.preventDefault();   

    setFormDataAddress(INITIAL_STATE_ADDRESS)
    setFormDataBout(INITIAL_STATE_BOUT)

    formDataBout.addressId = 0; 

    const formData = {bout: formDataBout, address: formDataAddress}

    try {

      let result = await FastApi.addBout(formData);

      if(result) {
        navigate('/events/bouts')
      } 

    } catch(errors) {

      return { success: false, errors };
    }
   }

  /** Update local state with current state of input element */

  const handleChange = evt => {

    const { name, value }= evt.target;

    if(name === "date" || name === "time" || name === "timeZone" || name === "theme" || name === "description" || name === "level" || name === "coEd" || name === "ruleset" || name === "floorType" || name === "jerseyColors" || name === "opposingTeam" || name === "team") {
      setFormDataBout(fData => ({
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

  /** render bout form */

  return (
    <section className="col-md-4 BoutForm" style={{marginTop: "150px"}}>
        <Card>
            <CardTitle className="BoutForm-CardTitle">
              <h1>Create a Bout</h1>
            </CardTitle>
            <CardBody>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                       
                    <Label htmlFor="date">Date: </Label>
                      <Input
                          type="date"
                          id="date"
                          name="date"
                          value={formDataBout.date}
                          onChange={handleChange}
                          required
                      />

                       <Label htmlFor="time">Time: </Label>

                       <Input
                           type="time"
                           id="time"
                           name="time"
                           value={formDataBout.time}
                           onChange={handleChange}
                           placeholder="Time"
                           required
                       />

                        <Label htmlFor="timeZone">Time Zone: </Label>

                        <Input
                            type="select"
                            name="timeZone"
                            className="form-control"
                            value={formDataBout.timeZone}
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
                        value={formDataAddress.state}
                        maxLength={2}
                        required
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
                  
                        <Label htmlFor="theme">Theme or Title: </Label>
                       
                        <Input
                            type="text"
                            id="theme"
                            name="theme"
                            value={formDataBout.theme}
                            onChange={handleChange}
                            placeholder="Theme"
                            required
                            maxLength={50}
                        />

                        <Label htmlFor="description">Description: </Label>
                        <Input
                            type="textarea"
                            name="description"
                            className="form-control"
                            value={formDataBout.description}
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
                            value={formDataBout.level}
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
                          </Input> 
           
                        <Label htmlFor="coEd">Is the bout open to all skaters? </Label>
                        <Input
                            type="select"
                            name="coEd"
                            className="coEd"
                            onChange={handleChange}
                            placeholder="open"
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
                            value={formDataBout.ruleset}
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
                           value={formDataBout.floorType}
                           onChange={handleChange}
                           placeholder="Floor Type"
                           maxLength={50}
                       />

                      <Label htmlFor="jerseyColors">Jersey Colors: </Label>
                       
                       <Input
                           type="text"
                           id="jerseyColors"
                           name="jerseyColors"
                           value={formDataBout.jerseyColors}
                           onChange={handleChange}
                           placeholder="Both Teams Jersey Colors"
                           maxLength={50}
                       />

                        <Label htmlFor="opposingTeam">Opposing Team: </Label>
                        <Input
                            type="text"
                            name="opposingTeam"
                            className="form-control"
                            value={formDataBout.opposingTeam}
                            onChange={handleChange}
                            placeholder="Opposing Team"
                            id="OpposingTeam"
                            required
                            maxLength={40}
                        />

                        <Label htmlFor="team">Team: </Label>
                        <Input
                            type="text"
                            name="team"
                            className="form-control"
                            value={formDataBout.team}
                            onChange={handleChange}
                            placeholder="team"
                            id="team"
                            required
                            maxLength={40}
                        /> 

                    </FormGroup>

                    <Button >Add Bout</Button>
                </Form>
            </CardBody>
        </Card>
    </section>
  
  );
};

export default BoutForm;
