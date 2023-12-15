import React from "react";
import { Route, Routes } from "react-router-dom";
import SignupForm from "../forms/SignupForm";
import LoginForm from "../forms/LoginForm";
import SetupProfileForm from "../forms/SetupProfileForm";
import BoutList from "../bouts/BoutList";
import MixerList from "../mixers/MixerList";
import UserList from "../users/UserList";
import UserDetails from "../users/UserDetails";
import Home from "../home/Home"
import NotFound from "../404/404";
import Profile from "../profile/Profile";


/**
 * Display routes
 */

function AllRoutes({login, signup, update, apply, id, getBouts, getMixers, getUsers}) {
 
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
        <Route path="/setup" element={<SetupProfileForm update={update}/>} />
        {/* <Route path="/users/:derbyName" element={<UserDetails />} /> */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/update/:derbyName" element={<SignupForm update={update}/>} />
        <Route path="/events" element={<SignupForm />} />
        <Route path="/users" element={<UserList getUsers={getUsers}/>} />
        <Route path="/users/:derby_name" element={<UserDetails />} />
        <Route path="/bouts" element={<BoutList getBouts={getBouts}/>} />
        <Route path="/bouts/:id" element={<SignupForm />} />
        <Route path="/mixers" element={<MixerList getMixers={getMixers}/>} />
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