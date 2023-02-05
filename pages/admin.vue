<script setup>
import { definePageMeta } from "#imports";
import { useUserStore } from "../stores/user";

definePageMeta({
  middleware: ["admin"],
});

const userStore = await useUserStore();
const isAdmin = userStore.role === "Admin";
</script>

<template>
  <div>
    <client-only>
      <NuxtPage v-if="isAdmin" />
    </client-only>
  </div>
</template>
