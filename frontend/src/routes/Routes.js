import React from "react";
import { Route, Routes } from "react-router-dom";
import SignupForm from "../forms/SignupForm";
import LoginForm from "../forms/LoginForm";
import SetupProfileForm from "../forms/SetupProfileForm";
import UserList from "../users/UserList";
import UserDetail from "../users/UserDetails";
import Home from "../home/Home"
import NotFound from "../404/404";


/**
 * Display routes
 */

function AllRoutes({login, signup, update, apply, id}) {
 
/** Render routes */

return (
    <Routes>
        {/* <Route exact path="/">
        <Home  />
        </Route> */}
{/* 
        <React.Fragment>
            <SignupForm />
        </React.Fragment> */}

        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignupForm signup={signup} />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/setup" element={<SetupProfileForm />} />
        <Route path="/user" element={<UserList />} />
        <Route path="/users/:id" element={<UserDetail />} />
        <Route path="/update/:derbyName" element={<SignupForm update={update}/>} />
        <Route path="/events" element={<SignupForm />} />
        <Route path="/bouts/:id" element={<SignupForm />} />
        <Route path="/mixers/:id" element={<SignupForm />} /> 
        <Route path="*" element={<NotFound />} /> 
        {/* <Route exact path="/signup">
            <SignupForm  signup={signup}/>
            <SignupForm />
        </Route> */}
           
        {/* <Route path="/admin">
        <Redirect />
        <CompanyDetail apply={apply}/>
        </Route> */}
    {/* <Route path="*">
      <NotFound />
    </Route> */}
  </Routes>
)
}

export default AllRoutes