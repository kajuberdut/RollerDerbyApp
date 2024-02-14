import { render, screen, cleanup } from '@testing-library/react';
import SetupPrivateDetailsForm from './SetupPrivateDetailsForm.js';
import { BrowserRouter } from "react-router-dom";
import '../setupTests.js';

// * Passing as of 2/13/24
// npm test BoutForm.test.js
// must be in frontend directory 

afterEach(() => {
    cleanup()
  })
  
describe("checks rendering of private details form", () => {  

    test('renders bout form page', () => {

    render(
        <BrowserRouter>
                <SetupPrivateDetailsForm/>
        </BrowserRouter>);
    });


    test('matches snapshot', function() {
    const { asFragment } = render(
        <BrowserRouter>
                <SetupPrivateDetailsForm />
        </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot(); 
    })

});

describe("asserts bout form text", () => {  

    test('renders bout form page', () => {

    render(
        <BrowserRouter>
                <SetupPrivateDetailsForm />
        </BrowserRouter>
    )

        const text = screen.getByText('Private Details');
        expect(text).toBeInTheDocument();
    });

});