<template>
  <div class="container">
    <header class="jumbotron">
      <h3 class="text-red-500" v-if="error">{{ content }}</h3>
      <h3 v-else>{{ content }}</h3>
    </header>
  </div>
</template>

<script>
import UserService from "../services/user.service";

export default {
  name: 'BoardUserComponent',
  data() {
    return {
      content: "",
      error: false
    };
  },
  mounted() {
    UserService.getUserBoard().then(
      (response) => {
        this.content = response.data;
        this.error = false;
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        this.content = message;
        this.error = true;

        // 🔐 ถ้า token หมดอายุหรือไม่มีสิทธิ์ → redirect ไปหน้า login
        if (error.response && error.response.status === 401) {
          this.$router.push("/login");
        }
      }
    );
  },
};
</script>
