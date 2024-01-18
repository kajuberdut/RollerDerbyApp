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

let INITIAL_STATE = { email: user.email, phoneNumber: user.phoneNumber, firstName: user.firstName, lastName: user.lastName, additionalInfo: user.additionalInfo, secNum: user.secondaryNumber, level: user.level, primIns: user.primaryInsurance, primInsNum: user.primInsNum, secIns: user.secIns, secInsNum: user.secInsNum };

  /** Sets formData in initial state */
  const [formData, setFormData] = useState(INITIAL_STATE);

  function format(formData) {
    console.log("formData.secIns", formData.secIns)
    let type1 = formData.primIns
    let val1 = formData.primInsNum
    let type2 = formData.secIns
    let val2 = formData.secInsNum
    // ! will have to prefill rulesets - primary insurance, secondary, insurance, 

    let userData = {
      email: formData.email, phoneNumber: formData.phoneNumber, firstName: formData.firstName, lastName: formData.lastName, additionalInfo: formData.additionalInfo, secondaryNumber: formData.secNum
    }

      /** Delete all null fields */

    for (const key in userData) {
      if (userData[key] === null) {
        delete userData[key];
      }
    }

    console.log("userData:", userData)
    let primaryInsurance;
    let secondaryInsurance;

    if(type1 && val1) {
      primaryInsurance = {type: type1, insuranceNumber: val1, insuranceId: 0 }
      console.log("primaryInsurance:", primaryInsurance )
    }

    if(type2 && val2) {
      secondaryInsurance = {type: type2, insuranceNumber: val2, insuranceId: 0 }
      console.log("secondaryInsurance:", secondaryInsurance)
    }

    let ins = []
    if(primaryInsurance) {
      ins.push(primaryInsurance)
    }
    if(secondaryInsurance) {
      ins.push(secondaryInsurance)
    }
   
    let data = {
      user: userData, 
      insurance: ins
    }
    console.log("data in setupprivatedetailsform", data)
    return data;

  }

  // { 
  //   "user": {	
  //     "email": "slashher@gmail.com",
  //     "phone_number": "5553354566",
  //     "first_name": "Billy",
  //     "last_name": "Slash", 
  //     "additional_info": "Epi pen in bag",
  //     "secondary_number": 180
  //     },
  //     "insurance": [
  //   {
  //     "insurance_id": 0, 
  //     "type": "WFTDA",
  //     "insurance_number": "67890"
  //    }, 
  //   {
  //     "insurance_id": 0, 
  //     "type": "USARS",
  //     "insurance_number": "00000"
  //    }
  //   ]
  // }
  
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


 /** Handle Submit by either updating profile, or returning an error message */
 const handleSubmit = async evt => {
  evt.preventDefault();   
  console.log("FormData in SetupPrivateDetailsForm.js", formData)
  setFormData(INITIAL_STATE);
 
  console.log("update!!!!!:", update)
  let formattedData = format(formData);
  // ! this is returning undefined
  console.log("formattedData!!!! in PRIVATE ", formattedData)

  let updateProfile = await FastApi.updateUserPrivate(user.userId, formattedData);
  console.log(" &&&& updateProfile:", updateProfile)  
  
  //   setValid(true)
  if(updateProfile) {
    navigate('/profile')

  } else {
    // let message = result.errors[0]
    // let message = result
    // setErrorMessage(message)
    // setInvalid(true)
    console.log("fake form has failed to submit")
  }
 }

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

    console.log("formData in setupPrivateeForm:", formData)
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

                    <Label htmlFor="email">Email: </Label>
                       
                       <Input
                           type="text"
                           id="email"
                           name="email"
                           value={formData.email}
                           onChange={handleChange}
                           placeholder="Email"
                           // valid={valid}
                           // invalid={invalid}
                       />

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
