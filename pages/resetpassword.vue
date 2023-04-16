<template>
  <section class="flex justify-center items-center h-[calc(100vh-72px)]">
    <form
      class="p-5 bg-white heading-montserrat border border-light-grey rounded-3xl max-w-lg py-10 mx-4"
      @submit.prevent="resetPassword"
    >
      <h1 class="text-2xl text-center pb-6">Reset Password</h1>
      <FormField
        v-model="form.email"
        label="Email"
        placeholder="Your Email"
        type="email"
      />
      <client-only>
        <p v-if="errorMessage" class="text-danger-red">
          {{ errorMessage }}
        </p>
      </client-only>
      <div class="w-full flex flex-col gap-6 items-center mt-4">
        <Button button-text="Submit" button-color="bg-gold " />
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
import { ref, onMounted } from "vue";
import { useUserStore } from "../stores/user";
import { handleError } from "../misc/firebaseHelpers";
import useNotification from "../composables/useNotification";
import { navigateTo } from "#imports";

const form = ref({
  email: "",
});
const userStore = useUserStore();
const errorMessage = ref(null);
const notification = useNotification();

const resetPassword = async () => {
  try {
    await userStore.resetPassword(form.value);
  } catch (error) {
    errorMessage.value = handleError(error);
    return;
  }
  notification.notifySuccess(
    "Successfully sent email, please check your email."
  );
};

const handleClose = () => {
  if (notification.isSuccess) {
    navigateTo({ path: "/admin" });
  } else {
    notification.dismiss();
  }
};

onMounted(() => {
  userStore.errorCode = null;
});
</script>
