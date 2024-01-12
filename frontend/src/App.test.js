import { render, screen } from '@testing-library/react';
import App from './App';

// npm test App.test.js
// must be in frontend directory 

test('renders App', () => {
  render(<App />);
  const navbar = screen.getByRole('navigation'); 
  expect(navbar).toBeInTheDocument();
});


test('matches snapshot', function() {
  const { asFragment } = render(<App />);
  expect(asFragment()).toMatchSnapshot(); 
})

