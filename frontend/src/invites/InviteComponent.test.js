import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import InviteComponent from "./InviteComponent";
import { BrowserRouter } from "react-router-dom";
import FastApi from '../Api'; 

// * Passing as of 2/13/24
// npm test InviteComponent.test.js
// must be in frontend directory 

// Mock FastApi methods
jest.mock('../Api', () => ({
  getGroup: jest.fn(),
  getUsernameById: jest.fn()
}));

// Mock useParams
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), 
  useParams: jest.fn(),
}));


describe("Tests Invite Component Page Renders", () => {

    const invite =  jest.fn().mockResolvedValue(
          { 
            inviteId: 1,
            senderId: 2,
          },
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

describe('Invite Component', () => {

    const mockGroup = {

        admin: 1,
        groupId: 2, 
        name: "Team Amazing", 
        participants: ["User1", "User2"]
    }

    const mockUser = {

       username: "User2"
    }

    const invite =  jest.fn().mockResolvedValue(
    
        {
          inviteId: 1,
          senderId: 2
        }
    );

  beforeEach(() => {
    FastApi.getGroup.mockResolvedValue(mockGroup);
    FastApi.getUsernameById.mockResolvedValue(mockUser);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches bout and invites and displays details', async () => {
      render(<InviteComponent invite={invite} />);

      // Wait for the API call to resolve and check if the details are displayed
      await waitFor(() => {
        
          expect(screen.getByText(`Join Team: ${mockGroup.name}`)).toBeInTheDocument();
          expect(screen.getByText(`Invited By: ${mockUser.username}`)).toBeInTheDocument();
          expect(screen.getByText('Accept')).toBeInTheDocument();
      });
    });

});
