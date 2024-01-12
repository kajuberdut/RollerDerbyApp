import { render, screen } from '@testing-library/react';
import Navbar from './NavBar';
import { Nav } from 'reactstrap';

// npm test Navbar.test.js
// must be in frontend directory 

test('renders NavBar component', () => {
  render(<Navbar />);
//   const navbar = screen.getByRole('navigation'); 
//   expect(navbar).toBeInTheDocument();
});


test('matches snapshot', function() {
  const { asFragment } = render(<Navbar />);
  expect(asFragment()).toMatchSnapshot(); 
})

