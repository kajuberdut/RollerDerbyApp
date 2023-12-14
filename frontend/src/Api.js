import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:8000";

// const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:0080";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class FastApi {

    static async request(endpoint = "", data = {}, method = "get") {
        // static async request(endpoint, method = "get") {
        // console.log("request is running")
        console.debug("API Call:", endpoint, data, method);
        console.debug("API CALL endpoint", endpoint)
        console.debug("API CALL data", data)
        console.debug("API CALL method", method)
        //there are multiple ways to pass an authorization token, this is how you pass it in the header.
        //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
        const url = `${BASE_URL}/${endpoint}`;
        // const headers = { Authorization: `Bearer ${JoblyApi.token}` };
        // *This is our authorization for our request
        // console.log("header in api:", headers)
        const params = (method === "get")
            ? data
            : {};
    
        try {
            
          return (await axios({ url, method, data, params })).data;
        // return (await axios({ url, method })).data;
        } catch (err) {
          console.error("API Error:", err);
        //   let message = err.response.data.error.message;
        // let message = err.response.message;
        let message = err.response.data.detail; 
        // console.log("err in api.js!!!!", err)
        // console.log("message in api.js!!!!", message)
          throw Array.isArray(message) ? message : [message];
        }
      }

  /** Get all users*/

    static async getUsers(handle) {
        let res = await this.request(`users`);
        console.log("res:", res)
        return res
    }

      /** Get one user*/

      static async getUser(handle) {
        let res = await this.request(`users/${handle}`);
        console.log("res:", res)
        return res
    }

  /** Post user by data*/

    static async signup(data) {
        console.log("!!!!data in Api.js:", data)
        // let testData = {derby_name: "happyJack", email: "happyJack@gmail.com", password: "password"}
        // ! note must have a user_id of 0  on your user obect to post and be sucessful 
        
        data["user_id"] = 0
        let res = await this.request('users', data, "post");
        return res;
    }

      /** Delete user */

    static async deleteUser(handle) {
        let res = await this.request(`users/${handle}`, {}, "delete");
        return res;
    }

        /** Update user by data */

    static async updateUser(derbyName, data) {
    // console.log("data: in api.js", data)
    // console.log("derbyName!!!:", derbyName)
    console.log("updateUser in api.js is running which means the error is after that")
    let testData = {user_id: "8e56618d-8092-4f35-a452-b90324f2219b", derby_name: "TESTING", email: "TESTING@gmail.com", first_name: "testFirstName", last_name: "testLastName", facebook_name: "TESTING fb", about: "I am a derby player that has been bouting since 2019. Blah blah blah blah", primary_number: 12, secondary_number: 14, level: "B", insurance: {WFTDA: "ABCDE", USARS: "EFGHI"}, location: {city: "Denver", state: "CO"}, associated_leagues: ["TESTING Roller Derby", "TEST2 Roller Derby Leagues"], ruleset: {WFTDA: true, USARS: true, bankedTrack: false, shortTrack: false}, position: {jammer: true, pivot: true, blocker: false}}
    let res = await this.request(`users/happyJack`, testData, "patch");
    return res;
    // return "hello"
    }
}

export default FastApi