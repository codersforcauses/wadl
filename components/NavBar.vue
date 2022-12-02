<template>
  <div class="bg-gold shadow flex position:relative place-items-center">
    <div class="pl-3">
      <Home_Button />
    </div>
    <div class="absolute right-3">
      <LoginButton @click="onClick()" buttonText="Login" />
    </div>
  </div>
</template>

<script>
import Home_Button from "./HomeButton.vue";
import LoginButton from "./LoginButton.vue";

export default {
  methods: {
    onClick() {
      console.log("login");
    },
  },
};
</script>
