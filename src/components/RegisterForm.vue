<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div
        class="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Create an account
          </h1>

          <Form @submit="handleRegister" :validation-schema="schema" class="space-y-4 md:space-y-6">
            <div>
              <label for="username"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
              <Field name="username" type="text" id="username" class="input-field" />
              <p class="text-sm italic text-gray-600">Must have 4–10 characters</p>
              <ErrorMessage name="username" class="error-msg" />
            </div>

            <div>
              <label for="firstName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First
                Name</label>
              <Field name="firstName" type="text" id="firstName" class="input-field" />
              <ErrorMessage name="firstName" class="error-msg" />
            </div>

            <div>
              <label for="lastName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last
                Name</label>
              <Field name="lastName" type="text" id="lastName" class="input-field" />
              <ErrorMessage name="lastName" class="error-msg" />
            </div>

            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
              <Field name="email" type="email" id="email" class="input-field" />
              <ErrorMessage name="email" class="error-msg" />
            </div>

            <div>
              <label for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <Field name="password" type="password" id="password" class="input-field" />
              <p class="text-sm italic text-gray-600">Must have 6–20 characters</p>
              <ErrorMessage name="password" class="error-msg" />
            </div>

            <div>
              <label for="confirmPassword" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm
                Password</label>
              <Field name="confirmPassword" type="password" id="confirmPassword" class="input-field" />
              <ErrorMessage name="confirmPassword" class="error-msg" />
            </div>

            <div v-if="requireToken">
              <label for="invitationToken"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Invitation Token</label>
              <Field name="invitationToken" type="text" id="invitationToken" placeholder="MORU-INVITE-123"
                class="input-field" />
              <ErrorMessage name="invitationToken" class="error-msg" />
            </div>

            <!-- ✅ Agree to terms checkbox -->
            <div class="flex items-center">
              <Field name="agree" type="checkbox" id="agree" class="mr-2" :value="true" />
              <label for="agree" class="text-sm text-gray-700 dark:text-gray-300">
                I agree to the Terms and Privacy Policy
              </label>
            </div>
            <ErrorMessage name="agree" class="error-msg" />

            <button type="submit"
              class="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5"
              :disabled="loading">
              <span v-if="loading" class="animate-spin mr-2">⏳</span> Register
            </button>
          </Form>

          <div v-if="message" class="text-sm mt-4 px-4 py-2 rounded-lg"
            :class="successful ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'">
            {{ message }}
          </div>

          <p class="text-sm font-light text-gray-500 dark:text-gray-400">
            Already have an account?
            <router-link to="/login" class="font-medium text-blue-600 hover:underline dark:text-blue-500">Login
              here</router-link>
          </p>
        </div>
      </div>
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
          .min(3, "Username must be at least 3 characters")
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

<style scoped>
.input-field {
  @apply bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white;
}

.error-msg {
  @apply text-sm text-red-500 mt-1;
}
</style>
