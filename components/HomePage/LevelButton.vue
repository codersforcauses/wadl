<template>
  <div
    class="bg-gradient-to-r from-[#A8A8A8] via-[#8A8A8A] to-[#474747] p-2 m-5 w-64 h-20 rounded-2xl flex justify-center place-items-center text-white text-3xl font-montserrat"
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
