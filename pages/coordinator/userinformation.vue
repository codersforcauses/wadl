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

        <FormField
          v-model="passwordForm.password"
          label="Password"
          placeholder="Password"
          type="password"
        />

        <FormField
          v-model="passwordForm.confirmPassword"
          label="Confirm Password"
          placeholder="Confirm Password"
          type="password"
        />

        <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>

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
      :modal-visibility="notification.isVisible"
      :is-success="notification.isSuccess"
      :body="notification.message"
      @close="
        notification.dismiss();
        redirect();
      "
    />
  </section>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { useHead, navigateTo } from "#imports";
import { useUserStore } from "../../stores/user";
import { handleError } from "../../misc/firebaseHelpers";
import useNotification from "../../composables/useNotification";

useHead({
  title: "User Information",
});
const userStore = useUserStore();

const infoForm = reactive({
  firstName: "",
  lastName: "",
  phoneNumber: null,
});
const passwordForm = reactive({
  currentPassword: "",
  password: "",
  confirmPassword: "",
});

onMounted(async () => {
  if (userStore.auth) {
    infoForm.firstName = userStore.firstName;
    infoForm.lastName = userStore.lastName;
    infoForm.phoneNumber = userStore.phoneNumber;
  }
});

const updateUser = () => {
  userStore.updateUser(infoForm.value);
};

const isValid = ref(true);
const errorMessage = ref();

// Notification Modal
const notification = useNotification();

const updatePassword = async () => {
  if (passwordForm.password.length < 8) {
    isValid.value = false;
    errorMessage.value = "The new password has to be at least 8 characters";
    return;
  }

  if (passwordForm.password !== passwordForm.confirmPassword) {
    isValid.value = false;
    errorMessage.value = "The password does not match";
    return;
  }
  try {
    await userStore.updateuserPassword(passwordForm);
    notification.notifySuccess(
      "Password successfully changed, please re-login."
    );
  } catch (error) {
    errorMessage.value = handleError(error);
  }
};
const redirect = () => {
  userStore.clearStore();
  navigateTo("/login");
};
</script>
