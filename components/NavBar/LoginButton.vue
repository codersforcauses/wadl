<template>
  <NuxtLink to="/">
    <button class="text-3xl">{{ buttonText }}</button>
  </NuxtLink>
</template>

<script lang="ts">
export default {
  props: {
    buttonText: {
      type: String,
      default: () => "LoginButton",
    },
  },
};
</script>
