import { render, screen } from '@testing-library/react';
import SearchComponent from './SearchComponent';

// npm test App.test.js
// must be in frontend directory 

test('renders component', () => {
  render(<SearchComponent />);
//   const navbar = screen.getByRole('navigation'); 
//   expect(navbar).toBeInTheDocument();
});


test('matches snapshot', function() {
  const { asFragment } = render(<SearchComponent />);
  expect(asFragment()).toMatchSnapshot(); 
})

