<template>
  <h1 data-test="header" class="text-4xl py-5 text-center font-montserrat">
    {{ titleText }}
  </h1>
  <hr v-if="hasLine" class="mx-8" />
</template>
<script setup>
defineProps({
  titleText: {
    type: String,
    default: "",
  },
  hasLine: {
    type: Boolean,
    default: true,
  },
});
</script>
