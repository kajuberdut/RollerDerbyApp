import { render, screen, waitFor } from '@testing-library/react';
import CardComponent from './CardComponent.js';
import { BrowserRouter } from "react-router-dom";
import FastApi from '../../Api'; 

// * Passing as of 2/14/24
// npm test CardComponent.test.js
// must be in frontend directory 

// Mock FastApi methods
jest.mock('../../Api', () => ({
    getAddress: jest.fn()
  }));

// Mock useParams
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), 
    useParams: jest.fn(),
  }));

  let bout = {
    
        eventId: 1,
        type: "bout",
        date: "2024-01-25",
        addressId: 1,
        time: "19:10",
        timeZone: "Mountain Time (MT): America/Denver (Denver, Phoenix, Salt Lake City)",
        theme: "Theme Test 1",
        description: "Come have a blast and skate with us. It will be the ultimate skate party! ",
        level: "All Levels",
        coEd: false,
        ruleset: "WFTDA",
        floorType: "Slick",
        jerseyColors: "Black and White",
        groupId: 2,
        chatId: 2,
        opposingTeam: "Boulder",
        team: "Cheyenne Capidolls"
  }
  
describe("checks rendering of card component", () => {  

    test('renders card component form page', () => {

        render(
            <BrowserRouter>
                    <CardComponent bout={bout} />
            </BrowserRouter>);
        });


    test('matches snapshot', function() {
        const { asFragment } = render(
            <BrowserRouter>
                    <CardComponent bout={bout} />
            </BrowserRouter>
        );
        expect(asFragment()).toMatchSnapshot(); 
    })

    screen.debug()

});

describe("asserts card component text", () => {  

    const mockAddress = {
        streetAddress: '123 Main St',
        city: 'Anytown',
        state: 'State',
        zipCode: '12345',
      };

      beforeEach(() => {
        FastApi.getAddress.mockResolvedValue(mockAddress);
      });
    
      afterEach(() => {
        jest.clearAllMocks();
      });
    

    test('renders card theme on page', async () => {

        render(
            <BrowserRouter>
                    <CardComponent bout={bout} mixer={{}} />
            </BrowserRouter>
        )

        await waitFor(() => {
            expect(screen.getByText('Theme Test 1')).toBeInTheDocument();
            expect(screen.getByText('2024-01-25')).toBeInTheDocument();
            
        })

    });

    test('renders address on page', async () => {

        render(
            <BrowserRouter>
                    <CardComponent bout={bout} mixer={{}} />
            </BrowserRouter>
        )

        await waitFor(() => {
            expect(screen.getByText('Anytown, State')).toBeInTheDocument();
            expect(screen.getByText('Come have a blast and skate with us. It will be the ultimate skate party!')).toBeInTheDocument();
        })
    });

});