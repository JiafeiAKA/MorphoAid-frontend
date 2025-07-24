<template>
  <section
    class="fixed inset-0 bg-gradient-to-b from-[#F0F8FF] via-[#B8E7FC]/75 to-[#F0F8FF] flex items-center justify-center px-4">
    <div
      class="max-w-md md:max-w-[760px] p-10 bg-white/60 backdrop-blur-md shadow-2xl rounded-lg flex flex-col items-center gap-4">
      <h1 class="text-2xl md:text-4xl font-bold text-[#2E2E2E] leading-snug md:leading-[54px] text-center">MorphoAid
      </h1>
      <p class="text-xs md:text-md text-[#5C5C5C] text-opacity-90 text-center leading-relaxed">
        Let’s get you all set up so you can access your personal account.
      </p>

      <Form @submit="handleLogin" :validation-schema="schema" class="flex flex-col gap-6 w-full items-center">
        <div class="flex flex-col gap-6 w-full items-center">
          <!-- Email -->
          <div class="w-full md:w-[512px] flex flex-col ">
            <label class="text-xs md:text-sm text-[#2E2E2E]">Email</label>
            <Field name="email" type="email"
              class="w-full p-2 text-xs md:text-sm bg-white rounded border border-[#B8E7FC] focus:outline-none focus:ring-2 focus:ring-[#48B7CB] shadow-sm text-[#2E2E2E] font-normal" />
            <ErrorMessage name="email" class="text-[#A92222] text-xs mt-1" />
          </div>

          <!-- Password -->
          <div class="w-full md:w-[512px] flex flex-col ">
            <label class="text-xs md:text-sm text-[#2E2E2E]">Password</label>
            <Field name="password" type="password"
              class="w-full p-2 text-xs md:text-sm bg-white rounded border border-[#B8E7FC] focus:outline-none focus:ring-2 focus:ring-[#48B7CB] shadow-sm text-[#2E2E2E] font-normal" />
            <ErrorMessage name="password" class="text-[#A92222] text-xs mt-1" />
          </div>

          <!-- Remember Me / Forgot -->
          <div class="w-full flex md:w-[512px] justify-between items-center text-sm">
          </div>

        </div>
<p v-if="message" class="text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-2 rounded w-full md:w-[512px] text-center">
  {{ message }}
</p>

        <!-- Sign In Button -->
        <div class="flex flex-col gap-4 w-full items-center">
          <button type="submit"
            class="w-full md:w-[512px] h-10 bg-[#48B7CB] hover:bg-[#3ca0b2] rounded text-white text-sm font-semibold flex items-center justify-center gap-2"
            :disabled="loading">
            <svg v-show="loading" class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            <span>Login</span>
          </button>

          <p class="text-xs md:text-sm text-[#5C5C5C] text-center font-medium">
            Don’t have an account?
            <router-link to="/select-role"
              class="text-xs md:text-sm text-[#A92222] hover:text-[#A92222] font-bold hover:underline">Register</router-link>
          </p>
        </div>
      </Form>
    </div>
  </section>
</template>


<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "LoginForm",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      email: yup.string().required("Email is required!").email("Invalid email format"),
      password: yup.string().required("Password is required!"),
    });

    return {
      loading: false,
      message: "",
      schema,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleLogin({ email, password }) {
      this.loading = true;

      const user = { email, password }; // ✅ ส่งเป็น email ตรง ๆ

      this.$store.dispatch("auth/login", user).then(
        () => {
          this.$router.push("/profile");
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    }

  },
};
</script>

<style scoped lang="postcss">
.input-field {
  @apply bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white;
}

input:-webkit-autofill {
  box-shadow: 0 0 0px 1000px white inset !important;
  -webkit-box-shadow: 0 0 0px 1000px white inset !important;
  background-color: white !important;
  transition: background-color 9999s ease-out 0s !important;
}
</style>
