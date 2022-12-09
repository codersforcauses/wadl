<template>
  <div
    class="bg-black p-2 m-5 w-64 h-28 rounded-2xl flex justify-center place-items-center text-white text-3xl font-montserrat"
  >
    {{ buttonText }}
  </div>
</template>

<script setup>
defineProps({
  buttonText: {
    default: "tournament",
    type: String,
  },
});
</script>
