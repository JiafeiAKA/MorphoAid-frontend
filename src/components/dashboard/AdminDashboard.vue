<template>
  <section class="min-h-[80vh] flex items-center justify-center px-4 py-10 bg-gradient-to-b from-[#F0F8FF] to-[#E6F7FF]">
    <div class="bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-8 max-w-xl w-full text-center">
      <h2 class="text-2xl font-bold text-[#2E2E2E] mb-4">Admin Board</h2>
      <p v-if="error" class="text-red-500 font-medium">{{ content }}</p>
      <p v-else class="text-gray-700">{{ content }}</p>
    </div>
  </section>
</template>

<script>
import UserService from "../../services/user.service";

export default {
  name: "AdminBoard",
  data() {
    return {
      content: "",
      error: false
    };
  },
  mounted() {
    UserService.getAdminBoard().then(
      (response) => {
        this.content = response.data;
        this.error = false;
      },
      (error) => {
        const message =
          (error.response?.data?.message) ||
          error.message ||
          error.toString();

        this.content = message;
        this.error = true;

        if (error.response?.status === 401) {
          this.$router.push("/login");
        }
      }
    );
  },
};
</script>
