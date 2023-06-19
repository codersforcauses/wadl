<script setup>
import { useMatchupStore } from "../stores/matchups";
import { useLeaderboardStore } from "../stores/leaderboard";
import { onMounted, ref } from "vue";

const matchupStore = useMatchupStore();
const LeaderboardStore = useLeaderboardStore();
const possibleDivisions = [];
const isLoading = ref(true);
onMounted(async () => {
  try {
    await matchupStore.getMatchups("Vh3zYFSjFBs1ljlOtv7x");
    // change to user input
    // info = matchupStore.junior[0].filter((mat) => mat.division === 1);
    // info.sort((a,b) => {
    //     if (a.date > b.date) return 1;
    // })
    // todo moveto the upload scoresheet functionality
    // await matchupStore.createLeaderBoards("Vh3zYFSjFBs1ljlOtv7x");
    //
    await LeaderboardStore.getLeaderboard("Vh3zYFSjFBs1ljlOtv7x");
    // console.log(LeaderboardStore.leaderboard[0].senior);
    await createDivisionTabs();
    // await sortDivisions();
  } catch (error) {
    console.log(error);
  }
  isLoading.value = false;

});

const levelTabs = [
  { label: "Novice", active: true },
  { label: "Junior", active: false },
  { label: "Senior", active: false },
];
// undefined problems
const selectedLevel = ref("Novice");
const roundTabs = [];

const createDivisionTabs = async () => {
  let division = 1;
  // while (round <= parseInt(selectedTournament?.numRounds)) {
  //   if (round === parseInt(selectedTournament?.currentRound)) {
  //     roundTabs.push({ label: `Round ${round}`, active: true });
  //   } else {
  //     roundTabs.push({ label: `Round ${round}`, active: false });
  //   }
  //   round++;
  // }
};

// const sortDivisions = async () => {
//   possibleDivisions.push({
//     junior: Array.from(
//       new Set(matchupStore.junior[0].map((matchup) => matchup.division))
//     ),
//   });
//   possibleDivisions.push({
//     novice: Array.from(
//       new Set(matchupStore.novice[0].map((matchup) => matchup.division))
//     ),
//   });
//   possibleDivisions.push({
//     senior: Array.from(
//       new Set(matchupStore.senior[0].map((matchup) => matchup.division))
//     ),
//   });
// };
</script>

<template>
  <div v-if="!isLoading">
    <Tabs :tabs="levelTabs" font-size="text-xl" @handle-tab="handleLevel" />
    <!-- change this so it supports searching leaderboard data i guess -->
    <div class="flex items-center justify-center w-full">
      <SearchBar @handle-filter="handleFilter" />
      <Tabs v-if="!isLoading" :key="levelTabsKey" :tabs="roundTabs" font-size="text-base" @handle-tab="handleRound" />
    </div>
    <Leaderboard :divisions="possibleDivisions" :data="LeaderboardStore.leaderboard[0].senior" />
  </div>
</template>
