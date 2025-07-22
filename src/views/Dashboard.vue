<template>
  <div>
    <component :is="dashboardComponent" />
  </div>
</template>

<script>
import AdminDashboard from "@/components/dashboard/AdminDashboard.vue";
import ModeratorDashboard from "@/components/dashboard/MoruDashboard.vue";
import UserDashboard from "@/components/dashboard/DoctorDashboard.vue";

export default {
  name: "DashboardView",
  computed: {
    userRole() {
      // สมมุติว่าดึงมาจาก Vuex store
      return this.$store.state.auth.user.roles[0]; // เช่น 'ROLE_ADMIN'
    },
    dashboardComponent() {
      switch (this.userRole) {
        case 'ROLE_ADMIN':
          return AdminDashboard;
        case 'ROLE_MODERATOR':
          return ModeratorDashboard;
        default:
          return UserDashboard;
      }
    }
  }
};
</script>
