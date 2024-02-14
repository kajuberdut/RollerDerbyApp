// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';


global.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};

const user = {
  userId: 1,
  username: "testUser",
  email: "testuser@gmail.com",
  facebookName: "facebook test user",
  about: "This is my story...",
  primaryNumber: "01",
  level: "A",
  ruleset: [],
  position: [],
  insurance: [],
  locationId: null,
  associatedLeagues: "Testing League",
  phoneNumber: "1111111111",
  firstName: "Jane",
  lastName: "Doe",
  additionalInfo: "Epi pen in bag.",
  secondaryNumber: "02"
};

beforeEach(() => {
  localStorage.setItem("user", JSON.stringify(user));
});

