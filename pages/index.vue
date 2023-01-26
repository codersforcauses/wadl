<!-- eslint-disable vue/attribute-hyphenation -->
<template>
  <!-- long logo -->
  <img class="mx-auto mt-16" src="../assets/logos/TransparentLongLogo.png" />
  <!-- competitions -->
  <Header title-text="Competitions" />
  <div
    v-if="store.getRunning.length > 0"
    class="mx-auto flex justify-center flex-wrap"
  >
    <div v-for="tournament in store.getRunning" :key="tournament.id">
      <NuxtLink to="/">
        <LevelButton :text="tournament.shortName" />
      </NuxtLink>
    </div>
  </div>
  <p v-else class="text-xl py-5 text-center font-light font-montserrat">
    There are no running tournaments.
  </p>
</template>

<script setup>
import LevelButton from "../components/HomePage/LevelButton.vue";
import { useTournamentStore } from "../stores/tournaments";
import { onMounted } from "vue";
const store = useTournamentStore();

onMounted(() => {
  store.getTournaments();
});
</script>
