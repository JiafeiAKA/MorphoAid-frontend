import axios from "axios";

const API_URL = "/api/admin/";

class UserAdminService {
  getUsers() {
    return axios.get(API_URL + "users");
  }

  updateUserRole(userId, role) {
    return axios.put(API_URL + `users/${userId}/role`, { role });
  }

  deleteUser(userId) {
    return axios.delete(API_URL + `users/${userId}`);
  }
}

export default new UserAdminService();
