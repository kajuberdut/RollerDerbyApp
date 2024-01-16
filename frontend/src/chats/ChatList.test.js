import { render, screen } from '@testing-library/react';
import ChatList from './ChatList';

// ! not functioning due to lack of user_id etc. 

// npm test ChatList.test.js
// must be in frontend directory 

test('renders chat list page', () => {
  render(<ChatList />);
//   const notFound = screen.getByText('404'); 
//   expect(notFound).toBeInTheDocument();
});


test('matches snapshot', function() {
  const { asFragment } = render(<ChatList />);
  expect(asFragment()).toMatchSnapshot(); 
})





