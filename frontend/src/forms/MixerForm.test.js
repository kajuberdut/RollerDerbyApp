import { render, screen, cleanup } from '@testing-library/react';
import MixerForm from './MixerForm';
import { UserProvider } from "../testUtils";
import { BrowserRouter } from "react-router-dom";
import '../setupTests.js';

// npm test MixerForm.test.js
// must be in frontend directory 

afterEach(() => {
    cleanup()
  })
  
describe("checks rendering of mixer form", () => {  

    test('renders mixer form page', () => {

    render(
        <BrowserRouter>
            <UserProvider>
                <MixerForm />
            </UserProvider>
        </BrowserRouter>);
    });


    test('matches snapshot', function() {
    const { asFragment } = render(
        <BrowserRouter>
            <UserProvider>
                <MixerForm />
            </UserProvider>
        </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot(); 
    })

});

describe("asserts mixer form text", () => {  

    test('renders mixer form page', () => {

    render(
        <BrowserRouter>
            <UserProvider>
                <MixerForm />
            </UserProvider>
        </BrowserRouter>
    )

        const text = screen.getByText('Create a Mixer');
        expect(text).toBeInTheDocument();
    });

});