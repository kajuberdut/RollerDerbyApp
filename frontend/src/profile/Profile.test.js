import { render, screen, cleanup, act } from '@testing-library/react';
import { UserProvider } from "../testUtils";
import { BrowserRouter } from "react-router-dom";
import Profile from './Profile';

// ! need to mock api requests 
// npm test Profile.test.js
// must be in frontend directory 


afterEach(() => {
  cleanup()
})


describe("Profile tests ", () => {

test('renders profile page', () => {
  render(
      <BrowserRouter> 
      <UserProvider>
          <AllRoutes>
                <Profile/>
          </AllRoutes>
      </UserProvider>
    </BrowserRouter>
  );
  const title = screen.getByText('Bouts'); 
  expect(title).toBeInTheDocument();
});


});

describe("Snapshot Profile", () => {
  
  test('matches snapshot', function() {
    const { asFragment } = render(<Profile />);
    expect(asFragment()).toMatchSnapshot(); 
  })
  
  
});