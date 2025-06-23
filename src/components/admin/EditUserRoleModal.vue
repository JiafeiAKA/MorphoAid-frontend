<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    role="dialog"
    aria-modal="true"
  >
    <div class="bg-white rounded-lg shadow-lg max-w-sm w-full p-6">
      <h2 class="text-xl font-semibold mb-4 text-gray-800">Edit Role</h2>

      <form @submit.prevent="submitRoleUpdate">
        <label for="role" class="block mb-2 font-medium text-gray-700">Select Role</label>
        <select
          id="role"
          v-model="selectedRole"
          class="block w-full border border-gray-300 rounded-md p-2 mb-4"
          required
        >
          <option disabled value="">-- Choose a role --</option>
          <option value="ROLE_USER">User</option>
          <option value="ROLE_MODERATOR">Moderator</option>
          <option value="ROLE_ADMIN">Admin</option>
        </select>

        <div class="flex justify-end space-x-2">
          <button type="button" @click="closeModal" class="text-gray-600 hover:underline">Cancel</button>
          <button
            type="submit"
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            :disabled="loading"
          >
            <span v-if="loading" class="animate-spin mr-2">⏳</span>
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditUserRoleModal",
  props: {
    show: { type: Boolean, default: false },
    user: { type: Object, required: true }
  },
  emits: ["update-role", "close"],
  data() {
    return {
      selectedRole: this.user.roles[0] || "",
      loading: false
    };
  },
  watch: {
    user(newVal) {
      this.selectedRole = newVal?.roles[0] || "";
    }
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    async submitRoleUpdate() {
      this.loading = true;
      try {
        await this.$emit("update-role", {
          userId: this.user.id,
          newRole: this.selectedRole
        });
        this.closeModal();
      } catch (e) {
        alert("Failed to update role");
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
/* Optional additional styles */
</style>
