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
        <div v-if="role === 'Admin'">
          <NuxtLink to="/admin">
            <Button
              button-text="Admin"
              size="small"
              class="shadow-none underline underline-offset-4"
            />
          </NuxtLink>
        </div>
        <div v-if="role === 'Team Coordinator'">
          <div v-if="!visibility">
            <Bars3Icon
              class="w-10 h-10 ml-2 mr-6"
              @click="visibility = !visibility"
            />
          </div>
          <div v-else>
            <XMarkIcon
              class="w-10 h-10 ml-2 mr-6"
              @click="visibility = !visibility"
            />
          </div>
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
      class="bg-gold z-60 absolute right-0 top-16 rounded-bl-md"
      :class="visibility ? 'flex' : 'hidden'"
    >
      <ul class="flex flex-col items-center">
        <div
          class="w-full text-center hover:bg-light-gold border-b border-black border-opacity-5"
        >
          <li class="mx-4 my-3">
            <NuxtLink
              class="text-monsterrat"
              to="/coordinator"
              @click="visibility = false"
              >Teams</NuxtLink
            >
          </li>
        </div>
        <client-only>
          <div
            v-if="userStore.institution"
            class="w-full text-center hover:bg-light-gold border-b border-black border-opacity-5"
          >
            <li class="mx-4 my-3">
              <NuxtLink
                class="text-monsterrat"
                to="/coordinator/team-registration"
                @click="visibility = false"
                >Team Registration</NuxtLink
              >
            </li>
          </div>
          <div
            v-else-if="!userStore.institution"
            class="w-full text-center hover:bg-light-gold border-b border-black border-opacity-5 text-zinc-500"
          >
            <li class="mx-4 my-3">
              <NuxtLink class="text-monsterrat" @click="visibility = false"
                >Team Registration</NuxtLink
              >
            </li>
          </div>
        </client-only>
        <div
          class="w-full text-center hover:bg-light-gold border-b border-black border-opacity-5"
        >
          <li class="mx-4 my-3">
            <NuxtLink
              class="text-monsterrat"
              to="/coordinator/draw"
              @click="visibility = false"
              >Draw</NuxtLink
            >
          </li>
        </div>
        <div
          class="w-full text-center hover:bg-light-gold border-b border-black border-opacity-5"
        >
          <li class="mx-4 my-3">
            <NuxtLink
              class="text-monsterrat"
              to="/coordinator/institutions"
              @click="visibility = false"
              >Institution</NuxtLink
            >
          </li>
        </div>
        <div
          class="w-full text-center hover:bg-light-gold border-b border-black border-opacity-5"
        >
          <li class="mx-4 my-3">
            <NuxtLink
              class="text-monsterrat"
              to="/coordinator/userinformation"
              @click="visibility = false"
              >User Information</NuxtLink
            >
          </li>
        </div>
        <div
          class="w-full text-center hover:bg-light-gold border-b border-black border-opacity-5"
        >
          <li class="mx-4 my-3">
            <NuxtLink
              class="text-monsterrat"
              to="/coordinator/changepassword"
              @click="visibility = false"
              >Change Password</NuxtLink
            >
          </li>
        </div>
        <div class="w-full text-center hover:bg-light-gold">
          <li class="mx-4 my-3">
            <NuxtLink
              class="text-monsterrat"
              to="/"
              @click="(visibility = false), userStore.clearStore()"
            >
              Signout
            </NuxtLink>
          </li>
        </div>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import HomeButton from "./HomeButton.vue";
import { useUserStore } from "~/stores/auth.js";
import { storeToRefs } from "pinia";
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline";
import { ref } from "vue";

const userStore = useUserStore();
// Will be updated when user store changes
const { firstName, role } = storeToRefs(userStore);

const visibility = ref(false);
if (userStore.institution) {
  console.log("hello");
}
</script>
