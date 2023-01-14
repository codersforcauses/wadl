<script setup>
import { definePageMeta } from "#imports";
definePageMeta({
  middleware: ["team"],
});
</script>
<template>
  <Coordinator />
</template>
