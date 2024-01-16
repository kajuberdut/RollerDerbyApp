import { render, screen } from '@testing-library/react';
import BoutList from './BoutList';

// npm test BoutList.test.js
// must be in frontend directory 

test('renders bout list page', () => {
  render(<BoutList />);
  const title = screen.getByText('Bouts'); 
  expect(title).toBeInTheDocument();
});


test('matches snapshot', function() {
  const { asFragment } = render(<BoutList />);
  expect(asFragment()).toMatchSnapshot(); 
})

