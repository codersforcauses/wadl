<template>
  <nav
    data-test="navBar"
    class="bg-gold shadow flex position:relative place-items-center sticky top-0 z-50"
  >
    <HomeButton class="pl-3" />
    <LoginButton class="absolute right-3" button-text="Login" />
  </nav>
</template>

<script setup>
import HomeButton from "./HomeButton.vue";
import LoginButton from "./LoginButton.vue";
</script>
