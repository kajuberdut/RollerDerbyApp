import { render, screen } from '@testing-library/react';
import SearchBarEvents from './SearchBarEvents';

// npm test App.test.js
// must be in frontend directory 

test('renders SearchbarUsers', () => {
  render(<SearchBarEvents />);
//   const navbar = screen.getByRole('navigation'); 
//   expect(navbar).toBeInTheDocument();
});


test('matches snapshot', function() {
  const { asFragment } = render(<SearchBarEvents />);
  expect(asFragment()).toMatchSnapshot(); 
})

