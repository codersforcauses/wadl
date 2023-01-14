<template>
  <h1 class="text-4xl py-5 text-center divide-y-4 font-montserrat">
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
