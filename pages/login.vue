<!-- eslint-disable no-undef -->
<script setup>
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";
import { useUserStore } from "../stores/user";

const userStore = useUserStore();
const { role } = storeToRefs(userStore);
const form = ref({
  email: "",
  password: "",
});

const handleLogin = async () => {
  await userStore.LoginUser(form.value);
};

// Wait for the role to be updated before redirecting
watch(role, (currentValue, oldValue) => {
  if (currentValue === "Adjudicator Coordinator") {
    navigateTo({ path: "/" });
  } else if (currentValue === "Adjudicator") {
    navigateTo({ path: "/" });
  } else if (currentValue === "Team Coordinator") {
    navigateTo({ path: "/" });
  } else if (currentValue === "Admin") {
    navigateTo({ path: "/admin" });
  }
});
</script>

<template>
  <section class="flex justify-center h-screen w-screen">
    <div
      class="bg-gold border w-3/12 h-3/4 border-light-grey rounded-xl my-auto p-10"
    >
      <h1 class="text-5xl mt-9 mb-10 text-center">Login</h1>
      <br />
      <form class="flex-col" @submit.prevent="handleLogin">
        <FormField
          v-model="form.email"
          label="Email"
          placeholder="Your Email"
          type="email"
        />
        <FormField
          v-model="form.password"
          label="Password"
          placeholder="Your Password"
          type="password"
        />
        <div class="mt-20 text-center">
          <Button
            class
            button-text="Submit"
            button-color="bg-white"
            size="large"
          />
          <NuxtLink to="/">
            <p class="underline mt-16">Forgot my password</p>
          </NuxtLink>
        </div>
      </form>
    </div>
  </section>
</template>
