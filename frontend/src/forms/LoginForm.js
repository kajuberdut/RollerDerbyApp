import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import {
    Card,
    CardBody,
    CardTitle,
    Form, 
    FormGroup,
    Label,
    Input, 
    Button,
    FormFeedback
  } from "reactstrap";


/** 
 * Login form 
 *
 */

const LoginForm = ({login}) => {
    
   /** Set form data, history, valid, and errorMessage in State */
  let INITIAL_STATE = { username: "", password: ""};
  const [formData, setFormData] = useState(INITIAL_STATE);
  // // const history = useHistory();
  // const [ invalid, setInvalid ] = useState(false);
  // const [errorMessage, setErrorMessage] = useState([]);
  const navigate = useNavigate();


  /** Handle submit by either logging and redirecting in or returning an error message */

  const  handleSubmit = async evt => {
    evt.preventDefault();
    setFormData(INITIAL_STATE);
    let result = await login(formData); 
    
    if(result.success) {
        navigate('/')

    } else {
        let message = result.errors
    //   let message = result.errors[0]
    //   setErrorMessage(message);
    //   setInvalid(true);
  }

  };

  /** Update local state with current state of input element */

  const handleChange = evt => {

    const { name, value }= evt.target;
    setFormData(fData => ({
      ...fData,
      [name]: value,
    }));
    
  };

  /** render form */

  return (
    <section className="col-md-4 LoginForm">
        <Card>
            <CardTitle className="LoginForm-CardTitle">
                <h1>Log In</h1>
            </CardTitle>
            <CardBody>
                <Form onSubmit={handleSubmit}>
                {/* <Form > */}
                  <FormGroup>

                        <Label htmlFor="username" sm={10}>Derby Name: </Label>
                        <Input
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Derby Name"
                            required
                            // invalid={invalid}
                        />

                        <Label htmlFor="password">Password: </Label>
                        <Input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            required
                            // invalid={invalid}
                        />
{/* 
                    <FormFeedback tooltip>{errorMessage} </FormFeedback> */}

                    </FormGroup>
  
                    <Button>Submit</Button>

                </Form>
            </CardBody>
        </Card>
    </section>
  );
};


export default LoginForm;