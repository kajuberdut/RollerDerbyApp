// const mockResponse = [
//     	{
//     		"eventId": 1,
//     		"type": "bout",
//     		"date": "2024-01-25",
//     		"addressId": 1,
//     		"time": "19:10",
//     		"timeZone": "Mountain Time (MT): America/Denver (Denver, Phoenix, Salt Lake City)",
//     		"theme": "Theme Test 1",
//     		"description": "Come have a blast and skate with us. It will be the ultimate skate party! ",
//     		"level": "All Levels",
//     		"coEd": false,
//     		"ruleset": "WFTDA",
//     		"floorType": "Slick",
//     		"jerseyColors": "Black and White",
//     		"groupId": 2,
//     		"chatId": 2,
//     		"opposingTeam": "Boulder",
//     		"team": "Cheyenne Capidolls"
//     	}
//     ]

// export default {

//     // get: jest.fn().mockResolvedValue(mockResponse)
//     get: jest.fn(() => Promise.resolve({data: mockResponse}))
// }

// export const fetchUserData = jest.fn().mockResolvedValue({
// 	name: 'John Doe',
// 	email: 'johndoe@example.com',
//   });


// export const getUsers = jest.fn().mockResolvedValue([
//   { id: 1, name: 'Alice', email: 'alice@example.com' },
//   { id: 2, name: 'Bob', email: 'bob@example.com' },
// ]); // Define your desired mock user data

// class FastApi {
//   get(url) {
//     return new Promise((resolve) => {
//       // Mocked response based on the url
//       if (url === '/events/bouts/1') {
//         resolve({
//           "eventId": 1,
//           "type": "bout",
//           "date": "2024-01-25",
//           "addressId": 1,
//           "time": "19:10",
//           "timeZone": "Mountain Time (MT): America/Denver (Denver, Phoenix, Salt Lake City)",
//           "theme": "Theme Test 1",
//           "description": "Come have a blast and skate with us. It will be the ultimate skate party! ",
//           "level": "All Levels",
//           "coEd": false,
//           "ruleset": "WFTDA",
//           "floorType": "Slick",s
//           "jerseyColors": "Black and White",
//           "groupId": 2,
//           "chatId": 2,
//           "opposingTeam": "Boulder",
//           "team": "Cheyenne Capidolls"
//         });
//       } else {
//         // Handle other URLs differently
//       }
//     });
//   }
// }