import { render, screen, cleanup, fireEvent  } from '@testing-library/react';
import React from 'react';
import Navbar from './NavBar';
import { Nav } from 'reactstrap';
import { UserProvider } from "../testUtils";
import { BrowserRouter } from "react-router-dom";
import AllRoutes from '../routes/Routes.js';
import Home from '../home/Home.js';
// import localStorageMock from 'jest-localstorage-mock';
import '../setupTests.js';

// npm test Navbar.test.js
// must be in frontend directory 

afterEach(() => {
  cleanup()
  // console.log("afterEach is running")
})

describe("user logged in", () => {  

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

    test("it navigates to the bouts page when clicked", () => {
      render(
        // <BrowserRouter initialEntries={["/"]}> 
        <BrowserRouter> 
          <UserProvider >
              <Navbar />
              <AllRoutes>
                <Home />
              </AllRoutes>
          </UserProvider>
        </BrowserRouter>
      );

      expect(screen.queryByText('A Roller Derby Communication Application')).toBeInTheDocument();
      const bouts = screen.getByText("Bouts");
      fireEvent.click(bouts);
      expect(screen.queryByText('A Roller Derby Communication Application')).not.toBeInTheDocument();
      expect(screen.getByText("Create Bout")).toBeInTheDocument();
      expect(window.location.pathname).toBe("/bouts");
   
    });

    test("it navigates to the mixers page when clicked", () => {
      render(

        <BrowserRouter> 
          <UserProvider >
              <Navbar />
              <AllRoutes>
                <Home />
              </AllRoutes>
          </UserProvider>
        </BrowserRouter>
      );

      expect(screen.queryByText('Create Bout')).toBeInTheDocument();
      const mixers = screen.getByText("Mixers");
      fireEvent.click(mixers);
      expect(screen.queryByText('Create Bout')).not.toBeInTheDocument();

      expect(screen.getByText("Create Mixer")).toBeInTheDocument();
      expect(window.location.pathname).toBe("/mixers");
    });

    // ! this one running into issues with mock Api calls
    // test("it navigates to the users page when clicked", () => {
    //   render(

    //     <BrowserRouter> 
    //       <UserProvider >
    //           <Navbar />
    //           <AllRoutes>
    //             <Home />
    //           </AllRoutes>
    //       </UserProvider>
    //     </BrowserRouter>
    //   );
    //   console.log(" ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^window.location.pathname", window.location.pathname)

    //   expect(screen.queryByText('Create Mixer')).toBeInTheDocument();
    //   const user = screen.getByText("testUser");
    //   fireEvent.click(user);
    //   expect(screen.queryByText('Create Mixer')).not.toBeInTheDocument();

    //   expect(screen.getByText("testUser")).toBeInTheDocument();
    //   expect(window.location.pathname).toBe("/profile");
    //   const conteact = screen.getByText("Conteact");
    //   fireEvent.click(conteact);
    // });


});

describe("user logged out", () => {  

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