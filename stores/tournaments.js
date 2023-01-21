import { defineStore } from "pinia";
import { collection, getDocs } from "firebase/firestore";

export const useTournamentStore = defineStore("tournament", {
  state: () => {
    return {
      tournaments: [],
      filteredTournaments: [],
    };
  },
  getters: {},
  actions: {
    async getTournaments() {
      const { $db } = useNuxtApp();
      const ref = collection($db, "tournaments");
      const querySnapshot = await getDocs(ref);
      querySnapshot.forEach((doc) => {
        const tournament = {
          id: doc.id,
          levels: doc.data().levels,
          name: doc.data().name,
          num_rounds: doc.data().num_rounds,
          short_name: doc.data().short_name,
          status: doc.data().status,
        };
        this.tournaments.push(tournament);
      });
      this.filteredTournaments = [...this.tournaments];
    },
    async clearStore() {
      this.tournaments = [];
    },
    async createTournament(tournament) {
      this.tournaments.push({
        ...tournament,
      });
      this.filteredTournaments = [...this.tournaments];
    },
    async editTournament(tournament) {
      this.tournaments.forEach((t) => {
        if (t.id === tournament.id) {
          Object.assign(t, tournament);
        }
      });
      this.filteredTournaments = [...this.tournaments];
    },
  },
});
