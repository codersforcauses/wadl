import { defineStore } from "pinia";
import { useNuxtApp } from "#imports";
import { getDoc, doc } from "firebase/firestore";

export const useLeaderboardStore = defineStore("leaderboard", {
  state: () => {
    return {
      novice: [],
      senior: [],
      junior: [],
    };
  },
  getters: {},
  actions: {
    async getLeaderboard(torniID) {
      this.novice.pop();
      this.senior.pop();
      this.junior.pop();
      //
      const { $clientFirestore } = useNuxtApp();
      if (!$clientFirestore) return;
      const ref = doc($clientFirestore, "leaderboard", torniID);
      const querySnapshot = await getDoc(ref);
      this.junior.push(querySnapshot.data().junior);
      this.senior.push(querySnapshot.data().senior);
      this.novice.push(querySnapshot.data().novice);
    },
    async updateLeaderboard(matchup) {
      const win = 2;
      const loss = 1;
      const level = matchup.level;
      const affirmativeTeam = matchup.affirmativeTeam;
      const negativeTeam = matchup.negativeTeam;
      const division = matchup.division;
      const scoresheet = matchup.scoresheet;
      const affirmativeTeamTotal = scoresheet.affirmativeTeam.total;
      const negativeTeamTotal = scoresheet.negativeTeam.total;
      // this[level][0][division - 1].forEach((team) => {
      //   if (team.name ===)
      // });
      const handleWin = (team) => {
        console.log("win", team);
      };
      const handleLoss = (team) => {
        console.log("loss", team);
      };
      if (affirmativeTeamTotal === negativeTeamTotal) {
        console.log("Tie");
      } else if (affirmativeTeamTotal > negativeTeamTotal) {
        console.log("Affirmative Team Wins", affirmativeTeam);
      } else {
        console.log("Negative Team Wins", negativeTeam);
      }
      console.log(matchup);
      // later
      const forfeit = 0;
    },
  },
});
