<template>
  <section class="bg-gradient-to-b from-blue-100 to-blue-200 min-h-screen flex items-center justify-center">
    <div class="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-center space-y-6">
      <h1 class="text-2xl font-bold text-gray-900">MorphoAid</h1>
      <p class="text-gray-600 text-sm">Let’s get you all set up so you can access your personal account.</p>

      <Form @submit="handleLogin" :validation-schema="schema" class="space-y-4 text-left">
        <div>
          <label for="email" class="block mb-1 text-sm font-medium text-gray-700">Email</label>
          <Field name="email" type="email"
            class="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
             />
          <ErrorMessage name="email" class="text-red-500 text-xs mt-1 block" />
        </div>

        <div>
          <label for="password" class="block mb-1 text-sm font-medium text-gray-700">Password</label>
          <Field name="password" type="password"
            class="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:ring-2 focus:ring-blue-500"
         />
          <ErrorMessage name="password" class="text-red-500 text-xs mt-1 block" />
        </div>

        <div class="flex items-center justify-between text-sm">
          <label class="inline-flex items-center">
            <input type="checkbox" class="mr-2 border-gray-300 rounded" />
            Remember me
          </label>
          <router-link to="/forgot-password" class="text-red-500 hover:underline">
            Forgot Password
          </router-link>
        </div>

        <button type="submit"
          class="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-2.5 rounded-md transition duration-200"
          :disabled="loading">
          <svg v-show="loading" class="animate-spin h-4 w-4 mr-2 inline-block text-white" xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          <span>Login</span>
        </button>

        <div v-if="message" class="text-red-600 text-sm text-center">
          {{ message }}
        </div>

        <p class="text-center text-sm text-gray-600">
          Don’t have an account?
          <router-link to="/select-role" class="text-red-500 font-medium hover:underline">
            Register
          </router-link>
        </p>
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

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.error-feedback {
  color: red;
}
</style>
