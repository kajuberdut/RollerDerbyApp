import React, { useContext, useEffect, useState } from "react";
import FastApi from "../Api";
import { useNavigate } from "react-router-dom";

import "./SetupProfileForm.css"
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

function SetupProfileForm({ update, getUser}) {

/** Retrieve user from local storage */

const user = JSON.parse(localStorage.getItem('user'));
// console.log("user !!! in setup profile form", user)

 /** Set user, history and initial state and set valid, invalid, and error message in state */
//   const history = useHistory();
//   const [ valid, setValid ] = useState(false);
//   const [ invalid, setInvalid ] = useState(false);
//   const [errorMessage, setErrorMessage] = useState([]);
// const [file, setFile] = useState<File | undefined>();
// const [preview, setPreview] = useState<string | undefined>();
const navigate = useNavigate();
const [primInsNumDisabled, setPrimInsNumDisabled] = useState(true);
const [secInsNumDisabled, setSecInsNumDisabled] = useState(true);
const [formRulesets, setFormRulesets] = useState([]);
const [formPositions, setFormPositions] = useState([]);
const [displayRulesets, setDisplayRulesets] = useState([]);
const [displayPositions, setDisplayPositions] = useState([]);
const [primIns, setPrimIns] = useState([]);
const [secIns, setSecIns] = useState([]);

useEffect(() => {
  if(!user) {
    navigate('/')
  }
});

console.log("USER IN EDIT PROFILE PAGE", user)

let INITIAL_STATE = { username: user.username, city: user.city, state: user.state,  about: user.about, primNum: user.primaryNumber, level: user.level, assocLeagues: user.associatedLeagues, facebookName: user.facebookName, };

  /** Sets formData in initial state */

  const [formData, setFormData] = useState(INITIAL_STATE);

  function format(formData) {
    console.log("formData.image:", formData.image)
    console.log("formData.city:", formData.city)

      let userData = {
        username: formData.username, image: formData.image, facebookName: formData.facebookName, about: formData.about, primaryNumber: formData.primNum, level: formData.level, positionId: 0, locationId: 0, associatedLeagues: formData.assocLeagues
      }

       /** Delete all null fields */

      for (const key in userData) {
        if (userData[key] === null) {
          delete userData[key];
        }
      }
      console.log("!!!!!!! userData:", userData);
      

      let data = {
        user: userData, 
        location: {
          city: formData.city || "", 
          state: formData.state || ""
        }
    
      }
      data["ruleset"] = formRulesets;
      data["position"] = formPositions;
      console.log("***** data:", data);
      
      return data;
  }

  // debugging purposes only 

    useEffect(() => {
      console.log("formRulesets:", formRulesets);
      console.log("formPositions:", formPositions);
  }, [formRulesets, formPositions]);

  /** Handle Submit by either creating user, updating profile, or returning an error message */
  const handleSubmit = async evt => {
    evt.preventDefault();   
    console.log("FormData in SetupProfileForm.js", formData)
    setFormData(INITIAL_STATE);
   
    let formattedData = format(formData);

    let updateProfile = await FastApi.updateUserProfile(user.userId, formattedData);
  
    if(updateProfile) {
      await getUser();
      navigate('/profile')

    } else {

      console.log("fake form has failed to submit")
    }
   }

  /** Update local state with current state of input element */

  const handleRulesetsChange = evt => {
    console.log("you are hitting handleRulesetsChange")

// ! note should be able to refactor this so that I am only using one state and then altering the data from the state in the new data and not submitting to state 
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

const handlePositionsChange = evt => {
  console.log("you are hitting handlePositionsChange")

  setFormPositions((prevPositions) => {
    const newPositions = Array.from(evt.target.selectedOptions)
      .map((option) => ({ positionId: 0, position: option.value }))
      .filter((position) => !prevPositions.includes((p) => p.name === position.name));

    return [...prevPositions, ...newPositions];
  });

  setDisplayPositions((prevPositions) => {
    const newPositions = Array.from(evt.target.selectedOptions)
      .map((option) => option.value)
      .filter((positionName) => !prevPositions.includes(positionName)); // Filter for unique names
    return [...prevPositions, ...newPositions];
  });

};

const handleChange = evt => {
  console.log('handleChange is running')
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

  console.log("formData in setupProfileForm:", formData)
}

  /** toggle dropdown */

// const toggle = () => setDropdownOpen((prevState) => !prevState);

  /** render form */

  return (

    <section className="col-md-4 SetupProfileForm" style={{marginTop: "150px"}}>
        <Card>
            <CardTitle className="SetupProfileForm-CardTitle">
            {/* { !user && ( <h1>Create a Profile</h1> )}
            { user && (<h1>{user.username}'s Profile</h1>)} */}
            <h1>Setup Public Profile</h1>
            </CardTitle>
            <CardBody>
                {/* <Form> */}
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
                           // valid={valid}
                           // invalid={invalid}
                       />

                      <Label htmlFor="image">Profile Image: </Label>
                        <Input
                            type="file"
                            id="image"
                            name="image"
                            // value={formData.image}
                            onChange={handleChange}
                            accept="image/png image/jpg"
                            // valid={valid}
                            // invalid={invalid}
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
                       
                       {/* <Input
                           type="text"
                           id="state"
                           name="state"
                           value={formDataAddress.state}
                           onChange={handleChange}
                           placeholder="State"
                           // valid={valid}
                           // invalid={invalid}
                       />         */}

                      <Input
                        type="select"
                        placeholder="State"
                        onChange={handleChange}
                        id="state" 
                        name="state"
                        // className='SearchBarInput'
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
  
                            // invalid={invalid}
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
  
                            // invalid={invalid}
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
  
                            // invalid={invalid}
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
                            {/* </Col> */}
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
  
                            // invalid={invalid}
                            // note will have to restrict this to numbers only
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
  
                            // invalid={invalid}

                        />      
                        {/* <FormFeedback valid>Profile updated successfully!</FormFeedback>
                        <FormFeedback tooltip>{errorMessage} </FormFeedback> */}

                    </FormGroup>

                    {/* { user && <Button >Save Changes</Button> }
                    { !user && <Button >Create Profile</Button> } */}
                    <Button >Save Profile</Button>
                </Form>
            </CardBody>
        </Card>
    </section>
  
);
};

export default SetupProfileForm;
