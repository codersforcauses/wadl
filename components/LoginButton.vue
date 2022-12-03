<template>
  <button class="text-3xl">
    {{ buttonText }}
  </button>
</template>

<script>
export default {
  props: {
    buttonText: {
      type: String,
      default: () => "LoginButton",
    },
  },
};
</script>
