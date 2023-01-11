<script setup>
import { ref } from "vue";
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
  { label: "Junior", active: false },
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

const data = ref([
  {
    div: "Div 1",
    venue: "Rainbow Road",
    date: "Tue 13/10",
    time: "5:15pm",
    affirmative: "Perth College 4",
    negative: "Perth Modern 4",
    topic: "Education",
  },
  {
    div: "Div 1",
    venue: "Rainbow Road",
    date: "Tue 13/10",
    time: "5:15pm",
    affirmative: "Perth College 4",
    negative: "Perth Modern 4",
    topic: "Education",
  },
  {
    div: "Div 1",
    venue: "Rainbow Road",
    date: "Tue 13/10",
    time: "5:15pm",
    affirmative: "Perth College 4",
    negative: "Perth Modern 4",
    topic: "Education",
  },
  {
    div: "Div 1",
    venue: "UWA",
    date: "Tue 13/10",
    time: "5:15pm",
    affirmative: "Perth College 4",
    negative: "Perth Modern 4",
    topic: "Education",
  },
]);
const handleFilter = (searchTerm) => {
  data.value = data.value.filter(
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
console.log(route.params.tournamentId);
</script>

<template>
  <Tabs :tabs="levelTabs" font-size="text-xl" />
  <SearchBar @handle-filter="handleFilter" />
  <Tabs :tabs="roundTabs" font-size="text-base" />
  <Table :headers="headers" :data="data" :can-edit="false" />
</template>
