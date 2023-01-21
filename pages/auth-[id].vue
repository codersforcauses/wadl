<script setup>
// import { definePageMeta } from "#imports";
// const idToken = $route.params.id;
definePageMeta({
  middleware: ["auth"],
});
</script>

<template>
  <div class="text-xl">{{ $route.params.id }}</div>
</template>
