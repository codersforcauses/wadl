<script setup>
import { ref, computed } from "vue";
import { useTournamentStore } from "../../stores/tournaments";
import { useTeamStore } from "../../stores/teams";

const tournamentStore = useTournamentStore();
const teamStore = useTeamStore();
const route = useRoute();

onMounted(async () => {
  await teamStore.getTeams();
});

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
  {
    key: "status",
    title: "Status",
  },
];
const levelTabs = [
  { label: "Novice", active: false },
  { label: "Junior", active: true },
  { label: "Senior", active: false },
];
const roundTabs = tournamentStore.getRunning.reduce((arr, tournament) => {
  if (tournament.id === route.params.tournamentId) {
    let round = 1;
    while (round <= tournament.numRounds) {
      arr.push({ label: `Round ${round}`, active: false });
      round++;
    }
  }
  return arr;
}, []);

const tableData = ref([]);
const tableFilter = ref("");

let levelSelected = "Junior";
let roundSelected = undefined;
let levelTabsKey = 0;

const handleLevel = (tabName) => {
  levelSelected = tabName;
  levelTabsKey++;
  tableData.value = [];
  roundTabs.forEach((round) => (round.active = false));
  roundSelected = undefined;
  tableFilter.value = "";
};

const handleRound = (roundName) => {
  tableData.value = [];
  roundSelected = parseInt(roundName.split("")[roundName.length - 1]);

  const selectedTournament = tournamentStore.getRunning.find(
    (tournament) => tournament.id === route.params.tournamentId
  );

  const levelFound = selectedTournament.levels.find(
    (lev) => lev.level === levelSelected
  );

  const formatTime = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes.toString().padStart(2, "0");
    let strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  };

  levelFound.divisions.map((div) => {
    div.matchups.map((matchup) => {
      if (matchup.round === roundSelected) {
        const date = new Date(matchup.datetime)
          .toDateString()
          .split(" ")
          .slice(0, 3)
          .join(" ");
        const time = formatTime(new Date(matchup.datetime));
        const row = {
          div: div.division,
          venue: div.venue.name,
          date,
          time,
          affirmative: teamStore.teams.find(
            (team) => team.id === matchup.affirmativeTeam
          )?.name,
          negative: teamStore.teams.find(
            (team) => team.id === matchup.negativeTeam
          )?.name,
          topic: matchup.topic,
          status: matchup.status,
        };
        tableData.value.push(row);
      }
    });
  });
};

const handleFilter = (searchTerm) => {
  tableFilter.value = searchTerm;
};

const filteredTableData = computed(() => {
  return tableFilter.value
    ? tableData.value.filter(
        (data) =>
          data?.div?.toString().toLowerCase().includes(tableFilter.value) ||
          data?.venue?.toLowerCase().includes(tableFilter.value) ||
          data?.date?.toLowerCase().includes(tableFilter.value) ||
          data?.time?.toLowerCase().includes(tableFilter.value) ||
          data?.affirmative?.toLowerCase().includes(tableFilter.value) ||
          data?.negative?.toLowerCase().includes(tableFilter.value) ||
          data?.topic?.toLowerCase().includes(tableFilter.value) ||
          data?.status?.toLowerCase().includes(tableFilter.value)
      )
    : tableData.value;
});
</script>

<template>
  <Tabs :tabs="levelTabs" font-size="text-xl" @handle-tab="handleLevel" />
  <div class="flex items-center justify-center w-full">
    <SearchBar @handle-filter="handleFilter" />
  </div>
  <Tabs
    :tabs="roundTabs"
    font-size="text-base"
    @handle-tab="handleRound"
    :key="levelTabsKey"
  />
  <div class="flex justify-center w-full">
    <Table
      :headers="headers"
      :data="filteredTableData"
      :can-edit="false"
      no-data-text="Please select a round"
    />
  </div>
</template>
