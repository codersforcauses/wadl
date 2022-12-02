<template>
  <div class="text-3xl">
    <button>{{ buttonText }}</button>
  </div>
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
