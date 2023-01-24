<script setup>
import { definePageMeta } from "#imports";
import { useUserStore } from "../stores/user";

definePageMeta({
  middleware: ["admin"],
});

const userStore = useUserStore();
const isAdmin = userStore.role === 'Admin'
</script>

<template>
  <div>
    <NuxtPage v-if="isAdmin" />
  </div>
</template>
