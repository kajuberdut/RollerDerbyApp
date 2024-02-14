import { render, screen, cleanup } from '@testing-library/react';
import SignupForm from './SignupForm';
import { BrowserRouter } from "react-router-dom";
import '../setupTests.js';

// * Passing as of 2/13/24
// npm test SignupForm.test.js
// must be in frontend directory 

afterEach(() => {
    cleanup()
  })
  
describe("checks rendering of signup form", () => {  

    test('renders signup form page', () => {

    render(
        <BrowserRouter>
                <SignupForm setIsSignupVis={jest.fn()} />
        </BrowserRouter>);
    });


    test('matches snapshot', function() {
    const { asFragment } = render(
        <BrowserRouter>
                <SignupForm setIsSignupVis={jest.fn()} />
        </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot(); 
    })

});

describe("asserts signup form text", () => {  

    test('renders signup form page', () => {

    render(
        <BrowserRouter>
                <SignupForm setIsSignupVis={jest.fn()} />
        </BrowserRouter>
    )

        const text = screen.getByText('Create a profile');
        expect(text).toBeInTheDocument();
    });

});