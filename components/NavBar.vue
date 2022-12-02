<template>
  <div class="bg-gold shadow md:flex justify-between">
    <div class="justify-start px-3">
      <Home_Button />
    </div>

    <div class="justify-end p-5">
      <LoginButton @click="onClick()" buttonText="Login" />
    </div>
  </div>
</template>

<script>
import Home_Button from "./Home_Button.vue";
import LoginButton from "./LoginButton.vue";

export default {
  methods: {
    onClick() {
      console.log("login");
    },
  },
};
</script>
