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
    <client-only>
      <NuxtPage v-if="isCoordinator" />
    </client-only>
  </div>
</template>
