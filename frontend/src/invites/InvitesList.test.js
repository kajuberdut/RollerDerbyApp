import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import InvitesList from "./InvitesList";
import { BrowserRouter } from "react-router-dom";
import FastApi from '../Api'; 

// * Passing as of 2/13/24
// npm test InvitesList.test.js
// must be in frontend directory 


// Mock FastApi methods
jest.mock('../Api', () => ({
    getInvites: jest.fn(),
}));


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

describe('Invites List Component', () => {
    const mockInvites = [
        {
            inviteId: 1,
            teamId: 2, 
            senderId: 7, 
            status: "pending"
        }
    ]
  
    beforeEach(() => {
      FastApi.getInvites.mockResolvedValue(mockInvites);
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('fetches bout and invites and displays details', async () => {
        render(<InvitesList />);
    
        expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();
    
        // Wait for the API call to resolve and check if the details are displayed
        await waitFor(() => {
           
            expect(screen.getByText('Invites')).toBeInTheDocument();
            expect(screen.getByText('Accept')).toBeInTheDocument();
        });
      });

});
