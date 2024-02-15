import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import TeamComponent from "./TeamComponent";
import { BrowserRouter } from "react-router-dom";

// * Passing as of 2/15/24
// npm test TeamComponent.test.js
// must be in frontend directory 


describe("Tests Team Component Page Renders", () => {

    const team = { 
          groupId: 1,
          name: 'Testing',
        }

    test("team component should render", () => {
      render(
        <BrowserRouter>
              <TeamComponent team={team}/>
        </BrowserRouter>,
      );
    
    }); 
  
    it("matches snapshot", function() {
      const { asFragment } = render(
        <BrowserRouter>
              <TeamComponent team={team}/>
        </BrowserRouter>,
      );
        expect(asFragment()).toMatchSnapshot();
    });

    it('displays team name', async () => {
        render(
            <BrowserRouter>
                <TeamComponent team={team}/>
            </BrowserRouter>
        );

        screen.debug()

            expect(screen.getByText('Testing')).toBeInTheDocument();
      });

})

