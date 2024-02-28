import React, { useState } from "react";
import FastApi from "../Api";
import { useNavigate } from "react-router-dom";
import "./SetupProfileForm.css" 
import { Card, CardBody, CardTitle, Form, FormGroup, Label, Input, Button } from "reactstrap";

/** 
 * Display form for updating private details pofile
 */

function SetupPrivateDetailsForm({ update, getUser }) {

  /** Retrieve user from local storage */

  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  /** Sets primary and secondary insurance number disbled in state */

  const [primInsNumDisabled, setPrimInsNumDisabled] = useState(true);
  const [secInsNumDisabled, setSecInsNumDisabled] = useState(true);

  /** Sets initial state of form   */

  let INITIAL_STATE = { email: user.email, phoneNumber: user.phoneNumber, firstName: user.firstName, lastName: user.lastName, additionalInfo: user.additionalInfo, secNum: user.secondaryNumber, level: user.level, primIns: user.primaryInsurance, primInsNum: user.primInsNum, secIns: user.secIns, secInsNum: user.secInsNum };

  /** Sets formData in initial state */
  const [formData, setFormData] = useState(INITIAL_STATE);

  /** Formats form data */

  function format(formData) {
    let type1 = formData.primIns
    let val1 = formData.primInsNum
    let type2 = formData.secIns
    let val2 = formData.secInsNum

    let userData = {
      email: formData.email, phoneNumber: formData.phoneNumber, firstName: formData.firstName, lastName: formData.lastName, additionalInfo: formData.additionalInfo, secondaryNumber: formData.secNum
    }

    /** Delete all null fields */

    for (const key in userData) {
      if (userData[key] === undefined) {
        delete userData[key];
      }
    }

    let primaryInsurance;
    let secondaryInsurance;

    if(type1 && val1) {
      primaryInsurance = {type: type1, insuranceNumber: val1, insuranceId: 0 }
    }

    if(type2 && val2) {
      secondaryInsurance = {type: type2, insuranceNumber: val2, insuranceId: 0 }
    }

    let ins = []
    let data;
    if(primaryInsurance) {
      ins.push(primaryInsurance)
    }
    if(secondaryInsurance) {
      ins.push(secondaryInsurance)
    }

    if(ins.length > 0) {

      data = {
        user: userData, 
        insurance: ins
      }  

    } else {

      data = {
        user: userData
      }
    }
   
    return data;

  }
  
 /** Handle Submit by either updating profile, or returning an error message */

  const handleSubmit = async evt => {
    evt.preventDefault();   

    setFormData(INITIAL_STATE);
  
    let formattedData = format(formData);

    try {
      let updateProfile = await FastApi.updateUserPrivate(user.userId, formattedData);
      
      if(updateProfile) {
        await getUser();
        navigate('/profile/private')
      }
    } catch(errors) {
      return { success: false, errors };
    }
  }

  /** Update local state with current state of input element */

  const handleChange = evt => {
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
          })); 
          setPrimInsNumDisabled(true); 
        } else {
          setPrimInsNumDisabled(false); 
        }
      };
      if (name === "secIns") {
        if (value === "") {
          setFormData((prevData) => ({
            ...prevData,
            secInsNum: "",
          })); 
          setSecInsNumDisabled(true);
        } else {
          setSecInsNumDisabled(false); 
      }
    }
  }


  /** render setup private details form */

  return (
    <section className="col-md-4 SetupProfileForm" style={{marginTop: "150px"}}>
        <Card style={{minWidth: '400px'}}>
            <CardTitle className="SetupProfileForm-CardTitle">
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
                           maxLength={128}
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
                            maxLength="10"
                        />
                       

                        <Label htmlFor="firstName">First Name: </Label>
                       
                        <Input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="First Name"
                            maxLength={30}
                        />
                        
           
                        <Label htmlFor="lastName">Last Name: </Label>
                        <Input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Last Name"
                            maxLength={30}
                        />

                        
                        <Label htmlFor="additionalInfo">Additional Information: </Label>
                        <Input
                            type="text"
                            id="additionalInfo"
                            name="additionalInfo"
                            value={formData.additionalInfo}
                            onChange={handleChange}
                            placeholder="Additional Private Information"
                            maxLength={300}
                        />

                        <Label htmlFor="secNum">Secondary Number: </Label>
                        <Input
                            type="text"
                            name="secNum"
                            className="form-control"
                            value={formData.secNum}
                            onChange={handleChange}
                            placeholder="Secondary Number"
                            id="secondaryNumber"
                            pattern="[0-9]*"
                            maxLength={4}
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
                            onChange={handleChange}
                            placeholder="Primary Insurance Number"
                            id="primInsNum"
                            disabled={primInsNumDisabled}
                            maxLength={50}
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
                            onChange={handleChange}
                            placeholder="Secondary Insurance Number"
                            id="secInsNum"
                            disabled={secInsNumDisabled}
                            maxLength={50}
                        />                    

                    </FormGroup>
                    <Button >Save Profile</Button>
                </Form>
            </CardBody>
        </Card>
    </section>
  
  );
};

export default SetupPrivateDetailsForm;
