import { render, screen } from '@testing-library/react';
import UserList from './UserList';

// npm test UserList.test.js
// must be in frontend directory 
// run with npm test UserList.test.js

test('renders user list page loading when fastapi result has not loaded', () => {
  render(<UserList />);
  const users = screen.queryByText('Users'); 
  expect(users).not.toBeInTheDocument();
});

test('matches snapshot', function() {
  const { asFragment } = render(<UserList />);
  expect(asFragment()).toMatchSnapshot(); 
})


// todo figure out how to mock api 

test('renders user list page when api responds', () => {
    render(<UserList />);
    const users = screen.getByText('Users'); 
    expect(users).toBeInTheDocument();
  });

