<template>
  <section class="fixed inset-0 bg-gradient-to-b from-[#F0F8FF] via-[#B8E7FC]/75 to-[#F0F8FF] flex items-center justify-center px-4">
    <div class="w-full max-w-md md:max-w-[760px] md:px-16 px-6 py-10 bg-white/80 backdrop-blur-md shadow-2xl rounded-xl p-6 flex flex-col items-center gap-6">
      <h1 class="text-3xl md:text-4xl font-bold text-[#2E2E2E] leading-snug md:leading-[54px] text-center">MorphoAid</h1>
      <p class="text-base md:text-lg text-[#5C5C5C] text-opacity-90 text-center leading-relaxed">
        Let’s get you all set up so you can access your personal account.
      </p>

      <Form @submit="handleLogin" :validation-schema="schema" class="flex flex-col gap-10 w-full items-center">
        <div class="flex flex-col gap-6 w-full items-center">
          <!-- Email -->
          <div class="w-full md:w-[512px] flex flex-col gap-2.5">
            <label class="text-sm md:text-base text-[#2E2E2E]">Email</label>
            <Field name="email" type="email"
              class="w-full p-2 bg-white rounded border border-[#B8E7FC] focus:outline-none focus:ring-2 focus:ring-[#48B7CB] shadow-sm text-xs text-[#2E2E2E] font-normal" />
            <ErrorMessage name="email" class="text-[#A92222] text-xs mt-1" />
          </div>

          <!-- Password -->
          <div class="w-full md:w-[512px] flex flex-col gap-2.5">
            <label class="text-sm md:text-base text-[#2E2E2E]">Password</label>
            <Field name="password" type="password"
              class="w-full p-2 bg-white rounded border border-[#B8E7FC] focus:outline-none focus:ring-2 focus:ring-[#48B7CB] shadow-sm text-xs text-[#2E2E2E] font-normal" />
            <ErrorMessage name="password" class="text-[#A92222] text-xs mt-1" />
          </div>

          <!-- Remember Me / Forgot -->
          <div class="w-full md:w-[512px] flex flex-col md:flex-row justify-between text-sm gap-2">
            <label class="inline-flex items-center gap-2">
              <input type="checkbox" class="w-4 h-4 border border-[#2E2E2E]" />
              <span class="text-[#2E2E2E] font-medium tracking-wider">Remember me</span>
            </label>
            <router-link to="/forgot-password" class="text-[#A92222] hover:text-[#A92222] font-medium tracking-wider hover:underline">
              Forgot Password
            </router-link>
          </div>
        </div>

        <!-- Sign In Button -->
        <div class="flex flex-col gap-4 w-full items-center">
          <button type="submit"
            class="w-full md:w-[512px] h-12 bg-[#48B7CB] hover:bg-[#3ca0b2] rounded text-white text-sm font-semibold flex items-center justify-center gap-2"
            :disabled="loading">
            <svg v-show="loading" class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg"
              fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            <span>Sign In</span>
          </button>

          <p class="text-sm text-[#5C5C5C] text-center font-medium">
            Don’t have an account?
            <router-link to="/select-role" class="text-[#A92222] hover:text-[#A92222] font-medium hover:underline">Sign up</router-link>
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

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.error-feedback {
  color: red;
}
</style>
