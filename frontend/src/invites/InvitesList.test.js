import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import InvitesList from "./InvitesList";
import { BrowserRouter } from "react-router-dom";

// * Passing as of 2/13/24
// ! have not figured out how to mock api request
// npm test InvitesList.test.js
// must be in frontend directory 


afterEach(() => {
  cleanup()
})


describe("Tests Invite List Page Renders", () => {

    test("invite component should render", () => {
      render(
        <BrowserRouter>
              <InvitesList />
        </BrowserRouter>,
      );
    }); 

    test('renders loading when get all invites has not resolved', () => {
    
        render(<InvitesList />);

        const loading = screen.getByTestId('loading-indicator');
        expect(loading).toBeInTheDocument();
      
     });
  
    it("matches snapshot", function() {
      const { asFragment } = render(
        <BrowserRouter>
              <InvitesList />
        </BrowserRouter>,
      );
        expect(asFragment()).toMatchSnapshot();
    });

})
