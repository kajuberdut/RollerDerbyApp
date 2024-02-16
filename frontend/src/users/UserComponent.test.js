import { render, screen, waitFor } from '@testing-library/react';
import UserComponent from './UserComponent.js';
import { BrowserRouter } from "react-router-dom";
import FastApi from '../Api'; 

// * Passing as of 2/14/24
// npm test UserComponent.test.js
// must be in frontend directory 

// Mock FastApi methods
jest.mock('../Api', () => ({
    addTeamInvite: jest.fn()
  }));

// Mock useParams
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), 
    useParams: jest.fn(),
  }));

describe("checks rendering of card component", () => {  

    let indUser = {
        userId: 2, 
        image: "afjakjdfkjkl",
        username: "User2"
    }

    test('renders card component form page', () => {

        render(
            <BrowserRouter>
                    <UserComponent indUser={indUser} />
            </BrowserRouter>);
        });


    test('matches snapshot', function() {
        const { asFragment } = render(
            <BrowserRouter>
                    <UserComponent indUser={indUser} />
            </BrowserRouter>
        );
        expect(asFragment()).toMatchSnapshot(); 
    })


});

describe("asserts user component text", () => {  

    let indUser = {
        userId: 2, 
        image: "afjakjdfkjkl",
        username: "User2"
    }

    const mockAddTeamInvite = {
      };

      beforeEach(() => {
        FastApi.addTeamInvite.mockResolvedValue(mockAddTeamInvite);
      });
    
      afterEach(() => {
        jest.clearAllMocks();
      });
    

    test('renders card details on page', async () => {

        render(
            <BrowserRouter>
                    <UserComponent indUser={indUser} />
            </BrowserRouter>
        )

        await waitFor(() => {
            expect(screen.getByText('User2')).toBeInTheDocument();
            expect(screen.queryByText('Invite')).toBeInTheDocument();
            
        })

    });

});