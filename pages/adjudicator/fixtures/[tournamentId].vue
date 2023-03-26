<script setup>
import { ref, computed, onMounted } from "vue";
import { useTournamentStore } from "../../../stores/tournaments";
// import { useTeamStore } from "../../stores/teams";
import { useRoute } from "#imports";
import juniorFixtures from "../../../data/juniorDraw.json";
import noviceFixtures from "../../../data/noviceDraw.json";
import seniorFixtures from "../../../data/seniorDraw.json";
import { TableCellsIcon } from "@heroicons/vue/24/outline";
const tournamentStore = useTournamentStore();
// const teamStore = useTeamStore();
const route = useRoute();
const isLoading = ref(true);

let selectedTournament = null;
let selectedRound = null;

onMounted(async () => {
  // await teamStore.getTeams();
  selectedTournament = tournamentStore.getRunning.find(
    (tournament) => tournament.id === route.params.tournamentId
  );
  selectedRound = parseInt(selectedTournament?.currentRound);
  createRoundTabs();
  await getFixturesTableData();
});

const headers = [
  {
    key: "division",
    title: "Division",
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
    key: "affirmativeTeam",
    title: "Affirmative",
  },
  {
    key: "negativeTeam",
    title: "Negative",
  },
  {
    key: "venue",
    title: "Venue",
  },
  {
    key: "topic",
    title: "Topic",
  },
  // {
  //   key: "status",
  //   title: "Status",
  // },
  {
    key: "scoreboard",
    title: "Scoreboard",
  },
];
const levelTabs = [
  { label: "Novice", active: false },
  { label: "Junior", active: true },
  { label: "Senior", active: false },
];
const roundTabs = [];
// const selectedTournament = tournamentStore.getRunning.find(
//   (tournament) => tournament.id === route.params.tournamentId
// );

let levelSelected = "Junior";
let levelTabsKey = 0;

const selectedLevel = ref(juniorFixtures);
const tableData = ref([]);
const tableFilter = ref("");

const createRoundTabs = () => {
  let round = 1;
  while (round <= parseInt(selectedTournament?.numRounds)) {
    if (round === parseInt(selectedTournament?.currentRound)) {
      roundTabs.push({ label: `Round ${round}`, active: true });
    } else {
      roundTabs.push({ label: `Round ${round}`, active: false });
    }
    round++;
  }
};

const handleLevel = (tabName) => {
  selectedRound = parseInt(selectedTournament?.currentRound);
  levelSelected = tabName;
  levelTabsKey++;
  tableData.value = [];
  roundTabs.forEach((round) => {
    if (
      parseInt(round.label.split("")[round.label.length - 1]) === selectedRound
    ) {
      round.active = true;
    } else {
      round.active = false;
    }
  });

  // Only used for JSON fixtures
  if (levelSelected === "Junior") {
    selectedLevel.value = juniorFixtures;
  } else if (levelSelected === "Novice") {
    selectedLevel.value = noviceFixtures;
  } else {
    selectedLevel.value = seniorFixtures;
  }

  tableFilter.value = "";
  getFixturesTableData();
  console.log("hi");
  console.log(tableData.value);
};

const handleRound = (roundName) => {
  tableData.value = [];
  selectedRound = parseInt(roundName.split("")[roundName.length - 1]);
  getFixturesTableData();
};

const getFixturesTableData = () => {
  // const levelFound = selectedTournament?.levels.find(
  //   (lev) => lev.level === levelSelected
  // );
  // const formatTime = (date) => {
  //   let hours = date.getHours();
  //   let minutes = date.getMinutes();
  //   const ampm = hours >= 12 ? "pm" : "am";
  //   hours = hours % 12;
  //   hours = hours || 12;
  //   minutes = minutes.toString().padStart(2, "0");
  //   const strTime = hours + ":" + minutes + " " + ampm;
  //   return strTime;
  // };
  // levelFound?.divisions.map((div) => {
  //   div.matchups.map((matchup) => {
  //     if (matchup.round === roundSelected) {
  //       const date = new Date(matchup.datetime)
  //         .toDateString()
  //         .split(" ")
  //         .slice(0, 3)
  //         .join(" ");
  //       const time = formatTime(new Date(matchup.datetime));
  //       const negativeTeam = teamStore.teams.find(
  //         (team) => team.id === matchup.negativeTeam
  //       )?.name;
  //       const row = {
  //         div: div.division,
  //         venue: div.venue.name,
  //         date,
  //         time,
  //         affirmative: teamStore.teams.find(
  //           (team) => team.id === matchup.affirmativeTeam
  //         ).name,
  //         negative: negativeTeam || "Bye",
  //         topic: matchup.topic,
  //         status: matchup.status,
  //       };
  //       tableData.value.push(row);
  //     }
  //   });
  // });

  // Used only for JSON fixtures
  selectedLevel.value.forEach((matchup) => {
    if (matchup.round === selectedRound) {
      tableData.value.push(matchup);
    }
  });
  isLoading.value = false;
};

const handleFilter = (searchTerm) => {
  tableFilter.value = searchTerm;
};

const filteredTableData = computed(() => {
  return tableFilter.value
    ? tableData.value.filter(
        (data) =>
          data?.division?.toString().includes(tableFilter.value) ||
          data?.venue?.toLowerCase().includes(tableFilter.value) ||
          data?.date?.toLowerCase().includes(tableFilter.value) ||
          data?.time?.toLowerCase().includes(tableFilter.value) ||
          data?.affirmativeTeam?.toLowerCase().includes(tableFilter.value) ||
          data?.negativeTeam?.toLowerCase().includes(tableFilter.value) ||
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
    v-if="!isLoading"
    :key="levelTabsKey"
    :tabs="roundTabs"
    font-size="text-base"
    @handle-tab="handleRound"
  />
  <div v-if="!isLoading" class="flex justify-center w-full">
    <Table
      :headers="headers"
      :data="filteredTableData"
      :can-edit="false"
      no-data-text="Please select a round"
    />
  </div>
</template>
