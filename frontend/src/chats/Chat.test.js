import { render, screen } from '@testing-library/react';
import Chat from './ChatDetails';
import { UserProvider } from "../testUtils";
import { BrowserRouter } from "react-router-dom";
import '../setupTests.js';

// npm test ChatDetails.test.js
// must be in frontend directory 
// ! will need to rewrite these
// ! it wants a user.userId which is listed in testUtils but not sure how to access that 

test('renders chat page', () => {
  
  render(
  <BrowserRouter>
      <UserProvider>
          <Chat />
      </UserProvider>
  </BrowserRouter>);

});


// test('matches snapshot', function() {
//   const { asFragment } = render(<ChatDetails />);
//   expect(asFragment()).toMatchSnapshot(); 
// })

