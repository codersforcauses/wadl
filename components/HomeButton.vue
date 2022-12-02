<template>
  <div class="flex">
    <button @click="onClick()">
      <!-- src="../assets/logos/Textless Transparent Long Logo.png" -->
      <img class="h-16" />HOME<img />
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    onClick() {
      console.log("home");
    },
  },
};
</script>
