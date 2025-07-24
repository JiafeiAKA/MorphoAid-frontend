<template>
  <section class="min-h-[80vh] bg-gradient-to-b from-[#F0F8FF] via-[#B8E7FC]/50 to-[#F0F8FF] px-4 py-10 flex justify-center">
    <div v-if="currentUser" class="w-full max-w-xl bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-8">
      <h2 class="text-2xl font-bold text-[#2E2E2E] mb-6 text-center">
      Profile
      </h2>

      <div class="space-y-4 text-sm text-gray-700">
        <p>
          <span class="font-semibold text-gray-800">🔐 Token:</span><br />
          <span class="break-all">
            {{ currentUser.accessToken.substring(0, 20) }}...{{ currentUser.accessToken.slice(-20) }}
          </span>
        </p>

        <p>
          <span class="font-semibold text-gray-800">🆔 ID:</span> {{ currentUser.id }}
        </p>

        <p>
          <span class="font-semibold text-gray-800">📧 Email:</span> {{ currentUser.email }}
        </p>

        <div>
          <span class="font-semibold text-gray-800">🎖️ Roles:</span>
          <ul class="mt-1 list-disc list-inside text-sm text-[#2E2E2E]">
            <li v-for="role in currentUser.roles" :key="role">{{ role }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'UserProfile',
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
};
</script>
