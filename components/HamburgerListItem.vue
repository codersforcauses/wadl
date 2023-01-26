<template>
  <NuxtLink
    :to="props.dest"
    class="h-full w-full hover:bg-light-gold border-black border-b border-opacity-5"
    @click="visibility = false"
  >
    <div class="w-full text-center" @click="visibility = false">
      <li class="mx-4 my-3 text-monsterrat">{{ props.val }}</li>
    </div>
  </NuxtLink>
</template>

<script setup>
import { useUserStore } from "../stores/user";

const userStore = useUserStore();

const props = defineProps({
  val: { type: String, default: "Button" },
  dest: { type: String, default: "/" },
});
</script>
