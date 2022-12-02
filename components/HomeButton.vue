<template>
  <div class="flex border-right-1px">
    <button @click="onClick()">
      <img
        class="h-16"
        src="../assets/logos/Textless Transparent Long Logo.png"
      />
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
