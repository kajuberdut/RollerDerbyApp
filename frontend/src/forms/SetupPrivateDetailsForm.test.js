import { render, screen, cleanup } from '@testing-library/react';
import SetupPrivateDetailsForm from './SetupPrivateDetailsForm.js';
import { UserProvider } from "../testUtils";
import { BrowserRouter } from "react-router-dom";
import '../setupTests.js';

// ! need to mock local storage for user I think
// npm test BoutForm.test.js
// must be in frontend directory 

afterEach(() => {
    cleanup()
  })
  
describe("checks rendering of private details form", () => {  

    test('renders bout form page', () => {

    render(
        <BrowserRouter>
            <UserProvider>
                <SetupPrivateDetailsForm/>
            </UserProvider>
        </BrowserRouter>);
    });


    test('matches snapshot', function() {
    const { asFragment } = render(
        <BrowserRouter>
            <UserProvider>
                <SetupPrivateDetailsForm />
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
                <SetupPrivateDetailsForm />
            </UserProvider>
        </BrowserRouter>
    )

        const text = screen.getByText('Private Details');
        expect(text).toBeInTheDocument();
    });

});