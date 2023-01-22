import { defineStore } from "pinia";
import { useNuxtApp } from "#imports";
import { collection, getDocs, addDoc, setDoc, doc } from "firebase/firestore";

export const useTournamentStore = defineStore("tournament", {
  state: () => {
    return {
      tournaments: [],
      filteredTournaments: [],
    };
  },
  getters: {
    getRunning() {
      return this.tournaments.filter(
        (tournament) => tournament.status == "Running"
      );
    },
  },
  actions: {
    async getTournaments() {
      this.clearStore();
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
      this.filteredTournaments = [];
    },
    async createTournament(tournament) {
      const { $db } = useNuxtApp();
      const t = await addDoc(collection($db, "tournaments"), {
        levels: tournament.levels,
        name: tournament.name,
        num_rounds: tournament.num_rounds,
        short_name: tournament.short_name,
        status: tournament.status,
      });

      // Tournament ID becomes auto-generated ID assigned by firestore
      tournament.id = t.id;

      this.tournaments.push({
        ...tournament,
      });

      this.filteredTournaments = [...this.tournaments];
    },
    async editTournament(tournament) {
      const { $db } = useNuxtApp();
      await setDoc(doc($db, "tournaments", tournament.id), {
        levels: tournament.levels,
        name: tournament.name,
        num_rounds: tournament.num_rounds,
        short_name: tournament.short_name,
        status: tournament.status,
      });

      this.tournaments.forEach((t) => {
        if (t.id === tournament.id) {
          Object.assign(t, tournament);
        }
      });
      
      this.filteredTournaments = [...this.tournaments];
    },
  },
});
