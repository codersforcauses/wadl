<script setup>
import { useMatchupStore } from "../../../../../stores/matchups";
import { useLeaderboardStore } from "../../../../../stores/leaderboard";
import { onMounted, ref } from "vue";
import { useRoute, useHead } from "#imports";

useHead({
  title: "Leaderboard",
});

const route = useRoute();
const matchupStore = useMatchupStore();
const LeaderboardStore = useLeaderboardStore();
const isLoading = ref(true);
onMounted(async () => {
  try {
    await matchupStore.getMatchups(route.params.tournamentId);
    await LeaderboardStore.getLeaderboard(route.params.tournamentId);
    await createDivisionTabs();
    await getFixturesTableData();
  } catch (error) {
    console.log(error);
  }
});

const levelTabs = [
  { label: "Novice", active: true },
  { label: "Junior", active: false },
  { label: "Senior", active: false },
];
const tableData = ref([]);
const selectedLevel = ref(LeaderboardStore.novice);
let divisionTabs = [];
let selectedDivision = 1;

const createDivisionTabs = async () => {
  divisionTabs = [];
  const maxDivision = Object.entries(selectedLevel.value[0]).length;
  for (let i = 0; i < maxDivision; i++) {
    if (i === 0) {
      divisionTabs.push({ label: `Division ${i + 1}`, active: true });
    } else {
      divisionTabs.push({ label: `Division ${i + 1}`, active: false });
    }
  }
};

const handleRound = async (divisionName) => {
  isLoading.value = true;
  tableData.value = [];
  selectedDivision = parseInt(divisionName.match(/\d+/)[0]);
  await getFixturesTableData();
};

const handleLevelChange = async (Level) => {
  isLoading.value = true;
  selectedDivision = 1;
  tableData.value = [];

  if (Level === "Novice") {
    selectedLevel.value = LeaderboardStore.novice;
  } else if (Level === "Junior") {
    selectedLevel.value = LeaderboardStore.junior;
  } else {
    selectedLevel.value = LeaderboardStore.senior;
  }

  await createDivisionTabs();
  await getFixturesTableData();
};

const getFixturesTableData = async () => {
  selectedLevel.value[0][selectedDivision - 1].sort((a, b) =>
    a.points > b.points ? -1 : 1
  );
  for (
    let i = 0;
    i < selectedLevel.value[0][selectedDivision - 1].length;
    i++
  ) {
    selectedLevel.value[0][selectedDivision - 1][i].place = i + 1;
  }
  tableData.value = { ...selectedLevel.value[0][selectedDivision - 1] };
  isLoading.value = false;
};
</script>

<template>
  <div v-if="!isLoading">
    <Tabs
      :tabs="levelTabs"
      font-size="text-xl"
      @handle-tab="handleLevelChange"
    />
    <Tabs
      v-if="!isLoading"
      :tabs="divisionTabs"
      font-size="text-base"
      @handle-tab="handleRound"
    />
    <Leaderboard :data="tableData" />
  </div>
</template>
