<template>
  <div class="bg-gold shadow md:flex justify-between">
    <div class="justify-start px-3">
      <Home_Button />
    </div>

    <div class="justify-end p-6">
      <Button @click="onClick()" buttonText="Login" />
    </div>
  </div>
</template>

<script>
import Home_Button from "./Home_Button.vue";
import Button from "./Button.vue";

export default {
  methods: {
    onClick() {
      console.log("login");
    },
  },
};
</script>
