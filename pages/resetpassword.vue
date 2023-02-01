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
      <p v-if="userStore.errorCode" class="text-danger-red">
        {{ userStore.errorCode }}
      </p>
      <div class="w-full flex flex-col gap-6 items-center mt-4">
        <Button button-text="Submit" button-color="bg-gold " />
      </div>
    </form>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "../stores/user";
const form = ref({
  email: "",
});
const userStore = useUserStore();
const resetPassword = () => {
  userStore.resetPassword(form.value);
};
onMounted(() => {
  userStore.errorCode = null;
});
</script>
