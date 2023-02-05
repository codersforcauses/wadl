<template>
  <section class="flex justify-center items-center h-[calc(100vh-72px)]">
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
      <FormField
        v-model="form.email"
        label="Email"
        type="email"
        placeholder="Your Email"
      />
      <FormField
        v-model="form.phoneNumber"
        label="Phone Number"
        type="number"
        placeholder="Your Phone Number"
      />

      <FormField
        v-model="form.password"
        label="Password"
        type="password"
        placeholder="Your Password"
        :color="!isValid ? 'border-red-500' : ''"
        @update="updateInput"
      />
      <p class="text-red-500">{{ errorMessage }}</p>

      <FormField
        v-model="form.confirmPassword"
        label="Confirm Password"
        placeholder="Confirm Password"
        type="password"
        :color="!isValid ? 'border-red-500' : ''"
        @update="updateInput"
      />
      <Dropdown
        v-model="form.role"
        :color="!isRoleValid ? 'border-red-500' : ''"
        label="Role"
        @update="updateInput"
      />
      <p class="text-red-500">{{ errorMessage2 }}</p>
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
  </section>
  <Notification
    :modal-visibility="notification.isVisible"
    :is-success="notification.isSuccess"
    :body="notification.message"
    @close="handleClose()"
  />
</template>

<script setup>
import { useUserStore } from "../stores/user";
import { ref } from "vue";
import { useHead, navigateTo } from "#imports";
import useNotification from "../composables/useNotification";
useHead({
  title: "Signup",
});

const notification = useNotification();

const userStore = useUserStore();

if (userStore.auth) {
  navigateTo("/");
} else {
  try {
    await userStore.clearStore();
  } catch (error) {
    notification.notifyError(error);
  }
}

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
const isRoleValid = ref(true);
const errorMessage = ref("");
const errorMessage2 = ref("");

const updateInput = () => {
  errorMessage.value = "";
  errorMessage2.value = "";
  isValid.value = true;
  isRoleValid.value = true;
};

// Call The User Store
const registerUser = async () => {
  console.log(form.value);
  if (form.value.password.length < 8) {
    isValid.value = false;
    errorMessage.value = "The password has to be at least 8 characters";
    return;
  }

  if (form.value.password !== form.value.confirmPassword) {
    isValid.value = false;
    errorMessage.value = "The password does not match";
    return;
  }

  if (!form.value.role) {
    isRoleValid.value = false;
    errorMessage2.value = "You have to choose a role";
    return;
  }

  try {
    await userStore.registerUser({ ...form.value });
  } catch (error) {
    notification.notifyError(error);
    return;
  }

  notification.notifySuccess(
    "Please wait for approval from admin before logging in."
  );
  try {
    await userStore.clearStore();
  } catch (error) {
    notification.notifyError(error);
  }
};
const handleClose = () => {
  notification.dismiss();
  if (notification.isSuccess) {
    navigateTo("/");
  }
};
</script>
