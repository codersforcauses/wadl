<template>
  <NuxtLink
    :to="props.dest"
    class="h-full w-full hover:bg-light-gold border-black border-b border-opacity-5"
  >
    <div class="w-full text-center">
      <li class="mx-4 my-3 text-monsterrat">{{ props.val }}</li>
    </div>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  val: { type: String, default: "Button" },
  dest: { type: String, default: "/" },
});
</script>
