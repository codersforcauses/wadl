<!-- eslint-disable vue/attribute-hyphenation -->
<template>
  <div id="logo">
    <img class="mx-auto" src="../assets/logos/TransparentLongLogo.png" />
  </div>

  <div>
    <h1 class="text-center font-montserrat text-4xl">Competitions</h1>
  </div>
  <hr class="my-5 w-4/5 h-px mx-auto bg-black border-0" />

  <div class="flex h-screen justify-center">
    <div class="grid grid-cols-3 grid-rows-6 gap-6 justify-between">
      <!-- replace key with item.key when final data exists -->
      <div v-for="item in tournaments" :key="item" class="">
        <NuxtLink to="/">
          <LevelButton :buttonText="item" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import LevelButton from "../components/HomePage/LevelButton.vue";

const tournaments = ["Junior", "Novice", "Senior", "SDC", "AIHSA", "RDC"]; // Dummy Data to be replaced
</script>

<style setup></style>
