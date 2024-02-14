import { render, screen } from '@testing-library/react';
import EventList from './EventList';

// * Passing as of 2/13/24
// npm test EventList.test.js
// must be in frontend directory 


test('renders event list page', () => {
  render(<EventList />);
});


test('matches snapshot', function() {
  const { asFragment } = render(<EventList />);
  expect(asFragment()).toMatchSnapshot(); 
})

