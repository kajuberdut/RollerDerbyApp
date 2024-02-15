import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BoutDetails from './BoutDetails'; 
import FastApi from '../Api'; 
import { useParams } from 'react-router-dom';

// * Passing as of 2/14/24
// npm test BoutDetails.test.js
// must be in frontend directory

// Mock FastApi methods
jest.mock('../Api', () => ({
  getBout: jest.fn(),
  getAddress: jest.fn(),
  addUserToGroup: jest.fn(),
}));

// Mock useParams
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // import and spread the actual module
  useParams: jest.fn(),
}));

describe('BoutDetails Component', () => {
  const mockBout = {
      eventId: 1,
      type: "bout",
      date: "2024-01-01",
      addressId: 1,
      time: "17:00",
      timeZone: "Mountain Time (MT): America/Denver (Denver, Phoenix, Salt Lake City)",
      theme: "Test Theme",
      description: "This are the details...",
      level: "All Levels",
      coEd: false,
      ruleset: "WFTDA",
      floorType: "polished cement",
      jerseyColors: "green and pink",
      groupId: 3,
      chatId: 3,
      opposingTeam: "Opposing Team",
      team: "Hosting Team"
    }

  const mockAddress = {
    streetAddress: '123 Main St',
    city: 'Anytown',
    state: 'State',
    zipCode: '12345',
    // Add other necessary mock address details here
  };

  beforeEach(() => {
    FastApi.getBout.mockResolvedValue(mockBout);
    FastApi.getAddress.mockResolvedValue(mockAddress);
    FastApi.addUserToGroup.mockResolvedValue({ success: true });
    useParams.mockReturnValue({ id: '1' });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches bout and address details and displays theme and date', async () => {
    render(<BoutDetails getAllChats={() => {}} />);

    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();

    // Wait for the API call to resolve and check if the details are displayed
    await waitFor(() => {
      expect(screen.getByText(mockBout.theme)).toBeInTheDocument();
      expect(screen.getByText(mockBout.date)).toBeInTheDocument();
    });
  });

  it('fetches bout and address details and displays level', async () => {
    render(<BoutDetails getAllChats={() => {}} />);

    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();

    // Wait for the API call to resolve and check if the details are displayed
    await waitFor(() => {
      expect(screen.getByText('level')).toBeInTheDocument();
      expect(screen.getByText(mockBout.level)).toBeInTheDocument();
    });
  });


  it('fetches bout and address details and displays ruleset', async () => {
    render(<BoutDetails getAllChats={() => {}} />);

    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();

    // Wait for the API call to resolve and check if the details are displayed
    await waitFor(() => {
      expect(screen.getByText('ruleset')).toBeInTheDocument();
      expect(screen.getByText(mockBout.ruleset)).toBeInTheDocument();
    });
  });

  it('fetches bout and address details and displays time', async () => {
    render(<BoutDetails getAllChats={() => {}} />);

    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();

    // Wait for the API call to resolve and check if the details are displayed
    await waitFor(() => {
      expect(screen.getByText('Time')).toBeInTheDocument();
      expect(screen.getByText(mockBout.time)).toBeInTheDocument();
      });
  });

  it('fetches bout and address details and displays details', async () => {
    render(<BoutDetails getAllChats={() => {}} />);

    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();

    // Wait for the API call to resolve and check if the details are displayed
    await waitFor(() => {
      expect(screen.getByText('Details')).toBeInTheDocument();
      expect(screen.getByText(`${mockBout.team} vs. ${mockBout.opposingTeam}`)).toBeInTheDocument();
    });
  });

  it('fetches bout and address details and displays floor type', async () => {
    render(<BoutDetails getAllChats={() => {}} />);

    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();

    // Wait for the API call to resolve and check if the details are displayed
    await waitFor(() => {
      expect(screen.getByText('Floor Type')).toBeInTheDocument();
      expect(screen.getByText(mockBout.floorType)).toBeInTheDocument();
    });
  });

  it('fetches bout and address details and displays description', async () => {
    render(<BoutDetails getAllChats={() => {}} />);

    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();

    // Wait for the API call to resolve and check if the details are displayed
    await waitFor(() => {
      expect(screen.getByText('Description')).toBeInTheDocument();
      expect(screen.getByText(mockBout.description)).toBeInTheDocument();

    });
  });


  it('fetches bout and address details and displays address details', async () => {
    render(<BoutDetails getAllChats={() => {}} />);

    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();

    // Wait for the API call to resolve and check if the details are displayed
    await waitFor(() => {
      expect(screen.getByText(mockAddress.streetAddress)).toBeInTheDocument();
      expect(screen.getByText(`${mockAddress.city}, ${mockAddress.state} ${mockAddress.zipCode}`)).toBeInTheDocument();
    });

  });


  it('allows a user to join a chat and updates the UI on success', async () => {
    render(<BoutDetails getAllChats={() => {}} />);

    // Wait for the component to finish loading
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });

    await waitFor(() => {
      // Simulate clicking the "Join Chat" button
        userEvent.click(screen.getByText(/join chat/i));
        // Check for the success message
        expect(screen.getByText(/connected. check your chats./i)).toBeInTheDocument();
    });
  });

});

