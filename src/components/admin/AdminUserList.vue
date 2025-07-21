<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">User Management</h1>
    <table class="min-w-full bg-white border border-gray-200 shadow">
      <thead>
        <tr class="bg-gray-100">
          <th class="py-2 px-4 border">Username</th>
          <th class="py-2 px-4 border">Email</th>
          <th class="py-2 px-4 border">Roles</th>
          <th class="py-2 px-4 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id" class="text-center">
          <td class="py-2 px-4 border">{{ user.username }}</td>
          <td class="py-2 px-4 border">{{ user.email }}</td>
          <td class="py-2 px-4 border">
            <span v-for="role in user.roles" :key="role"
              class="inline-block px-2 py-1 text-xs rounded bg-blue-100 text-blue-800 mr-1">
              {{ role }}
            </span>
          </td>
          <td class="py-2 px-4 border">
            <button class="text-sm text-blue-600 hover:underline mr-2" @click="openEditModal(user)">Edit Role</button>
            <button class="text-sm text-red-600 hover:underline" @click="deleteUser(user.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="mt-4 flex justify-center items-center space-x-4">
      <button @click="prevPage" :disabled="currentPage === 0" class="px-4 py-1 bg-gray-200 rounded">Previous</button>
      <span>Page {{ currentPage + 1 }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage >= totalPages - 1"
        class="px-4 py-1 bg-gray-200 rounded">Next</button>
    </div>


    <!-- Edit Role Modal -->
    <EditUserRoleModal v-if="selectedUser" :user="selectedUser" :show="showModal" @close="closeModal"
      @updated="fetchUsers" @update-role="updateUserRole" />
  </div>
</template>

<script>
import axios from 'axios';
import EditUserRoleModal from './EditUserRoleModal.vue';

export default {
  name: 'AdminUserList',
  components: { EditUserRoleModal },
  data() {
    return {
      users: [],
      showModal: false,
      selectedUser: null,
      currentPage: 0,
      totalPages: 1
    };
  },

  methods: {
    getToken() {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const token = storedUser?.accessToken || null;
      console.log("✅ token: ", token);
      return token;
    },
    fetchUsers() {
      const token = this.getToken();
      if (!token) return;

      axios.get(`http://localhost:8080/api/admin/users?page=${this.currentPage}&size=20`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => {
          this.users = res.data.users;
          this.totalPages = res.data.totalPages;
        })
        .catch(err => {
          console.error("Error fetching paginated users:", err);
        });
    },

    openEditModal(user) {
      this.selectedUser = user;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.selectedUser = null;
    },
    deleteUser(userId) {
      const token = this.getToken();
      if (!token) return;

      if (confirm('Are you sure you want to delete this user?')) {
        axios.delete(`http://localhost:8080/api/admin/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          .then(() => {
            this.fetchUsers();
          })
          .catch(err => {
            console.error('Failed to delete user:', err);
          });
      }
    },
    updateUserRole({ userId, newRole }) {
      const token = this.getToken();
      if (!token) return;

      return axios.put(`http://localhost:8080/api/admin/users/${userId}/role`, {
        role: newRole
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(() => {
          this.fetchUsers();
        })
        .catch(err => {
          console.error('Failed to update user role:', err);
        });
    },
    prevPage() {
      if (this.currentPage > 0) {
        this.currentPage--;
        this.fetchUsers();
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages - 1) {
        this.currentPage++;
        this.fetchUsers();
      }
    },

  },
  mounted() {
    this.fetchUsers();
  }
};
</script>

<style scoped>
th,
td {
  text-align: left;
}
</style>
