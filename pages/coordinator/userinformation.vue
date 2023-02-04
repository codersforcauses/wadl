<template>
  <Header title-text="User Information" />
  <section class="flex justify-center items-center h-[calc(100vh-72px)]">
    <div>
      <form
        class="p-5 bg-white heading-montserrat border border-light-grey rounded-3xl max-w-lg py-10 mx-4"
        @submit.prevent="updateUser"
      >
        <h1 class="text-2xl text-center pb-6">Personal Information</h1>
        <FormField
          v-model="infoForm.firstName"
          label="First Name"
          placeholder="First Name"
          type="text"
        />
        <FormField
          v-model="infoForm.lastName"
          label="Last Name"
          placeholder="Last Name"
          type="text"
        />
        <FormField
          v-model="infoForm.phoneNumber"
          label="Phone Number"
          placeholder="Phone Number"
          type="number"
        />
        <p v-if="userStore.errorCode" class="text-danger-red">
          {{ userStore.errorCode }}
        </p>
        <div class="w-full flex flex-col gap-6 items-center mt-4">
          <Button
            button-text="Update"
            button-color="bg-light-green"
            text-color="text-white"
            size="medium"
          />
        </div>
      </form>
    </div>
    <div>
      <form
        class="p-5 bg-white heading-montserrat border border-light-grey rounded-3xl max-w-lg py-10 mx-4"
        @submit.prevent="updatePassword"
      >
        <h1 class="text-2xl text-center pb-6">Change Password</h1>

        <FormField
          v-model="passwordForm.currentPassword"
          label="Current Password"
          placeholder="Current Password"
          type="password"
        />

        <p v-if="userStore.passwordError" class="text-red-500">
          {{ userStore.passwordError }}
        </p>

        <FormField
          v-model="passwordForm.password"
          label="Password"
          placeholder="Password"
          type="password"
        />

        <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>

        <FormField
          v-model="passwordForm.confirmPassword"
          label="Confirm Password"
          placeholder="Confirm Password"
          type="password"
        />
        <p v-if="userStore.errorCode" class="text-danger-red">
          {{ userStore.errorCode }}
        </p>
        <p v-if="errorMessage2" class="text-red-500">{{ errorMessage2 }}</p>

        <div class="w-full flex flex-col gap-6 items-center mt-4">
          <Button
            button-text="Update"
            button-color="bg-light-green"
            text-color="text-white"
            size="medium"
          />
        </div>
      </form>
    </div>
    <Notification
      :modal-visibility="notificationVisibility"
      :is-success="isSuccess"
      :body="notificationMessage"
      @close="
        () => {
          notificationVisibility = false;
          redirect();
        }
      "
    />
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useHead, navigateTo } from "#imports";
import { useUserStore } from "../../stores/user";
useHead({
  title: "User Information",
});
const userStore = useUserStore();

const infoForm = ref({
  firstName: "",
  lastName: "",
  phoneNumber: null,
});
const passwordForm = ref({
  currentPassword: "",
  password: "",
  confirmPassword: "",
});

onMounted(async () => {
  if (userStore.auth) {
    infoForm.value.firstName = userStore.firstName;
    infoForm.value.lastName = userStore.lastName;
    infoForm.value.phoneNumber = userStore.phoneNumber;
  }
});

onUnmounted(() => {
  infoForm.value = null;
  passwordForm.value = null;
  errorMessage.value = null;
  errorMessage2.value = null;
  userStore.errorCode = null;
  userStore.passwordError = null;
  userStore.successCode = null;
});

const updateUser = () => {
  userStore.updateUser(infoForm.value);
};

const isValid = ref(true);
const errorMessage = ref();
const errorMessage2 = ref();
const errorMessagePassword = ref();
// Notification Modal
const notificationVisibility = ref(false);
const isSuccess = ref(false);
const notificationMessage = ref("");

const updatePassword = async () => {
  errorMessage.value = null;
  errorMessage2.value = null;
  userStore.errorCode = null;
  userStore.passwordError = null;
  userStore.successCode = null;

  if (passwordForm.value.currentPassword.length < 8) {
    errorMessagePassword.value = "new password not greater than 8";
    // return;
  }
  if (passwordForm.value.password.length < 8) {
    isValid.value = false;
    errorMessage.value = "The password has to be at least 8 characters";
    return;
  }

  if (passwordForm.value.password !== passwordForm.value.confirmPassword) {
    isValid.value = false;
    errorMessage.value = "The password does not match";
    return;
  }
  await userStore.updateuserPassword(passwordForm.value);
  if (
    (!userStore.errorCode ||
      !userStore.passwordError ||
      !errorMessage.value ||
      !errorMessage2.value ||
      !errorMessagePassword.value) &&
    userStore.successCode
  ) {
    isSuccess.value = true;
    notificationVisibility.value = true;
    notificationMessage.value = userStore.successCode;
    console.log(userStore.successCode);
  }
};
const redirect = () => {
  userStore.clearStore();
  navigateTo("/login");
};
</script>
