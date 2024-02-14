import { render, screen, cleanup } from '@testing-library/react';
import MixerForm from './MixerForm';
import { BrowserRouter } from "react-router-dom";
import '../setupTests.js';

// * Passing as of 2/13/24
// npm test MixerForm.test.js
// must be in frontend directory 

afterEach(() => {
    cleanup()
  })
  
describe("checks rendering of mixer form", () => {  

    test('renders mixer form page', () => {

    render(
        <BrowserRouter>
                <MixerForm />
        </BrowserRouter>);
    });


    test('matches snapshot', function() {
    const { asFragment } = render(
        <BrowserRouter>
                <MixerForm />
        </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot(); 
    })

});

describe("asserts mixer form text", () => {  

    test('renders mixer form page', () => {

    render(
        <BrowserRouter>
                <MixerForm />
        </BrowserRouter>
    )

        const text = screen.getByText('Create a Mixer');
        expect(text).toBeInTheDocument();
    });

});