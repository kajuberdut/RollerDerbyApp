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
        let message = err.response.message;
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
        // data.headers = {}
        // data.headers["content-type"] = "application/json"
        console.log("!!!!data in Api.js:", data)
        let testData = {derby_name: "socker", email: "blue@gmail.com", password: "password"}
        testData.headers = {}
        testData.headers["content-type"] = "application/json"
        let res = await this.request('users', testData, "post");
        return res;
    }

      /** Delete user */

    static async deleteUser(handle) {
        let res = await this.request(`users/${handle}`, {}, "delete");
        return res;
    }

        /** Update user by data */

    static async updateUser(handle, data) {
    console.log("handle!!!:", handle)
    let res = await this.request(`users/${handle}`, data, "put");
    // return res;
    return "hello"
    }
}

export default FastApi