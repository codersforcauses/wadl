<template>
  <nav class="bg-gold shadow flex position:relative place-items-center">
    <HomeButton class="pl-3" />
    <LoginButton class="absolute right-3" buttonText="Login" />
  </nav>
</template>

<script setup>
import HomeButton from "./HomeButton.vue";
import LoginButton from "./LoginButton.vue";
</script>
