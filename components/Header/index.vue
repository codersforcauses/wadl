<template>
  <h1 class="text-4xl py-5 text-center divide-y-4 font-montserrat">
    {{ titleText }}
  </h1>
  <hr class="mx-8" />
</template>
<script setup>
defineProps({
  titleText: {
    type: String,
    default: "",
  },
});
</script>
