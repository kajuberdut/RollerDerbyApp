import React, { useContext, useState } from "react";
import FastApi from "../Api";
import UserContext from "../multiUse/UserContext";
import { useNavigate } from "react-router-dom";
import "./TeamForm.css"
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


/** 
 * Form for creating a user or updating a logged in user.
 */

const TeamForm = () => {

  /** Set user, history and initial state and set valid, invalid, and error message in state */

const { user, setUser } = useContext(UserContext);

const navigate = useNavigate();

  /** 
   * Sets Initial State of Form
  */

if(!user) {
  navigate('/')
}

let INITIAL_STATE = { name: ""};

  /** Sets formData in initial state */

  const [formData, setFormData] = useState(INITIAL_STATE);
  
  /** Handle Submit by either creating user, updating profile, or returning an error message */

  const handleSubmit = async evt => {
    evt.preventDefault();   

    setFormData(INITIAL_STATE);
  
    let result = await FastApi.addTeam(formData);
    if(result) {
      navigate('/teams')

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
        admin: user.userId,
        type: "team"
        
      }));
      console.log("formData", formData)
  };

  /** render form */

  return (
    <section className="col-md-4 TeamForm" style={{marginTop: "150px"}}>
        <Card>
            <CardTitle className="TeamForm-CardTitle">
            <h1>Create a Team</h1>
            <p><b>Note: When you create a team you become the admin of that team.</b></p>
            </CardTitle>
            <CardBody>
                {/* <Form> */}
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                       
                    <Label htmlFor="name">Name: </Label>
                      <Input
                          type="input"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                      />
                    
                    </FormGroup>

                    <Button >Add Team</Button>
                </Form>
            </CardBody>
        </Card>
    </section>
  
);
};

export default TeamForm;
