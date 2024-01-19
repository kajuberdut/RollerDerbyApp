import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import Home from "./Home";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { UserProvider } from "../testUtils";
import AllRoutes from "../routes/Routes";





// beforeEach(() => {
//   console.log("beforeEach is running")
//   console.log("window.location.pathname = '/'", window.location.pathname = "/")
//   window.location.pathname = "/";
//   window.location.href = "/"
// });

afterEach(() => {
  cleanup()
  console.log("afterEach is running")

  // render(null); // Unmount any rendered components
  // history.push("/")
})

// afterEach(() => {
//   clearHistory();
// });

describe("Tests Home Page Renders Logged Out", () => {

    test("it should render when logged out", () => {
      const { asFragment } = render(
        <BrowserRouter>
          <UserProvider user={null}>
              <Home />
          </UserProvider>
        </BrowserRouter>,
      );
    
      expect(screen.getByText('A Roller Derby Communication Application')).toBeInTheDocument();
      expect(screen.getByText('Login')).toBeInTheDocument();
      expect(screen.getByText('Signup')).toBeInTheDocument();
    }); 
  
    it("matches snapshot when logged out", function() {
      const { asFragment } = render(
        <BrowserRouter>
          <UserProvider user={null}>
              <Home />
          </UserProvider>
        </BrowserRouter>,
      );
        expect(asFragment()).toMatchSnapshot();
    });

})


describe("Tests Home Page Renders Logged In", () => {

    test("it should render when logged in", () => {
      const { asFragment } = render(
        <BrowserRouter>
          <UserProvider>
              <Home />
          </UserProvider>
        </BrowserRouter>,
      );

      expect(screen.getByText('A Roller Derby Communication Application')).toBeInTheDocument();
      expect(screen.getByText('Welcome back, testUser!')).toBeInTheDocument();
    }); 

    it("matches snapshot when logged in", function() {
      const { asFragment } = render(
        <BrowserRouter>
          <UserProvider>
              <Home />
          </UserProvider>
        </BrowserRouter>,
      );
        expect(asFragment()).toMatchSnapshot();
    });

});

describe("Tests Home Page Navigation", () => {

    test("it navigates to the signup page when clicked", () => {
      render(
        // <BrowserRouter initialEntries={["/"]}> 
        <BrowserRouter> 
          <UserProvider user={null}>
              <AllRoutes>
                  <Home />
              </AllRoutes>
          </UserProvider>
        </BrowserRouter>
      );

      expect(screen.queryByText('A Roller Derby Communication Application')).toBeInTheDocument();
      const signupLink = screen.getByText("Signup");
      fireEvent.click(signupLink);
      expect(screen.queryByText('A Roller Derby Communication Application')).not.toBeInTheDocument();
      expect(screen.getByText("Create a profile")).toBeInTheDocument();
      expect(window.location.pathname).toBe("/signup");

    });


    // test("it should render when logged in", () => {

    //   // const { asFragment } = render(
    //   //   <MemoryRouter initialEntries={["/"]}>
    //   //     <UserProvider>
    //   //         <Home />
    //   //     </UserProvider>
    //   //   </MemoryRouter>,
    //   // );
    //   // render(<Router history={history}><App/></Router>);

    //   // const history = createMemoryHistory();

    //   expect(window.location.pathname).toBe("/");
    //   expect(screen.getByText('A Roller Derby Communication Application')).toBeInTheDocument();
    //   expect(screen.getByText('Welcome back, testUser!')).toBeInTheDocument();
    // }); 


    // ! note that the last componet being rednered is the /signup which means this is not working but the test is valid. 

    // test("it navigates to the login page when clicked", () => {
    //   const { asFragment } = render(
    //     // <BrowserRouter initialEntries={["/"]}> 
    //     <MemoryRouter initialEntries={["/"]}> 
    //       <UserProvider user={null}>
    //           <AllRoutes>
    //               <Home />
    //           </AllRoutes>
    //       </UserProvider>
    //     </MemoryRouter>
    //   );
    //   expect(window.location.pathname).toBe("/");
    //   const loginLink = screen.getByText("Login");
    //   console.log("loginLink:", loginLink)
    //   expect(screen.queryByText('A Roller Derby Communication Application')).toBeInTheDocument();
    //   fireEvent.click(loginLink);
    //   expect(screen.queryByText('A Roller Derby Communication Application')).not.toBeInTheDocument();
    //   expect(screen.getByText("Login")).toBeInTheDocument();
    //   expect(window.location.pathname).toBe("/login");
    // });

});
