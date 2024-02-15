import { render, screen } from '@testing-library/react';
import SearchBarEvents from './SearchBarEvents';

// * Passing as of 2/14/24
// npm test SearchBarEvents.test.js
// must be in frontend directory 

const formDataSB =  jest.fn()

test('renders SearchBarEvents', () => {
  render(<SearchBarEvents formDataSB={formDataSB}/>);

});


test('matches snapshot', function() {
  const { asFragment } = render(<SearchBarEvents formDataSB={formDataSB} />);
  expect(asFragment()).toMatchSnapshot(); 
})

test('renders SearchbarEvents details', () => {
  render(<SearchBarEvents formDataSB={formDataSB}  />);

  expect(screen.getByText('State')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('City')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Zip Code')).toBeInTheDocument();
});

