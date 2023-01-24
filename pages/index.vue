<!-- eslint-disable vue/attribute-hyphenation -->
<template>
  <!-- long logo -->
  <img class="mx-auto" src="../assets/logos/TransparentLongLogo.png" />
  <!-- competitions -->
  <Header title-text="Competitions" />
  <div v-if="store.getRunning.length > 0">
    <main
      class="mx-auto h-screen pt-5 place-items-center justify-center grid grid-cols-3 grid-rows-6 gap-6"
    >
      <div v-for="tournament in store.getRunning" :key="tournament.id">
        <NuxtLink to="/">
          <LevelButton :text="tournament.shortName" />
        </NuxtLink>
      </div>
    </main>
  </div>
  <div v-else>
    <p class="text-xl py-5 text-center font-light font-montserrat">
      There are no running tournaments.
    </p>
  </div>
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
