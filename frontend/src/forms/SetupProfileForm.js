import React, { useContext, useState } from "react";
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// import UserContext from "../../repeated/UserContext";
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
    Col,
    FormFeedback,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
  } from "reactstrap";
  import PropTypes from 'prop-types';

/** 
 * Form for creating a user or updating a logged in user.
 */

const SetupProfileForm = ({signup, update}) => {

  /** Set user, history and initial state and set valid, invalid, and error message in state */

//   const { user, setUser } = useContext(UserContext);
//   const history = useHistory();
//   const [ valid, setValid ] = useState(false);
//   const [ invalid, setInvalid ] = useState(false);
//   const [errorMessage, setErrorMessage] = useState([]);
const [dropdownOpen, setDropdownOpen] = useState(false);

//   let INITIAL_STATE; 

 
  /** If user, set initial state and the then set the formdata as initial state. 
   * Sets info for user so that info can be updated. 
   * Gives value to InitialState
  */

//   if(user) {
//     INITIAL_STATE = { username: user.username, firstName: user.firstName, lastName: user.lastName, email: user.email };

//   } else {
//     INITIAL_STATE = { username: "", firstName: "", lastName: "", email: "" };
//   }

  /** Sets formData in initial state */
//   const [formData, setFormData] = useState(INITIAL_STATE);
  
  /** Handle Submit by either creating user, updating profile, or returning an error message */

//   const handleSubmit = async evt => {
//     evt.preventDefault();   
//     setFormData(INITIAL_STATE);

     /** If user update profile*/

    // if(user) {
    //   const username = user.username;
    //   const email = formData.email; 
    //   const firstName = formData.firstName
    //   const lastName = formData.lastName
    
    //   delete formData.username;
    //   delete formData.email; 

    //   update(formData, username);

    //   let profileData = {
    //     email: email, 
    //     username: username,
    //     isAdmin: user.isAdmin,
    //     firstName: firstName,
    //     lastName: lastName,
    //     applications: user.applications
    //   }
    //     console.log("profileData:", profileData)
    //     setUser(profileData)
    //     console.log("USER!!!!!:", user)
    //     setFormData(profileData);
    //     // todo: this is working but you need to relook at it as I think you made it more complicated than needed. 

    //   setValid(true)
   
    // }

    /** If no user create profile or return error message*/

//     if(!user) {
//       let result = await signup(formData);

//       if(result.success) {
//         history.push("/")

//       } else {
//         let message = result.errors[0]
//         setErrorMessage(message)
//         setInvalid(true)
//       }
//     }

//   };


  /** Update local state with current state of input element */

//   const handleChange = evt => {
//     console.log('handleChange is running')
//     const { name, value }= evt.target;

//     setFormData(fData => ({
//       ...fData,
//       [name]: value,
//     }));

//   };

  /** toggle dropdown */

const toggle = () => setDropdownOpen((prevState) => !prevState);

  /** render form */

  return (
    <section className="col-md-4 ProfileForm">
        <Card>
            <CardTitle className="ProfileForm-CardTitle">
            {/* { !user && ( <h1>Create a Profile</h1> )}
            { user && (<h1>{user.username}'s Profile</h1>)} */}
            <h1>Additional Information</h1>
            </CardTitle>
            <CardBody>
                <Form>
                {/* <Form onSubmit={handleSubmit}> */}
                    <FormGroup>
                        <Label htmlFor="firstName">First Name: </Label>
                       
                        <Input
                            type="firstName"
                            id="firstName"
                            name="firstName"
                            // value={formData.firstName}
                            // onChange={handleChange}
                            placeholder="First Name"
                            required
                            // valid={valid}
                            // invalid={invalid}
                        />
                        
           
                        <Label htmlFor="lastName">Last Name: </Label>
                        <Input
                            type="lastName"
                            id="lastName"
                            name="lastName"
                            // value={formData.lastName}
                            // onChange={handleChange}
                            placeholder="Last Name"
                            required
                            // valid={valid}
                            // invalid={invalid}
                        />

                        <Label htmlFor="facebookName">Facebook Name: </Label>
                        <Input
                            type="facebookName"
                            name="facebookName"
                            className="form-control"
                            // value={formData.facebookName}
                            // onChange={handleChange}
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
                            // value={formData.about}
                            // onChange={handleChange}
                            placeholder="Write your story..."
                            id="about"
  
                            // invalid={invalid}
                        />

                        <Label htmlFor="primaryNumber">Primary Number: </Label>
                        <Input
                            type="primaryNumber"
                            name="primaryNumber"
                            className="form-control"
                            // value={formData.primaryNumber}
                            // onChange={handleChange}
                            placeholder="Primary Number"
                            id="primaryNumber"
  
                            // invalid={invalid}
                        />

                        <Label htmlFor="primaryNumber">Primary Number: </Label>
                        <Input
                            type="number"
                            name="secondaryNumber"
                            className="form-control"
                            // value={formData.primaryNumber}
                            // onChange={handleChange}
                            placeholder="Secondary Number"
                            id="secondaryNumber"
  
                            // invalid={invalid}
                            // note will have to restrict this to numbers only
                        />

                        <Label htmlFor="secondaryNumber">Secondary Number: </Label>
                        <Input
                            type="number"
                            name="secondaryNumber"
                            className="form-control"
                            // value={formData.primaryNumber}
                            // onChange={handleChange}
                            placeholder="Secondary Number"
                            id="secondaryNumber"
  
                            // invalid={invalid}
                            // note will have to restrict this to numbers only
                        />

      
                        <Label htmlFor="level">Skill Level: </Label>
                        <Input
                            type="select"
                            name="level"
                            className="form-control"
                            // value={formData.level}
                            // onChange={handleChange}
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

                        <Label htmlFor="insurancePrimary">Insurance Primary: </Label>
                        <Input
                            type="select"
                            name="insurancePrimary"
                            className="form-control"
                            // value={formData.level}
                            // onChange={handleChange}
                            placeholder="insurancePrimary"
                            id="unsurancePrimary"
  
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
                            // value={formData.primaryNumber}
                            // onChange={handleChange}
                            placeholder="Primary Insurance Number"
                            id="primInsNum"
  
                            // invalid={invalid}
                            // note will have to restrict this to numbers only
                        />

                        <Label htmlFor="insuranceSecondary">Insurance Secondary: </Label>
                        <Input
                            type="select"
                            name="insuranceSecondary"
                            className="form-control"
                            // value={formData.level}
                            // onChange={handleChange}
                            placeholder="insuranceSecondary"
                            id="unsuranceSecondary"
  
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
                            // value={formData.primaryNumber}
                            // onChange={handleChange}
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
                            // value={formData.primaryNumber}
                            // onChange={handleChange}
                            placeholder="Associated Leagues"
                            id="ssocLeagues"
  
                            // invalid={invalid}
                            // note will have to restrict this to numbers only
                        />

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
