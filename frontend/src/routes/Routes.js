import React from "react";
import { Route, Routes } from "react-router-dom";
import SignupForm from "../forms/SignupForm";
import LoginForm from "../forms/LoginForm";
import SetupProfileForm from "../forms/SetupProfileForm";
import SetupPrivateDetailsForm from "../forms/SetupPrivateDetailsForm";
import BoutForm from "../forms/BoutForm";
import MixerForm from "../forms/MixerForm";
// import BoutList from "../bouts/BoutList";
import BoutDetails from "../bouts/BoutDetails"
// import MixerList from "../mixers/MixerList";
import MixerDetails from "../mixers/MixerDetails"
import EventList from "../events/EventList";
import UserList from "../users/UserList";
import UserDetails from "../users/UserDetails";
import Home from "../home/Home"
import NotFound from "../404/404";
import Profile from "../profile/Profile";
import ChatList from "../chats/ChatList"
import ProfilePrivateDetails from "../profile/ProfilePrivateDetails";
import About from "../about/About";
// import SetupTesting from "../test/SetupTesting"




/**
 * Display routes
 */

function AllRoutes({login, signup, update, getBouts, getMixers, getUsers, handleMessages, getAllChats, displayChatList, setIsSignupVis, setIsLoginVis, setIsHomeVis}) {
 console.log(" ^^^^^^ getAllChats in routes:", typeof getAllChats)
/** Render routes */

return (
    <Routes>

        <Route path="/" element={<Home setIsHomeVis={setIsHomeVis} />} />
        <Route path="/signup" element={<SignupForm signup={signup} setIsSignupVis={setIsSignupVis} />} />
        <Route path="/login" element={<LoginForm login={login} setIsLoginVis={setIsLoginVis} />} />
        <Route path="/about" element={<About />} />
        <Route path="/setup/profile" element={<SetupProfileForm update={update} setIsSignupVis={setIsSignupVis}/>} />
        <Route path="/setup/private" element={<SetupPrivateDetailsForm update={update}/>} />
        {/* <Route path="/setup" element={<SetupTesting update={update}/>} /> */}
        {/* <Route path="/users/:derbyName" element={<UserDetails />} /> */}
        <Route path="/profile" element={<Profile displayChatList={displayChatList} />} />
        <Route path="/profile/private" element={<ProfilePrivateDetails displayChatList={displayChatList} />} />
        <Route path="/update/:username" element={<SignupForm update={update}/>} />
        <Route path="/events" element={<SignupForm />} />
        <Route path="/users" element={<UserList getUsers={getUsers}/>} />
        {/* <Route path="/users/:username" element={<UserDetails handleMessages={handleMessages} />} /> */}
        <Route path="/users/:userId" element={<UserDetails handleMessages={handleMessages} displayChatList={displayChatList}/>} />
        {/* <Route path="/events/bouts" element={<BoutList getBouts={getBouts}/>} /> */}
        <Route path="/events/:type" element={<EventList getBouts={getBouts}/>} />
        <Route path="/events/bouts/add" element={<BoutForm/>} />
        <Route path="/events/bouts/:id" element={<BoutDetails getAllChats={getAllChats} />} />
        {/* <Route path="events/mixers" element={<MixerList getMixers={getMixers}/>} /> */}

        <Route path="/events/mixers/add" element={<MixerForm/>} />
        <Route path="/events/mixers/:id" element={<MixerDetails getAllChats={getAllChats} />} /> 
        <Route path="*" element={<NotFound />} /> 
  </Routes>
)
}

export default AllRoutes