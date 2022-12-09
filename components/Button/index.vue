<template>
  <button :class="`px-4 py-1 w-40 rounded-md shadow-md ${buttonColor}`">
    {{ buttonText }}
  </button>
</template>

<script setup>
const props = defineProps({
  buttonText: String,
  buttonColor: String,
});
</script>
