<template>
  <button @click="onClick()">{{ buttonText }}</button>
</template>

<script>
export default {
  props: {
    buttonText: {
      type: String,
      default: () => "Button",
    },
  },
  methods: {
    onClick() {
      console.log("login");
    },
  },
};
</script>
