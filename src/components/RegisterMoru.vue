<template>
  <RegisterForm :role="'moderator'" :requireToken="true" />
</template>

<script>
import RegisterForm from "@/components/RegisterForm.vue";

export default {
  name: "RegisterMoru",
  components: { RegisterForm },
};
</script>