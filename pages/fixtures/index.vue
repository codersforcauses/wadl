<script setup>
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
  { label: "Round 1", active: true },
  { label: "Round 2", active: false },
  { label: "Round 3", active: false },
  { label: "Round 4", active: false },
  { label: "Round 5", active: false },
  { label: "Round 6", active: false },
  { label: "Round 7", active: false },
  { label: "Round 8", active: false },
];

const data = [
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
];
</script>

<template>
  <Tabs :tabs="levelTabs" font-size="text-xl" />
  <SearchBar @handle-filter="handleFilter" />
  <Tabs :tabs="roundTabs" font-size="text-base" />
  <Table :headers="headers" :data="data" :can-edit="false" />
</template>
