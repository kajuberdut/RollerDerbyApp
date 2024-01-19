import { render, screen, cleanup } from '@testing-library/react';
import LoginForm from './LoginForm';
import { UserProvider } from "../testUtils";
import { BrowserRouter } from "react-router-dom";
import '../setupTests.js';

// npm test LoginForm.test.js
// must be in frontend directory 
// ! note that this should be navigating away if the user is present. Not sure what the deal is. 

afterEach(() => {
    cleanup()
  })
  
describe("checks rendering of login form", () => {  

    test('renders login form page', () => {

    render(
        <BrowserRouter>
            <UserProvider>
                <LoginForm />
            </UserProvider>
        </BrowserRouter>);
    });


    test('matches snapshot', function() {
    const { asFragment } = render(
        <BrowserRouter>
            <UserProvider>
                <LoginForm />
            </UserProvider>
        </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot(); 
    })

});

describe("asserts login form text", () => {  

    test('renders login form page', () => {

    render(
        <BrowserRouter>
            <UserProvider>
                <LoginForm />
            </UserProvider>
        </BrowserRouter>
    )

        const text = screen.getByText('Login');
        expect(text).toBeInTheDocument();
    });

});