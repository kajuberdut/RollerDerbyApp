import { render, screen } from '@testing-library/react';
import ChatComponent from './ChatComponent';

// npm test ChatComponent.test.js
// must be in frontend directory 

test('renders chat component page', () => {
  render(<ChatComponent />);
});


test('matches snapshot', function() {
  const { asFragment } = render(<ChatComponent />);
  expect(asFragment()).toMatchSnapshot(); 
})

