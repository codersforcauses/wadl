<template>
  <button :class="`px-4 py-1 w-44 rounded-md shadow-md ${buttonColor}`">
    {{ buttonText }}
  </button>
</template>

<script setup>
defineProps({
  buttonText: { type: String, default: "Button" },
  buttonColor: { type: String, default: "primary" },
});
</script>
