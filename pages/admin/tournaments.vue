<!-- eslint-disable vue/attribute-hyphenation -->
<template>
  <Header titleText="Tournaments" />
  <SearchBar @handle-filter="handleFilter" />
  <div class="flex content-center justify-center h-[calc(74vh-72px)] px-2">
    <Table :headers="headers" :data="tournaments" />
  </div>
  <div class="inset-x-0 hottom-0 w-full bg-white">
    <Button
      button-text="Add Tournament"
      button-color="bg-gold"
      class="m-5 ml-8"
      @click="show = !show"
    />
  </div>
</template>
<script setup>
import { ref } from "vue";
import data from "../../data/tournaments.json";

const tournaments = ref(data);

const handleFilter = (searchTerm) => {
  tournaments.value = data.filter(
    (tournament) =>
      tournament.tournament.toLowerCase().includes(searchTerm) ||
      tournament.venue.toLowerCase().includes(searchTerm)
  );
};

const headers = [
  {
    key: "tournament",
    title: "Tournament",
  },
  {
    key: "venue",
    title: "Venue",
  },
];
</script>
