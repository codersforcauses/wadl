<template>
  <div class="bg-black text-white p-2 m-5 w-64 text-center">
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
