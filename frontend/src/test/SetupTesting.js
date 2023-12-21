import React, { useContext, useEffect, useState } from "react";
import UserContext from "../multiUse/UserContext";

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


function SetupTesting() {

  /** Set user, history and initial state and set valid, invalid, and error message in state */

  // ! note for some reason this is not allowing us to destructure user or setUSer 
// const { user, setUser } = useContext(UserContext);
const { user } = useContext(UserContext);
// ! now this isn't working either 
// const UserCont = useContext(UserContext)
// console.log("userCont !!! in setup profile form", userCont)
// let user  = UserCont.user
console.log("user !!! in SetupTesting form", user)

// let INITIAL_STATE = { username: user.username, firstName: user.firstName, lastName: user.lastName }
// const [formData, setFormData] = useState(INITIAL_STATE);

const handleSubmit = async evt => {
  evt.preventDefault();   
  console.log("handleSubmit is running")
  // console.log("FormData in SetupTesting.js", formData)
  // setFormData(INITIAL_STATE);
}

const handleChange = evt => {
  console.log('handleChange is running')
  const { name, value }= evt.target;

  // setFormData(fData => ({
  //   ...fData,
  //   [name]: value,
  // }));
  // console.log("formData in setupProfileForm:", formData)
};

  /** render form */

  return (
    // <section className="col-md-4 SetupProfileForm" style={{marginTop: "150px"}}>
    //     <p>HELLLOOOOOOOO!!!!!</p>
    // </section>
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
                        //  value={formData.username}
                         onChange={handleChange}
                         placeholder="Derby Name"
                         required
                         // valid={valid}
                         // invalid={invalid}
                     />

                        {/* <Label htmlFor="firstName">First Name: </Label>
                       
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

                        /> */}
                        

                  </FormGroup>

                  <Button >Save Profile</Button>
              </Form>
          </CardBody>
      </Card>
  </section>
  
);
};

export default SetupTesting
