// * ARCHIVED API ROUTES 




static async updateUser(user_id, data) {

let res = await this.request(`users/${user_id}`, data, "patch");

return res;
}
