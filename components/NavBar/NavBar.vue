<template>
  <nav
    class="bg-gold shadow flex justify-between sticky top-0 z-50 place-items-center w-full"
  >
    <div class="flex place-items-center">
      <HomeButton class="pl-3" />
      <!-- user vars on client side only  -->
      <client-only>
        <p v-if="userStore.firstName" class="ml-4 text-xl">Welcome, {{ firstName }}!</p>
      </client-only>
    </div>
    <div class="flex">
      <client-only>
        <div v-if="userStore.role === 'Admin'">
          <NuxtLink to="/admin">
            <Button
              button-text="Admin"
              size="small"
              class="shadow-none underline underline-offset-4"
            />
          </NuxtLink>
        </div>
        <div v-if="!userStore.auth" class="mr-2">
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
    </div>
  </nav>
</template>

<script setup>
import HomeButton from "./HomeButton.vue";
import { useUserStore } from "~/stores/user.js";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
// Will be updated when user store changes
/* const { auth, firstName, role } = storeToRefs(userStore); */
</script>
