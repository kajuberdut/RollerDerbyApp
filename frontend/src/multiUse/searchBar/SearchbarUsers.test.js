import { render, screen } from '@testing-library/react';
import SearchBarUsers from './SearchBarUsers';

// npm test App.test.js
// must be in frontend directory 

test('renders SearchbarUsers', () => {
  render(<SearchBarUsers />);
//   const navbar = screen.getByRole('navigation'); 
//   expect(navbar).toBeInTheDocument();
});


test('matches snapshot', function() {
  const { asFragment } = render(<SearchBarUsers />);
  expect(asFragment()).toMatchSnapshot(); 
})

