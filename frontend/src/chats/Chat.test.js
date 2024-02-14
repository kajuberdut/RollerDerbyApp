import { render, screen } from '@testing-library/react';
import Chat from './Chat';
import { UserProvider } from "../testUtils";
import { BrowserRouter } from "react-router-dom";
import '../setupTests.js';

// * Passing as of 2/13/24
// npm test Chat.test.js
// must be in frontend directory  

describe("Chat Page Render", () => {

  test('renders chat page', () => {
    
    render(
    <BrowserRouter>
            <Chat />
    </BrowserRouter>);

  });


  test('matches snapshot', function() {
    const { asFragment } = render(<Chat />);
    expect(asFragment()).toMatchSnapshot(); 
  })

})

describe("Chat Page Contents", () => {

  test('renders chat page', () => {
    
    render(
    <BrowserRouter>
            <Chat />
    </BrowserRouter>);

    const button = screen.getByText('Send'); 
    expect(button).toBeInTheDocument();

  });

})