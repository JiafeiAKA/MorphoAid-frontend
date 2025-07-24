<template>
  <div id="app">
    <AppNavbar v-if="showLayout" />
    <div :class="showLayout ? 'ml-56 pt-20 p-6' : 'p-6 pt-10'">
      <router-view />
    </div>
  </div>
</template>

<script>
import AppNavbar from "@/components/layout/AppNavbar.vue";

export default {
  components: { AppNavbar },
  computed: {
    showLayout() {
      const hiddenRoutes = [
        "/login",
        "/register",
        "/register-doctor",
        "/register-moru",
        "/select-role"
      ];
      return !hiddenRoutes.includes(this.$route.path);
    }
  }
};
</script>
