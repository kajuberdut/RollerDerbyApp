import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import UserDetails from './UserDetails'; 
import FastApi from '../Api'; 
import { useParams } from 'react-router-dom';
import { BrowserRouter } from "react-router-dom";


// * Passing as of 2/15/24
// npm test UserDetails.test.js
// must be in frontend directory

// Mock FastApi methods
jest.mock('../Api', () => ({
  getOtherUser: jest.fn(),
  getImage: jest.fn(),
  getRuleset: jest.fn(),
  getPosition: jest.fn(),
  getLocation: jest.fn()
}));

// Mock useParams
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

describe('TeamDetails Component', () => {
    const mockOtherUser = {
        about: "This is my story...", 
        associatedLeagues: "Testing Associated Leagues",
        email: "testing@gmail.com",
        facebookName: "testing facebook name",
        insurance: [{userId: 2, insuranceId: 2, insuranceNumber: "12345"}],
        level: "B",
        locationId: 2, 
        position: [{userId: 2, positionId: 1}, {userId: 2, positionId: 2}, {userId: 2, positionId: 3}],
        primaryNumber: 1, 
        ruleset: [{userId: 2, rulesetId: 1}],
        userId: 2, 
        username: "User2"
    }

    const mockPositions = {
        position: "Jammer", 
        positionId: 1
    };

    const mockRulesets = {
        name: "WFTDA", 
        rulesetId: 1
    };

    const mockLocation = {
            locationId: 2,
            city: "Any City",
            state: "WY"
    };

    const mockImage = {
        image: "hadfhakjdhfahdfh"
    }


  beforeEach(() => {
    FastApi.getOtherUser.mockResolvedValue(mockOtherUser);
    FastApi.getImage.mockResolvedValue(mockImage);
    FastApi.getPosition.mockResolvedValue(mockPositions);
    FastApi.getRuleset.mockResolvedValue(mockRulesets);
    FastApi.getLocation.mockResolvedValue(mockLocation);
    useParams.mockReturnValue({ id: '2' });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches user, image, positions, rulesets, and locations, and displays page name and number', async () => {
    render(
    <BrowserRouter>
        <UserDetails />
    </BrowserRouter>
    );

    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();


    // Wait for the API call to resolve and check if the details are displayed
    await waitFor(() => {
        expect(screen.getByText('User2 #1')).toBeInTheDocument();
    });

  });

  it('fetches user, image, positions, rulesets, and locations, and displays location', async () => {
    render(
    <BrowserRouter>
        <UserDetails />
    </BrowserRouter>
    );

    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();


    // Wait for the API call to resolve and check if the details are displayed
    await waitFor(() => {
        expect(screen.getByText('Any City, WY')).toBeInTheDocument();
    });

  });

  it('fetches user, image, positions, rulesets, and displays messsage button', async () => {
    render(
    <BrowserRouter>
        <UserDetails />
    </BrowserRouter>
    );

    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();


    // Wait for the API call to resolve and check if the details are displayed
    await waitFor(() => {
        expect(screen.getByText('Message')).toBeInTheDocument();
    });

  });

  it('fetches user, image, positions, rulesets, and displays level', async () => {
    render(
    <BrowserRouter>
        <UserDetails />
    </BrowserRouter>
    );

    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();


    // Wait for the API call to resolve and check if the details are displayed
    await waitFor(() => {
        expect(screen.getByText('level')).toBeInTheDocument();
        expect(screen.getByText('B')).toBeInTheDocument();
    });

  });

  it('fetches user, image, positions, rulesets, and displays rulesets', async () => {
    render(
    <BrowserRouter>
        <UserDetails />
    </BrowserRouter>
    );

    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();


    // Wait for the API call to resolve and check if the details are displayed
    await waitFor(() => {
        expect(screen.getByText('known rulesets')).toBeInTheDocument();
        expect(screen.getByText('WFTDA')).toBeInTheDocument();
    });
  });

  it('fetches user, image, positions, rulesets, and displays about', async () => {
    render(
    <BrowserRouter>
        <UserDetails />
    </BrowserRouter>
    );

    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();


    // Wait for the API call to resolve and check if the details are displayed
    await waitFor(() => {
        expect(screen.getByText('About')).toBeInTheDocument();
        expect(screen.getByText('This is my story...')).toBeInTheDocument();
    });

  });

  it('fetches user, image, positions, rulesets, and displays associated leagues', async () => {
    render(
    <BrowserRouter>
        <UserDetails />
    </BrowserRouter>
    );

    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();


    // Wait for the API call to resolve and check if the details are displayed
    await waitFor(() => {
        expect(screen.getByText('Associated Leagues')).toBeInTheDocument();
        expect(screen.getByText('Testing Associated Leagues')).toBeInTheDocument();
    });
  });

  it('fetches user, image, positions, rulesets, and displays facebook name', async () => {
    render(
    <BrowserRouter>
        <UserDetails />
    </BrowserRouter>
    );

    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();


    // Wait for the API call to resolve and check if the details are displayed
    await waitFor(() => {
        expect(screen.getByText('You can find me on facebook: testing facebook name')).toBeInTheDocument();
    });

    screen.debug()
  });

});

