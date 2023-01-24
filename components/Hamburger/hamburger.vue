<template>
  <nav class="p-3 rounded">
    <component
      :is="icon"
      class="w-10 h-10 ml-2 mr-6"
      @click="visibility = !visibility"
    ></component>
    <div :class="visibility ? 'flex' : 'hidden'" class="px-2 py-6">
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
import { ref } from "vue";
defineProps({
  icon: {
    type: Function,
    default: () => {},
  },
});
const visibility = ref(false);
</script>
