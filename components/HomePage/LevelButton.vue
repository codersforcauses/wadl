<template>
  <button
    class="bg-black p-2 m-5 w-64 h-20 rounded-md flex justify-center place-items-center text-white text-3xl heading-montserrat"
  >
    {{ text }}
  </button>
</template>

<script setup>
defineProps({
  text: {
    default: "tournament",
    type: String,
  },
});
</script>
