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
            <span v-for="role in user.roles" :key="role" class="inline-block px-2 py-1 text-xs rounded bg-blue-100 text-blue-800 mr-1">
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

    <!-- Edit Role Modal -->
    <EditUserRoleModal
      v-if="selectedUser"
      :user="selectedUser"
      :show="showModal"
      @close="closeModal"
      @updated="fetchUsers"
    />
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
    };
  },
  methods: {
    fetchUsers() {
      axios.get('http://localhost:8080/api/admin/users')
        .then(res => {
          this.users = res.data;
        })
        .catch(err => {
          console.error('Error fetching users:', err);
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
      if (confirm('Are you sure you want to delete this user?')) {
        axios.delete(`http://localhost:8080/api/admin/users/${userId}`)
          .then(() => {
            this.fetchUsers();
          })
          .catch(err => {
            console.error('Failed to delete user:', err);
          });
      }
    },
  },
  mounted() {
    this.fetchUsers();
  }
};
</script>

<style scoped>
th, td {
  text-align: left;
}
</style>
