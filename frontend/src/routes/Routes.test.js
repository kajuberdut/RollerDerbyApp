import { render, screen } from '@testing-library/react';
import Routes from './Routes';

// npm test Routes.test.js
// must be in frontend directory 

test('renders component', () => {
  render(<Routes />);
//   const navbar = screen.getByRole('navigation'); 
//   expect(navbar).toBeInTheDocument();
});


test('matches snapshot', function() {
  const { asFragment } = render(<Routes />);
  expect(asFragment()).toMatchSnapshot(); 
})

