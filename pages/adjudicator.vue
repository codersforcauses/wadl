<script setup>
import { definePageMeta } from "#imports";
import { useUserStore } from "../stores/user";
definePageMeta({
  middleware: ["adjudicator"],
});

const userStore = await useUserStore();
const isAdjudicator = userStore.role === "Adjudicator";
</script>

<template>
  <div>
    <client-only>
      <NuxtPage v-if="isAdjudicator" />
    </client-only>
  </div>
</template>
