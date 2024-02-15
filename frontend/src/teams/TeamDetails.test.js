import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import TeamDetails from './TeamDetails'; 
import FastApi from '../Api'; 
import { useParams } from 'react-router-dom';
import { BrowserRouter } from "react-router-dom";

// * Passing as of 2/15/24
// npm test TeamDetails.test.js
// must be in frontend directory

// Mock FastApi methods
jest.mock('../Api', () => ({
  getGroup: jest.fn(),
  getPendingInvites: jest.fn(),
  getUsernameById: jest.fn()
}));

// Mock useParams
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

describe('TeamDetails Component', () => {
    const mockGroup = {
        admin: 1, 
        groupId: 2,
        name: "Black and Blue",
        participants: ["User1, User2"]
    }

    const mockUser = {
        username: "User3"
    };

    const mockPendingInvites = [{
            teamId: 2,
            recipientId: 3,
            status: "pending"
    }];


  beforeEach(() => {
    FastApi.getGroup.mockResolvedValue(mockGroup);
    FastApi.getPendingInvites.mockResolvedValue(mockPendingInvites);
    FastApi.getUsernameById.mockResolvedValue(mockUser);
    useParams.mockReturnValue({ id: '2' });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches team, user and pending invites, and displays page details', async () => {
    render(
    <BrowserRouter>
        <TeamDetails />
    </BrowserRouter>
    );

    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();


    // Wait for the API call to resolve and check if the details are displayed
    await waitFor(() => {
        expect(screen.getByText('Create Excel')).toBeInTheDocument();
        expect(screen.getByText('Download')).toBeInTheDocument();
        expect(screen.getByText('Participants:')).toBeInTheDocument();
        expect(screen.getByText('Pending Invites:')).toBeInTheDocument();
        expect(screen.getByText('Search')).toBeInTheDocument();
    });
  });

  it('fetches team, user and pending invites, and displays team name', async () => {
    render(
        <BrowserRouter>
            <TeamDetails />
        </BrowserRouter>
        );

    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();

    // Wait for the API call to resolve and check if the details are displayed
    await waitFor(() => {
      expect(screen.getByText(mockGroup.name)).toBeInTheDocument();
    });
  });


  it('fetches team, user and pending invites, and displays participants and remove button', async () => {
    render(
        <BrowserRouter>
            <TeamDetails />
        </BrowserRouter>
        );

    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();

    // Wait for the API call to resolve and check if the details are displayed
    await waitFor(() => {
      expect(screen.getByText('User1, User2')).toBeInTheDocument();
      expect(screen.getByText('Remove')).toBeInTheDocument();
    });
  });

  it('fetches team, user and pending invites, and displays pending invites', async () => {
    render(
        <BrowserRouter>
            <TeamDetails />
        </BrowserRouter>
        );

    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();

    // Wait for the API call to resolve and check if the details are displayed
    await waitFor(() => {
      expect(screen.getByText('User3')).toBeInTheDocument();
      });

  });

});

