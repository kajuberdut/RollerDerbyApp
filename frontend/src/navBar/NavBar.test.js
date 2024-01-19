import { render, screen, cleanup } from '@testing-library/react';
import React from 'react';
import Navbar from './NavBar';
import { Nav } from 'reactstrap';
import { UserProvider } from "../testUtils";
import { BrowserRouter } from "react-router-dom";
// import localStorageMock from 'jest-localstorage-mock';
import '../setupTests.js';

// npm test Navbar.test.js
// must be in frontend directory 

afterEach(cleanup)

test('renders NavBar component', () => {
  render(
  <BrowserRouter>
      <UserProvider>
          <Navbar />
      </UserProvider>
  </BrowserRouter>
  );
});

test('matches snapshot', function() {
  const { asFragment } = render(  
    <BrowserRouter>
        <UserProvider>
            <Navbar />
        </UserProvider>
    </BrowserRouter>);
  expect(asFragment()).toMatchSnapshot(); 
})


test('renders brand and links', () => {
  render(
    <BrowserRouter>
        <UserProvider>
            <Navbar logout={jest.fn()} />
        </UserProvider>
    </BrowserRouter>
  );

  const brandLink = screen.getByText('Conteact');

  expect(brandLink).toBeInTheDocument();
  expect(brandLink).toHaveAttribute('href', '/');

  const profileLink = screen.getByText('testUser');
  expect(profileLink).toBeInTheDocument();
  expect(profileLink).toHaveAttribute('href', '/profile');

});

test('renders login link when no user is present', () => {
  render(
    <BrowserRouter>
      <UserProvider user={null}> {/* Provide a null value to simulate no user */}
        <Navbar />
      </UserProvider>
    </BrowserRouter>
  );

  const loginLink = screen.getByText('Login'); 

  expect(loginLink).toBeInTheDocument();
  expect(loginLink).toHaveAttribute('href', '/login');
});

test('renders signup link when no user is present', () => {
  render(
    <BrowserRouter>
      <UserProvider user={null}> {/* Provide a null value to simulate no user */}
        <Navbar />
      </UserProvider>
    </BrowserRouter>
  );

  const signupLink = screen.getByText('Signup'); 

  expect(signupLink).toBeInTheDocument();
  expect(signupLink).toHaveAttribute('href', '/signup');
});


// beforeEach(() => {
//   localStorage.clear();
// });

// ! right now this is not getting used 

// const userData = {
    
//   user: {
//     userId: 3,
//     username: "SockHer Blue",
//     email: "sockher@gmail.com",
//     facebookName: null,
//     about: null,
//     primaryNumber: null,
//     level: null,
//     ruleset: [],
//     position: [],
//     insurance: [],
//     locationId: null,
//     associatedLeagues: null,
//     phoneNumber: null,
//     firstName: null,
//     lastName: null,
//     additionalInfo: null,
//     secondaryNumber: null
//   }

// }

// localStorage.setItem('user', JSON.stringify(userData));

// // let lsUser = localStorage.getItem('user')
// const lsUser = JSON.parse(localStorage.getItem('user'));
// console.log("!!! lsUser:", lsUser)