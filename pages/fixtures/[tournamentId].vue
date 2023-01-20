<script setup>
import { ref } from "vue";
import tournamentsData from "../../data/tournaments.json";
import teamsData from "../../data/teams.json";
import venuesData from "../../data/venues.json";

const tournaments = ref(tournamentsData);
const teams = ref(teamsData);
const venues = ref(venuesData);
const route = useRoute();

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

const hasNotSelectedRoundTab = ref(true);
const tableData = ref([]);
const levelSelected = ref("Junior");
const roundSelected = ref(undefined);

const levelClicked = (tabName) => {
  levelSelected.value = tabName;
  roundTabs.forEach((round) => (round.active = false));
  hasNotSelectedRoundTab.value = true;
};

const roundClicked = (roundName) => {
  tableData.value = [];
  hasNotSelectedRoundTab.value = false;
  roundSelected.value = parseInt(roundName.split("")[roundName.length - 1]);
  const selectedTournament = tournaments.value.filter(
    (tournament) => tournament.name === route.params.tournamentId
  );

  const levelFound = selectedTournament[0].levels.filter(
    (lev) => lev.level === levelSelected.value
  );

  const formatAMPM = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes.toString().padStart(2, "0");
    let strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  };

  levelFound[0].divisions.map((div) => {
    div.matchups.map((matchup) => {
      const date = new Date(matchup.datetime)
        .toDateString()
        .split(" ")
        .slice(0, 3)
        .join(" ");
      const time = formatAMPM(new Date(matchup.datetime));
      if (matchup.round === roundSelected.value) {
        const row = {
          div: div.division,
          venue: "",
          date,
          time,
          affirmative: teams.value.find(
            (team) => team.id === matchup.affirmative_team
          ).name,
          negative: teams.value.find(
            (team) => team.id === matchup.negative_team
          ).name,
          topic: matchup.topic,
        };
        tableData.value.push(row);
      }
    });
  });
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
