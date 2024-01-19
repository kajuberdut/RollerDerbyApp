import { render, screen } from '@testing-library/react';
import MixerDetails from './MixerDetails';
// import FastApiMock from './FastApiMock';

// npm test MixerDetails.test.js
// must be in frontend directory 

test('renders bout mixers page', () => {
  render(<MixerDetails />);
});


test('matches snapshot', function() {
  const { asFragment } = render(<MixerDetails />);
  expect(asFragment()).toMatchSnapshot(); 
})