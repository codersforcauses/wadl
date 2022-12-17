<template>
  <form
    class="max-w-lg p-5 border heading-montserrat border-light-grey rounded-3xl"
    @submit.prevent="registerUser"
  >
    <h1 class="pb-2 text-2xl text-center">Register</h1>
    <div class="grid grid-cols-2 gap-x-4">
      <div>
        <FormField
          v-model="form.firstName"
          label="Name"
          placeholder="Your First Name"
        />
      </div>
      <div class="mt-6">
        <FormField v-model="form.lastName" placeholder="Your Last Name" />
      </div>
    </div>
    <FormField v-model="form.email" label="Email" placeholder="Your Email" />
    <FormField
      v-model="form.password"
      label="Password"
      type="password"
      placeholder="Your Password"
    />
    <FormField
      v-model="form.confirmPassword"
      label="Confirm Password"
      placeholder="Confirm Password"
      type="password"
    />
    <Roles v-model="form.role" />
    <div class="flex justify-center w-full mt-4">
      <Button button-text="Submit" button-color="bg-gold" />
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
