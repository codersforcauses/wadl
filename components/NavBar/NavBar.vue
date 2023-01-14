<template>
  <nav
    class="bg-gold shadow flex justify-between sticky top-0 z-50 place-items-center w-full"
  >
    <div class="flex place-items-center">
      <HomeButton class="pl-3" />
      <client-only>
        <p v-if="firstName" class="ml-4 text-xl">Welcome, {{ firstName }}!</p>
      </client-only>
    </div>
    <client-only>
      <div v-if="!firstName" class="mr-2">
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
      <div v-else class="mr-2">
        <NuxtLink to="/">
          <Button
            button-text="Signout"
            button-color="bg-light-yellow"
            size="small"
            @click="userStore.clearStore()"
          />
        </NuxtLink>
      </div>
    </client-only>
  </nav>
</template>

<script setup>
import HomeButton from "./HomeButton.vue";
import { useUserStore } from "~/stores/auth.js";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
// Will be updated when user store changes
const { firstName } = storeToRefs(userStore);
</script>
