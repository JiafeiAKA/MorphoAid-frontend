import http from '../http-common';



class UserAdminService {
  getUsers() {
    return http.get('/admin/users');
  }

  updateUserRole(userId, role) {
    return http.put(`/admin/users/${userId}/role`, { role });
  }

  deleteUser(userId) {
    return http.delete(`/admin/users/${userId}`);
  }
}

export default new UserAdminService();
