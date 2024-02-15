import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import UserList from './UserList'; 
import FastApi from '../Api'; 
import { BrowserRouter } from "react-router-dom";

// * Passing as of 2/15/24
// npm test UserList.test.js
// must be in frontend directory

// Mock FastApi methods
jest.mock('../Api', () => ({
  getUsers: jest.fn(),
}));


describe('UserList Component', () => {
    const mockUsers = [
      { 
        userId: 1,
        username: "testUser",
        image: null
      },
      { 
          userId: 2,
          username: "User2",
          image: null
      },
      { 
          userId: 3,
          username: "User3",
          image: null
      }
    ]

  beforeEach(() => {
    FastApi.getUsers.mockResolvedValue(mockUsers);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches users and displays page details', async () => {
    render(
    <BrowserRouter>
        <UserList />
    </BrowserRouter>
    );

    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();

    // Wait for the API call to resolve and check if the details are displayed
    await waitFor(() => {
        expect(screen.getByText('Search')).toBeInTheDocument();
        expect(screen.getByText('Users')).toBeInTheDocument();
    });

  });

  it('fetches users and users names', async () => {
    render(
    <BrowserRouter>
        <UserList />
    </BrowserRouter>
    );

    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();

    // Wait for the API call to resolve and check if the details are displayed
    await waitFor(() => {
        expect(screen.getByText('User2')).toBeInTheDocument();
        expect(screen.getByText('User3')).toBeInTheDocument();
    });

  });

  it('fetches users and does not show current users name', async () => {
    render(
    <BrowserRouter>
        <UserList />
    </BrowserRouter>
    );

    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();

    // Wait for the API call to resolve and check if the details are displayed
    await waitFor(() => {
        expect(screen.queryByText('testUser')).not.toBeInTheDocument();
    });

  });


  test('matches snapshot', function() {
    const { asFragment } = render(<UserList />);
    expect(asFragment()).toMatchSnapshot(); 
  })

});

