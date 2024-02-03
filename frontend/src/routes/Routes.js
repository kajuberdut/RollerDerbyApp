import React from "react";
import { Route, Routes } from "react-router-dom";
import SignupForm from "../forms/SignupForm";
import LoginForm from "../forms/LoginForm";
import SetupProfileForm from "../forms/SetupProfileForm";
import SetupPrivateDetailsForm from "../forms/SetupPrivateDetailsForm";
import BoutForm from "../forms/BoutForm";
import MixerForm from "../forms/MixerForm";
import BoutDetails from "../bouts/BoutDetails"
import MixerDetails from "../mixers/MixerDetails"
import EventList from "../events/EventList";
import UserList from "../users/UserList";
import UserDetails from "../users/UserDetails";
import Home from "../home/Home"
import NotFound from "../404/404";
import Profile from "../profile/Profile";
import ProfilePrivateDetails from "../profile/ProfilePrivateDetails";
import About from "../about/About";
import TeamsList from "../teams/TeamsList";
import TeamForm from "../forms/TeamForm";
import TeamDetails from "../teams/TeamDetails";
import TeamParticipant from "../teams/TeamParticipant";
import ProtectedRoute from "../multiUse/protectedRoute/ProtectedRoute";

/**
* Display routes
*/

function AllRoutes({getUser, login, signup, update, getBouts, getMixers, getUsers, handleMessages, getAllChats, displayChatList, setIsSignupVis, setIsLoginVis, setIsHomeVis, setIsAboutVis }) {

/** Render routes */

  return (
    <Routes>

        <Route path="/" element={<Home setIsHomeVis={setIsHomeVis} />} />
        <Route path="/signup" element={<SignupForm signup={signup} setIsSignupVis={setIsSignupVis} />} />
        <Route path="/login" element={<LoginForm login={login} setIsLoginVis={setIsLoginVis} />} />
        <Route path="/about" element={<About setIsAboutVis={setIsAboutVis} />} />

        <Route path="/setup/profile" element={<ProtectedRoute><SetupProfileForm getUser={getUser} update={update} setIsSignupVis={setIsSignupVis}/></ProtectedRoute>} />
        <Route path="/setup/private" element={<ProtectedRoute><SetupPrivateDetailsForm getUser={getUser} update={update}/></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile displayChatList={displayChatList} /></ProtectedRoute>} />
        <Route path="/profile/private" element={<ProtectedRoute><ProfilePrivateDetails displayChatList={displayChatList} /></ProtectedRoute>} />
        <Route path="/update/:username" element={<ProtectedRoute><SignupForm update={update}/></ProtectedRoute>} />
        <Route path="/users" element={<ProtectedRoute><UserList getUsers={getUsers}/></ProtectedRoute>} />
        <Route path="/users/:userId" element={<ProtectedRoute><UserDetails handleMessages={handleMessages} displayChatList={displayChatList}/></ProtectedRoute>} />
        <Route path="/events/:type" element={<ProtectedRoute><EventList getBouts={getBouts}/></ProtectedRoute>} />
        <Route path="/events/bouts/add" element={<ProtectedRoute><BoutForm/></ProtectedRoute>} />
        <Route path="/events/bouts/:id" element={<ProtectedRoute><BoutDetails getAllChats={getAllChats} /></ProtectedRoute>} />
        <Route path="/events/mixers/add" element={<ProtectedRoute><MixerForm/></ProtectedRoute>} />
        <Route path="/events/mixers/:id" element={<ProtectedRoute><MixerDetails getAllChats={getAllChats} /></ProtectedRoute>} /> 
        <Route path="/teams" element={<ProtectedRoute><TeamsList /></ProtectedRoute>} /> 
        <Route path="/teams/add" element={<ProtectedRoute><TeamForm /></ProtectedRoute>} /> 
        <Route path="/teams/:id" element={<ProtectedRoute><TeamDetails /></ProtectedRoute>} /> 
        <Route path="/teams/:groupId/:participant" element={<ProtectedRoute><TeamParticipant /> </ProtectedRoute>} /> 
        <Route path="*" element={<NotFound />} /> 
    </Routes>
  )
}

export default AllRoutes