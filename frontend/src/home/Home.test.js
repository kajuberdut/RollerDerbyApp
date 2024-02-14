import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import Home from "./Home";
import { BrowserRouter } from "react-router-dom";

// * Passing as of 2/13/24
// npm test Home.test.js
// must be in frontend directory 


afterEach(() => {
  cleanup()
})


describe("Tests Home Page Renders Logged Out", () => {

    test("it should render when logged out", () => {
      localStorage.setItem("user", null);
      const { asFragment } = render(
        <BrowserRouter>
              <Home setIsHomeVis={jest.fn()}/>
        </BrowserRouter>,
      );
    
      expect(screen.getByText('The block party begins when the star arrives.')).toBeInTheDocument();
      expect(screen.getByText('Login')).toBeInTheDocument();
      expect(screen.getByText('Signup')).toBeInTheDocument();
    }); 
  
    it("matches snapshot when logged out", function() {
      localStorage.setItem("user", null);
      const { asFragment } = render(
        <BrowserRouter>
              <Home setIsHomeVis={jest.fn()}/>
        </BrowserRouter>,
      );
        expect(asFragment()).toMatchSnapshot();
    });

})


describe("Tests Home Page Renders Logged In", () => {

    test("it should render when logged in", () => {
      const { asFragment } = render(
        <BrowserRouter>
              <Home setIsHomeVis={jest.fn()}/>
        </BrowserRouter>,
      );

      expect(screen.getByText('The block party begins when the star arrives.')).toBeInTheDocument();
      expect(screen.getByText('Welcome to the party, testUser!')).toBeInTheDocument();
    }); 

    it("matches snapshot when logged in", function() {
      const { asFragment } = render(
        <BrowserRouter>
              <Home setIsHomeVis={jest.fn()}/>
        </BrowserRouter>,
      );
        expect(asFragment()).toMatchSnapshot();
    });

});

describe("Tests Home Page Navigation", () => {

    test("page has singup link with correct href", () => {
      localStorage.setItem("user", null);
      render(
        <BrowserRouter> 
                  <Home setIsHomeVis={jest.fn()}/>
        </BrowserRouter>
      );

      expect(screen.queryByText('The block party begins when the star arrives.')).toBeInTheDocument();
      screen.debug()

      expect(screen.getByRole('link', { name: 'Signup' })).toHaveAttribute('href', '/signup')
    });


    test("page has login link with correct href", () => {
      localStorage.setItem("user", null);
      render(
        <BrowserRouter> 
                  <Home setIsHomeVis={jest.fn()}/>
        </BrowserRouter>
      );

      expect(screen.queryByText('The block party begins when the star arrives.')).toBeInTheDocument();
      screen.debug()

      expect(screen.getByRole('link', { name: 'Login' })).toHaveAttribute('href', '/login')
    });
});
