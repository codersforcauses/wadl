<template>
  <nav
    class="bg-gold shadow flex justify-between sticky top-0 z-50 place-items-center w-full"
  >
    <div class="flex place-items-center">
      <HomeButton class="pl-3" />
      <p v-if="firstName" class="ml-4 text-xl">Welcome, {{ firstName }}</p>
    </div>
    <div class="mr-2">
      <NuxtLink to="/signup">
        <Button button-text="Signup" size="small" class="shadow-none" />
      </NuxtLink>
      <NuxtLink to="/login">
        <Button
          button-text="Login"
          button-color="bg-light-yellow"
          size="small"
        />
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup>
import HomeButton from "./HomeButton.vue";
import LoginButton from "./LoginButton.vue";
import { useUserStore } from "~/stores/user.js";
import { storeToRefs } from "pinia";
// import { ref } from "vue";

const firstName = ref("Test");
// const userStore = useUserStore();
// const { firstName } = storeToRefs(userStore);
// console.log(firstName);
</script>
