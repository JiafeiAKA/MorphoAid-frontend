import axios from 'axios';


const state = () => ({
  users: [],
});

const mutations = {
  setUsers(state, users) {
    state.users = users;
  },
  updateUser(state, updatedUser) {
    const index = state.users.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
      state.users.splice(index, 1, updatedUser);
    }
  },
  removeUser(state, userId) {
    state.users = state.users.filter(user => user.id !== userId);
  }
};

const actions = {
  async fetchUsers({ commit }) {
    try {
      const token = localStorage.getItem('accessToken');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      const res = await axios.get('/api/admin/users', config);
      commit('setUsers', res.data);
    } catch (err) {
      console.error('Failed to fetch users:', err);
      throw err;
    }
  },

  async updateUserRole({ commit }, { userId, newRole }) {
    try {
      const token = localStorage.getItem('accessToken');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      const res = await axios.put(`/api/admin/users/${userId}/role`, { role: newRole }, config);
      commit('updateUser', res.data);
    } catch (err) {
      console.error('Failed to update role:', err);
      throw err;
    }
  },

  async deleteUser({ commit }, userId) {
    try {
      const token = localStorage.getItem('accessToken');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      await axios.delete(`/api/admin/users/${userId}`, config);
      commit('removeUser', userId);
    } catch (err) {
      console.error('Failed to delete user:', err);
      throw err;
    }
  }
};

const getters = {
  allUsers: (state) => state.users,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
