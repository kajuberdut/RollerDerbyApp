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

function SetupPrivateDetailsForm({update}) {

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
const [displayRulesets, setDisplayRulesets] = useState([]);
const [primIns, setPrimIns] = useState([]);
const [secIns, setSecIns] = useState([]);


// if(!user) {
//   navigate('/')
// }

console.log("USER IN EDIT PROFILE PAGE", user)

// if(user.insurance) {
//   getUserInsurance()
// }

let INITIAL_STATE = { username: user.username, phoneNumber: user.phoneNumber, firstName: user.firstName, lastName: user.lastName, additionalInfo: user.additionalInfo, email: user.email,  facebookName: user.facebookName, about: user.about, primNum: user.primaryNumber, secNum: user.secondaryNumber, level: user.level, primIns: user.primaryInsurance, primInsNum: user.primInsNum, secIns: user.secIns, secInsNum: user.secInsNum, assocLeagues: user.associatedLeagues };

  /** Sets formData in initial state */
  const [formData, setFormData] = useState(INITIAL_STATE);

  function format(formData) {
    console.log("formData.secIns", formData.secIns)
    let ins1 = formData.primIns
    let val1 = formData.primInsNum
    let ins2 = formData.secIns
    let val2 = formData.secInsNum
    // ! will have to prefill rulesets - primary insurance, secondary, insurance, 

    let newData = {
      username: formData.username, phoneNumber: formData.phoneNumber, firstName: formData.firstName, lastName: formData.lastName, additional_info: formData.additionalInfo, email: formData.email,  facebookName: formData.facebookName, about: formData.about, primNum: formData.primNum, secNum: formData.secNum, level: formData.level, primIns: { [ins1]: val1 }, secIns: { [ins2]: val2 }, assocLeagues: formData.assocLeagues, rulesets: formRulesets
    }
    console.log("newData:", newData)
  }
  
    /** Get user insurance information if it exists */

  async function getUserInsurance() {
    if(user.insurance[0]) {
      let primIns = await FastApi.getInsurance(user.insurance[0].insurance_id)
      console.log("primIns:", primIns)
      setPrimIns(primIns)
    }
  
    let insArr = []
    // for(let ins of user.insurance) {
    //   let insurance = await FastApi.getInsurance(ins.insurance_id);
    //   insArr.push(insurance.type + ":")
    //   insArr.push(ins.insurance_number)
    // }
    // if(insArr.length > 2){
    //   insArr[1] += ","
    // }    
    // let userInsurances = insArr.join(" ")
    // setInsurances(userInsurances)
  }


  /** Handle Submit by either creating user, updating profile, or returning an error message */

  const handleSubmit = async evt => {
    evt.preventDefault();   
    console.log("FormData in SetupProfileForm.js", formData)
    setFormData(INITIAL_STATE);
   
    console.log("update!!!!!:", update)
    format(formData)
    // let result = await update(formData);
    let result = false; 
    console.log("fake form data has been submitted")

    //   setValid(true)
    if(result) {
      navigate('/profile')

    } else {
      // let message = result.errors[0]
      // let message = result
      // setErrorMessage(message)
      // setInvalid(true)
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
    console.log("!!!!!!!!!!!!!! formRulesets:", formRulesets)
  };

  const handleChange = evt => {
    console.log('handleChange is running')
    const { name, value }= evt.target;

    setFormData(fData => ({
      ...fData,
      [name]: value,
    }));

    if (name === "primIns") {
      if (value === "") {
        setFormData((prevData) => ({
          ...prevData,
          primInsNum: "",
        })); // Clear the insurance number field
        setPrimInsNumDisabled(true); // Disable the insurance number field
      } else {
        setPrimInsNumDisabled(false); // Enable the insurance number field
        // If needed, prompt for insurance number if it's still empty
      }
    };
    if (name === "secIns") {
      if (value === "") {
        setFormData((prevData) => ({
          ...prevData,
          secInsNum: "",
        })); // Clear the insurance number field
        setSecInsNumDisabled(true); // Disable the insurance number field
      } else {
        setSecInsNumDisabled(false); // Enable the insurance number field
        // If needed, prompt for insurance number if it's still empty
  }

  }

    console.log("formData in setupProfileForm:", formData)
}


  /** render form */

  return (
    <section className="col-md-4 SetupProfileForm" style={{marginTop: "150px"}}>
        <Card>
            <CardTitle className="SetupProfileForm-CardTitle">
            {/* { !user && ( <h1>Create a Profile</h1> )}
            { user && (<h1>{user.username}'s Profile</h1>)} */}
            <h1>Private Details</h1>
            </CardTitle>
            <CardBody>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>

                      <Label htmlFor="phoneNumber">Phone Number: </Label>
                       
                        <Input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            placeholder="Phone Number"
                            pattern="[0-9]*"
                            // pattern="/^-?\d+\.?\d*$/"
                            maxLength="10"
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

                        
                        <Label htmlFor="additionalInfo">Additional Information: </Label>
                        <Input
                            type="text"
                            id="additionalInfo"
                            name="additionalInfo"
                            value={formData.additionalInfo}
                            onChange={handleChange}
                            placeholder="Additional Private Information"
                            // valid={valid}
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

                        <Label htmlFor="primIns">Primary Insurance: </Label>
                        <Input
                            type="select"
                            name="primIns"
                            className="form-control"
                            value={formData.primIns}
                            onChange={handleChange}
                            placeholder="Primary Insurance"
                            id="primIns"
  
                            // invalid={invalid}
                            >
                              <option value={""}>
                                N/A 
                              </option>
                              <option value={"WFTDA"}>
                                WFTDA
                              </option>
                              <option value={"USARS"}>
                                USARS
                              </option>
                              <option value={"other"}>
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
                            disabled={primInsNumDisabled}
  
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
                            id="secIns"
  
                            // invalid={invalid}
                            >
                              <option value={""}>
                                N/A 
                              </option>
                              <option value={"WFTDA"}>
                                WFTDA
                              </option>
                              <option value={"USARS"}>
                                USARS
                              </option>
                              <option value={"other"}>
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
                            disabled={secInsNumDisabled}
  
                            // invalid={invalid}
                            // note will have to restrict this to numbers only
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

export default SetupPrivateDetailsForm;
