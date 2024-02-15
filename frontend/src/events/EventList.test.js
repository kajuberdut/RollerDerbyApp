import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import EventList from './EventList';
import FastApi from '../Api'; 
import { useParams } from 'react-router-dom';
import { BrowserRouter } from "react-router-dom";

// * Passing as of 2/13/24
// npm test EventList.test.js
// must be in frontend directory 


// Mock FastApi methods
jest.mock('../Api', () => ({
  getBouts: jest.fn(),
  getMixers: jest.fn()
}));

// Mock useParams
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

describe('TeamDetails Component', () => {
    const mockBouts = [
      {
        eventId: 1,
        type: "bout",
        date: "2024-01-01",
        addressId: 1,
        time: "17:00",
        timeZone: "Mountain Time (MT): America/Denver (Denver, Phoenix, Salt Lake City)",
        theme: "Test Bout Theme1",
        description: "This are the bout one details...",
        level: "All Levels",
        coEd: false,
        ruleset: "WFTDA",
        floorType: "polished cement",
        jerseyColors: "green and pink",
        groupId: 3,
        chatId: 3,
        opposingTeam: "Opposing Team",
        team: "Hosting Team"
      }, 
      {
        eventId: 2,
        type: "bout",
        date: "2024-01-01",
        addressId: 2,
        time: "17:00",
        timeZone: "Mountain Time (MT): America/Denver (Denver, Phoenix, Salt Lake City)",
        theme: "Test Bout Theme2",
        description: "This are the bout two details...",
        level: "A",
        coEd: true,
        ruleset: "WFTDA",
        floorType: "polished cement",
        jerseyColors: "orange and black",
        groupId: 3,
        chatId: 3,
        opposingTeam: "Opposing Team",
        team: "Hosting Team"
      }
    ]

    const mockMixers = [
     {
        eventId: 3,
        type: "mixer",
        date: "2024-01-13",
        addressId: 2,
        time: "13:55",
        timeZone: " Mountain Time (MT): America/Denver (Denver, Phoenix, Salt Lake City)",
        theme: "Testing Theme Mixer",
        description: "blah blah blah",
        level: "B",
        coEd: false,
        ruleset: "USARS",
        floorType: "sticky",
        jerseyColors: "black and white",
        signupLink: "https://signup.com"
      }
  ]

  beforeEach(() => {
    FastApi.getBouts.mockResolvedValue(mockBouts);
    FastApi.getMixers.mockResolvedValue(mockMixers);
    useParams.mockReturnValue({ type: 'bouts' });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders event list page', () => {
    render(<EventList />);
  });


  it('fetches events and displays page details', async () => {
    render(
    <BrowserRouter>
        <EventList />
    </BrowserRouter>
    );

    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();

    // Wait for the API call to resolve and check if the details are displayed
    await waitFor(() => {
        expect(screen.getByText('State')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('City')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Zip Code')).toBeInTheDocument();
        expect(screen.getByText('Search')).toBeInTheDocument();
        expect(screen.getByText('Bouts')).toBeInTheDocument();
        expect(screen.getByText('Create')).toBeInTheDocument();
    });

    screen.debug()
  });

  test('matches snapshot', function() {
    const { asFragment } = render(<EventList />);
    expect(asFragment()).toMatchSnapshot(); 
  })

});

