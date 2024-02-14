import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import Profile from './Profile';

// * Passing as of 2/13/24
// npm test Profile.test.js
// must be in frontend directory 


afterEach(() => {
  cleanup()
})


describe("Profile tests ", () => {

  test('renders profile page with user name and number', () => {
    render(
      <BrowserRouter> 
          <Profile/>
      </BrowserRouter>
    );
    const userTitle = screen.getByText('testUser #01'); 
    expect(userTitle).toBeInTheDocument();
  });

  test('renders profile page test level', () => {
    render(
      <BrowserRouter> 
          <Profile/>
      </BrowserRouter>
    );
    const level = screen.getByText('level'); 
    expect(level).toBeInTheDocument();
    const userLevel = screen.getByText('A'); 
    expect(userLevel).toBeInTheDocument();
  });

  test('renders profile page test facebook name', () => {
    render(
      <BrowserRouter> 
          <Profile/>
      </BrowserRouter>
    );
    const facebookName = screen.getByText('You can find me on facebook: facebook test user'); 
    expect(facebookName).toBeInTheDocument();
  });

  test('renders profile page test about', () => {
    render(
      <BrowserRouter> 
          <Profile/>
      </BrowserRouter>
    );
    const about = screen.getByText('About'); 
    expect(about).toBeInTheDocument();
    const userAbout = screen.getByText('This is my story...'); 
    expect(userAbout).toBeInTheDocument();
  });

  test('renders profile page test associated leagues', () => {
    render(
      <BrowserRouter> 
          <Profile/>
      </BrowserRouter>
    );
    const associatedLeagues = screen.getByText('Associated Leagues'); 
    expect(associatedLeagues).toBeInTheDocument();
    const userAssociatedLeagues = screen.getByText('Testing League'); 
    expect(userAssociatedLeagues).toBeInTheDocument();
  });

});

describe("Snapshot Profile", () => {
  
  test('matches snapshot', function() {
    const { asFragment } = render(<Profile />);
    expect(asFragment()).toMatchSnapshot(); 
  })
  
  
});