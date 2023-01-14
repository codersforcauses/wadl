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

const data = ref([
  {
    level: "Novice",
    rounds: [
      {
        round: "Round 1",
        matchups: [
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
        ],
      },
      {
        round: "Round 2",
        matchups: [
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
        ],
      },
    ],
  },
  {
    level: "Junior",
    rounds: [
      {
        round: "Round 3",
        matchups: [
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
        ],
      },
      {
        round: "Round 4",
        matchups: [
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
        ],
      },
    ],
  },
  {
    level: "Senior",
    rounds: [
      {
        round: "Round 5",
        matchups: [
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
        ],
      },
      {
        round: "Round 6",
        matchups: [
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
        ],
      },
    ],
  },
]);

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

const tableData = ref([]);
const currentLevelTab = ref("");

const levelClicked = (tabName) => {
  currentLevelTab.value = tabName;
};

const roundClicked = (roundName) => {
  tableData.value = [];
  if (!currentLevelTab.value) {
    alert("Please select a level first");
  }

  let rounds = [];
  data.value.forEach((d) => {
    if (d.level === currentLevelTab.value) {
      d.rounds.map((r) => rounds.push(r));
    }
  });
  rounds.forEach((r) => {
    if (r.round === roundName) {
      r.matchups.map((m) => tableData.value.push(m));
    }
  });
};
</script>

<template>
  <Tabs :tabs="levelTabs" font-size="text-xl" @handle-tab="levelClicked" />
  <SearchBar @handle-filter="handleFilter" />
  <Tabs :tabs="roundTabs" font-size="text-base" @handle-tab="roundClicked" />
  <Table :headers="headers" :data="tableData" :can-edit="false" />
</template>
