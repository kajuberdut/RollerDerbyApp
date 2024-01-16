import { render, screen } from '@testing-library/react';
import ChatIcon from './ChatIcon';

// npm test ChatIcon.test.js
// must be in frontend directory 

test('renders chat icon page', () => {
  render(<ChatIcon />);
  const icon = screen.getByRole('ChatIcon');
  expect(icon).toBeInTheDocument();
});


test('matches snapshot', function() {
  const { asFragment } = render(<ChatIcon />);
  expect(asFragment()).toMatchSnapshot(); 
})

