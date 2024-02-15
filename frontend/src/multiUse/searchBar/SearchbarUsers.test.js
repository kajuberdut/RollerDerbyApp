import { render, screen } from '@testing-library/react';
import SearchBarUsers from './SearchBarUsers';

// npm test SearchBarUsers.test.js
// must be in frontend directory 

const formData =  jest.fn().mockResolvedValue(
  {
    username: "User1"
  }
)

test('renders SearchbarUsers', () => {
  render(<SearchBarUsers formData={formData} />);
});


test('matches snapshot', function() {
  const { asFragment } = render(<SearchBarUsers formData={formData} />);
  expect(asFragment()).toMatchSnapshot(); 
})

test('renders SearchbarUsers details', () => {
  render(<SearchBarUsers formData={formData}  />);

  expect(screen.getByPlaceholderText('Derby Name')).toBeInTheDocument();
});