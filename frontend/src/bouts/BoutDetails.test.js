import { render, screen } from '@testing-library/react';
import BoutDetails from './BoutDetails';
// import FastApiMock from './FastApiMock';

// npm test BoutDetails.test.js
// must be in frontend directory 

test('renders bout details page', () => {
  render(<BoutDetails />);
});


test('matches snapshot', function() {
  const { asFragment } = render(<BoutDetails />);
  expect(asFragment()).toMatchSnapshot(); 
})

// jest.mock('./FastApi', () => ({
//   getBout: jest.fn(),
//   getAddress: jest.fn(),
//   addUserToGroup: jest.fn(),
// }));

// const mockBout = {
//   theme: 'Roller Derby Bout',
//   date: '2024-01-20',
//   level: 'B',
//   ruleset: 'WFTDA',
//   // ...other bout details
// };
// const mockAddress = {
//   streetAddress: '123 Main St',
//   city: 'Anytown',
//   state: 'CA',
//   zipCode: '12345',
// };


// test('calls addUserToGroup when Join Chat button is clicked', async () => {
//   render(<BoutDetails />);
//   const joinChatButton = screen.getByRole('button', { name: /Join Chat/i });
//   userEvent.click(joinChatButton);
//   await waitFor(() => {
//     expect(FastApiMock.addUserToGroup).toHaveBeenCalledTimes(1);
//   });
// });