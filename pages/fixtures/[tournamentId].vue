<script setup>
import { ref } from "vue";
import tournamentsData from "../../data/tournaments.json";
import teamsData from "../../data/teams.json";
import venuesData from "../../data/venues.json";
const tournaments = ref(tournamentsData);
const teams = ref(teamsData);
const venues = ref(venuesData);
const headers = [
  {
    key: "div",
    title: "Div",
  },
  {
    key: "venue",
    title: "Venue",
  },
  {
    key: "date",
    title: "Date",
  },
  {
    key: "time",
    title: "Time",
  },
  {
    key: "affirmative",
    title: "Affirmative",
  },
  {
    key: "negative",
    title: "Negative",
  },
  {
    key: "topic",
    title: "Topic",
  },
];
const levelTabs = [
  { label: "Novice", active: false },
  { label: "Junior", active: true },
  { label: "Senior", active: false },
];

const roundTabs = [
  { label: "Round 1", active: false },
  { label: "Round 2", active: false },
  { label: "Round 3", active: false },
  { label: "Round 4", active: false },
  { label: "Round 5", active: false },
  { label: "Round 6", active: false },
  { label: "Round 7", active: false },
  { label: "Round 8", active: false },
];

const handleFilter = (searchTerm) => {
  tableData.value = tableData.value.filter(
    (d) =>
      d.div.toLowerCase().includes(searchTerm) ||
      d.venue.toLowerCase().includes(searchTerm) ||
      d.date.toLowerCase().includes(searchTerm) ||
      d.time.toLowerCase().includes(searchTerm) ||
      d.affirmative.toLowerCase().includes(searchTerm) ||
      d.negative.toLowerCase().includes(searchTerm) ||
      d.topic.toLowerCase().includes(searchTerm)
  );
};

const route = useRoute();

const hasNotSelectedRoundTab = ref(true);
const tableData = ref([]);
const levelSelected = ref("Junior");
const roundSeleccted = ref(undefined);

const levelClicked = (tabName) => {
  levelSelected.value = tabName;
};

const roundClicked = (roundName) => {
  hasNotSelectedRoundTab.value = false;
  roundSeleccted.value = parseInt(roundName.split("")[roundName.length - 1]);
  // let rounds = [];
  // data.value.forEach((d) => {
  //   if (d.level === currentLevelTab.value) {
  //     d.rounds.map((r) => rounds.push(r));
  //   }
  // });
  // rounds.forEach((r) => {
  //   if (r.round === roundName) {
  //     r.matchups.map((m) => tableData.value.push(m));
  //   }
  // });
};
</script>

<template>
  <Tabs :tabs="levelTabs" font-size="text-xl" @handle-tab="levelClicked" />
  <SearchBar @handle-filter="handleFilter" />
  <Tabs :tabs="roundTabs" font-size="text-base" @handle-tab="roundClicked" />
  <Table :headers="headers" :data="tableData" :can-edit="false" />

  <h1
    v-if="hasNotSelectedRoundTab"
    class="font-montserrat text-lg text-center mt-10 font-bold"
  >
    Please select a round
  </h1>
</template>
