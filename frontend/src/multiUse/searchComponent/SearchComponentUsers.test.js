import { render, screen } from '@testing-library/react';
import SearchComponentUsers from './SearchComponentUsers';

// npm test App.test.js
// must be in frontend directory 

test('renders SearchComponentUsers', () => {
  render(<SearchComponentUsers />);
  // const navbar = screen.getByRole('navigation'); 
  // expect(navbar).toBeInTheDocument();
});


test('matches snapshot', function() {
  const { asFragment } = render(<SearchComponentUsers />);
  expect(asFragment()).toMatchSnapshot(); 
})

