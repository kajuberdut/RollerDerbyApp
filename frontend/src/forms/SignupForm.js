import React, { useContext, useState } from "react";
import FastApi from "../Api";
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// import UserContext from "../../repeated/UserContext";
import { useNavigate } from "react-router-dom";
import "./SignupForm.css"
import {
    Card,
    CardBody,
    CardTitle,
    Form,
    FormGroup,
    Label, 
    Input,
    Button,
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

const SignupForm = ({signup, update}) => {

  /** Set user, history and initial state and set valid, invalid, and error message in state */

//   const { user, setUser } = useContext(UserContext);
//   const history = useHistory();
//   const [ valid, setValid ] = useState(false);
  const [ invalid, setInvalid ] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);
const navigate = useNavigate();

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

//  let INITIAL_STATE = { derbyName: "",  email: "", password: ""};
let INITIAL_STATE = { derbyName: "Sockher",  email: "Sockher@gmail.com", password: "pass"};

  /** Sets formData in initial state */
  const [formData, setFormData] = useState(INITIAL_STATE);
  
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

  const handleSubmit = async evt => {
    evt.preventDefault();   
    setFormData(INITIAL_STATE);
    console.log("formData:", formData)
    let result = await FastApi.signup(formData);

    // if(result.success) {
    if(result) {
      navigate('/home')

    } else {
      // let message = result.errors[0]
      let message = result
      setErrorMessage(message)
      setInvalid(true)
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
            {/* { !user && ( <h1>Create a Profile</h1> )}
            { user && (<h1>{user.username}'s Profile</h1>)} */}
            <h1>Create a profile</h1>
            </CardTitle>
            <CardBody>
                {/* <Form> */}
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label htmlFor="derbyName" sm={10}>Derby Name: </Label>
                        {/* { user && ( */}
                        {/* <Input
                            id="derbyName"
                            name="derbyName"
                            value={formData.derbyName}
                            readOnly
                            style={{backgroundColor: "lightGray", color: "black"}}
                            invalid={invalid}
                        /> */}
                  
                    {/* )}
                   */}
                        {/* { !user && ( */}
                        <Input
                            id="derbyName"
                            name="derbyName"
                            defaultValue={formData.derbyName}
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
  
                            // invalid={invalid}
                        />

                        {/* <FormFeedback valid>Profile updated successfully!</FormFeedback>
                        <FormFeedback tooltip>{errorMessage} </FormFeedback> */}

                    </FormGroup>

                    {/* { user && <Button >Save Changes</Button> }
                    { !user && <Button >Create Profile</Button> } */}
                    <Button >Create Profile</Button>
                </Form>
            </CardBody>
        </Card>
    </section>
  );
};


export default SignupForm;
