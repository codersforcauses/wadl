<template>
  <nav
    class="bg-gold shadow flex justify-between sticky top-0 z-50 place-items-center w-full"
  >
    <div class="flex place-items-center">
      <HomeButton class="pl-3" />
      <!-- user vars on client side only  -->
      <client-only>
        <p v-if="auth" class="ml-4 text-xl">Welcome, {{ firstName }}!</p>
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
            <button @click="visibility = !visibility">
              <Bars3Icon class="w-10 h-10 ml-2 mr-6" />
            </button>
          </div>
          <div v-else>
            <button @click="visibility = !visibility">
              <XMarkIcon class="w-10 h-10 ml-2 mr-6" />
            </button>
          </div>
        </div>
        <div v-else>
          <div v-if="!auth" class="mr-2">
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
      class="bg-gold z-60 absolute right-0 top-16 rounded-bl-md shadow-md"
      :class="visibility ? 'flex' : 'hidden'"
    >
      <ul class="flex flex-col items-center">
        <HamburgerListItem val="Teams" dest="/coordinator" />
        <HamburgerListItem
          v-if="userStore.institution"
          val="Team Registration"
          dest="/coordinator/team-registration"
        />
        <HamburgerListItem val="Draw" dest="/coordinator/draw" />
        <HamburgerListItem val="Institution" dest="/coordinator/institutions" />
        <HamburgerListItem
          val="User Information"
          dest="/coordinator/userinformation"
        />
        <HamburgerListItem
          val="Change Password"
          dest="/coordinator/changepassword"
        />
        <HamburgerListItem
          val="Signout"
          dest="/"
          @click="(visibility = false), userStore.clearStore()"
        />
      </ul>
    </div>
  </nav>
</template>

<script setup>
import HomeButton from "./HomeButton.vue";
import { useUserStore } from "~/stores/user.js";
import { storeToRefs } from "pinia";
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline";
import { ref } from "vue";

const userStore = useUserStore();
// Will be updated when user store changes
const { auth, firstName, role } = storeToRefs(userStore);

const visibility = ref(false);
</script>
