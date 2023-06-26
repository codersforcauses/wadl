import { defineStore } from "pinia";
import { useNuxtApp } from "#imports";
import { getDoc, doc, updateDoc } from "firebase/firestore";

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
    async updateLeaderboard(matchup, tournamentID) {
      const { $clientFirestore } = useNuxtApp();
      if (!$clientFirestore) return;
      const ref = doc($clientFirestore, "leaderboard", tournamentID);
      const win = 2;
      const loss = 1;
      const level = matchup.level;
      const affirmativeTeam = matchup.affirmativeTeam;
      const negativeTeam = matchup.negativeTeam;
      const division = matchup.division;
      const scoresheet = matchup.scoresheet;
      const affirmativeTeamTotal = scoresheet.affirmativeTeam.total;
      const negativeTeamTotal = scoresheet.negativeTeam.total;
      let winningTeam = null;
      let losingTeam = null;
      if (affirmativeTeamTotal > negativeTeamTotal) {
        console.log("Affirmative Team Wins", affirmativeTeam);
        winningTeam = affirmativeTeam;
        losingTeam = negativeTeam;
      } else {
        console.log("Negative Team Wins", negativeTeam);
        winningTeam = negativeTeam;
        losingTeam = affirmativeTeam;
      }
      this[level][0][division - 1].forEach((team) => {
        if (team.name === winningTeam) {
          team.points += win;
        } else if (team.name === losingTeam) {
          team.points += loss;
        }
      });
      await updateDoc(ref, {
        junior: this.junior[0],
        senior: this.senior[0],
        novice: this.novice[0],
      });
    },
  },
});
