import { render, screen } from '@testing-library/react';
import BoutDetails from './BoutDetails';

// npm test BoutDetails.test.js
// must be in frontend directory 

test('renders bout details page', () => {
  render(<BoutDetails />);
});


test('matches snapshot', function() {
  const { asFragment } = render(<BoutDetails />);
  expect(asFragment()).toMatchSnapshot(); 
})

