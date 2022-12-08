<template>
  <div class="text-white p-2 m-5 w-64 text-center rounded-xl font-montserrat text-3xl">
    {{ buttonText }}
  </div>
</template>

<script setup>
defineProps({
  buttonText: {
    type: String,
  },
});
</script>
