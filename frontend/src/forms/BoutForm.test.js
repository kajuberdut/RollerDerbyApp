import { render, screen, cleanup } from '@testing-library/react';
import BoutForm from './BoutForm';
import { UserProvider } from "../testUtils";
import { BrowserRouter } from "react-router-dom";
import '../setupTests.js';

// npm test BoutForm.test.js
// must be in frontend directory 

afterEach(() => {
    cleanup()
  })
  
describe("checks rendering of bout form", () => {  

    test('renders bout form page', () => {

    render(
        <BrowserRouter>
            <UserProvider>
                <BoutForm />
            </UserProvider>
        </BrowserRouter>);
    });


    test('matches snapshot', function() {
    const { asFragment } = render(
        <BrowserRouter>
            <UserProvider>
                <BoutForm />
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
                <BoutForm />
            </UserProvider>
        </BrowserRouter>
    )

        const text = screen.getByText('Create a Bout');
        expect(text).toBeInTheDocument();
    });

});