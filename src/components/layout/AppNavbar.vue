<template>
  <div>
    <!-- Top Navbar -->
    <nav
      class="fixed top-0 left-0 right-0 h-16 bg-[#F0F8FF] border-b border-gray-200 z-40 flex items-center px-6 shadow-sm">
      <h1 class="text-xl font-bold text-gray-800">MorphoAids</h1>
      <div class="ml-auto relative">
        <button v-if="currentUser" @click="toggleDropdown"
          class="w-9 h-9 rounded-full bg-gray-300 hover:opacity-80 focus:outline-none">
          <img src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="avatar"
            class="w-full h-full rounded-full object-cover">
        </button>

        <!-- Dropdown -->
        <div v-if="dropdownOpen" class="absolute right-0 mt-2 w-48 bg-white rounded shadow z-50">
          <div class="px-4 py-2 border-b font-medium text-sm text-gray-800">
            {{ currentUser.username }}
          </div>
          <ul class="text-sm">
            <li><router-link to="/profile" class="block px-4 py-2 hover:bg-gray-100">Profile</router-link></li>
            <li v-if="showAdminBoard"><router-link to="/admin"
                class="block px-4 py-2 hover:bg-gray-100">Admin</router-link></li>
            <li v-if="showModeratorBoard"><router-link to="/mod"
                class="block px-4 py-2 hover:bg-gray-100">Moderator</router-link></li>
            <li><a href="#" @click.prevent="logOut" class="block px-4 py-2 text-red-500 hover:bg-gray-100">Log out</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Sidebar -->
    <aside class="fixed top-16 left-0 w-56 h-full bg-[#F9FAFB] border-r border-gray-200 pt-4 z-30">
      <nav class="flex flex-col space-y-1 text-sm font-medium text-gray-700">
        <router-link to="/home" class="nav-link" exact-active-class="bg-white font-semibold shadow-sm">🏠
          Dashboard</router-link>
        <router-link to="/case" class="nav-link" exact-active-class="bg-white font-semibold shadow-sm">📁
          Case</router-link>
        <router-link to="/message" class="nav-link" exact-active-class="bg-white font-semibold shadow-sm">💬
          Message</router-link>
        <router-link to="/setting" class="nav-link" exact-active-class="bg-white font-semibold shadow-sm">⚙️
          Setting</router-link>
        <router-link v-if="showAdminBoard" to="/admin/user-management" class="nav-link"
          exact-active-class="bg-white font-semibold shadow-sm">
          🛠 Manage Users
        </router-link>

      </nav>
    </aside>
  </div>
</template>

<script>
export default {
  name: 'AppNavbar',
  data() {
    return {
      dropdownOpen: false,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      return this.currentUser?.roles?.includes("ROLE_ADMIN");
    },
    showModeratorBoard() {
      return this.currentUser?.roles?.includes("ROLE_MODERATOR");
    }
  },
  methods: {
    logOut() {
      this.dropdownOpen = false;

      localStorage.removeItem("user");

      this.$store.dispatch("auth/logout");

      this.$nextTick(() => {
        this.$router.push("/login");
      });
    }
    ,
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    }
  },
  watch: {
    $route() {
      this.dropdownOpen = false;
    }
  }
};
</script>

<style scoped>
.nav-link {
  @apply block px-6 py-3 rounded-r-full hover:bg-white hover:shadow transition-all duration-150;
}
</style>
