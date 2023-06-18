<script setup>
import { useMatchupStore } from "../stores/matchups";
import { useLeaderboardStore } from "../stores/leaderboard";
import { onMounted, ref } from "vue";

const matchupStore = useMatchupStore();
const LeaderboardStore = useLeaderboardStore();
const possibleDivisions = [];
const isLoading = ref(true);
const info = [];
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
    console.log(LeaderboardStore.leaderboard[0].senior);
    // await sortDivisions();
  } catch (error) {
    console.log(error);
  }
  isLoading.value = false;
});

const sortDivisions = async () => {
  possibleDivisions.push({
    junior: Array.from(
      new Set(matchupStore.junior[0].map((matchup) => matchup.division))
    ),
  });
  possibleDivisions.push({
    novice: Array.from(
      new Set(matchupStore.novice[0].map((matchup) => matchup.division))
    ),
  });
  possibleDivisions.push({
    senior: Array.from(
      new Set(matchupStore.senior[0].map((matchup) => matchup.division))
    ),
  });
};
</script>

<template>
  <div v-if="!isLoading">
    <Leaderboard
      :divisions="possibleDivisions"
      :data="LeaderboardStore.leaderboard"
    />
  </div>
</template>
