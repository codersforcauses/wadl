<script setup>
import { definePageMeta } from "#imports";
definePageMeta({
  middleware: ["team"],
});
</script>

<template>
  <div>
    <client-only>
      <NuxtPage />
    </client-only>
  </div>
</template>
