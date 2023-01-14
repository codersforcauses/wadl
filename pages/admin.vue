<script setup>
import { definePageMeta } from "#imports";
definePageMeta({
  middleware: ["admin"],
});
</script>

<template>
  <div>
    <NuxtPage />
  </div>
</template>
