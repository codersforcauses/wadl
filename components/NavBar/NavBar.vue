<template>
  <nav
    class="bg-gold shadow flex justify-between sticky top-0 z-50 place-items-center w-full"
  >
    <div class="flex place-items-center">
      <HomeButton class="pl-3" />
      <!-- user vars on client side only  -->
      <client-only>
        <p v-if="firstName" class="ml-4 text-xl">Welcome, {{ firstName }}!</p>
      </client-only>
    </div>
    <div class="flex">
      <client-only>
        <!-- <div v-if="role === 'Admin'"> -->
        <!-- <NuxtLink to="/admin">
          <Button button-text="Admin" size="small" class="shadow-none underline underline-offset-4" />
        </NuxtLink> -->
        <!-- </div> -->
        <div v-if="role === 'Admin'">
          <Bars3Icon
            class="w-10 h-10 ml-2 mr-6"
            @click="visibility = !visibility"
          />
        </div>

        <div v-else>
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
        </div>
      </client-only>
    </div>
    <!-- Team Coordinator Drop down menu - This only could be its own component.-->
    <div
      class="px-2 z-60 absolute top-16 bg-gold"
      :class="visibility ? 'flex' : 'hidden'"
    >
      <ul class="flex flex-col items-center">
        <div class="border-t-2 w-full text-center">
          <li class="mx-4 my-1">
            <a class="text-monsterrat">Team</a>
          </li>
        </div>
        <div class="border-t-2 w-full text-center">
          <li class="mx-4 my-1">
            <a class="text-monsterrat">Draw</a>
          </li>
        </div>
        <div class="border-t-2 w-full text-center">
          <li class="mx-4 my-1">
            <a class="text-monsterrat">Institution</a>
          </li>
        </div>
        <div class="border-t-2 w-full text-center">
          <li class="mx-4 my-1">
            <a class="text-monsterrat">User Information</a>
          </li>
        </div>
        <div class="border-t-2 w-full text-center">
          <li class="mx-4 my-1">
            <a class="text-monsterrat">Change Password</a>
          </li>
        </div>
        <div class="border-t-2 border-b-2 w-full text-center">
          <li class="mx-4 my-1">
            <a class="text-monsterrat">Signout</a>
          </li>
        </div>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import HomeButton from "./HomeButton.vue";
import Hamburger from "../Hamburger/hamburger.vue";
import { useUserStore } from "~/stores/auth.js";
import { storeToRefs } from "pinia";
import { Bars3Icon } from "@heroicons/vue/24/outline";

const userStore = useUserStore();
// Will be updated when user store changes
const { firstName, role } = storeToRefs(userStore);

const visibility = ref(false);
</script>
