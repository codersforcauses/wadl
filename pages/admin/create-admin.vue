<!-- eslint-disable no-undef -->
<script setup>
import { useAdminStore } from "../../stores/admin";
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useHead } from "#imports";
useHead({
  title: "Create Admin",
});
const userStore = useAdminStore();
const { errorCode } = storeToRefs(userStore);
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
const registerUser = () => {
  userStore.createAdmin(form.value);
};

watch(errorCode, (currentValue, oldValue) => {
  if (currentValue === "") {
    navigateTo({ path: "/admin" });
  }
});
</script>
<template>
  <section class="flex justify-center items-center h-[calc(100vh-72px)]">
    <form
      class="p-5 heading-montserrat border border-light-grey rounded-3xl max-w-lg mx-4"
      @submit.prevent="registerUser"
    >
      <h1 class="text-2xl text-center pb-2">Register New Admin</h1>
      <div class="grid grid-cols-2 gap-x-4">
        <div>
          <FormField
            v-model="form.firstName"
            label="Name"
            placeholder="First Name"
          />
        </div>
        <div class="mt-6">
          <FormField v-model="form.lastName" placeholder="Last Name" />
        </div>
      </div>
      <FormField v-model="form.email" label="Email" placeholder="Email" />
      <FormField
        v-model="form.phoneNumber"
        label="Phone Number"
        placeholder="Phone Number"
      />
      <FormField
        v-model="form.password"
        label="Password"
        type="password"
        placeholder="Password"
      />
      <FormField
        v-model="form.confirmPassword"
        label="Confirm Password"
        placeholder="Confirm Password"
        type="password"
      />
      <p v-if="userStore.errorCode" class="text-danger-red">
        {{ userStore.errorCode }}
      </p>
      <div class="w-full flex flex-col gap-6 items-center mt-4">
        <div class="w-full flex justify-center">
          <Button button-text="Submit" button-color="bg-gold" />
        </div>
      </div>
    </form>
  </section>
</template>
