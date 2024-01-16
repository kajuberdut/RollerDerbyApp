import { render, screen } from '@testing-library/react';
import Messages from './Messages';

// ! fails because of no userId

// npm test Messages.test.js
// must be in frontend directory 

test('renders messages page', () => {
  render(<Messages />);
});


test('matches snapshot', function() {
  const { asFragment } = render(<Messages />);
  expect(asFragment()).toMatchSnapshot(); 
})

