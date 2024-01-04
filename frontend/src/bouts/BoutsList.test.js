import React from 'react';
import { render } from '@testing-library/react';
import BoutList from './BoutList';

test('App renders without crashing', () => {
    console.log("test is running")
  render(<BoutList />);
});

test('matches snapshot', () => {
  const {asFragment} = render(<BoutList />);
  expect(asFragment()).toMatchSnapshot(); 
});

