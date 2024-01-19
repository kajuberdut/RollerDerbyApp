import { render, screen, cleanup } from '@testing-library/react';
import SetupProfileForm from './SetupProfileForm.js';
import { UserProvider } from "../testUtils";
import { BrowserRouter } from "react-router-dom";
import '../setupTests.js';

// ! need to mock local storage for user I think
// npm test BoutForm.test.js
// must be in frontend directory 

afterEach(() => {
    cleanup()
  })
  
describe("checks rendering of profile form", () => {  

    test('renders profile form page', () => {

    render(
        <BrowserRouter>
            <UserProvider>
                <SetupProfileForm/>
            </UserProvider>
        </BrowserRouter>);
    });


    test('matches snapshot', function() {
    const { asFragment } = render(
        <BrowserRouter>
            <UserProvider>
                <SetupProfileForm />
            </UserProvider>
        </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot(); 
    })

});

describe("asserts bout form text", () => {  

    test('renders bout form page', () => {

    render(
        <BrowserRouter>
            <UserProvider>
                <SetupProfileForm />
            </UserProvider>
        </BrowserRouter>
    )

        const text = screen.getByText('Setup Public Profile');
        expect(text).toBeInTheDocument();
    });

});