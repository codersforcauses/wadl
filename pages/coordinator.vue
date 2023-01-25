<script setup>
import { definePageMeta } from "#imports";
import { useUserStore } from "../stores/user";

definePageMeta({
  middleware: ["team"],
});

const userStore = useUserStore();
const isCoordinator = userStore.role === "Team Coordinator";
</script>

<template>
  <div>
    <NuxtPage v-if="isCoordinator" />
  </div>
</template>
