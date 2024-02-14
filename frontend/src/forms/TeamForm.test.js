import { render, screen, cleanup } from '@testing-library/react';
import TeamForm from './TeamForm';
import { BrowserRouter } from "react-router-dom";
import '../setupTests.js';

// * Passing as of 2/13/24
// npm test TeamForm.test.js
// must be in frontend directory 

afterEach(() => {
    cleanup()
  })
  
describe("checks rendering of team form", () => {  

    test('renders team form page', () => {

    render(
        <BrowserRouter>
                <TeamForm />
        </BrowserRouter>);
    });


    test('matches snapshot', function() {
    const { asFragment } = render(
        <BrowserRouter>
                <TeamForm />
        </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot(); 
    })

});

describe("asserts team form text", () => {  

    test('renders team form page', () => {

    render(
        <BrowserRouter>
                <TeamForm />
        </BrowserRouter>
    )

        const text = screen.getByText('Create a Team');
        expect(text).toBeInTheDocument();
    });

});