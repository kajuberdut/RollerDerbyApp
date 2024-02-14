import { render, screen } from '@testing-library/react';
import ChatList from './ChatList';
import { act } from '@testing-library/react';

// * Passing as of 2/13/24
// npm test ChatList.test.js
// must be in frontend directory 


test('renders loading when get all chats has not resolved', () => {
  act(() => {
    render(<ChatList getAllChats={jest.fn()} />);
  });
  const loading = screen.getByTestId('loading-indicator');
  expect(loading).toBeInTheDocument();

});


test('matches snapshot', function() {
  const { asFragment } = render(<ChatList getAllChats={jest.fn()} />);
  expect(asFragment()).toMatchSnapshot(); 
})


// ! failing due to setIsLoading not changing to false


// const mockGetAllChats = jest.fn().mockResolvedValue([	{
//   "chatId": 4,
//   "name": "testing",
//   "participantIds": [
//     1,
//     3
//   ]
// }]);

// test('renders chats', async () => {
//   console.log(mockGetAllChats.mock.calls)
//   await render(<ChatList getAllChats={mockGetAllChats} />);

//   const title = screen.getByText('Chats');
//   expect(title).toBeInTheDocument();

// });





