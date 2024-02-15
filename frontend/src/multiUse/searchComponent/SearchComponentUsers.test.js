import { render, screen } from '@testing-library/react';
import SearchComponentUsers from './SearchComponentUsers';

// * Passing as of 2/14/24
// npm test SearchComponentUsers.test.js
// must be in frontend directory 

test('renders SearchComponentUsers', () => {
  render(<SearchComponentUsers />);
});


test('matches snapshot', function() {
  const { asFragment } = render(<SearchComponentUsers />);
  expect(asFragment()).toMatchSnapshot(); 
})

