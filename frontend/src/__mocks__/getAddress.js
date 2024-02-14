



export default {
    getAddress: jest.fn().mockResolvedValue(
              {
                "streetAddress": "111 Main St",
                "city": "testing",
                "state": "WY",
            	}
    ),
    // Other mocked exports here
  };