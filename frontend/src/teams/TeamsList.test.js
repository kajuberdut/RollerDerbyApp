import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import TeamsList from './TeamsList'; 
import FastApi from '../Api'; 
import { BrowserRouter } from "react-router-dom";

// * Passing as of 2/15/24
// npm test TeamsList.test.js
// must be in frontend directory

// Mock FastApi methods
jest.mock('../Api', () => ({
  getTeams: jest.fn(),
}));

// Mock useParams
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

describe('TeamList Component', () => {
    const mockTeams = [
        { 
            groupId: 1,
            name: "Black and Blue",
        },
        { 
            groupId: 2,
            name: "Bold Bashers",
        }
    ]

  beforeEach(() => {
    FastApi.getTeams.mockResolvedValue(mockTeams);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches teams and displays page details', async () => {
    render(
    <BrowserRouter>
        <TeamsList />
    </BrowserRouter>
    );

    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();

    // Wait for the API call to resolve and check if the details are displayed
    await waitFor(() => {
        expect(screen.getByText('Create Team')).toBeInTheDocument();
        expect(screen.getByText('Teams')).toBeInTheDocument();
    });
  });

  it('fetches teams and displays team names', async () => {
    render(
        <BrowserRouter>
            <TeamsList />
        </BrowserRouter>
        );

    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();

    // Wait for the API call to resolve and check if the details are displayed
    await waitFor(() => {
      expect(screen.getByText(mockTeams[0].name)).toBeInTheDocument();
      expect(screen.getByText(mockTeams[1].name)).toBeInTheDocument();
    });

  });

  test('matches snapshot', function() {
    const { asFragment } = render(<TeamsList />);
    expect(asFragment()).toMatchSnapshot(); 
  })

});

