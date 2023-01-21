<script setup>
import { UserIcon } from "@heroicons/vue/24/outline";
defineProps({
  username: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div class="mt-5 flex items-center justify-center">
    <UserIcon class="w-28 h-28" />
    <div class="w-2/3">
      <div class="text-6xl">{{ username }}</div>
      <div class="mt-3 ml-6 text-xl">{{ role }}</div>
      <hr class="w-full mt-5 mb-5 border-black border-solid" />
    </div>
  </div>
</template>
