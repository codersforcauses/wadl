<!-- eslint-disable vue/attribute-hyphenation -->
<template>
  <!-- long logo -->
  <img class="mx-auto" src="../assets/logos/TransparentLongLogo.png" />
  <!-- competitions -->
  <Header title-text="Competitions" />
  <br />
  <div
    class="mx-auto h-screen place-items-center justify-center grid grid-cols-3 grid-rows-6 gap-6"
  >
    <!-- replace key with item.key when final data exists -->
    <div v-for="item in tournaments" :key="item">
      <NuxtLink to="/">
        <LevelButton :text="item" />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import LevelButton from "../components/HomePage/LevelButton.vue";

const tournaments = ["Junior", "Novice", "Senior", "SDC", "AIHSA", "RDC"]; // Dummy Data to be replaced
</script>

<style setup></style>
