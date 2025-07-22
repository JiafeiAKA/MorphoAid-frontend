<template>
    <section class="fixed inset-0 bg-gradient-to-b from-[#F0F8FF] via-[#B8E7FC]/75 to-[#F0F8FF] flex items-center justify-center px-4">
    <div class="w-full max-w-[340px] sm:max-w-[420px] md:max-w-[480px] bg-white/60 backdrop-blur-md shadow-2xl rounded-lg flex flex-col items-center gap-4 px-14 py-6 sm:px-14 sm:py-8">
      <h1 class="text-2xl md:text-3xl font-bold text-[#2E2E2E] text-center">Register</h1>
      <p class="text-xs md:text-sm text-[#5C5C5C] text-center leading-relaxed">
        Let’s get you all set up so you can access your personal account.
      </p>

      <Form @submit="handleRegister" :validation-schema="schema" class="flex flex-col gap-4 w-full">
        <!-- Name and Lastname Row -->
        <div class="flex flex-col md:flex-row gap-4 w-full">
          <div class="w-full">
            <label class="block mb-1 text-xs font-medium text-[#2E2E2E]">Name</label>
            <Field name="firstName" type="text"
              class="w-full p-2 bg-white rounded border border-[#B8E7FC] focus:outline-none focus:ring-2 focus:ring-[#48B7CB] shadow-sm text-xs text-[#2E2E2E] font-normal" />
            <ErrorMessage name="firstName" class="text-[#A92222] text-xs mt-1" />
          </div>
          <div class="w-full">
            <label class="block mb-1 text-xs font-medium text-[#2E2E2E]">Lastname</label>
            <Field name="lastName" type="text"
              class="w-full p-2 bg-white rounded border border-[#B8E7FC] focus:outline-none focus:ring-2 focus:ring-[#48B7CB] shadow-sm text-xs text-[#2E2E2E] font-normal" />
            <ErrorMessage name="lastName" class="text-[#A92222] text-xs mt-1" />
          </div>
        </div>

        <!-- Username -->
        <div>
          <label class="block mb-1 text-xs font-medium text-[#2E2E2E]">Username</label>
          <Field name="username" type="text"
            class="w-full p-2 bg-white rounded border border-[#B8E7FC] focus:outline-none focus:ring-2 focus:ring-[#48B7CB] shadow-sm text-xs text-[#2E2E2E] font-normal" />
          <ErrorMessage name="username" class="text-[#A92222] text-xs mt-1" />
        </div>

        <!-- Email -->
        <div>
          <label class="block mb-1 text-xs font-medium text-[#2E2E2E]">Email</label>
          <Field name="email" type="email"
            class="w-full p-2 bg-white rounded border border-[#B8E7FC] focus:outline-none focus:ring-2 focus:ring-[#48B7CB] shadow-sm text-xs text-[#2E2E2E] font-normal" />
          <ErrorMessage name="email" class="text-[#A92222] text-xs mt-1" />
        </div>

        <!-- Password -->
        <div>
          <label class="block mb-1 text-xs font-medium text-[#2E2E2E]">Password</label>
          <Field name="password" type="password"
            class="w-full p-2 bg-white rounded border border-[#B8E7FC] focus:outline-none focus:ring-2 focus:ring-[#48B7CB] shadow-sm text-xs text-[#2E2E2E] font-normal" />
          <p class="text-[10px] italic text-gray-600">Password must contain alphabet and number</p>
          <ErrorMessage name="password" class="text-[#A92222] text-xs mt-1" />
        </div>

        <!-- Confirm Password -->
        <div>
          <label class="block mb-1 text-xs font-medium text-[#2E2E2E]">Confirm Password</label>
          <Field name="confirmPassword" type="password"
            class="w-full p-2 bg-white rounded border border-[#B8E7FC] focus:outline-none focus:ring-2 focus:ring-[#48B7CB] shadow-sm text-xs text-[#2E2E2E] font-normal" />
          <ErrorMessage name="confirmPassword" class="text-[#A92222] text-xs mt-1" />
        </div>

        <!-- Invitation Token -->
        <div v-if="requireToken">
          <label class="block mb-1 text-xs font-medium text-[#2E2E2E]">Invitation Token</label>
          <Field name="invitationToken" type="text" placeholder=" "
            class="w-full p-2 bg-white rounded border border-[#B8E7FC] focus:outline-none focus:ring-2 focus:ring-[#48B7CB] shadow-sm text-xs text-[#2E2E2E] font-normal" />
          <ErrorMessage name="invitationToken" class="text-[#A92222] text-xs mt-1" />
        </div>

        <!-- Terms Agreement -->
        <div class="flex items-start gap-2">
          <Field name="agree" type="checkbox" :value="true" :unchecked-value="false" class="mt-1 border border-[#2E2E2E]" />
          <label class="text-xs text-[#2E2E2E]">
            I agree to all the <span class="text-[#A92222] font-medium">Terms</span> and <span class="text-[#A92222] font-medium">Privacy Policies</span>
          </label>
        </div>
        <ErrorMessage name="agree" class="text-[#A92222] text-xs" />

        <!-- Submit Button -->
        <button type="submit"
          class="w-full h-10 bg-[#48B7CB] hover:bg-[#3ca0b2] rounded text-white text-sm font-semibold flex items-center justify-center gap-2"
          :disabled="loading">
          <svg v-show="loading" class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          <span>Register</span>
        </button>

        <!-- Redirect to login -->
        <p class="text-xs text-[#5C5C5C] text-center font-medium">
          Don’t have an account?
          <router-link to="/login" class="text-[#A92222] font-bold hover:underline hover:text-[#A92222]">Login</router-link>
        </p>
      </Form>
    </div>
  </section>
</template>


<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "RegisterForm",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  props: {
    role: { type: String, required: true },
    requireToken: { type: Boolean, default: false },
  },
  data() {
    return {
      message: "",
      loading: false,
      successful: false,
    };
  },
  computed: {
    schema() {
      const self = this;
      return yup.object({
        username: yup
          .string()
          .required("Username is required")
          .min(4, "Username must be at least 4 characters")
          .max(15, "Username must not exceed 15 characters"),
        firstName: yup.string().required("First name is required"),
        lastName: yup.string().required("Last name is required"),
        email: yup
          .string()
          .email("Invalid email format")
          .required("Email is required"),
        password: yup
          .string()
          .required("Password is required")
          .min(6, "Password must be at least 6 characters")
          .max(20, "Password must not exceed 20 characters"),
        confirmPassword: yup
          .string()
          .required("Please confirm your password")
          .test("passwords-match", "Passwords do not match", function (value) {
            return value === this.parent.password;
          }),
        agree: yup
          .boolean()
          .oneOf([true], "You must agree to terms and privacy policy"),
        invitationToken: self.requireToken
          ? yup.string().required("Invitation token is required")
          : yup.string().notRequired(),
      });
    },
  },
  methods: {
    handleRegister(formData) {
      this.message = "";
      this.successful = false;
      this.loading = true;

      const payload = {
        username: formData.username,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        roles: this.role,
        agree: formData.agree,
        invitationToken: this.requireToken ? formData.invitationToken : undefined,
      };


      this.$store.dispatch("auth/register", payload).then(
        (data) => {
          this.message = data.message || "Registration successful!";
          this.successful = true;
          this.loading = false;
          this.$router.push("/login");
        },
        (error) => {
          this.message =
            error.response?.data?.message ||
            error.message ||
            "Registration failed.";
          this.successful = false;
          this.loading = false;
        }
      );
    },
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
