<template>
  <h1 class="text-4xl py-5 text-center divide-y-4">{{ titleText }}</h1>
  <hr class="mx-8 text-black" />
</template>
<script setup>
defineProps({
  titleText: {
    type: String,
    default: "",
  },
});
</script>
