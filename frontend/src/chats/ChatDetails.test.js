import { render, screen } from '@testing-library/react';
import ChatDetails from './ChatDetails';

// npm test ChatDetails.test.js
// must be in frontend directory 
// ! will need to rewrite these

test('renders chat details page', () => {
  render(<ChatDetails />);
});


test('matches snapshot', function() {
  const { asFragment } = render(<ChatDetails />);
  expect(asFragment()).toMatchSnapshot(); 
})

