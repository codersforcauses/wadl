<template>
  <NuxtLink to="/">
    <button>{{ buttonText }}</button>
  </NuxtLink>
</template>

<script setup>
defineProps({
  buttonText: {
    type: String,
    default: "Signup",
  },
});
</script>
