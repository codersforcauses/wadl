<template class="p-0">
  <button @click="onClick()">
    <img
      class="h-14"
      src="../assets/logos/Textless Transparent Long Logo.png"
    />
    <div>WADL</div>
  </button>
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
