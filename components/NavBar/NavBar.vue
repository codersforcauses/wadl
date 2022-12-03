<template>
  <span class="bg-gold shadow flex position:relative place-items-center">
      <HomeButton class="pl-3"/>
      <LoginButton class="absolute right-3" buttonText="Login" />
  </span>
</template>

<script>
import HomeButton from "./HomeButton.vue";
import LoginButton from "./LoginButton.vue";

export default {
  methods: {
    onClick() {
      console.log("login");
    },
  },
  components: {
    HomeButton: HomeButton,
    LoginButton: LoginButton,
  }
};
</script>
