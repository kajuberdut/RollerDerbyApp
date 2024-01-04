import { render, screen } from '@testing-library/react';
import App from './App';

// npm test App.test.js
// must be in frontend directory 

test('renders learn react link', () => {
  render(<App />);
  const navbar = screen.getByRole('navigation'); // Or use other appropriate queries
  expect(navbar).toBeInTheDocument();
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});


// https://stackoverflow.com/questions/58613492/how-to-resolve-cannot-use-import-statement-outside-a-module-from-jest-when-run
// testing issue Kate