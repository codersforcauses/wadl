<!-- eslint-disable no-undef -->
<script setup>
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";
import { useUserStore } from "../stores/user";
import { useHead, useNuxtApp } from "#imports";
useHead({
  title: "Login",
});

const userStore = await useUserStore();
if (userStore.auth) {
  navigateTo("/");
} else {
  userStore.clearStore();
}

const { role } = storeToRefs(userStore);
const form = ref({
  email: "",
  password: "",
});

const handleLogin = () => {
  userStore.loginUser(form.value);
};

// Wait for the role to be updated before redirecting
watch(role, (currentValue, oldValue) => {
  if (currentValue === "Adjudicator Coordinator") {
    navigateTo({ path: "/" });
  } else if (currentValue === "Adjudicator") {
    navigateTo({ path: "/" });
  } else if (currentValue === "Team Coordinator") {
    if (userStore.institution) {
      navigateTo({ path: "/coordinator" });
    } else {
      navigateTo({ path: "/coordinator/institutions" });
    }
  } else if (currentValue === "Admin") {
    navigateTo({ path: "/admin" });
  }
});
</script>

<template>
  <section class="flex justify-center items-center h-[calc(100vh-72px)]">
    <form
      class="p-5 bg-white heading-montserrat border border-light-grey rounded-3xl max-w-lg py-10 mx-4"
      @submit.prevent="handleLogin"
    >
      <h1 class="text-2xl text-center pb-6">Login</h1>
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
      <client-only>
        <p v-if="userStore.errorCode" class="text-danger-red">
          {{ userStore.errorCode }}
        </p>
      </client-only>
      <div class="w-full flex flex-col gap-6 items-center mt-4">
        <Button button-text="Submit" button-color="bg-gold " />

        <!-- Add back in when functionality is available! :D
          <NuxtLink
          to="/"
          class="underline underline-offset-4 text-xs hover:text-light-orange-gold"
          >Forgot my password
        </NuxtLink> -->
        <span class="text-xs">
          Don't have an account?
          <NuxtLink
            to="/signup"
            class="underline underline-offset-4 text-xs hover:text-light-orange-gold"
            >Sign up
          </NuxtLink>
        </span>
      </div>
    </form>
  </section>
</template>
