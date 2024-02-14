import { render, screen } from '@testing-library/react';
import MixerDetails from './MixerDetails';

// * Passing as of 2/13/24
// npm test MixerDetails.test.js
// must be in frontend directory 


test('renders bout mixers page', () => {
  render(<MixerDetails />);
});


test('matches snapshot', function() {
  const { asFragment } = render(<MixerDetails />);
  expect(asFragment()).toMatchSnapshot(); 
})

test('renders loading when mivxer details has not resolved', () => {
    
  render(<MixerDetails />);

  const loading = screen.getByTestId('loading-indicator');
  expect(loading).toBeInTheDocument();

});