import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MixerDetails from './MixerDetails';
import FastApi from '../Api'; 
import { useParams } from 'react-router-dom';


//  Passing as of 2/13/24
// npm test MixerDetails.test.js
// must be in frontend directory 

// Mock FastApi methods
// This is where your error about mockResolvedValue was coming from
jest.mock('../Api', () => ({
  getMixer: jest.fn(),
  getAddress: jest.fn(),
  addUserToGroup: jest.fn(),
}));

// Mock useParams
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // import and spread the actual module
  useParams: jest.fn(),
}));

describe('MixerDetails Component', () => {
  const mockMixer = {
    eventId: 2,
		type: "mixer",
	  date: "2024-01-13",
		addressId: 2,
		time: "13:55",
		timeZone: " Mountain Time (MT): America/Denver (Denver, Phoenix, Salt Lake City)",
		theme: "HOLIDAY CHEER MIxer",
		description: "blah blah blah",
	  level: "AA",
		coEd: false,
		ruleset: "WFTDA",
		floorType: "polished concrete",
		jerseyColors: "pink and green",
		signupLink: "https://signup.com"
	}

  const mockAddress = {
    streetAddress: '123 Main St',
    city: 'Anytown',
    state: 'State',
    zipCode: '12345',
    // Add other necessary mock address details here
  };

  beforeEach(() => {
    FastApi.getMixer.mockResolvedValue(mockMixer);
    FastApi.getAddress.mockResolvedValue(mockAddress);
    FastApi.addUserToGroup.mockResolvedValue({ success: true });
    useParams.mockReturnValue({ id: '1' });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders mixer details page', () => {
    render(<MixerDetails />);
  });


  test('matches snapshot', function() {
    const { asFragment } = render(<MixerDetails />);
    expect(asFragment()).toMatchSnapshot(); 
  })

  test('renders loading when mixer details has not resolved', () => {
      
    render(<MixerDetails />);

    const loading = screen.getByTestId('loading-indicator');
    expect(loading).toBeInTheDocument();

});

it('fetches mixer and address details and displays theme and date', async () => {
  render(<MixerDetails getAllChats={() => {}} />);

  expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();

  // Wait for the API call to resolve and check if the details are displayed
  await waitFor(() => {
    expect(screen.getByText(mockMixer.theme)).toBeInTheDocument();
    expect(screen.getByText(mockMixer.date)).toBeInTheDocument();
  });
});

it('fetches mixer and address details and displays level', async () => {
  render(<MixerDetails getAllChats={() => {}} />);

  expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();

  // Wait for the API call to resolve and check if the details are displayed
  await waitFor(() => {
    expect(screen.getByText('level')).toBeInTheDocument();
    expect(screen.getByText(mockMixer.level)).toBeInTheDocument();
  });
});

it('fetches mixer and address details and displays ruleset', async () => {
  render(<MixerDetails getAllChats={() => {}} />);

  expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();

  // Wait for the API call to resolve and check if the details are displayed
  await waitFor(() => {
    expect(screen.getByText('ruleset')).toBeInTheDocument();
    expect(screen.getByText(mockMixer.ruleset)).toBeInTheDocument();
  });
});

it('fetches mixer and address details and displays time', async () => {
  render(<MixerDetails getAllChats={() => {}} />);

  expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();

  // Wait for the API call to resolve and check if the details are displayed
  await waitFor(() => {
    expect(screen.getByText('Time')).toBeInTheDocument();
    expect(screen.getByText(mockMixer.time)).toBeInTheDocument();
    });
});


it('fetches mixer and address details and displays signup', async () => {
  render(<MixerDetails getAllChats={() => {}} />);

  expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();

  // Wait for the API call to resolve and check if the details are displayed
  await waitFor(() => {
    expect(screen.getByText('Signup Here')).toBeInTheDocument();
    expect(screen.getByText(mockMixer.signupLink)).toBeInTheDocument();
  });
});

it('fetches mixer and address details and displays floor type', async () => {
  render(<MixerDetails getAllChats={() => {}} />);

  expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();

  // Wait for the API call to resolve and check if the details are displayed
  await waitFor(() => {
    expect(screen.getByText('Floor Type')).toBeInTheDocument();
    expect(screen.getByText(mockMixer.floorType)).toBeInTheDocument();
  });
});

it('fetches mixer and address details and displays floor type', async () => {
  render(<MixerDetails getAllChats={() => {}} />);

  expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();

  // Wait for the API call to resolve and check if the details are displayed
  await waitFor(() => {
    expect(screen.getByText('Floor Type')).toBeInTheDocument();
    expect(screen.getByText(mockMixer.floorType)).toBeInTheDocument();
  });

});

it('fetches mixer and address details and displays address details', async () => {
  render(<MixerDetails getAllChats={() => {}} />);

  expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();

  // Wait for the API call to resolve and check if the details are displayed
  await waitFor(() => {
    expect(screen.getByText(mockAddress.streetAddress)).toBeInTheDocument();
    expect(screen.getByText(`${mockAddress.city}, ${mockAddress.state} ${mockAddress.zipCode}`)).toBeInTheDocument();
  });

});

it('allows a user to join a chat and updates the UI on success', async () => {
  render(<MixerDetails getAllChats={() => {}} />);

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