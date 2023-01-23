<script setup>
import { definePageMeta } from "#imports";
definePageMeta({
  middleware: ["admin"],
});
</script>

<template>
  <div>
    <client-only>
      <NuxtPage />
    </client-only>
  </div>
</template>
