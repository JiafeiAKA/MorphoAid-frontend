<template>
  <section
    class="min-h-screen bg-gradient-to-b from-[#F0F8FF] via-[#B8E7FC]/75 to-[#F0F8FF] px-4 py-10 flex justify-center">
    <div class="w-full max-w-[960px] bg-white/70 backdrop-blur-md shadow-xl rounded-xl p-6">
      <h1 class="text-3xl font-bold text-center text-[#2E2E2E] mb-8">User Management</h1>

      <div class="overflow-x-auto rounded">
        <table class="min-w-full text-sm text-[#2E2E2E] table-auto border-separate border-spacing-y-2">
          <thead class="bg-[#B8E7FC] text-xs text-gray-700 uppercase rounded">
            <tr>
              <th class="px-6 py-3 text-left">ID</th>
              <th class="px-6 py-3 text-left">Username</th>
              <th class="px-6 py-3 text-left">Email</th>
              <th class="px-6 py-3 text-left">Roles</th>
              <th class="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id"
              class="hover:bg-[#F0F8FF] bg-white shadow-sm rounded-lg transition-all duration-200">
              <td class="px-6 py-4">{{ user.id }}</td>
              <td class="px-6 py-4">{{ user.username }}</td>
              <td class="px-6 py-4">{{ user.email }}</td>
              <td class="px-6 py-4">
                <span v-for="role in user.roles" :key="role"
                  class="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded mr-1">
                  {{ role }}
                </span>
              </td>
              <td class="px-6 py-4 space-x-2">
                <button @click="openEditModal(user)" class="text-blue-600 hover:underline text-sm">Edit Role</button>
                <button @click="deleteUser(user.id)" class="text-red-600 hover:underline text-sm">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>


      <!-- Pagination -->
      <div class="mt-6 flex justify-between items-center text-sm">
        <button @click="prevPage" :disabled="currentPage === 0"
          class="px-4 py-1 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 rounded">
          Previous
        </button>
        <span class="text-gray-700">Page {{ currentPage + 1 }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage >= totalPages - 1"
          class="px-4 py-1 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 rounded">
          Next
        </button>
      </div>

      <!-- Modal -->
      <EditUserRoleModal v-if="showModal && selectedUser" :user="selectedUser" :show="showModal" @close="closeModal"
        @updated="fetchUsers" @update-role="updateUserRole" />

    </div>
  </section>
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
