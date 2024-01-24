import { render, screen, cleanup, act } from '@testing-library/react';
import { UserProvider } from "../testUtils";
import { BrowserRouter } from "react-router-dom";
import BoutList from './BoutList';
import FastApi from '../__mocks__/FastApi';

// npm test BoutList.test.js
// must be in frontend directory 


afterEach(() => {
  cleanup()
})


const MockBoutList = () => {
  return (
      <BrowserRouter>
          <BoutList />
      </BrowserRouter>
  )
}


describe("Mocks BoutList", () => {

test('renders bout list page', () => {
  render(
      <MockBoutList/>
  );
  const title = screen.getByText('Bouts'); 
  expect(title).toBeInTheDocument();
});


});

describe("Snapshot BoutList", () => {
  
  test('matches snapshot', function() {
    const { asFragment } = render(<BoutList />);
    expect(asFragment()).toMatchSnapshot(); 
  })
  
  
});


// test('Bout details', () => {
//   render(
//       // <MockBoutList bouts={FastApi.get.mockResolvedValue()}/>
//       <MockBoutList />
//   );
//   const title = screen.getByText('Theme Test 1'); 
//   expect(title).toBeInTheDocument();
// });

// test('renders bout list after fetching mocked bouts', async () => {
//   render(<BoutList />);

//   await waitFor(() => {
//     expect(screen.getByText('Theme Test 1')).toBeInTheDocument();
//   });
// });

// jest.mock("../__mocks__/FastApi", () => ({
//   getBouts: jest.fn().mockResolvedValue([{
//     "eventId": 1,
//     "type": "bout",
//     "date": "2024-01-25",
//     "addressId": 1,
//     "time": "19:10",
//     "timeZone": "Mountain Time (MT): America/Denver (Denver, Phoenix, Salt Lake City)",
//     "theme": "Theme Test 1",
//     "description": "Come have a blast and skate with us. It will be the ultimate skate party! ",
//     "level": "All Levels",
//     "coEd": false,
//     "ruleset": "WFTDA",
//     "floorType": "Slick",
//     "jerseyColors": "Black and White",
//     "groupId": 2,
//     "chatId": 2,
//     "opposingTeam": "Boulder",
//     "team": "Cheyenne Capidolls"
//   }]),
// }));

// beforeEach(() => {
//   // console.log("RUNS BEFORE EACH TEST")
//   // jest.mock("../__mocks__/FastApi")

//   // jest.mock("../__mocks__/FastApi", () => ({
//   //   get: jest.fn().mockResolvedValue(mockResponse)

    
//   // }));

// })

// jest.mock('../__mocks__/FastApi')
// // jest.mock('../__mocks__/FastApi', () => ({
// //   get: jest.fn().mockResolvedValue(mockResponse), // Assuming mockResponse is defined
// // }));

// test('fastApi mock', async () => {
//   // FastApi.get.mockResponse
//   let mockResponse = FastApi.get.mockResolvedValue()
//   // let mockResponse = FastApi.get.
//   let value = await FastApi.get()
//   console.log("!!!!!!!!! value:", value)

//   console.log("!!!!!!!!! mockResponse:", mockResponse)

//   render(<BoutList />);

//   const boutItems = screen.getAllByRole('list');
//   console.log("boutItems:", boutItems)

// });


// ! having no luck with mocking a api call
// test('renders bout list after fetching mocked bouts', async () => {

//   const mockResponse = await FastApi.get();
//   console.log("!!!!!!!!! mockResponse:", mockResponse)

//   render(<BoutList />);

//   const boutItems = screen.getAllByRole('list');
//   console.log("boutItems:", boutItems)

// });
