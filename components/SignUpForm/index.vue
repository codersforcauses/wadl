<template>
  <form
    class="p-5 heading-montserrat border border-light-grey rounded-3xl max-w-lg mx-4"
    @submit.prevent="registerUser"
  >
    <h1 class="text-2xl text-center pb-2">Register</h1>
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
      v-model="form.phoneNumber"
      label="Phone Number"
      placeholder="Your Phone Number"
    />
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
    <p v-if="userStore.errorCode" class="text-danger-red">
      {{ userStore.errorCode }}
    </p>
    <div class="w-full flex flex-col gap-6 items-center mt-4">
      <div class="w-full flex justify-center">
        <Button button-text="Submit" button-color="bg-gold" />
      </div>
      <span class="text-xs">
        Already have an account?
        <NuxtLink
          to="/login"
          class="underline underline-offset-4 text-xs hover:text-light-orange-gold"
        >
          Login
        </NuxtLink></span
      >
    </div>
  </form>
</template>

<script setup>
import Roles from "./Roles.vue";
import { useUserStore } from "../../stores/auth";
import { ref } from "vue";

const userStore = useUserStore();
const form = ref({
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
  role: "",
});

// Call The User Store
const registerUser = (e) => {
  userStore.registerUser(form.value);
};
</script>
