<template>
  <h1 class="text-4xl py-5 text-center divide-y-4 font-montserrat">
    {{ titleText }}
  </h1>
  <h2
    v-if="subtitleText"
    class="text-2xl pb-2 text-center divide-y-4 font-montserrat text-dark-grey"
  >
    {{ subtitleText }}
  </h2>
  <hr class="mx-8" />
</template>
<script setup>
defineProps({
  titleText: {
    type: String,
    default: "",
  },
  subtitleText: {
    type: String,
    default: "",
  },
});
</script>
