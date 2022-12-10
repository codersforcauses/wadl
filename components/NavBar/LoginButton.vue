<template>
  <NuxtLink to="/">
    <button class="text-2xl">{{ buttonText }}</button>
  </NuxtLink>
</template>

<script setup>
defineProps({
  buttonText: {
    type: String,
    default: "Login",
  },
});
</script>
