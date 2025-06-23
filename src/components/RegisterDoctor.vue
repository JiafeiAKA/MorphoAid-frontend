<template>
  <RegisterForm :role="'user'" />
</template>

<script>
import RegisterForm from "@/components/RegisterForm.vue";

export default {
  name: "RegisterDoctor",
  components: { RegisterForm },
};
</script>