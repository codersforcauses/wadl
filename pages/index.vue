<!-- eslint-disable vue/attribute-hyphenation -->
<template>
  <!-- long logo -->
  <img class="mx-auto" src="../assets/logos/TransparentLongLogo.png" />
  <!-- competitions -->
  <Header title-text="Competitions" />
  <main
    class="mx-auto h-screen pt-5 place-items-center justify-center grid grid-cols-3 grid-rows-6 gap-6"
  >
    <!-- replace key with item.id when final data exists -->
    <div v-for="item in tournaments" :key="item">
      <NuxtLink :to="`/fixtures/${item.name}`">
        <LevelButton :text="item.name" />
      </NuxtLink>
    </div>
  </main>
</template>

<script setup>
import LevelButton from "../components/HomePage/LevelButton.vue";
import tournamentsData from "../data/tournaments.json";
const tournaments = ref(tournamentsData);
</script>
