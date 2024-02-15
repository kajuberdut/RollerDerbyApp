import { render, screen } from '@testing-library/react';
import SearchComponent from './SearchComponent';

// * Passing as of 2/14/24
// npm test SearchComponent.test.js
// must be in frontend directory 

test('renders component', () => {
  render(<SearchComponent />);

});


test('matches snapshot', function() {
  const { asFragment } = render(<SearchComponent />);
  expect(asFragment()).toMatchSnapshot(); 
})

