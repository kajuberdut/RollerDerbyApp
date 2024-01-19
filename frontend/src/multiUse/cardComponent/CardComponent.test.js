import { render, screen, cleanup } from '@testing-library/react';
import CardComponent from './CardComponent.js';
import { UserProvider } from "../../testUtils";
import { BrowserRouter } from "react-router-dom";
import '../../setupTests.js';

// npm test BoutForm.test.js
// must be in frontend directory 

afterEach(() => {
    cleanup()
  })

  let bout = {
        "eventId": 1,
        "type": "bout",
        "date": "2024-01-25",
        "addressId": 1,
        "time": "19:10",
        "timeZone": "Mountain Time (MT): America/Denver (Denver, Phoenix, Salt Lake City)",
        "theme": "Theme Test 1",
        "description": "Come have a blast and skate with us. It will be the ultimate skate party! ",
        "level": "All Levels",
        "coEd": false,
        "ruleset": "WFTDA",
        "floorType": "Slick",
        "jerseyColors": "Black and White",
        "groupId": 2,
        "chatId": 2,
        "opposingTeam": "Boulder",
        "team": "Cheyenne Capidolls"
  }
  
describe("checks rendering of card component", () => {  

    test('renders card component form page', () => {

    render(
        <BrowserRouter>
            <UserProvider>
                <CardComponent bout={bout} />
            </UserProvider>
        </BrowserRouter>);
    });


    test('matches snapshot', function() {
    const { asFragment } = render(
        <BrowserRouter>
            <UserProvider>
                <CardComponent bout={bout} />
            </UserProvider>
        </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot(); 
    })

});

describe("asserts card component text", () => {  

    test('renders card theme on page', () => {

    render(
        <BrowserRouter>
            <UserProvider>
                <CardComponent bout={bout} />
            </UserProvider>
        </BrowserRouter>
    )

        const text = screen.getByText('Theme Test 1');
        expect(text).toBeInTheDocument();
    });

});