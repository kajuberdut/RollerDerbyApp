import React, { useState } from "react";
import FastApi from "../Api";
import { useNavigate } from "react-router-dom";
import "./TeamForm.css"
import { Card, CardBody, CardTitle, Form, FormGroup, Label, Input, Button } from "reactstrap";

/** 
 * Form for creating a new team
 */

const TeamForm = () => {

  /** Retrieve user from local storage*/

  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  /** Sets Initial State of Form  */

  let INITIAL_STATE = { name: ""};

  /** Sets formData in initial state */

  const [formData, setFormData] = useState(INITIAL_STATE);
  
  /** Handle Submit by creating a team returning an error message */

  const handleSubmit = async evt => {
    evt.preventDefault();   

    setFormData(INITIAL_STATE);
    try {
      let result = await FastApi.addTeam(formData);

      if(result) {
        navigate('/teams')
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
        admin: user.userId,
        type: "team"
        
      }));
  };

  /** render team form */

  return (
    <section className="col-md-4 TeamForm" style={{marginTop: "150px"}}>
        <Card>
            <CardTitle className="TeamForm-CardTitle">
            <h1>Create a Team</h1>
            <p><b>Note: When you create a team you become the admin of that team.</b></p>
            </CardTitle>
            <CardBody>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                       
                        <Label htmlFor="name">Name: </Label>
                        <Input
                            type="input"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            maxLength={50}
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
