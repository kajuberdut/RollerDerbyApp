import { render, screen } from '@testing-library/react';
import React from 'react';
import Navbar from './NavBar';
import { BrowserRouter } from "react-router-dom";
import '../setupTests.js';

// * Passing as of 2/14/24
// npm test Navbar.test.js
// must be in frontend directory 

describe("user logged in", () => {  

    test('renders NavBar component', () => {
      render(
      <BrowserRouter>
              <Navbar />
      </BrowserRouter>
      );
    });

    test('matches snapshot', function() {
      const { asFragment } = render(  
        <BrowserRouter>
                <Navbar />
        </BrowserRouter>);
      expect(asFragment()).toMatchSnapshot(); 
    })


    test('renders brand and links', () => {
      render(
        <BrowserRouter>
                <Navbar logout={jest.fn()} />
        </BrowserRouter>
      );

      expect(screen.getByText('Block Party')).toBeInTheDocument;
      expect(screen.getByText('Profile')).toBeInTheDocument;
      expect(screen.getByText('Mixers')).toBeInTheDocument;
      expect(screen.getByText('Bouts')).toBeInTheDocument;
      expect(screen.getByText('Logout')).toBeInTheDocument;

    });

});

describe("user logged out", () => {  

  test('renders login link when no user is present', () => {
    localStorage.setItem("user", null);
    render(
      <BrowserRouter>
          <Navbar />
      </BrowserRouter>
    );

    const loginLink = screen.getByText('Login'); 

    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute('href', '/login');
});

  test('renders signup link when no user is present', () => {
    localStorage.setItem("user", null);
    render(
      <BrowserRouter>
          <Navbar />
      </BrowserRouter>
    );

    const signupLink = screen.getByText('Signup'); 

    expect(signupLink).toBeInTheDocument();
    expect(signupLink).toHaveAttribute('href', '/signup');
  });

  test('renders block party when no user is present', () => {
    localStorage.setItem("user", null);
    render(
      <BrowserRouter>
          <Navbar />
      </BrowserRouter>
    );

    expect(screen.getByText('Block Party')).toBeInTheDocument();
  });

});

