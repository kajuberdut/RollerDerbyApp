import React, { useContext, useEffect, useState } from "react";
import FastApi from "../Api";
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import UserContext from "../multiUse/UserContext";

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

// const SetupProfileForm = ({update}) => {
function SetupProfileForm({update}) {

  /** Set user, history and initial state and set valid, invalid, and error message in state */

  // ! note for some reason this is not allowing us to destructure user or setUSer 
// const { user, setUser } = useContext(UserContext);
// const { user } = useContext(UserContext);
// ! now this isn't working either 
const userCont = useContext(UserContext)
console.log("userCont !!! in setup profile form", userCont)
let user  = userCont.user
console.log("user !!! in setup profile form", user)
// console.log("user.user", user.user)

//   const history = useHistory();
//   const [ valid, setValid ] = useState(false);
//   const [ invalid, setInvalid ] = useState(false);
//   const [errorMessage, setErrorMessage] = useState([]);
// const [file, setFile] = useState<File | undefined>();
// const [preview, setPreview] = useState<string | undefined>();
const navigate = useNavigate();

// let user = "SockHer Blue"  

useEffect(() => {
  if (user) {
      // Perform actions when user becomes available
  }
}, [user]);

  /** 
   * Sets Initial State of Form
  */

if(!user) {
  navigate('/')
}

let INITIAL_STATE = { username: user.username, firstName: user.firstName, lastName: user.lastName, email: user.Email,  facebookName: user.facebookName, about: user.about, primNum: user.primNum, secNum: user.secNum, level: user.level, primIns: user.primIns, primInsNum: user.primInsNum, secIns: user.secIns, secInsNum: user.secInsNum, assocLeagues: user.assocLeagues, ruleset: []};

  /** Sets formData in initial state */
  const [formData, setFormData] = useState(INITIAL_STATE);
  
  /** Handle Submit by either creating user, updating profile, or returning an error message */

  const handleSubmit = async evt => {
    evt.preventDefault();   
    console.log("FormData in SetupProfileForm.js", formData)
    setFormData(INITIAL_STATE);
   
    console.log("update!!!!!:", update)
    let result = await update(formData);

    //   setValid(true)
    if(result) {
      navigate('/profile')

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
    console.log("formData in setupProfileForm:", formData)
  };

  /** toggle dropdown */

// const toggle = () => setDropdownOpen((prevState) => !prevState);

  /** render form */

  return (
    <section className="col-md-4 SetupProfileForm" style={{marginTop: "150px"}}>
        <Card>
            <CardTitle className="SetupProfileForm-CardTitle">
            {/* { !user && ( <h1>Create a Profile</h1> )}
            { user && (<h1>{user.username}'s Profile</h1>)} */}
            <h1>Additional Information</h1>
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
                          value={formData.image}
                          onChange={handleChange}
                          accept="image/png image/jpg"
                          // valid={valid}
                          // invalid={invalid}
                      />

                        <Label htmlFor="firstName">First Name: </Label>
                       
                        <Input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="First Name"
                            // valid={valid}
                            // invalid={invalid}
                        />
                        
           
                        <Label htmlFor="lastName">Last Name: </Label>
                        <Input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Last Name"
                            // valid={valid}
                            // invalid={invalid}
                        />

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
                        {/* </> */}
                        {/* )} */}

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

                        <Label htmlFor="secNum">Secondary Number: </Label>
                        <Input
                            type="number"
                            name="secNum"
                            className="form-control"
                            value={formData.secNum}
                            onChange={handleChange}
                            placeholder="Secondary Number"
                            id="secondaryNumber"
  
                            // invalid={invalid}
                            // note will have to restrict this to numbers only
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
                        /> */}

      
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
                              <option>
                                C
                              </option>
                              <option>
                                B
                              </option>
                              <option>
                                A
                              </option>
                              <option>
                                AA
                              </option>
                            {/* </Col> */}
                            </Input>

                        <Label htmlFor="primIns">Primary Insurance: </Label>
                        <Input
                            type="select"
                            name="primIns"
                            className="form-control"
                            value={formData.primIns}
                            onChange={handleChange}
                            placeholder="Primary Insurance"
                            id="primaryInsurance"
  
                            // invalid={invalid}
                            >
                              <option>
                                WFTDA
                              </option>
                              <option>
                                USARS
                              </option>
                              <option>
                                Other
                              </option>
              
                        </Input>

                        <Label htmlFor="primInsNum">Primary Insurance Number: </Label>
                        <Input
                            type="text"
                            name="primInsNum"
                            className="form-control"
                            value={formData.primInsNum}
                            onChange={handleChange}
                            placeholder="Primary Insurance Number"
                            id="primInsNum"
  
                            // invalid={invalid}
                            // note will have to restrict this to numbers only
                        />

                        <Label htmlFor="secIns">Secondary Insurance: </Label>
                        <Input
                            type="select"
                            name="secIns"
                            className="form-control"
                            value={formData.secIns}
                            onChange={handleChange}
                            placeholder="Secondary Insurance"
                            id="secondaryInsurance"
  
                            // invalid={invalid}
                            >
                              <option>
                                WFTDA
                              </option>
                              <option>
                                USARS
                              </option>
                              <option>
                                Other
                              </option>
                        </Input>

                        <Label htmlFor="secInsNum">Secondary Insurance Number: </Label>
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
                        />

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
                    <Button >Save Profile</Button>
                </Form>
            </CardBody>
        </Card>
    </section>
  
);
};

export default SetupProfileForm;
