<template>
  <NuxtLink to="/">
    <button class="text-3xl">{{ buttonText }}</button>
  </NuxtLink>
</template>

<script setup>
const props = defineProps(["buttonText"]);
</script>
