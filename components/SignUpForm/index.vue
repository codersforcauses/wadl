<template>
  <form
    @submit.prevent="registerUser"
    class="p-5 heading-montserrat border border-light-grey rounded-3xl max-w-lg"
  >
    <h1 class="text-2xl text-center pb-2">Register</h1>
    <div class="grid grid-cols-2 gap-x-4">
      <div>
        <FormField
          label="Name"
          v-model="f.firstName"
          placeholder="Your First Name"
        />
      </div>
      <div class="mt-6">
        <FormField v-model="f.lastName" placeholder="Your Last Name" />
      </div>
    </div>
    <FormField label="Email" v-model="f.email" placeholder="Your Email" />
    <FormField
      label="Password"
      v-model="f.password"
      type="password"
      placeholder="Your Password"
    />
    <FormField
      label="Confirm Password"
      v-model="f.confirmPassword"
      placeholder="Confirm Password"
      type="password"
    />
    <!-- <DefaultInputs /> -->
    <Roles />
    <div class="w-full flex justify-center mt-4">
      <Button button-text="Submit" button-color="bg-gold" />
    </div>
  </form>
</template>

<script setup>
import DefaultInputs from "./DefaultInputs.vue";
import Roles from "./Roles.vue";
import Button from "../Button/index.vue";
import { useUserStore } from "../../stores/user";

const user = useUserStore();
const f = ref({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "",
});
console.log(f);

console.log(user);
const registerUser = (e) => {
  console.log(f.value);

  user.registerUser(f.value);
};
</script>
