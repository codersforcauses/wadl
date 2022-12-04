<template>
  <NuxtLink to="/">
    <button class="text-2xl">{{ buttonText }}</button>
  </NuxtLink>
</template>

<script setup>
const props = defineProps(["buttonText"]);
</script>
