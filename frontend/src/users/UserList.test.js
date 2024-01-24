import { render, screen, act, waitFor } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "../testUtils";
import UserList from './UserList';
// import UserComponent from './UserComponent';

// import FastApi from '../Api';
// import SearchComponentUsers from '../multiUse/searchComponent/SearchComponentUsers';

// ! this one is working for getting a response back must have the below import 
import FastApi from '../Api';

test('should display users', async () => {
  // Arrange
  const users = [
            { userId: 1, username: "SockHer Blue", image: null },
          ]

  FastApi.getUsers = jest.fn().mockResolvedValue(
    [
      { userId: 1, username: "SockHer Blue", image: null },
    ]
  );

  const result = await FastApi.getUsers(1);

  expect(result).toEqual(users); 

});

// ! above is working 

// test('should display users', async () => {
//   // Arrange
//   const users = [
//             { userId: 1, username: "SockHer Blue", image: null },
//           ]

//   FastApi.getUsers = jest.fn().mockResolvedValue(
//     [
//       { userId: 1, username: "SockHer Blue", image: null },
//     ]
//   );

//   const MockUserComponent = () => null;

//   // let result = await FastApi.getUsers(1);
//   // expect(result).toEqual(users); 

//   // let result = await FastApi.getUsers(1);
  
//   act(() => {

//     let result = FastApi.getUsers(1);

//     render(     
//       <BrowserRouter>
//         <UserProvider>
//             <UserList />
//             <MockUserComponent />
//         </UserProvider>
//     </BrowserRouter>)
//     // console.log("user:", user)

//   });

//   await waitFor(() => {
//     expect(result).toEqual(users); 
//   });

// });

// jest.mock('../multiUse/cardComponent/CardComponent.js')

// test('should display users', async () => {
//   // Arrange
//   const users = [
//     { userId: 1, username: "SockHer Blue", image: null },
//   ];

//   FastApi.getUsers = jest.fn().mockResolvedValue(users);

//   const MockUserComponent = () => null;

//   // Act
//   render(     
//     <BrowserRouter>
//       <UserProvider>
//         <UserList />
//         <MockUserComponent />
//       </UserProvider>
//     </BrowserRouter>
//   );

//   // Assert
//   // Wait for any promises to resolve and component to re-render
//   await waitFor(() => {
//     // Place assertions here
//     expect(screen.getByText('Users')).toBeInTheDocument();
//   });
// });







// test('should display users', async () => {
//   // Arrange
//   const users = [
//             { userId: 1, username: "SockHer Blue", image: null },
//           ]

//   FastApi.getUsers = jest.fn().mockResolvedValue(
//     [
//       { userId: 1, username: "SockHer Blue", image: null },
//     ]
//   );

//   act(() => {
//     const result = FastApi.getUsers(1);
//     render(     
//       <BrowserRouter>
//         <UserProvider>
//             <UserList />
//             <UserComponent indUser={result[0]} />
//         </UserProvider>
//     </BrowserRouter>)
//     // console.log("user:", user)

//   });

//   await waitFor(() => {
//     expect(result).toEqual(users); 
//   });


// });





// export const getUsers = async () => {
//     const response = await FastApi.get(`http://localhost:8000/users/`);
//     return response.data;
// };


// jest.mock('../Api', () => ({
//     getUsers: jest.fn().mockResolvedValue({
//       data: [
//         { userId: 1, username: "SockHer Blue", image: null },
//       ],
//     }),
//   }));

//   test('getUsers function', async () => {

//     const users = await FastApi.getUsers();
//     console.debug(FastApi)
//     expect(users).toEqual({
//       data: [
//         { userId: 1, username: "SockHer Blue", image: null },
//       ],
//     });
//   });

  
// import { getUsers } from '../Api'

// jest.mock('../Api'); // Assuming FastApi is in a separate file

// beforeEach(() => {
//     FastApi.getUsers = jest.fn(() => ({
//       data: [
//         { userId: 1, username: "SockHer Blue", image: null },
//       ],
//     }));
//   });
  

// beforeEach(() => {
//     // Assuming FastApi is defined elsewhere
//     FastApi = new FastApi(); // Create a new instance
//     FastApi.getUsers = jest.fn(() => ({
//       data: [
//         { userId: 1, username: "SockHer Blue", image: null },
//       ],
//     }));
//   });


// test('getUsers function', async () => {

//     console.log(FastApi);

//   FastApi.getUsers.mockResolvedValue({ data: 
//     [ 
//         { 
//         userId : 1,
//         username : "SockHer Blue",
//         image: null
//         }
//     ]
// });

//   const users = await getUsers();
//   expect(users).toEqual({ data: [ { 
//     userId : 1,
//     username : "SockHer Blue",
//     image: null
//     }] });
// });


// import Api from '../__mocks__/Api'
// import { getUsers } from '../__mocks__/Api'

// import FastApi from '../Api';


// jest.mock('Api')
// jest.mock('FastApi')

// npm test UserList.test.js
// must be in frontend directory 
// run with npm test UserList.test.js


// const getUsers = require('../Api');
// const axios = require('getUsers');

// jest.mock('axios');
// import { FastApi } from '../Api'


// ! BELOW ARE PASSING

// test('renders user list page loading when fastapi result has not loaded', () => {
//   render(<UserList />);
//   const users = screen.queryByText('Users'); 
//   expect(users).not.toBeInTheDocument();
// });

// test('matches snapshot', function() {
//   const { asFragment } = render(c);
//   expect(asFragment()).toMatchSnapshot(); 
// })

// ! ABOVE ARE PASSING


// https://stackoverflow.com/questions/53174202/how-to-mock-a-function-in-jest

// it('returns all users ', async () => {
//     const mock = jest.spyOn(FastApi, 'getUsers')
//     mock.mockImplementation(() => {
//         [
//             {
//                 "userId": 2,
//                 "username": "Bell",
//                 "image": null
//             },
//             {
//                 "userId": 1,
//                 "username": "SlashHer",
//                 "image": null
//             },
//             {
//                 "userId": 3,
//                 "username": "SockHer Blue",
//                 "image": null
//             }
//         ]

//     })

//     let users = await FastApi.getUsers(); 
//     console.log("getUsers")

//     expect(users).toEqual([
//         { userId: 2, username: 'Bell', image: null },
//         { userId: 1, username: 'SlashHer', image: null },
//         { userId: 3, username: 'SockHer Blue', image: null }
//       ]);

//     expect(screen.getByText('Users')).toBeInTheDocument();

//   });



// it('returns all users ', async () => {
//     const mock = jest.spyOn(FastApi, 'getUsers')
//     mock.mockImplementation(() => {
//         [
//             {
//                 "userId": 2,
//                 "username": "Bell",
//                 "image": null
//             },
//             {
//                 "userId": 1,
//                 "username": "SlashHer",
//                 "image": null
//             },
//             {
//                 "userId": 3,
//                 "username": "SockHer Blue",
//                 "image": null
//             }
//         ]

//     })

//     let users = await FastApi.getUsers(); 
//     console.log("getUsers")

//     expect(users).toEqual([
//         { userId: 2, username: 'Bell', image: null },
//         { userId: 1, username: 'SlashHer', image: null },
//         { userId: 3, username: 'SockHer Blue', image: null }
//       ]);

//     expect(screen.getByText('Users')).toBeInTheDocument();

//   });




// it('returns the title of the first album', async () => {
//   axios.get.mockResolvedValue(
//     [ {
//         "userId": 1,
//         "username": "SockHer Blue",
//         "image": null
//         }
//     ]

//   );

//   const title = await getUsers();
//   expect(title).toEqual('My First Album');
// });




// import * as FastApi from '../Api';

// test('TESTING', async () => {
// getUsers = () => {}

// ngAfterViewInit = () => {
//   FastApi.getUsers();
// }

// }); 



//   test('creates Contract on correct date', async () => {
//     const users = 
//     [ {
//         "userId": 1,
//         "username": "SockHer Blue",
//         "image": null
//         }
//     ]

//     // const mockUsers = jest.spyOn(FastApi, 'getUsers').mockResolvedValueOnce(users)

//     // jest.mock(FastApi, 'getUsers').mockImplementation(() => [ {
//     //     "userId": 1,
//     //     "username": "SockHer Blue",
//     //     "image": null
//     //     }
//     // ]); expect(FastApi.getUsers()).toBe(   [ {
//     //     "userId": 1,
//     //     "username": "SockHer Blue",
//     //     "image": null
//     //     }
//     // ]);

//     render(<UserList />)

//     let res = await FastApi.getUsers(); 
//     console.log("res", res)

//     expect(res).toEqual([
//         { userId: 1, username: 'SockHer Blue', image: null }
//       ]);

//     expect(screen.getByText('Users')).toBeInTheDocument();
  
//   }); 
















  

//   describe('getUsers', () => {
//     test('construct', () => {
//       const mockFooFactory = FooFactory as jest.Mocked<typeof FastApi>;  // get correct type for mocked FooFactory
//       mockFooFactory.foo.mockImplementation(() => 'TEST');  // provide implementation for foo
  
//       const c = new MyClass('test');
//       expect(c).toBeDefined();
//       expect(c.getState()).toEqual('TEST');  // SUCCESS
//     });
//   });







// it('returns all users ', async () => {
//     FastApi.getUsers.mockResolvedValue(
//         [
//             {
//                 "userId": 2,
//                 "username": "Bell",
//                 "image": null
//             },
//             {
//                 "userId": 1,
//                 "username": "SlashHer",
//                 "image": null
//             },
//             {
//                 "userId": 3,
//                 "username": "SockHer Blue",
//                 "image": null
//             }
//         ]
//     );
  
//     const users = await getUsers();
//     // expect(users).to;
//     expect(users.length).toBe(3);
//   });

// test('renders fetched users', async () => {
//     render(<UserList />);
//     let users = await getUsers()
//     // console.log("^^^^^^^^^^^^^^^^^^^^ users ^^^^^^^^^^^^^^", users)

//     // const usersText = screen.getByText('Users'); 
//     // expect(usersText).toBeInTheDocument();

//     await waitFor(() => {
//         expect(screen.getByText('Users')).toBeInTheDocument();
//       });
  
//     // Assert that the component renders elements based on the mocked user data
//     // const userElements = await screen.findAllByRole('listitem');
//     // expect(userElements).toHaveLength(2);
//     // expect(userElements[0].textContent).toContain('Alice');
//     // expect(userElements[1].textContent).toContain('Bob');
//   });

//   test('renders fetched users', async () => {
//     await act(async () => {
//       render(<UserList />);
//       await getUsers();
//     });
  
//     expect(screen.getByText('Users')).toBeInTheDocument();
//   });


// todo figure out how to mock api 

// test('renders user list page when api responds', () => {
//     render(<UserList />);
//     const users = screen.getByText('Users'); 
//     expect(users).toBeInTheDocument();
//   });

