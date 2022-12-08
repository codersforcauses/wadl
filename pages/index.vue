<template>
  <div id="logo">
    <img class="mx-auto" src="../assets/logos/TransparentLongLogo.png" />
  </div>

  <div class="flex h-screen justify-center">
    <div>
      <NuxtLink to="/">
        <LevelButton buttonText="Junior" />
      </NuxtLink>

      <NuxtLink to="/">
        <LevelButton buttonText="Novice" />
      </NuxtLink>

      <NuxtLink to="/">
        <LevelButton buttonText="Senior" />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import LevelButton from "../components/HomePage/LevelButton.vue";
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Montserrat");

input[type="button"] {
  display: block;
  background-color: #000000;
  color: #ffffff;
  padding: 20px 26px;
  max-width: 320px;
  width: 40%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 1%;
  font-family: "Montserrat";
  justify-content: center;
}

</style>
