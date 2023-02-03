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
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useHead } from "#imports";
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
const updateUser = () => {
  userStore.updateUser(infoForm.value);
};
</script>
