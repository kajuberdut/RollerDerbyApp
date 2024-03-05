import axios from "axios";

const BASE_URL = `${process.env.REACT_APP_ROOT_URL}`

const debug = process.env.REACT_APP_DEBUG || false;

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class FastApi {

    static token;
    static socket;

    
    static async request(endpoint = "", data = {}, method = "get") {

        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${FastApi.token}` };
 
        const params = (method === "get")
            ? data
            : {};
    
        try {
          if (debug) {
            console.log("url", url);
            console.log("method", method);
            console.log("data", data);
            console.log("params", params);
          }
          
          return (await axios({ url, method, data, params, headers })).data;


        } catch (err) {
          // if (debug) {
          //   console.log("err", err);
          // }
        // let message = err.response.data.error.message;
        // let message = err.response.message;
        if(err.response) {

          let message = err.response.data.detail; 

          if(err.response.data) {
          throw Array.isArray(message) ? message : [message];
          }
        }
      
        }
      }

  /** Post user by data*/

  static async signup(data) { 
      
    data["user_id"] = 0
    let res = await this.request('users', data, "post");
    return res;
  }

  /** Post login user by data*/

  static async login(data) { 
    
      let formData = new FormData();
      formData.append("username", data.username)
      formData.append("password", data.password)
      let res = await this.request('token', formData, "post");
      return res.accessToken;
    }

  /** Adding websocket to my api call */
  
  /**Connect websocket if invalid token do not connect */

  static connectSocket(userId) {
    if (!FastApi.socket || FastApi.socket.readyState !== WebSocket.OPEN) {
      try {
        // FastApi.socket = new WebSocket(`wss://${process.env.REACT_APP_ROOT_URL}/ws/${userId}`|| `wss://localhost:8000/ws/${userId}`);

        FastApi.socket = new WebSocket(`wss://${process.env.REACT_APP_PARTIAL_ROOT_URL}/ws/${userId}`)

        /** Wait until websocket is open initially before sending first message */
        FastApi.socket.addEventListener('open', () => {

          let messageData = {
            "first_message": true,
            "token": FastApi.token
          }

          FastApi.sendMessage(messageData)
        })
        } catch (error) {
        console.error("Error connection to webSocket :", error);
          return { success: false, error };
      }

    }
  }

  /**Send message to websocket */

  static sendMessage(messageData) {

    if (FastApi.socket && FastApi.socket.readyState === WebSocket.OPEN) {
      try {
        FastApi.socket.send(JSON.stringify(messageData));
      } catch (error) {
        console.error("Error sending socket message:", error);
      }
    } else {
      console.error("Socket is not open. Unable to send message.");
    }
  }


  /** Get all users*/

  static async getUsers(data) {
      let res = await this.request(`users`, data, "get");
      return res
  }

 /** Get one user by username */

  static async getUser(username) {
      let res = await this.request(`users/${username}/details`);
      return res
  }

//    /** Get one user by username */
// * I dont think this is getting used but commented it out just in case for now

//    static async getUser(username) {
//     let res = await this.request(`users/${username}`);
//     if(res.ruleset === null) {
//       res.ruleset = 0; 
//     }
//     return res
// }

  /** Get user by id */

  static async getUserById(id) {
    let res = await this.request(`login/${id}`);
    return res
  }

  /** Get username by user id */

  static async getUsernameById(user_id) {
    let res = await this.request(`users/username/${user_id}`);
    return res
  }

  /** Get Not logged in user by id */

  static async getOtherUser(userId) {
    let res = await this.request(`users/${userId}`);
    if(res.ruleset === null) {
      res.ruleset = 0; 
    }
    return res
  }

  /** Update user profile by data */

  static async updateUserProfile(userId, data) {
    let res = await this.request(`users/profile/${userId}`, data, "put");
    return res;
  }

  /** Update user private details by data */

  static async updateUserPrivate(userId, data) {
    let res = await this.request(`users/private/${userId}`, data, "put");
    return res;
  }

  // ! not currently being used 
  /** Delete user */

  static async deleteUser(userId) {
    let res = await this.request(`users/${userId}`, {}, "delete");
    return res;
  } 
  
  /** Get all bouts*/

  static async getBouts() {
    let res = await this.request(`events/all/bouts`);
    if(debug) {
      console.log("api res bouts", res)
    }
    return res
  }

  /** Get a specific bout*/

  static async getBout(eventId) {
    let res = await this.request(`events/bouts/${eventId}`);
    return res
  }

  /** Add bout*/

  static async addBout(data) {
    data["bout"]["type"] = "bout";  
    data["bout"]["group_id"] = 0; 
    data["bout"]["chat_id"] = 0; 

    let res = await this.request(`events/bouts`, data, "post");
    return res
  }

  // ! not currently being used 
  /** Updates a specific bout*/

  static async updateBout(eventId, data) {
    let res = await this.request(`events/bouts/${eventId}`, data, "put");
    return res;
  }

  // ! not currently being used 
  /** Delete bout */

  static async deleteBout(eventId) {
    let res = await this.request(`events/bouts/${eventId}`, {}, "delete");
    return res;
  } 

  /** Get all mixers*/

  static async getMixers() {
    let res = await this.request(`events/all/mixers`);
    if(debug) {
      console.log("api res mixers", res)
    }
    return res
  }

  /** Get a specific mixer*/

  static async getMixer(mixerId) {
    let res = await this.request(`events/mixers/${mixerId}`);
    return res
  }

  /** Add mixer*/

  static async addMixer(data) {
    data["mixer"]["type"] = "mixer";
    data["mixer"]["group_id"] = 0; 
    data["mixer"]["chat_id"] = 0; 
    let res = await this.request(`events/mixers`, data, "post");
    return res
  }

  // ! not currently being used 
  /** Updates a specific mixer*/

  static async updateMixer(eventId, data) {
    let res = await this.request(`events/mixers/${eventId}`, data, "put");
    return res;
  }

  // ! not currently being used 
  /** Delete mixer */

  static async deleteMixer(eventId) {
    let res = await this.request(`events/mixers/${eventId}`, {}, "delete");
    return res;
  } 

  /** Get a specific address by ID*/

  static async getAddress(addressId) {
    if (debug) {
      console.log("addressId in api.js", addressId);
    }
    let res = await this.request(`address/${addressId}`);
    if (debug) {
      console.log("res getAddress api.js", res);
    }
    return res
  }

  /** Get specific rulesets by ID*/

  static async getRuleset(rulesetId) {
    let res = await this.request(`rulesets/${rulesetId}`);
    return res
  }

  /** Get specific positions by ID*/
  
  static async getPosition(positionId) {
    let res = await this.request(`positions/${positionId}`);
    return res
  }

  /** Get specific location by ID*/
  
  static async getLocation(locationId) {
    let res = await this.request(`locations/${locationId}`);
    return res
  }


   /** Get specific insurance by ID*/
  
  static async getInsurance(insuranceId) {
    let res = await this.request(`insurance/${insuranceId}`);
    return res
  }
 
  /** Get specific positions by city, state, zip code, start date and end date */

  static async getEvents(type, data) {
    console.log("type:", type)
    console.log("data:", data)
    let res = await this.request(`events/${type}`, data, "get");
    return res
  }

  /** Get chat history by participant ids*/

  static async getChatHistory(participant_ids) {
    let res = await this.request(`messages/${participant_ids}`);
    return res
  }

  /** Get all chats belong to specific user by user id*/

  static async getChats(userId) {
    let res = await this.request(`chats/${userId}`);
    return res
  }

  /** Get chat participants usernames of one chat by chat id*/

  static async getChatParticipants(chatId) {
    let res = await this.request(`chats/${chatId}/participants/usernames`);
    return res
  }
  
  /** Get a single chat participant ids by chat id*/

  static async getChatParticipantIds(chatId) {
    let res = await this.request(`chats/${chatId}/participants/ids`);
    return res
  }

  /** Get group name by chat id*/

  static async getGroupNameByChatId(chatId) {
    let res = await this.request(`groups/group/name/${chatId}`);
    return res
  }

  /** Get chat history by chat id*/

  static async getChatHistoryByChatId(chatId) {
    let res = await this.request(`chats/${chatId}/history`);
  return res
  
  }

  /** Add user to group*/

  static async addUserToGroup(data) {
    let res = await this.request(`groups/`, data, "post");
    return res
  }

  /** Deletes user from user group*/

  static async removeUserFromGroup(data) {
    let res = await this.request(`groups/`, data, "delete");
    return res;
  } 
  

  /** Get image by user id*/

  static async getImage(userId) {
    let res = await this.request(`users/image/${userId}`);
    if(!res) {
      return ""
    }
    return res
  
  }

  /** Get teams by user id*/

  static async addTeam(data) {
    let res = await this.request(`groups/teams`, data, "post");;
    if(!res) {
      return ""
    }
    return res
  
  }

  /** Get teams by user id*/

  static async getTeams(userId) {
    let res = await this.request(`groups/teams/${userId}`);
    if(!res) {
      return ""
    }
    return res
  
  }
  
   /** Get group by group id*/

   static async getGroup(groupId) {
    let res = await this.request(`groups/${groupId}`);
    if(!res) {
      return ""
    }
    return res
  
  }

  /** Add team invite*/

  static async addTeamInvite(data) {
    let res = await this.request(`invites`, data, "post");
    return res
  }

  /** Get invites by user id*/

  static async getInvites(userId) {
    let res = await this.request(`invites/user/${userId}`);
    if(!res) {
      return ""
    }
    return res
  }

  /** Get pending invites by group id*/

  static async getPendingInvites(groupId) {
    let res = await this.request(`invites/pending/${groupId}`);
    if(!res) {
      return ""
    }
    return res
  
  }

  /** Updates a team invite*/

  static async updateTeamInvite(inviteId, data) {
    let res = await this.request(`invites/${inviteId}`, data, "put");
    return res;
  }

  /** Get team form*/

  static async getTeamForm(groupId, adminId) {
    let res = await this.request(`teams/${groupId}/form/${adminId}`);
    return res;
  }


}

export default FastApi