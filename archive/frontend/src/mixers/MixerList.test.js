import { render, screen } from '@testing-library/react';
import MixerList from './MixerList';

// npm test MixerList.test.js
// must be in frontend directory 

test('renders mixer list page', () => {
  render(<MixerList />);
  const title = screen.getByText('Mixers'); 
  expect(title).toBeInTheDocument();
});


test('matches snapshot', function() {
  const { asFragment } = render(<MixerList />);
  expect(asFragment()).toMatchSnapshot(); 
})

