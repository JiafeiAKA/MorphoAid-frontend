<template>
  <div id="app">
    <!-- Top Navbar (only visible on certain routes) -->
    <nav v-if="showLayout"
      class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div class="px-3 py-3 lg:px-5 lg:pl-3 flex justify-between items-center">
        <div class="flex items-center space-x-3">
          <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" type="button"
            class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path clip-rule="evenodd" fill-rule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z">
              </path>
            </svg>
          </button>
          <router-link to="/" class="flex items-center space-x-2">
            <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Logo" />
            <span class="self-center text-xl font-semibold dark:text-white">YourApp</span>
          </router-link>
        </div>

        <div class="relative">
          <button v-if="currentUser"
            class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            @click="toggleDropdown">
            <img class="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              alt="user photo" />
          </button>

          <!-- ✅ Safe check for currentUser -->
          <div v-if="dropdownOpen && currentUser"
            class="absolute right-0 z-50 mt-2 w-48 text-base bg-white rounded-md shadow-md dark:bg-gray-700">
            <div class="px-4 py-3 border-b dark:border-gray-600">
              <p class="text-sm font-medium text-gray-900 dark:text-white">
                {{ currentUser.username }}
              </p>
            </div>
            <ul class="py-1">
              <li>
                <router-link to="/profile"
                  class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600">Profile</router-link>
              </li>
              <li v-if="showAdminBoard">
                <router-link to="/admin"
                  class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600">Admin
                  Board</router-link>
              </li>
              <li v-if="showModeratorBoard">
                <router-link to="/mod"
                  class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600">Moderator
                  Board</router-link>
              </li>
              <li>
                <a href="#" @click.prevent="logOut"
                  class="block px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600">Log
                  out</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>

    <!-- Sidebar (only visible on certain routes) -->
    <aside v-if="showLayout" id="logo-sidebar"
      class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700">
      <div class="h-full px-3 pb-4 overflow-y-auto">
        <ul class="space-y-2 font-medium">
          <li>
            <router-link to="/home"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">🏠
              Home</router-link>
          </li>
          <li v-if="currentUser">
            <router-link to="/user"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">👤
              User</router-link>
          </li>
        </ul>
      </div>
    </aside>

    <!-- Page Content -->
    <div :class="showLayout ? 'p-4 sm:ml-64 mt-16' : 'p-4 mt-4'">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dropdownOpen: false
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      return this.currentUser && this.currentUser.roles && this.currentUser.roles.includes("ROLE_ADMIN");
    },
    showModeratorBoard() {
      return this.currentUser && this.currentUser.roles && this.currentUser.roles.includes("ROLE_MODERATOR");
    },
    showLayout() {
      const hiddenRoutes = [
        '/login',
        '/register',
        '/select-role',
        '/register-moru',
        '/register-doctor'
      ];
      return !hiddenRoutes.includes(this.$route.path);
    }

  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
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
/* Optional styles */
</style>
