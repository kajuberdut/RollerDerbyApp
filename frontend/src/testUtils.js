import React from "react";
import UserContext from "./multiUse/UserContext";

const demoUser = {
    userId: 1,
    username: "testUser",
    email: "testuser@gmail.com",
    facebookName: null,
    about: null,
    primaryNumber: null,
    level: null,
    ruleset: [],
    position: [],
    insurance: [],
    locationId: null,
    associatedLeagues: null,
    phoneNumber: null,
    firstName: null,
    lastName: null,
    additionalInfo: null,
    secondaryNumber: null
  }

const UserProvider =
    ({ children, user = demoUser }) => (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
);



export { UserProvider };
