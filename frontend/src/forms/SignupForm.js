import React, { useContext, useState } from "react";
import UserContext from "../multiUse/UserContext";
import { useNavigate } from "react-router-dom";
import "./SignupForm.css"
import { Card, CardBody, CardTitle, Form, FormGroup, Label, Input, Button } from "reactstrap";


/** 
 * Form for creating a user or updating a logged in user.
 */

const SignupForm = ({signup}) => {

  /** Set user, history and initial state and set valid, invalid, and error message in state */

  const { user, setUser } = useContext(UserContext);
//   const history = useHistory();
//   const [ valid, setValid ] = useState(false);
const [ invalid, setInvalid ] = useState(false);
const [errorMessage, setErrorMessage] = useState([]);
const navigate = useNavigate();

  // let INITIAL_STATE; 

 
  /** If user, set initial state and the then set the formdata as initial state. 
   * Sets info for user so that info can be updated. 
   * Gives value to InitialState
  */

  // if(user) {
  //   INITIAL_STATE = { username: user.username, email: user.email };

  // } else {
  //   INITIAL_STATE = { username: "", email: "" };
  // }

 let INITIAL_STATE = { username: "",  email: "", password: ""};
// let INITIAL_STATE = { derbyName: "Sockher",  email: "Sockher@gmail.com", password: "pass"};

  /** Sets formData in initial state */
  const [formData, setFormData] = useState(INITIAL_STATE);
  
  const handleSubmit = async evt => {
    evt.preventDefault();   
    setFormData(INITIAL_STATE);
    console.log("formData:", formData)
    // let result = await FastApi.signup(formData);
     let result = await signup(formData);

    if(result.success) {
        navigate('/login')
    } else {
      setErrorMessage(result.err)
      // setInvalid(true)
      console.log("Signup broke")
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

  };

  /** render form */

  return (
    <section className="col-md-4 SignupForm">
        <Card>
            <CardTitle className="SignupForm-CardTitle">
            <h1>Create a profile</h1>
            <div>
            {errorMessage && (<div style={{color: 'red'}}>{errorMessage}</div>)}
            </div>
            </CardTitle>
            <CardBody>
                {/* <Form> */}
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label htmlFor="username" sm={10}>Derby Name: </Label>
                
                        <Input
                            id="username"
                            name="username"
                            defaultValue={formData.username}
                            onChange={handleChange}
                            placeholder="Derby Name"
                            required
                            // invalid={invalid}
                        />
                  
                    {/* )} */}                  

                        <Label htmlFor="email">Email: </Label>
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            autoComplete="username"
                            required
                            // valid={valid}
                            // invalid={invalid}
                        />

                        {/* { !user && ( <><Label>Password:</Label>  */}
                        <Label htmlFor="password">Password: </Label>
                        <Input
                            type="password"
                            name="password"
                            // className="form-control"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            id="password"
                            autoComplete="new-password"
                            required
                        />

                        {/* <FormFeedback valid>Profile updated successfully!</FormFeedback>
                        <FormFeedback tooltip>{errorMessage} </FormFeedback> */}

                    </FormGroup>

                    <Button >Create Profile</Button>
                </Form>
            </CardBody>
        </Card>
    </section>
  );
};


export default SignupForm;
