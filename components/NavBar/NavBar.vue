<template>
  <span class="bg-gold shadow flex position:relative place-items-center">
    <HomeButton class="pl-3" />
    <LoginButton class="absolute right-3" button-text="Login" />
  </span>
</template>

<script lang="ts">
import HomeButton from "./HomeButton.vue";
import LoginButton from "./LoginButton.vue";

export default {
  components: {
    HomeButton,
    LoginButton,
  },
  methods: {
    onClick() {
      console.log("login");
    },
  },
};
</script>
