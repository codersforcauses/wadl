<script setup>
import { ref, computed, onMounted } from "vue";
import { useTournamentStore } from "../../stores/tournaments";
import { useTeamStore } from "../../stores/teams";
import { useRoute } from "#imports";
import juniorFixtures from "../../data/juniorDraw.json";
import noviceFixtures from "../../data/noviceDraw.json";
import seniorFixtures from "../../data/seniorDraw.json";
const tournamentStore = useTournamentStore();
//const teamStore = useTeamStore();
const route = useRoute();

onMounted(async () => {
  //await teamStore.getTeams();
  await getFixturesTableData();
});

const headers = [
  {
    key: "division",
    title: "Division",
  },
  {
    key: "round",
    title: "Round",
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
];
const levelTabs = [
  { label: "Novice", active: false },
  { label: "Junior", active: true },
  { label: "Senior", active: false },
];
const roundTabs = [];
const selectedTournament = tournamentStore.getRunning.find(
  (tournament) => tournament.id === route.params.tournamentId
);

let levelSelected = "Junior";
let levelTabsKey = 0;

const selectedLevel = ref(juniorFixtures);
const tableData = ref([]);
const tableFilter = ref("");
const selectedRound = ref(selectedTournament?.currentRound);

const createRoundTabs = () => {
  let round = 1;
  while (round <= selectedTournament?.numRounds) {
    if (round === selectedTournament?.currentRound) {
      roundTabs.push({ label: `Round ${round}`, active: true });
    } else {
      roundTabs.push({ label: `Round ${round}`, active: false });
    }
    round++;
  }
};

const handleLevel = (tabName) => {
  selectedRound.value = selectedTournament?.currentRound;
  levelSelected = tabName;
  levelTabsKey++;
  tableData.value = [];
  roundTabs.forEach((round) => {
    if (
      parseInt(round.label.split("")[round.label.length - 1]) ===
      selectedRound.value
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
};

const handleRound = (roundName) => {
  tableData.value = [];
  selectedRound.value = parseInt(roundName.split("")[roundName.length - 1]);
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
  selectedLevel.value.map((matchup) => {
    if (matchup.round === selectedRound.value) {
      tableData.value.push(matchup);
    }
  });
};

const handleFilter = (searchTerm) => {
  tableFilter.value = searchTerm;
};

const filteredTableData = computed(() => {
  return tableFilter.value
    ? tableData.value.filter(
        (data) =>
          data?.div?.toString().includes(tableFilter.value) ||
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

createRoundTabs();
</script>

<template>
  <Tabs :tabs="levelTabs" font-size="text-xl" @handle-tab="handleLevel" />
  <div class="flex items-center justify-center w-full">
    <SearchBar @handle-filter="handleFilter" />
  </div>
  <Tabs
    :key="levelTabsKey"
    :tabs="roundTabs"
    font-size="text-base"
    @handle-tab="handleRound"
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
