import { render, screen } from '@testing-library/react';
import NotFound from './404';

// npm test 404.test.js
// must be in frontend directory 

test('renders 404 page', () => {
  render(<NotFound />);
  const notFound = screen.getByText('404'); 
  expect(notFound).toBeInTheDocument();
});


test('matches snapshot', function() {
  const { asFragment } = render(<NotFound />);
  expect(asFragment()).toMatchSnapshot(); 
})

