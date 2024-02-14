import { render, screen, cleanup } from '@testing-library/react';
import SetupProfileForm from './SetupProfileForm.js';
import { BrowserRouter } from "react-router-dom";
import '../setupTests.js';

// * Passing as of 2/13/24
// npm test BoutForm.test.js
// must be in frontend directory 

afterEach(() => {
    cleanup()
  })
  
describe("checks rendering of profile form", () => {  

    test('renders profile form page', () => {

    render(
        <BrowserRouter>
                <SetupProfileForm/>
        </BrowserRouter>);
    });


    test('matches snapshot', function() {
    const { asFragment } = render(
        <BrowserRouter>
                <SetupProfileForm />
        </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot(); 
    })

});

describe("asserts bout form text", () => {  

    test('renders bout form page', () => {

    render(
        <BrowserRouter>
                <SetupProfileForm />
        </BrowserRouter>
    )

        const text = screen.getByText('Setup Public Profile');
        expect(text).toBeInTheDocument();
    });

});