import React from "react";
import { Route, Routes } from "react-router-dom";
import SignupForm from "../forms/SignupForm";
import LoginForm from "../forms/LoginForm";
import SetupProfileForm from "../forms/SetupProfileForm";
import BoutForm from "../forms/BoutForm";
import MixerForm from "../forms/MixerForm";
import BoutList from "../bouts/BoutList";
import BoutDetails from "../bouts/BoutDetails"
import MixerList from "../mixers/MixerList";
import MixerDetails from "../mixers/MixerDetails"
import UserList from "../users/UserList";
import UserDetails from "../users/UserDetails";
import Home from "../home/Home"
import NotFound from "../404/404";
import Profile from "../profile/Profile";
import Messages from "../chats/Messages";
import ChatList from "../chats/ChatList"
// import SetupTesting from "../test/SetupTesting"




/**
 * Display routes
 */

function AllRoutes({login, signup, update, apply, id, getBouts, getMixers, getUsers, handleMessages}) {
 console.log(" ^^^^^^ handleMessages in routes:", typeof handleMessages)
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
        <Route path="/login" element={<LoginForm login={login} />} />
        <Route path="/setup" element={<SetupProfileForm update={update}/>} />
        {/* <Route path="/setup" element={<SetupTesting update={update}/>} /> */}
        {/* <Route path="/users/:derbyName" element={<UserDetails />} /> */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/update/:username" element={<SignupForm update={update}/>} />
        <Route path="/events" element={<SignupForm />} />
        <Route path="/users" element={<UserList getUsers={getUsers}/>} />
        {/* <Route path="/users/:username" element={<UserDetails handleMessages={handleMessages} />} /> */}
        <Route path="/users/:userId" element={<UserDetails handleMessages={handleMessages} />} />
        <Route path="/bouts" element={<BoutList getBouts={getBouts}/>} />
        <Route path="/bouts/add" element={<BoutForm/>} />
        <Route path="/bouts/:id" element={<BoutDetails />} />
        <Route path="/mixers" element={<MixerList getMixers={getMixers}/>} />
        <Route path="/mixers/add" element={<MixerForm/>} />
        <Route path="/mixers/:id" element={<MixerDetails />} /> 
        {/* <Route path="/messages" element={<Messages handleMessages={handleMessages}/>} />  */}
        <Route path="/chats/:userId" element={<ChatList/>} /> 
        <Route path="*" element={<NotFound />} /> 
      ''
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