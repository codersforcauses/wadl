<template>
  <form
    class="p-5 heading-montserrat border border-light-grey rounded-3xl max-w-lg"
    @submit.prevent="registerUser"
  >
    <h1 class="text-2xl text-center pb-2">Register</h1>
    <div class="grid grid-cols-2 gap-x-4">
      <div>
        <FormField
          v-model="form.firstName"
          data-test="firstName"
          label="Name"
          placeholder="Your First Name"
        />
      </div>
      <div class="mt-6">
        <FormField
          v-model="form.lastName"
          data-test="lastName"
          placeholder="Your Last Name"
        />
      </div>
    </div>
    <FormField
      v-model="form.email"
      data-test="email"
      label="Email"
      placeholder="Your Email"
    />
    <FormField
      v-model="form.password"
      data-test="password"
      label="Password"
      type="password"
      placeholder="Your Password"
    />
    <FormField
      v-model="form.confirmPassword"
      data-test="confirmPassword"
      label="Confirm Password"
      placeholder="Confirm Password"
      type="password"
    />
    <Roles v-model="form.role" />
    <div class="w-full flex justify-center mt-4">
      <Button data-test="submit" button-text="Submit" button-color="bg-gold" />
    </div>
  </form>
</template>

<script setup>
import Roles from "./Roles.vue";
import { useUserStore } from "../../stores/user";
import { ref } from "vue";

const userStore = useUserStore();
const form = ref({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "",
});

// TODO VALIDATE FORM

// Call The User Store
const registerUser = (e) => {
  userStore.registerUser(form.value);
};
</script>
