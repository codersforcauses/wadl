<script setup>
import { onMounted } from "vue";
import { useTeamStore } from "../../stores/teams";
import { useHead } from "#imports";

useHead({
  title: "Teams",
});
const headers = [
  {
    key: "name",
    title: "Team",
  },
  {
    key: "level",
    title: "Level",
  },
  {
    key: "timeslot",
    title: "Timeslot",
  },
  {
    key: "weekPreference",
    title: "Week Pref.",
  },
  {
    key: "allocatedTue",
    title: "Tue",
  },
  {
    key: "allocatedWed",
    title: "Wed",
  },
  {
    key: "venuePreference",
    title: "Venue Pref.",
  },
];

const store = useTeamStore();
onMounted(() => {
  store.getTeams();
});
</script>

<template>
  <section>
    <Header title-text="Teams" />
    <!-- <SearchBar /> -->
    <Table
      :headers="headers"
      :data="store.teams"
      class="mt-5 mx-auto"
      :can-edit="false"
    />
  </section>
</template>
