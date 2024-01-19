import { render, screen, cleanup } from '@testing-library/react';
import SignupForm from './SignupForm';
import { UserProvider } from "../testUtils";
import { BrowserRouter } from "react-router-dom";
import '../setupTests.js';

// npm test LoginForm.test.js
// must be in frontend directory 
// ? note that this should be navigating away if the user is present. Not sure what the deal is. 

afterEach(() => {
    cleanup()
  })
  
describe("checks rendering of signup form", () => {  

    test('renders signup form page', () => {

    render(
        <BrowserRouter>
            <UserProvider>
                <SignupForm />
            </UserProvider>
        </BrowserRouter>);
    });


    test('matches snapshot', function() {
    const { asFragment } = render(
        <BrowserRouter>
            <UserProvider>
                <SignupForm />
            </UserProvider>
        </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot(); 
    })

});

describe("asserts signup form text", () => {  

    test('renders signup form page', () => {

    render(
        <BrowserRouter>
            <UserProvider>
                <SignupForm />
            </UserProvider>
        </BrowserRouter>
    )

        const text = screen.getByText('Create a profile');
        expect(text).toBeInTheDocument();
    });

});