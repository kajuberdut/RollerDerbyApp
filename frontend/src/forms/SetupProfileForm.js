import React, { useEffect, useState } from "react";
import FastApi from "../Api";
import { useNavigate } from "react-router-dom";
import "./SetupProfileForm.css"
import { Card, CardBody, CardTitle, Form, FormGroup, Label, Input, Button } from "reactstrap";

/** 
 * Display setup profile form
 */

function SetupProfileForm({ update, getUser}) {

  /** Retrieve user from local storage */

  const user = JSON.parse(localStorage.getItem('user'));

  const navigate = useNavigate();
  const [formRulesets, setFormRulesets] = useState([]);
  const [formPositions, setFormPositions] = useState([]);
  const [displayRulesets, setDisplayRulesets] = useState([]);
  const [displayPositions, setDisplayPositions] = useState([]);

  useEffect(() => {
    if(!user) {
      navigate('/')
    }
  });

  /** Sets initial state of form   */

  let INITIAL_STATE = { username: user.username, city: user.city, state: user.state,  about: user.about, primNum: user.primaryNumber, level: user.level, assocLeagues: user.associatedLeagues, facebookName: user.facebookName, };

  /** Sets formData in initial state */

  const [formData, setFormData] = useState(INITIAL_STATE);

  function format(formData) {

      let userData = {
        username: formData.username, image: formData.image, facebookName: formData.facebookName, about: formData.about, primaryNumber: formData.primNum, level: formData.level, positionId: 0, locationId: 0, associatedLeagues: formData.assocLeagues
      }

       /** Delete all null fields */

      for (const key in userData) {
        if (userData[key] === null) {
          delete userData[key];
        }
      }      

      let data = {
        user: userData, 
        location: {
          city: formData.city || "", 
          state: formData.state || ""
        }
    
      }
      data["ruleset"] = formRulesets;
      data["position"] = formPositions;
      
      return data;
  }

  /** Handle Submit by either creating user, updating profile, or returning an error message */
  const handleSubmit = async evt => {
    evt.preventDefault();   
    setFormData(INITIAL_STATE);
   
    let formattedData = format(formData);
    try{
      let updateProfile = await FastApi.updateUserProfile(user.userId, formattedData);
    
      if(updateProfile) {
        await getUser();
        navigate('/profile')
      } 

    } catch(errors) {
      return { success: false, errors };
    }
  }

  /** Update local state with current state of input element */

  const handleRulesetsChange = evt => {

      setFormRulesets((prevRulesets) => {
        const newRulesets = Array.from(evt.target.selectedOptions)
          .map((option) => ({ rulesetId: 0, name: option.value }))
          .filter((ruleset) => !prevRulesets.some((r) => r.name === ruleset.name)); // Filter for unique names
        return [...prevRulesets, ...newRulesets];
      });

      setDisplayRulesets((prevRulesets) => {
        const newRulesets = Array.from(evt.target.selectedOptions)
          .map((option) => option.value)
          .filter((rulesetName) => !prevRulesets.includes(rulesetName)); // Filter for unique names
        return [...prevRulesets, ...newRulesets];
      });

  };

  /** Update local state with current state of input element */

  const handlePositionsChange = evt => {

    setFormPositions((prevPositions) => {
      const newPositions = Array.from(evt.target.selectedOptions)
        .map((option) => ({ positionId: 0, position: option.value }))
        .filter((position) => !prevPositions.includes((p) => p.name === position.name));

      return [...prevPositions, ...newPositions];
    });

    setDisplayPositions((prevPositions) => {
      const newPositions = Array.from(evt.target.selectedOptions)
        .map((option) => option.value)
        .filter((positionName) => !prevPositions.includes(positionName)); 
      return [...prevPositions, ...newPositions];
    });

  };

  /** Update local state with current state of input element */

  const handleChange = evt => {

    const { name, value }= evt.target;

    if (name === "image") {
      const imageFile = evt.target.files[0];

      const reader = new FileReader()

      reader.onload = () => {
        const imageDataUrl = reader.result; // Get the base64-encoded data URL

        setFormData(fData => ({
          ...fData,
          image: imageDataUrl, // Store the data URL in the form data
        }));
      };

      reader.readAsDataURL(imageFile)

    } else {

    setFormData(fData => ({
        ...fData,
        [name]: value,
      }));
    }

  }

  /** render setup profile form */

  return (

    <section className="col-md-4 SetupProfileForm" style={{marginTop: "150px"}}>
        <Card style={{minWidth: '400px'}}>
            <CardTitle className="SetupProfileForm-CardTitle">
            <h1>Setup Public Profile</h1>
            </CardTitle>
            <CardBody>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>

                      <Label htmlFor="username">Derby Name: </Label>
                      <Input
                          type="text"
                          id="username"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                          placeholder="Derby Name"
                          required
                      />

                      <Label htmlFor="image">Profile Image: </Label>
                      <Input
                          type="file"
                          id="image"
                          name="image"
                          onChange={handleChange}
                          accept="image/png image/jpg"
                      /> 

                      <Label htmlFor="city">City: </Label>
                      <Input
                           type="text"
                           id="city"
                           name="city"
                           value={formData.city}
                           onChange={handleChange}
                           placeholder="City"
                           // valid={valid}
                           // invalid={invalid}
                      />

                      <Label htmlFor="state">State: </Label>
                      <Input
                        type="select"
                        placeholder="State"
                        onChange={handleChange}
                        id="state" 
                        name="state"
                        value={formData.state}
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


                      <Label htmlFor="about">About: </Label>
                      <Input
                          type="textarea"
                          name="about"
                          className="form-control"
                          value={formData.about}
                          onChange={handleChange}
                          placeholder="Write your story..."
                          id="about"
                      />

                      <Label htmlFor="primNum">Primary Number: </Label>
                      <Input
                          type="number"
                          name="primNum"
                          className="form-control"
                          value={formData.primNum}
                          onChange={handleChange}
                          placeholder="Primary Number"
                          id="primaryNumber"
                      />
      
                      <Label htmlFor="level">Skill Level: </Label>
                      <Input
                          type="select"
                          name="level"
                          className="form-control"
                          value={formData.level}
                          onChange={handleChange}
                          placeholder="level"
                          id="level"
                      >
                            <option value={""}>
                              Prefer not to say.
                            </option>
                            <option value={"C"}>
                              C
                            </option>
                            <option value={"B"}>
                              B
                            </option>
                            <option value={"A"}>
                              A
                            </option>
                            <option value={"AA"}>
                              AA
                            </option>
                          </Input>

                        <Label htmlFor="assocLeagues">Associated Leagues: </Label>
                        <Input
                            type="text"
                            name="assocLeagues"
                            className="form-control"
                            value={formData.assocLeagues}
                            onChange={handleChange}
                            placeholder="Associated Leagues"
                            id="assocLeagues"
                        />

                        <Label htmlFor="rulesets">Positions: </Label>
                        <Input
                            type="select"
                            name="positions"
                            className="form-control"
                            value={formData.positions}
                            onChange={handlePositionsChange}
                            placeholder="Played Positions"
                            id="positions"
                            multiple  
                        >     
                        <option value={"jammer"}>
                          jammer
                        </option>
                        <option value={"pivot"}>
                          pivot
                        </option>
                        <option value={"blocker"}>
                          blocker
                        </option>
                        </Input>
                        <p><b>Selected positions: {displayPositions.join(', ')}</b></p>   

                        <Label htmlFor="rulesets">Played Rulesets: </Label>
                        <Input
                            type="select"
                            name="rulesets"
                            className="form-control"
                            value={formData.rulesets}
                            onChange={handleRulesetsChange}
                            placeholder="Played Rulesets"
                            id="rulesets"
                            multiple        
                        >     
                        <option value={"WFTDA"}>
                        WFTDA
                      </option>
                      <option value={"USARS"}>
                        USARS
                      </option>
                      <option value={"banked track"}>
                        Banked Track 
                      </option>
                      <option value={"short track"}>
                        Short Track 
                      </option>
                        </Input>
                        <p><b>Selected rulesets: {displayRulesets.join(', ')}</b></p>                     
                            
                        <Label htmlFor="facebookName">Facebook Name: </Label>
                        <Input
                            type="text"
                            name="facebookName"
                            className="form-control"
                            value={formData.facebookName}
                            onChange={handleChange}
                            placeholder="Facebook Name"
                            id="facebookName"
                        />      
                    </FormGroup>
                    <Button >Save Profile</Button>
                </Form>
            </CardBody>
        </Card>
    </section>
  );
};

export default SetupProfileForm;
