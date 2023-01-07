<template>
  <form
    class="p-5 heading-montserrat border border-light-grey rounded-3xl max-w-lg mx-4"
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
      v-if="isValid"
      v-model="form.password"
      label="Password"
      type="password"
      placeholder="Your Password"
    />

    <FormField
      v-else
      v-model="form.password"
      label="Password"
      type="password"
      placeholder="Your Password"
      color="border-red-500"
    />
    <div></div>

    <FormField
      v-if="isValid"
      v-model="form.confirmPassword"
      label="Confirm Password"
      placeholder="Confirm Password"
      type="password"
    />
    <FormField
      v-else
      v-model="form.confirmPassword"
      label="Confirm Password"
      placeholder="Confirm Password"
      type="password"
      color="border-red-500"
    />
    <Roles v-model="form.role" />
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
import { useUserStore } from "../../stores/user";
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

const isValid = ref(true);
const errorMessage = ref("");

// Call The User Store
const registerUser = (e) => {
  if (form.value.password.length > 8) {
    if (form.value.password === form.value.confirmPassword) {
      userStore.registerUser(form.value);
    } else {
      isValid.value = false;
      errorMessage.value = "The password does not match";
    }
  } else {
    isValid.value = false;
    errorMessage.value = "The password has to be at least 8 characters";
    console.log(errorMessage);
  }
};
</script>
