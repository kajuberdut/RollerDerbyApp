import { render, screen, cleanup } from '@testing-library/react';
import LoginForm from './LoginForm';
import { BrowserRouter } from "react-router-dom";
import '../setupTests.js';

// * Passing as of 2/13/24
// npm test LoginForm.test.js
// must be in frontend directory 

afterEach(() => {
    cleanup()
  })
  
describe("checks rendering of login form", () => {  

    test('renders login form page', () => {

    render(
        <BrowserRouter>
                <LoginForm setIsLoginVis={jest.fn()} />
        </BrowserRouter>);
    });


    test('matches snapshot', function() {
    const { asFragment } = render(
        <BrowserRouter>
                <LoginForm setIsLoginVis={jest.fn()} />
        </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot(); 
    })

});

describe("asserts login form text", () => {  

    test('renders login form page', () => {

    render(
        <BrowserRouter>
                <LoginForm setIsLoginVis={jest.fn()} />
        </BrowserRouter>
    )

        const text = screen.getByText('Login');
        expect(text).toBeInTheDocument();
    });

});