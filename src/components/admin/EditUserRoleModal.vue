<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    role="dialog"
    aria-modal="true"
  >
    <div class="w-full max-w-sm bg-white/80 backdrop-blur-md rounded-xl shadow-2xl p-6">
      <h2 class="text-2xl font-bold text-center text-[#2E2E2E] mb-4">Edit Role</h2>

      <form @submit.prevent="submitRoleUpdate" class="space-y-4">
        <div>
          <label for="role" class="block text-sm font-medium text-gray-700 mb-1">Select Role</label>
          <select
            id="role"
            v-model="selectedRole"
            class="w-full bg-white rounded-md border border-[#B8E7FC] p-2 text-sm shadow focus:outline-none focus:ring-2 focus:ring-[#48B7CB]"
            required
          >
            <option disabled value="">-- Choose a role --</option>
            <option value="ROLE_USER">User</option>
            <option value="ROLE_MODERATOR">Moderator</option>
            <option value="ROLE_ADMIN">Admin</option>
          </select>
        </div>

        <div class="flex justify-end space-x-3 pt-2">
          <button
            type="button"
            @click="closeModal"
            class="text-sm text-gray-500 hover:text-gray-700 hover:underline transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-[#48B7CB] hover:bg-[#3ca0b2] text-white text-sm font-medium rounded-md flex items-center justify-center"
            :disabled="loading"
          >
            <svg v-if="loading" class="w-4 h-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="white" stroke-width="4" />
              <path class="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
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

<style >
/* no need for additional style — fully Tailwind-based */
</style>
