import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import InviteComponent from "./InviteComponent";
import { BrowserRouter } from "react-router-dom";

// * Passing as of 2/13/24
// npm test InviteComponent.test.js
// must be in frontend directory 


afterEach(() => {
  cleanup()
})


describe("Tests Invite Component Page Renders", () => {

    const invite =  jest.fn().mockResolvedValue(
        [
          { inviteId: 1 },
        ]
      );

    test("invite component should render", () => {
      render(
        <BrowserRouter>
              <InviteComponent invite={invite}/>
        </BrowserRouter>,
      );
    
      expect(screen.getByText('Accept')).toBeInTheDocument();
    }); 
  
    it("matches snapshot", function() {
      const { asFragment } = render(
        <BrowserRouter>
              <InviteComponent invite={invite}/>
        </BrowserRouter>,
      );
        expect(asFragment()).toMatchSnapshot();
    });

})
