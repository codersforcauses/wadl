<script setup>
import { onMounted } from "vue";
import { useTeamStore } from "../../stores/teams";
import { useHead } from "#imports";
import { CheckIcon, XMarkIcon } from "@heroicons/vue/24/solid";

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
    >
      <template #allocatedTue="{ value }">
        <p>
          <CheckIcon v-if="value" class="w-6 h-6" />
          <XMarkIcon v-else class="w-6 h-6" />
        </p>
      </template>
      <template #allocatedWed="{ value }">
        <p>
          <CheckIcon v-if="value" class="w-6 h-6" />
          <XMarkIcon v-else class="w-6 h-6" />
        </p>
      </template>
      <template #venuePreference="{ value }">
        <p v-for="(ven, idx) in value" :key="idx" class="text-xs">
          {{ idx + 1 }}. {{ ven }}
        </p>
      </template>
    </Table>
  </section>
</template>
